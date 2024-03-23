import axios, { AxiosResponse } from "axios";
import { MarkdownRenderer } from "feishu-docx";
import fs from "fs";
import mime from "mime-types";
import path from "path";
import { humanizeFileSize, isValidCacheExist } from "./utils";
import { WikiNode } from "./type.def";
import MyFetch from "./my_fetch";
export class FeishuHelp {
  tenantAccessToken: string = "";
  tmp_path: string = "";
  base_url: string = "https://open.feishu.cn";
  constructor(
    private appId: string,
    private appSecret: string
  ) {}
  async getToken() {
    console.log("get token...");
    const res = await this.fetch("post", "/open-apis/auth/v3/tenant_access_token/internal", {
      app_id: this.appId,
      app_secret: this.appSecret,
    });
    console.log("get token ok:", res);
    this.tenantAccessToken = res || "";
  }
  initTmpPath(tmppath) {
    this.tmp_path = tmppath;
    console.log("tmppath", tmppath);
    if (!fs.existsSync(tmppath)) fs.mkdirSync(tmppath);
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

  async fetchAllDocs(doc_path: string, pic_path: string, spaceId: string, parent_node_token?: string) {
    let docs: WikiNode[] = [];
    await this._fetchAllDocs(doc_path, pic_path, docs, 0, spaceId, parent_node_token);
    return docs;
  }

  private async downloadFile(fileToken: string, localPath: string) {
    localPath = path.join(localPath, fileToken);
    const cacheFilePath = path.join(this.tmp_path, fileToken);
    const cacheFileMetaPath = path.join(this.tmp_path, `${fileToken}.headers.json`);
    let res: { data?: fs.ReadStream; headers?: Record<string, any> } = {};
    let hasCache = false;
    if (isValidCacheExist(cacheFilePath) && isValidCacheExist(cacheFileMetaPath)) {
      hasCache = true;
      res.headers = JSON.parse(fs.readFileSync(cacheFileMetaPath, "utf-8"));
      console.info(" -> Cache hit:", fileToken);
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
    console.info(" -> Writing file:", localPath);
    fs.copyFileSync(cacheFilePath, localPath);
    return res;
  }
  private async _fetchAllDocs(doc_path: string, pic_path: string, docs: WikiNode[], depth: number, spaceId: string, parent_node_token: string) {
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
          this.fetchDocBody(path.join(doc_path, item.title + ".md"), pic_path, item);
          console.info("Writing doc", item.title);
          item.children = [];
          if (item.has_child) {
            const parent_dir = path.join(doc_path, item.title);
            if (!fs.existsSync(parent_dir)) fs.mkdirSync(parent_dir);
            await this._fetchAllDocs(parent_dir, pic_path, item.children, depth + 1, spaceId, item.node_token);
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
    const content = render.parse();
    for (const fileitem in render.fileTokens) {
      await this.downloadFile(fileitem, pic_path);
    }
    // const meta = render.meta;
    fs.writeFileSync(filepath, content);
  }
}
