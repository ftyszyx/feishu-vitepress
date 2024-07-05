---
title: Feishu Blog - GitHub Action Automation Process Description
keywords:
  - feishu
  - vitepress
  - blog
  - github action
create_time: 1713257619
categories:
  - product
---

# Code location 

There are currently three automated processes

export_en.yaml: Convert article to English (performed manually)

update.yaml: export Feishu articles (manual and automatic: once a day)

publish_github.yaml: publish the article to GitHub Pages (manual and automatic: triggered when there is a change)

For the specific syntax, please refer to the official documentation, which will not be detailed here

https://docs.github.com/en/actions

# Configure environment variables

GitHub environment variables are used in the automation process 

```ts
FEISHU_APP_ID: ${{ vars. FEISHU_APP_ID }}
FEISHU_APP_SECRET: ${{ secrets. FEISHU_APP_SECRET }}
FEISHU_SPACE_ID: "${{ vars. FEISHU_SPACE_ID}}"
BASE_URL: ${{vars. BLOG_BASE_URL}}
```

You need to add the environment variable myblog to your github backend

<img src="/assets/X7OibIoBYoQmVAx8rjPcjhTTnxb.png" src-width="828" class="m-auto" src-height="515" align="center"/>

For details, see the GitHub documentation

# Mission Description

## relase.ymlPerformed manually

The blog will be compiled into a zip and uploaded to relase

## pub_github_page.yml

Automated

Compile the blog and deploy it to the github page 

## export_en.yml

Automatically translate documents from your blog into English

Performed manually

## pull_feishu_doc.yml

Automatic and manual (one day per day)

Pull the latest Feishu documents to generate a blog