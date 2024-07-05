---
title: Feishu Blog - Blog Configuration Instructions
keywords:
  - feishu
  - vitepress
  - blog
create_time: 1713255839
categories:
  - product
---

# Project Introduction:

Framework using vitepress :https://vitepress.dev/

The following features have been added:

umami statistics:https://umami.is/

ArTalk User Reviews: https://artalk.js.org/

# How to start

After checking out the project:

```ts
git clone https://github.com/ftyszyx/feishu-vitepress.git
```

Go to the blog directory and run the following command

```ts
npm install
npm run dev
```

# Basic structure of the project

## Document directory

<img src="/assets/Vu8Eb0WYaoJYDBxZm5HcLlPlnCf.png" src-width="280" class="m-auto" src-height="395" align="center"/>
In the screenshot is a Chinese document with the md suffix

1. MD Docs: Articles written for you
2. lan.json is a multilingual text
3. sider.json is a blog directory

If you still have English, you can create an en folder. Just put the English version of the above document.## Configuration

The configuration of the blog is under docs/.vitepress/config, which supports multiple languages

shared.ts is a shared configuration

There is also a configuration under docs/.vitepress/theme/site_config.ts (mostly some blog personal custom information)

Home Classification, Altalk Configuration, Umami Configuration,

<img src="/assets/VpfcbJL9Gozw57xVKHkcfkI1n0b.png" src-width="512" class="m-auto" src-height="412" align="center"/>