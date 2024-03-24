import axios, { AxiosResponse } from "axios";
import { MarkdownRenderer } from "feishu-docx";
import fs from "fs";
import mime from "mime-types";
import yaml from "js-yaml";
import path from "path";
import { humanizeFileSize, isValidCacheExist, replaceLinks } from "./utils";
import { WikiNode } from "./type.def";
import MyFetch from "./my_fetch";
export interface SaveDocOption {
  save_style: "nested" | "flat";
}
export const FeiShuDoc_pre = "feishu_";
export class FeishuDocHelp {
  tenantAccessToken: string = "";
  base_url: string = "https://open.feishu.cn";
  constructor(
    private appId: string,
    private appSecret: string,
    private tmp_path: string
  ) {
    if (!fs.existsSync(this.tmp_path)) fs.mkdirSync(this.tmp_path);
  }
  async getToken() {
    console.log("get token...");
    const res = await this.fetch("post", "/open-apis/auth/v3/tenant_access_token/internal", {
      app_id: this.appId,
      app_secret: this.appSecret,
    });
    console.log("get token ok:", res);
    this.tenantAccessToken = res || "";
  }
  async fetch(method, path, payload): Promise<any> {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "User-Agent": "feishu-pages",
    };
    if (this.tenantAccessToken) {
      const authorization = `Bearer ${this.tenantAccessToken}`;
      headers["Authorization"] = authorization;
    }
    const url = `${this.base_url}${path}`;
    try {
      const respdata = await MyFetch.request({
        method,
        url,
        params: payload,
        headers,
      }).then((res) => res.data);
      const { code, msg, data, tenant_access_token } = respdata;
      if (code !== 0) {
        console.error("feishuFetch code:", code, "msg:", msg);
        return null;
      }
      // console.log("get data", data, respdata);
      if (tenant_access_token) return tenant_access_token;
      return data;
    } catch (err) {
      console.log("feishu fetch err", path, method, err);
      return null;
    }
  }
  async getList<T>(method: string, path: string, payload: Record<string, any> = {}): Promise<T[]> {
    let pageToken = "";
    let hasMore = true;
    let results: any[] = [];
    while (hasMore) {
      const data = await this.fetch(method, path, {
        ...payload,
        page_token: pageToken,
      });

      if (data.items) {
        results = results.concat(data.items);
      }
      hasMore = data.has_more;
      pageToken = data.page_token;
    }
    return results;
  }

  private async downloadFile(fileToken: string, localPath: string) {
    localPath = path.join(localPath, fileToken);
    const cacheFilePath = path.join(this.tmp_path, fileToken);
    const cacheFileMetaPath = path.join(this.tmp_path, `${fileToken}.headers.json`);
    let res: { headers?: Record<string, any> } = {};
    let hasCache = false;
    if (isValidCacheExist(cacheFilePath) && isValidCacheExist(cacheFileMetaPath)) {
      hasCache = true;
      res.headers = JSON.parse(fs.readFileSync(cacheFileMetaPath, "utf-8"));
      // console.info(" -> Cache hit:", fileToken);
    } else {
      console.info("Downloading file", fileToken, "...");
      res = await axios
        .get(`${this.base_url}/open-apis/drive/v1/medias/${fileToken}/download`, {
          responseType: "stream",
          headers: {
            Authorization: `Bearer ${this.tenantAccessToken}`,
            "User-Agent": "feishu-pages",
          },
        })
        .then((res: AxiosResponse) => {
          if (res.status !== 200) {
            console.error(" -> ERROR: Failed to download image:", fileToken, res.status);
            return null;
          }
          fs.writeFileSync(cacheFileMetaPath, JSON.stringify(res.headers));
          return new Promise((resolve: any, reject: any) => {
            const writer = fs.createWriteStream(cacheFilePath);
            res.data.pipe(writer);
            writer.on("finish", () => {
              resolve({
                headers: res.headers,
              });
            });
            writer.on("error", (e) => {
              reject(e);
            });
          });
        })
        .catch((err) => {
          const { message } = err;
          console.error(" -> ERROR: Failed to download image:", fileToken, message);
          // If status is 403
          // https://open.feishu.cn/document/server-docs/docs/drive-v1/faq#6e38a6de
          if (message.includes("403")) {
            console.error(`无文件下载权限时接口将返回 403 的 HTTP 状态码。\nhttps://open.feishu.cn/document/server-docs/docs/drive-v1/faq#6e38a6de\nhttps://open.feishu.cn/document/server-docs/docs/drive-v1/download/download`);
            return null;
          }
        });
    }
    if (!res) {
      return null;
    }
    let extension = mime.extension(res.headers["content-type"]);
    let fileSize = res.headers["content-length"];
    if (!hasCache) {
      console.info(" =>", res.headers["content-type"], humanizeFileSize(fileSize));
    }
    if (extension) {
      localPath = localPath + "." + extension;
    }
    // console.info(" -> Writing file:", localPath);
    fs.copyFileSync(cacheFilePath, localPath);
    return res;
  }
  async fetchAllDocs(doc_path: string, pic_path: string, spaceId: string, parent_node: string = "", option: SaveDocOption = { save_style: "nested" }) {
    let docs: WikiNode[] = [];
    await this._fetchAllDocs(doc_path, pic_path, [], docs, 0, spaceId, parent_node, option);
    return docs;
  }

  private async _fetchAllDocs(doc_path: string, pic_path: string, parent_path_arr: string[], docs: WikiNode[], depth: number, spaceId: string, parent_node_token: string, option: SaveDocOption) {
    console.log("begin get all docs");
    let items = await this.getList<WikiNode>("GET", `/open-apis/wiki/v2/spaces/${spaceId}/nodes`, { parent_node_token, page_size: 50 });
    items
      .filter((item) => item.obj_type == "doc" || item.obj_type == "docx")
      .forEach(async (item) => {
        item.depth = depth;
        let title = item.title.toLocaleLowerCase();
        if (!title.includes("[hide]") && !title.includes("[隐藏]")) {
          console.log("get doc", item.title);
          docs.push(item);
          console.info("Writing doc", item.title);
          item.children = [];
          item.wiki_path_arr = parent_path_arr;
          if (item.has_child) {
            let parent_dir = doc_path;
            if (option.save_style == "nested") {
              parent_dir = path.join(doc_path, item.title);
              if (!fs.existsSync(parent_dir)) fs.mkdirSync(parent_dir);
            }
            var new_parent = item.wiki_path_arr.concat(item.title);
            await this._fetchAllDocs(parent_dir, pic_path, new_parent, item.children, depth + 1, spaceId, item.node_token, option);
          } else {
            //根目录不下载
            let create_time = new Date(parseInt(item.node_create_time) * 1000);
            let time_str = `${create_time.getFullYear()}_${create_time.getMonth()}_${create_time.getDate()}`;
            this.fetchDocBody(path.join(doc_path, `${FeiShuDoc_pre}_${time_str}_${parent_path_arr.join("_")}_${item.title}.md`), pic_path, item);
          }
        }
      });
  }

  /**
   * https://open.feishu.cn/document/server-docs/docs/docs/docx-v1/document/raw_content
   * @param document_id doc.obj_token
   * @returns
   */
  private async feitchDocBlocks(document_id: string) {
    console.info("Fetching doc block: ", document_id);
    const blocks = await this.getList("GET", `/open-apis/docx/v1/documents/${document_id}/blocks`, {
      page_size: 500,
      document_revision_id: -1,
    });
    return blocks as any;
  }
  private genMetaText(meta) {
    let meta_yaml = yaml.dump(meta, {
      skipInvalid: true,
    });
    let output = `---\n`;
    output += meta_yaml;
    output += `---\n`;
    return output;
  }

  private async fetchDocBody(filepath: string, pic_path: string, fileDoc: WikiNode) {
    let document_id = fileDoc.obj_token;
    const blocks = await this.feitchDocBlocks(document_id);
    const render_doc = {
      document: {
        document_id,
      },
      blocks: blocks,
    };
    const render = new MarkdownRenderer(render_doc);
    let content = render.parse();
    const meta = render.meta;
    console.log("meta", meta);
    for (const filetoken in render.fileTokens) {
      const file_res = await this.downloadFile(filetoken, pic_path);
      let extension = mime.extension(file_res.headers["content-type"]);
      let pic_full_path = path.join(pic_path, `${filetoken}.${extension}`);
      let assetURL = "/" + path.relative(path.dirname(filepath), pic_full_path);
      // console.log("get url", pic_full_path, assetURL, path.dirname(filepath));
      content = replaceLinks(content, filetoken, assetURL);
    }
    if (meta) {
      content = this.genMetaText(meta) + "\n\n" + content;
    }
    fs.writeFileSync(filepath, content);
  }
}
