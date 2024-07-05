---
Title: Feishu Blog - Project Introduction
keywords:
  - feishu
  - vitepress
  - Personal blogging
cover: /assets/P7IHbYWtIogIPIxI3i4cOpeLn8j.png
create_time: 1712461073
categories:
  - product
---

# Why do this

Current static blogs, such as VitePress, mainly use markdown to write content. Although markdown is more readable, it is a bit troublesome to paste images in the article, you need to save the image to the asset directory first, and then write the image address in markdown.

I usually use Feishu to write documents in my work, and I think it is very convenient, so I wondered if I could write documents on Feishu, and then automatically export Feishu's documents into blog articles.

# Introduction to the main functions

1. Export the Feishu document to a markdown file
2. Static Blog System to Generate Exported Articles (Using VitePress)
3. Automatically translate Chinese documents into English
4. Umami access statistics are integrated
5. Integrated Artalk commenting system

# How to use

## Configure the Feishu app

Install Feishu first: https://www.feishu.cn/

and sign up for a personal account

After performing the following steps, you can obtain the following three parameters:

```ts
FEISHU_APP_ID = AppID of the Feishu app
FEISHU_APP_SECRET = the secret of the Feishu app
FEISHU_SPACE_ID = ID of the knowledge base
```

### Create a new app

Go to the Feishu Open Platform and create an app

https://open.feishu.cn/app

### Add bot capabilities to your app<img src="/assets/ThhAba6CPo8ZwyxOLjDcUHTBnFb.png" src-width="306" class="m-auto" src-height="321" align="center"/>

Once added, there will be a bot item in the menu

<img src="/assets/XK09b0UXZoDT8Rx8W4TcHAQXnGx.png" src-width="244" class="m-auto" src-height="327" align="center"/>

### Add permissions for Feishu documents

in Permissions Management

Turn on the 'docx:document:readonly' and 'wiki:wiki:readonly' permissions for the app.

<img src="/assets/BmPLbo84DobeTXxEMmQcFXFmnBg.png" src-width="259" class="m-auto" src-height="109" align="center"/>

### Get app credentials

In the App Credentials and even Information, get the appid and app secret

<img src="/assets/JQWfb98Agoinicxr3cmc8xTSnQb.png" src-width="236" class="m-auto" src-height="225" align="center"/>

### Publish your app

Point Create Version

<img src="/assets/ZwIxb5fmQon35TxNe5bccLL3nEc.png" src-width="480" class="m-auto" src-height="83" align="center"/>

Make sure that the app is approved

<img src="/assets/Uk7tbeTGboKElhxxDD9cxdxenGg.png" src-width="339" class="m-auto" src-height="64" align="center"/>

Create a group and connect to the bot

<img src="/assets/BDjkbEwESoRMpVxW5lacSSFFnbb.png" src-width="329" class="m-auto" src-height="445" align="center"/>

<img src="/assets/A60LbBZ3ZoivhGxX9gacdiFUnmg.png" src-width="328" class="m-auto" src-height="177" align="center"/>

### Set the group as an administrator of the Feishu Document Library

Open "Knowledge Space Settings"

<img src="/assets/QjzVbOYV1oHuEJx0ePacehR2nHb.png" src-width="178" class="m-auto" src-height="259" align="center"/>

"Member Settings" - &gt; add in "Add Administrator", and add this group to **Administrator**.

<img src="/assets/VXMNbc9g7ogqEHxeFnWc8uejnng.png" src-width="1041" class="m-auto" src-height="520" align="center"/>

And remember the address of the knowledge base, in the browser address bar. The box selection in the screenshot below<img src="/assets/AxwvbdUqyoP2WjxPy1Rc68HynBd.png" src-width="843" class="m-auto" src-height="47" align="center"/>
## Export Feishu documents

### Check out the project

```ts
git clone https://github.com/ftyszyx/feishu-vitepress.git
```

### Install dependencies

Switch to the feishu_vitepress of the project directory

```ts
npm install
```

### Configure environment variables

Modify feishu-pages-". env.bak is .env

and configure the corresponding Feishu parameters (explained in the previous section)

```ts
FEISHU_APP_ID=
FEISHU_APP_SECRET
FEISHU_SPACE_ID=
OUTPUT_DIR=.. /blog #markdown输出目录
DOC_DIR_NAME=docs #输出目录名
RES_BASE_URL="/"
```

### Export Feishu documents

```ts
npm run export
```

It will be exported to the /blog/docs directory

### Translate the document into English

If you use the edge library to translate, it may not be translated well

```ts
npm run trans_en
```The generated documentation is in

<img src="/assets/KabZbcHZfo8uMlxxelccMyOjn5f.png" src-width="358" class="m-auto" src-height="133" align="center"/>
## Run your blog locally

Modify blog-". env.bak is .env

and modify

```ts
BASE_URL="/" #网站根目录, generally /,
```

run

```ts
npm run dev
```

After success, it is displayed

<img src="/assets/NPi7biYogolFhPxYWi7c9ms0ntb.png" src-width="406" class="m-auto" src-height="100" align="center"/>
Just visit http://localhost:5173/

# Precautions for writing Feishu documents

## Article cover image

The image of the first line of the document will be converted into the cover field of the document properties

The picture refers to the aspect ratio of the WeChat official account: 2.35:1

The height is 160, and the width is 376

The height is 320, and the width is 752

The height is 800 and the width is 1880

## Attribute fields supported by the article

The second line of the document, which can be equipped with document attributes. YAML is supported

```ts
layout: home #指明用home layout (not required.) vitepress attribute, if it is the homepage, use home.
title: Learn Technology #标题
hide: false #是否不导出当前页, not required
hide_child: true #是否导出子节点, not required 
keywords: #用于搜索和网站seo, not required- feishu
  - vitepress
```

## Category of the article

The classification of articles will be automatically matched to the root node name of the Feishu document (case-insensitive)

For example, the root node name of this article is product.

When you export an article, it's automatically assigned

```ts
if (category) meta["categories"] = meta.categories || [category.trim().toLowerCase()];
```

### Reference Items

Export Feishu Documentation: [link](https://github.com/longbridgeapp/feishu-pages)

Blog style reference: [link](https://github.com/foru17/luoleiorg/tree/main)

My blog demonstrates the effect

[github_page address] (https://ftyszyx.github.io/feishu-vitepress/)

[Alibaba Cloud Address] (https://blog.bytefuse.cn/)