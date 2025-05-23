import axios, { AxiosResponse } from "axios";
import { DocInfo, MarkdownRenderer } from "./feishu_docx";
import fs from "fs";
import mime from "mime-types";
import yaml from "js-yaml";
import path from "path";
import { humanizeFileSize, isValidCacheExist, replaceLinks } from "./utils";
import { SideBarItem, WikiNode } from "./type.def";
import MyFetch from "./my_fetch";
export interface SaveDocOption {
  save_sider_name?: string;
  doc_root_path: string;
  pic_dir_name: string;
}
export const FeiShuDoc_pre = "feishu_";
export class FeishuDocHelp {
  tenantAccessToken: string = "";
  feishu_baseurl: string = "https://open.feishu.cn";
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
    const url = `${this.feishu_baseurl}${path}`;
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
        .get(`${this.feishu_baseurl}/open-apis/drive/v1/medias/${fileToken}/download`, {
          responseType: "stream",
          headers: {
            Authorization: `Bearer ${this.tenantAccessToken}`,
            "User-Agent": "feishu-pages",
          },
        })
        .then((res: AxiosResponse) => {
          if (res.status !== 200) {
            console.error(" -> ERROR: Failed to download image:", fileToken, res.status, res.data);
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
          console.error(" -> catch ERROR: Failed to download image:", fileToken, message);
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
  async fetchAllDocs(spaceId: string, parent_node: string = "", option: SaveDocOption = { doc_root_path: "./docs", pic_dir_name: "pic", save_sider_name: "sider.json" }) {
    let docs: WikiNode[] = [];
    let sider_items: SideBarItem[] = [];
    let parent_path_arr = [];
    const pic_path = path.join(option.doc_root_path, option.pic_dir_name);
    fs.mkdirSync(pic_path, { recursive: true });
    await this._fetchAllDocs(parent_path_arr, sider_items, docs, spaceId, parent_node, option);
    // console.log("get sideritem", sider_items);
    const sider_path = path.join(option.doc_root_path, option.save_sider_name);
    fs.writeFileSync(sider_path, JSON.stringify(sider_items, null, 2));
    return docs;
  }

  private async _fetchAllDocs(parent_path_arr: string[], sider_items: SideBarItem[], docs: WikiNode[], spaceId: string, parent_node_token: string, option: SaveDocOption) {
    // console.log("begin get all docs");
    const pic_path = path.join(option.doc_root_path, option.pic_dir_name);
    let items = await this.getList<WikiNode>("GET", `/open-apis/wiki/v2/spaces/${spaceId}/nodes`, { parent_node_token, page_size: 50 });
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.obj_type == "doc" || item.obj_type == "docx") {
        let post_title = item.title.toLocaleLowerCase();
        console.log("get doc info", item.title);
        docs.push(item);
        item.children = [];
        item.wiki_path_arr = parent_path_arr;
        let create_time = new Date(parseInt(item.node_create_time) * 1000);
        const docid = item.obj_token;
        let time_str = `${create_time.getFullYear()}_${create_time.getMonth()}_${create_time.getDate()}`;
        let filename = `${docid}`;
        if (parent_path_arr.length == 0 && item.title.toLowerCase() == "index") filename = "index";
        try {
          const { hide, hide_child, title } = await this.fetchDocBody(path.join(option.doc_root_path, `${filename}.md`), pic_path, item, parent_path_arr.length >= 1 ? parent_path_arr[0] : "");
          const sider_item: SideBarItem = { text: title || item.title };
          if (hide !== true || filename == "index") {
            console.info("Writing doc", item.title);
            sider_item.link = `/${filename}`;
          }
          if (hide == true && hide_child == true) continue;
          // console.log("add item", hide, hide_child);
          sider_items.push(sider_item);
          if (item.has_child && hide_child !== true) {
            const new_parents = item.wiki_path_arr.concat(item.title);
            sider_item.items = [];
            sider_item.collapsed = true;//default collapse the menu
            await this._fetchAllDocs(new_parents, sider_item.items, item.children, spaceId, item.node_token, option);
          }
        } catch (err) {
          console.error("fetch doc body error", err, "file:", path.join(option.doc_root_path, `${filename}.md`, "title:", item.title, "item", JSON.stringify(item)));
          continue;
        }
      }
    }
  }

  /**
   * https://open.feishu.cn/document/server-docs/docs/docs/docx-v1/document/raw_content
   * @param document_id doc.obj_token
   * @returns
   */
  private async feitchDocBlocks(document_id: string) {
    // console.info("Fetching doc block: ", document_id);
    const blocks = await this.getList("GET", `/open-apis/docx/v1/documents/${document_id}/blocks`, {
      page_size: 500,
      document_revision_id: -1,
    });
    return blocks as any;
  }

  private async feitchDocInfo(document_id: string): Promise<DocInfo> {
    const res: { document: DocInfo } = await this.fetch("GET", `/open-apis/docx/v1/documents/${document_id}`, {});
    return res.document;
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

  async DownFile(file_token: string, pic_path: string, filepath: string) {
    const file_res = await this.downloadFile(file_token, pic_path);
    if (file_res == null) {
      console.error("download file error", file_token, filepath);
    }
    let extension = mime.extension(file_res.headers["content-type"]);
    let pic_full_path = path.join(pic_path, `${file_token}.${extension}`);
    const base_url = "/";
    let assetURL = base_url + path.relative(path.dirname(filepath), pic_full_path);
    assetURL = assetURL.replace("\\", "/");
    return assetURL;
  }

  private async fetchDocBody(filepath: string, pic_path: string, fileDoc: WikiNode, category: string) {
    let document_id = fileDoc.obj_token;
    const doc_info = await this.feitchDocInfo(document_id);
    const blocks = await this.feitchDocBlocks(document_id);
    const render_doc = {
      document: {
        document_id,
      },
      blocks: blocks,
    };
    const render = new MarkdownRenderer(render_doc);
    let content = render.parse();
    let meta = render.meta || {};
    let cover_token = "";
    let isindex = path.basename(filepath) == "index.md";
    if (meta.hide == true && isindex == false) return { ...meta };
    if (render.head_img) {
      const reg_patt = /<img[^>]+src[\s]*=[\s]*"([^"]+)"/;
      const match_res = reg_patt.exec(render.head_img);
      if (match_res.length >= 2) cover_token = match_res[1].trim();
    }
    if (doc_info.cover && doc_info.cover.token) {
      cover_token = doc_info.cover.token;
      render.addFileToken("image", cover_token);
    }
    for (const filetoken in render.fileTokens) {
      if (filetoken) {
        const assetURL = await this.DownFile(filetoken, pic_path, filepath);
        if (filetoken == cover_token) {
          meta["cover"] = assetURL;
          continue;
        }
        content = replaceLinks(content, filetoken, assetURL);
      }
    }
    meta["create_time"] = parseInt(fileDoc.obj_create_time);
    meta["edit_time"] = parseInt(fileDoc.obj_edit_time);
    meta["title"] = meta.title || fileDoc.title;
    // meta["cover"] = meta.cover || "/normal_cover.png";
    if (category) meta["categories"] = meta.categories || [category.trim().toLowerCase()];
    const head_text = this.genMetaText(meta);
    console.log("meta", meta);
    if (meta.hide == true && isindex) content = head_text;
    else content = head_text + "\n\n" + content;
    fs.writeFileSync(filepath, content);
    return { ...meta };
  }
}
