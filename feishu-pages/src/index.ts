#!/usr/bin/env node
import { FileToken } from "feishu-docx";
import fs from "fs";
import path from "path";
import "dotenv/config";
import { fetchDocBody, generateFrontmatter } from "./doc";
import { FileDoc, generateSummary, prepareDocSlugs } from "./summary";
import { cleanupDocsForJSON, cleanupTmpFiles, humanizeFileSize, replaceLinks } from "./utils";
import { fetchAllDocs } from "./wiki";
import { FeishuHelp } from "./feishu";

const appconfig = {
  appId: process.env.FEISHU_APP_ID,
  appSecret: process.env.FEISHU_APP_SECRET,
  spaceId: process.env.FEISHU_SPACE_ID,
  output_dir: path.resolve(process.env.OUTPUT_DIR || "./dist"),
  docs_dir:path.resolve(process.env.DOCS_DIR||"./dist/docs")
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
  console.log("config",appconfig)
  await feishu_help.getToken();
  // Create docs dir
  fs.mkdirSync(DOCS_DIR, { recursive: true });
  // Map file_token to slug
  let slugMap = {};
  const docs = await fetchAllDocs(appconfig.spaceId, 0, ROOT_NODE_TOKEN);

  await fetchDocBodies(docs as FileDoc[]);

  prepareDocSlugs(docs as FileDoc[], slugMap);

  // Fetch docs contents and write files
  await fetchDocAndWriteFile(DOCS_DIR, docs as FileDoc[], slugMap);

  // Write SUMMARY.md
  const summary = generateSummary(docs as FileDoc[]);
  fs.writeFileSync(path.join(DOCS_DIR, "SUMMARY.md"), summary);

  // Omit hide docs
  cleanupDocsForJSON(docs as FileDoc[]);

  // Write docs.json
  fs.writeFileSync(path.join(OUTPUT_DIR, "docs.json"), JSON.stringify(docs, null, 2));

  cleanupTmpFiles();
})();

const fetchDocBodies = async (docs: FileDoc[]) => {
  for (let idx = 0; idx < docs.length; idx++) {
    const doc = docs[idx];
    const { cotnent_file, fileTokens, meta } = await fetchDocBody(doc);

    doc.cotnent_file = cotnent_file;
    doc.meta = meta;
    doc.fileTokens = fileTokens;

    await fetchDocBodies(doc.children);
  }
};

const fetchDocAndWriteFile = async (outputDir: string, docs: FileDoc[], slugMap: Record<string, string>) => {
  if (docs.length === 0) {
    return;
  }

  for (let idx = 0; idx < docs.length; idx++) {
    const doc = docs[idx];

    // Skip write the hide doc
    if (doc.meta?.hide) {
      continue;
    }

    let filename = path.join(outputDir, doc.filename);
    const folder = path.dirname(filename);
    fs.mkdirSync(folder, { recursive: true });

    let { cotnent_file, fileTokens } = doc;

    let content = fs.readFileSync(cotnent_file, "utf-8");

    // Replace node_token to slug

    for (const node_token in slugMap) {
      if (slugMap[node_token]) {
        content = replaceLinks(content, node_token, `${BASE_URL}${slugMap[node_token]}`);
      }
    }

    const metaInfo = generateFrontmatter(doc, doc.slug, doc.position);

    let out = "";
    out += metaInfo + "\n\n";

    content = await downloadFiles(content, fileTokens, folder);

    out += content;

    console.info("Writing doc", doc.filename, humanizeFileSize(content.length), "...");
    fs.writeFileSync(filename, out);

    await fetchDocAndWriteFile(outputDir, doc.children, slugMap);
  }
};

/**
 * This alwasy download assets into ./assets into the docFolder (same folder as the doc).
 *
 * @param content
 * @param fileTokens
 * @param docFolder
 * @returns
 */
const downloadFiles = async (content: string, fileTokens: Record<string, FileToken>, docFolder: string) => {
  if (SKIP_ASSETS) {
    console.info("skip assets download.");
    return content;
  }

  for (const fileToken in fileTokens) {
    const filePath = await feishuDownload(fileToken, path.join(path.join(DOCS_DIR, "assets"), fileToken));
    if (!filePath) {
      continue;
    }

    const extension = path.extname(filePath);

    let assetURL = `/assets/${fileToken}${extension}`;

    // Replase Markdown image
    content = replaceLinks(content, fileToken, assetURL);
  }

  return content;
};
