import axios, { AxiosResponse } from "axios";
import fs from "fs";
import mime from "mime-types";
import path from "path";
import { humanizeFileSize } from "./utils";
import { Doc, WikiNode } from "./type.def";
export class FeishuHelp {
  tenantAccessToken: string = "";
  base_url: string = "https://open.feishu.cn";
  constructor(
    private appId: string,
    private appSecret: string
  ) {}
  async getToken() {
    console.log("Fetching tenantAccessToken...");
    const res = await this.fetch("post", "/open-apis/auth/v3/tenant_access_token/internal", {
      app_id: this.appId,
      app_secret: this.appSecret,
    });
    console.log("get app token rsp", res);
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
      const respdata = await axios
        .request({
          method,
          url,
          params: payload,
          headers,
        })
        .then((res) => res.data);
      const { code, msg, data, tenant_access_token } = respdata;
      if (code !== 0) {
        console.error("feishuFetch code:", code, "msg:", msg);
        return null;
      }
      console.log("get data", data, respdata);
      if (tenant_access_token) return tenant_access_token;
      return data;
    } catch (err) {
      console.log("feishu fetch err", path, method, err);
      return null;
    }
  }
  async downloadFile(file_tile: string, fileToken: string, localPath: string) {
    const cacheFilePath = path.join(localPath, file_tile + ".tmp");
    fs.mkdirSync(cacheFilePath, {
      recursive: true,
    });
    let res: {
      data?: fs.ReadStream;
      headers?: Record<string, any>;
    } = {};
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
        // Write cache info
        // fs.writeFileSync(cacheFileMetaPath, JSON.stringify(res.headers));

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

    if (!res) {
      return null;
    }

    let extension = mime.extension(res.headers["content-type"]);
    let fileSize = res.headers["content-length"];
    console.info(" =>", res.headers["content-type"], humanizeFileSize(fileSize));
    if (extension) {
      localPath = localPath + "." + extension;
    }
    const dir = path.dirname(localPath);
    fs.mkdirSync(dir, {
      recursive: true,
    });
    console.info(" -> Writing file:", localPath);
    fs.copyFileSync(cacheFilePath, localPath);
    return localPath;
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
  async fetchDocInfo(spaceId: string, nodeToken: string): Promise<WikiNode> {
    let data = await this.fetch("GET", "/open-apis/wiki/v2/spaces/get_node", { token: nodeToken });
    const node = data.node as WikiNode;
    if (!node) {
      console.error("Node not found", nodeToken, data);
    }
    return node;
  }

  async fetchAllDocs(spaceId: string, depth?: number, parent_node_token?: string) {
    let docs: Doc[] = [];
    // Fetch fron root node
    if (depth == 0 && parent_node_token) {
      let rootNode = await this.fetchDocInfo(spaceId, parent_node_token);
      let doc = {
        depth: depth,
        title: rootNode.title,
        node_token: rootNode.node_token,
        parent_node_token: null,
        obj_create_time: rootNode.obj_create_time,
        obj_edit_time: rootNode.obj_edit_time,
        obj_token: rootNode.obj_token,
        children: [],
        has_child: rootNode.has_child,
      };
      docs.push(doc);
    } else {
      let items = await this.getList<WikiNode>("GET", `/open-apis/wiki/v2/spaces/${spaceId}/nodes`, { parent_node_token, page_size: 50 });
      items
        .filter((item) => item.obj_type == "doc" || item.obj_type == "docx")
        .forEach((item) => {
          const doc: Doc = {
            depth: depth,
            title: item.title,
            node_token: item.node_token,
            parent_node_token: parent_node_token,
            obj_create_time: item.obj_create_time,
            obj_edit_time: item.obj_edit_time,
            obj_token: item.obj_token,
            children: [],
            has_child: item.has_child,
          };
          docs.push(doc);
        });
    }

    // Ignore title `[hide]` or `[隐藏]`
    docs = docs.filter((doc) => {
      let title = doc.title.toLocaleLowerCase();
      return !title.includes("[hide]") && !title.includes("[隐藏]");
    });

    for (const doc of docs) {
      if (doc.has_child) {
        doc.children = await fetchAllDocs(spaceId, depth + 1, doc.node_token);
      }
    }

    return docs;
  }
}
