#!/usr/bin/env node
import fs from "fs";
import path from "path";
import "dotenv/config";
import { FeishuHelp } from "./feishu";
import { pid } from "process";

const appconfig = {
  appId: process.env.FEISHU_APP_ID,
  appSecret: process.env.FEISHU_APP_SECRET,
  spaceId: process.env.FEISHU_SPACE_ID,
  output_dir: path.resolve(process.env.OUTPUT_DIR || "./dist"),
};

const checkEnv = () => {
  if (!appconfig.appId) {
    throw new Error("FEISHU_APP_ID is required");
  }
  if (!appconfig.appSecret) {
    throw new Error("FEISHU_APP_SECRET is required");
  }
  if (!appconfig.spaceId) {
    throw new Error("FEISHU_SPACE_ID is required");
  }
};

checkEnv();
const feishu_help = new FeishuHelp(appconfig.appId, appconfig.appSecret);
// App entry
(async () => {
  console.log("app config", appconfig);
  let doc_path = path.join(appconfig.output_dir, process.env.DOC_DIR_NAME);
  let asset_path = path.join(doc_path, "asset");
  fs.mkdirSync(asset_path, { recursive: true });
  feishu_help.initTmpPath(path.join(appconfig.output_dir, "tmp"));
  await feishu_help.getToken();
  await feishu_help.fetchAllDocs(doc_path, asset_path, appconfig.spaceId);
})();
