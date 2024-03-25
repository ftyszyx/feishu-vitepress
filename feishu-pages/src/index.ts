#!/usr/bin/env node
import fs from "fs";
import { FeiShuDoc_pre, FeishuDocHelp } from "./feishu";
import { appconfig } from "./config";
import path from "path";
import { walkSync } from "./utils";

const feishu_help = new FeishuDocHelp(appconfig.appId, appconfig.appSecret, path.join(appconfig.output_dir, "tmp"));
// App entry
(async () => {
  console.log("app config", appconfig);
  let doc_path = path.join(appconfig.output_dir, process.env.DOC_DIR_NAME);
  fs.mkdirSync(doc_path, { recursive: true });
  walkSync(doc_path, (file_path, file_dirent) => {
    if (file_dirent.isDirectory && file_dirent.path.endsWith(appconfig.asset_name)) return false;
    if (file_dirent.isFile && file_dirent.name.startsWith(FeiShuDoc_pre) && file_dirent.name.endsWith(".md")) {
      fs.rmSync(file_path);
    }
    return true;
  });
  await feishu_help.getToken();
  await feishu_help.fetchAllDocs(appconfig.spaceId, "", { doc_root_path: doc_path, pic_dir_name: appconfig.asset_name, save_sider_name: "sider.json" });
})();
