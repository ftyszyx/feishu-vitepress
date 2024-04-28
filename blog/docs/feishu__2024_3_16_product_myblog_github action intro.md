---
title: 飞书博客-github action自动化流程说明
keywords:
  - feishu
  - vitepress
  - blog
  - github action
create_time: 1713257619
categories:
  - product
---


 

# 代码位置 

目前有三个自动化流程

export_en.yaml:将文章转成英文 (手动执行)

update.yaml: 导出飞书文章（手动加自动：每天一次）

publish_github.yaml:将文章发布到github pages（手动加自动：有修改就触发）

具体语法，参考官方文档，这里不细说

https://docs.github.com/en/actions

# 配置环境变量

在自动化流程中用到了github 环境变量 

```ts
FEISHU_APP_ID: ${{ vars.FEISHU_APP_ID }}
FEISHU_APP_SECRET: ${{ secrets.FEISHU_APP_SECRET }}
FEISHU_SPACE_ID: "${{ vars.FEISHU_SPACE_ID}}"
BASE_URL: ${{vars.BLOG_BASE_URL}}
```

需要在你的github后台增加环境变量myblog

<img src="/assets/X7OibIoBYoQmVAx8rjPcjhTTnxb.png" src-width="828" class="m-auto" src-height="515" align="center"/>

具体说明参考github文档

# 任务说明

## relase.yml

手动执行

会将博客编译成zip，上传到relase中

## pub_github_page.yml

自动执行

编译博客，并部署到github page 

## export_en.yml

自动将博客中的文档翻译成英文

手动执行

## pull_feishu_doc.yml

自动和手动（每天一天）

拉取最新的飞书文档，生成博客

