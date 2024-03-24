import exp from "constants";
import fs from "fs";
import { marked } from "marked";
import { markedXhtml } from "marked-xhtml";
import os from "os";
import path from "path";

marked.use(markedXhtml());

const allowKeys = ["depth", "title", "slug", "filename", "node_token", "parent_node_token", "children", "obj_create_time", "obj_edit_time", "obj_token", "has_child", "meta", "position"];

export function replaceLinks(content: string, node_token: string, newLink?: string): string {
  if (!newLink) {
    return content;
  }

  /*
    match all links in src="" or href=""

    1 - src=" or href=" or src=' or href='
    2 - https://ywh1bkansf.feishu.cn/wiki/aabbdd
    3 - node_token
    4 - ' | "
  */
  const htmlRe = new RegExp(`((src|href)=["|'])(http[s]?:\\\/\\\/[\\w]+\\.(feishu\\.cn|larksuite\.com)\\\/.*)?(${node_token}[^"']*)("|')`, "gm");
  content = content.replace(htmlRe, `$1${newLink}$6`);

  /*
    match all links in markdown links, images

    1 - ](
    2 - https://ywh1bkansf.feishu.cn/wiki/aabbdd
    3 - node_token
    4 - )
   */
  const mdRe = new RegExp(`(\\]\\()(http[s]?:\\\/\\\/[\\w]+\\.(feishu\\.cn|larksuite\.com)\\\/.*)?(${node_token}[^\\)]*)(\\))`, "gm");
  content = content.replace(mdRe, `$1${newLink}$5`);

  return content;
}

/**
 * Cleanup temp files
 *
 * Remove /tmp/feishi-pages
 */
export function cleanupTmpFiles() {
  const tmpDir = path.join(os.tmpdir(), "feishi-pages");
  console.log("Cleanup temp files:", tmpDir);

  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true });
  }
}

export function isValidCacheExist(filepath: string) {
  if (fs.existsSync(filepath)) {
    const stats = fs.statSync(filepath);
    if (stats.size > 0) {
      return true;
    } else {
      console.warn("file", filepath, "size is 0");
    }
  }
  return false;
}
export function walkSync(currentDirPath: string, callback: (filepath: string, fileItem: fs.Dirent) => boolean) {
  fs.readdirSync(currentDirPath, { withFileTypes: true }).forEach(function (dirent) {
    var filePath = path.join(currentDirPath, dirent.name);
    if (dirent.isFile()) {
      callback(filePath, dirent);
    } else if (dirent.isDirectory()) {
      if (callback(filePath, dirent)) walkSync(filePath, callback);
    }
  });
}
export const humanizeFileSize = (bytes, dp = 1) => {
  if (typeof bytes === "string") {
    bytes = parseInt(bytes);
  }

  const thresh = 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return bytes.toFixed(dp) + " " + units[u];
};
