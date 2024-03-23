#!/usr/bin/env node
import fs from "fs";
import { FeishuHelp } from "./feishu";
import { appconfig } from "./config";
import path from "path";

const feishu_help = new FeishuHelp(appconfig.appId, appconfig.appSecret, path.join(appconfig.output_dir, "tmp"));
// App entry
(async () => {
  console.log("app config", appconfig);
  let doc_path = path.join(appconfig.output_dir, process.env.DOC_DIR_NAME);
  fs.mkdirSync(doc_path, { recursive: true });
  let asset_path = path.join(doc_path, appconfig.asset_name);
  fs.mkdirSync(asset_path, { recursive: true });
  await feishu_help.getToken();
  await feishu_help.fetchAllDocs(doc_path, asset_path, appconfig.spaceId);
})();
