# Intro

---

title: 飞书自动生成静态博客系统
keywords:

- feishu
- vitepress
- 个人博客
  cover: ./blog/docs//assets/P7IHbYWtIogIPIxI3i4cOpeLn8j.png
  create_time: 1712461073
  categories:
- product

---

# 为什么做这个

目前的静态博客如vitepress，主要是用markdown来写内容。markdown虽然可读性比较好，但是在文章中贴图片有点麻烦，需要先保存图片到asset目录下，再在markdown中写图片地址。

平时工作主要用飞书写文档，觉得很方便，所以就想能不能在飞书写文档，然后自动将飞书的文档导出成博客的文章。

# 主要功能介绍

1. 将飞书文档导出成markdown文件
2. 生成导出的文章的静态博客系统(使用vitepress)
3. 自动翻译中文文档为英文
4. 集成了umami访问统计
5. 集成了artalk评论系统

### 检出工程

```ts
git clone https://github.com/ftyszyx/feishu-vitepress.git
```

### 安装依赖

切到工程目录feishu_vitepress下

```ts
npm install
```

### 配置环境变量

修改feishu-pages-》.env.bak为.env

并配置好对应的飞书参数（在上一节中有说明）

```ts
FEISHU_APP_ID=
FEISHU_APP_SECRET
FEISHU_SPACE_ID=
OUTPUT_DIR=../blog  #markdown输出目录
DOC_DIR_NAME=docs   #输出目录名
RES_BASE_URL="/"
```

### 导出飞书文档

```ts
npm run export
```

会导出到/blog/docs目录下

## 本地运行博客

修改blog-》.env.bak为.env

并修改

```ts
BASE_URL="/"  #网站根目录，一般是/,
```

运行

```ts
npm run dev
```

成功后，显示

<img src="./blog/docs/assets/NPi7biYogolFhPxYWi7c9ms0ntb.png" src-width="406" src-height="100" align="center"/>

访问http://localhost:5173/ 即可

# 参考网站：

导出飞书文档参考：

https://github.com/longbridgeapp/feishu-pages

博客样式参考：

https://github.com/foru17/luoleiorg/tree/main

本人博客演示效果

https://ftyszyx.github.io/feishu-vitepress/

# 演示站点：

https://ftyszyx.github.io/feishu-vitepress/

# 详细说明

https://ftyszyx.github.io/feishu-vitepress/feishu__2024_3_7_product_myblog_intro
