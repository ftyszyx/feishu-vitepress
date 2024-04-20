---
title: github action自动化流程说明
keywords:
  - feishu
  - vitepress
  - blog
  - github action
create_time: 1713257619
cover: /normal_cover.png
categories:
  - product
---


 

# 代码位置 

目前有三个自动化流程

export_en.yaml:将文章转成英文 (手动执行）

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

<img src="/assets/X7OibIoBYoQmVAx8rjPcjhTTnxb.png" src-width="828" src-height="515" align="center"/>

具体说明参考github文档

