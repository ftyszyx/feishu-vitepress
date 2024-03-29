#!/usr/bin/env node
import fs from "fs";
import { FeiShuDoc_pre, FeishuDocHelp } from "./feishu";
import { appconfig } from "./config";
import path from "path";
import { walkSync } from "./utils";
import { program } from "commander";
import { translate } from "bing-translate-api";
import { SideBarItem } from "./type.def";
const feishu_help = new FeishuDocHelp(appconfig.appId, appconfig.appSecret, path.join(appconfig.output_dir, ".cache"));
// App entry

program
  .command("export")
  .description("export feishu page")
  .action(async () => {
    console.log("export doc");
    await exportDoc();
  });

program
  .command("trans")
  .description("translate doc")
  .option("-l,--tolan <type>", "tolan", "en")
  .action((str, ops) => {
    console.log("translate", str.tolan);
    translateDoc(str.tolan);
  });

let doc_path = path.join(appconfig.output_dir, process.env.DOC_DIR_NAME);

const save_sider_name = "sider.json";
const exportDoc = async () => {
  console.log("app config", appconfig);
  fs.mkdirSync(doc_path, { recursive: true });
  walkSync(doc_path, (file_path, file_dirent) => {
    // if (file_dirent.isDirectory && file_dirent.path.endsWith(appconfig.asset_name)) return false;
    if (file_dirent.isFile && file_dirent.name.startsWith(FeiShuDoc_pre) && file_dirent.name.endsWith(".md")) {
      fs.rmSync(file_path);
    }
    return true;
  });
  await feishu_help.getToken();
  await feishu_help.fetchAllDocs(appconfig.spaceId, "", { doc_root_path: doc_path, pic_dir_name: appconfig.asset_name, save_sider_name });
};

const translateDoc = async (lan: string) => {
  console.log("begin translate");
  const sider_path = path.join(doc_path, save_sider_name);
  if (fs.existsSync(sider_path) == false) {
    console.log("file not exit", sider_path);
    return;
  }

  const lan_doc_path = path.join(doc_path, lan);
  fs.mkdirSync(lan_doc_path, { recursive: true });
  const jsontxt = fs.readFileSync(sider_path, { encoding: "utf-8" }).toString();
  const sider_cn_json = JSON.parse(jsontxt) as SideBarItem[];
  // process markdown
  const checkItem = async (docitems: SideBarItem[]) => {
    for (let i = 0; i < docitems.length; i++) {
      const docitem = docitems[i];
      const doc_itempath = path.join(doc_path, docitem.link + ".md");
      const dest_itemPath = path.join(lan_doc_path, docitem.link + ".md");
      if (docitem.link) {
        docitem.link = `/${lan}${docitem.link}`;
      }
      if (docitem.items?.length > 0) {
        await checkItem(docitem.items);
      }
      if (fs.existsSync(dest_itemPath)) return;
      const doc_text = fs.readFileSync(doc_itempath, "utf-8").toString();
      console.log(`begin trans ${doc_itempath} cn->${lan}`);
      const res = await translate(doc_text, "zh-Hans", lan);
      fs.writeFileSync(dest_itemPath, res.translation);
      console.log(`translate ok ${doc_itempath} cn->${lan}`);
    }
  };
  await checkItem(sider_cn_json);
  //process sider.json
  const dest_json = path.join(lan_doc_path, save_sider_name);
  console.log(`begin trans ${dest_json} cn->${lan}`);
  const res = await translate(JSON.stringify(sider_cn_json, null, 2), "zh-Hans", lan);
  fs.writeFileSync(dest_json, res.translation);
  console.log(`translate ok ${dest_json} cn->${lan}`);
  //process lan.json
  const lan_json_path = path.join(doc_path, "lan.json");
  const lan_dest_path = path.join(lan_doc_path, "lan.json");
  let lan_dest_json = {};
  if (fs.existsSync(lan_dest_path)) {
    lan_dest_json = JSON.parse(fs.readFileSync(lan_dest_path, "utf8"));
  }
  const lan_text = fs.readFileSync(lan_json_path, "utf-8");
  const lan_json = JSON.parse(lan_text);
  for (var key in lan_json) {
    if (lan_dest_json[key]) continue;
    lan_dest_json[key] = (await translate(lan_json[key], "zh-Hans", lan)).translation;
  }
  fs.writeFileSync(lan_dest_path, JSON.stringify(lan_dest_json, null, 2));
  console.log(`translate ok ${lan_dest_path} cn->${lan}`);
};

program.parse();
