import path from "path";
import "dotenv/config";

export const appconfig = {
  appId: process.env.FEISHU_APP_ID,
  appSecret: process.env.FEISHU_APP_SECRET,
  spaceId: process.env.FEISHU_SPACE_ID,
  output_dir: path.resolve(process.env.OUTPUT_DIR || "./dist"),
  asset_name: "assets",
  sider_js_name: process.env.SIDER_NAME || "sider.ts",
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
