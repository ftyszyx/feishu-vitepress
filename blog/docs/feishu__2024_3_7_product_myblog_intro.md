---
title: 飞书博客-项目简介
keywords:
  - feishu
  - vitepress
  - 个人博客
cover: /assets/P7IHbYWtIogIPIxI3i4cOpeLn8j.png
create_time: 1712461073
categories:
  - product
---


# 为什么做这个

目前的静态博客如vitepress，主要是用markdown来写内容。

markdown虽然可读性比较好，但有以下几个疼点：

1、文章中贴图片有点麻烦，需要先保存图片到asset目录下，然后在markdown中写图片地址。

2、语法虽然简单，但有时还是记不住（年纪大了，记忆力下降）

3、不能方便的插入图表，流程图之类的。

4、换行很讨厌，如果不强制换行，所有的东西全挤在一行里。

平时工作主要用飞书写文档，觉得很方便，所以就想能不能在飞书写文档，然后自动将飞书的文档导出成博客的文章。

# 主要功能介绍

1. 将飞书文档导出成markdown文件（集成到了github action，自动）
2. 生成导出的文章的静态博客系统(使用vitepress实现，集成到了github action，自动)
3. 自动翻译中文文档为英文(目前不是自动，因为机器翻译的文章经常会把一些空格或者符号搞乱，导致编译不过，需要手动修改，所以暂时先手动)
4. 集成了umami访问统计（修改了一部分源码）
5. 集成了artalk评论系统 （功能可用，但后台管理页面丑陋，后面找到合适的系统，再换掉）

# 如何使用

## 配置飞书应用

先安装飞书：https://www.feishu.cn/

并注册一个个人版账号

通过下面步骤后可以获取下面三个参数：

```ts
FEISHU_APP_ID=飞书应用的appid
FEISHU_APP_SECRET=飞书应用的secret
FEISHU_SPACE_ID=知识库的id
```

### 新建应用

去飞书开放平台，新建一个应用

https://open.feishu.cn/app

### 为应用添加机器人能力

<img src="/assets/ThhAba6CPo8ZwyxOLjDcUHTBnFb.png" src-width="306" class="markdown-img m-auto" src-height="321" align="center"/>

添加好后，菜单中会有机器人项

<img src="/assets/XK09b0UXZoDT8Rx8W4TcHAQXnGx.png" src-width="244" class="markdown-img m-auto" src-height="327" align="center"/>

### 增加飞书文档权限

在权限管理中

为应用开启 `docx:document:readonly` 和 `wiki:wiki:readonly` 权限。

<img src="/assets/BmPLbo84DobeTXxEMmQcFXFmnBg.png" src-width="259" class="markdown-img m-auto" src-height="109" align="center"/>

### 获取应用凭证

在应用凭证甚而信息中，获取appid和app secret

<img src="/assets/JQWfb98Agoinicxr3cmc8xTSnQb.png" src-width="236" class="markdown-img m-auto" src-height="225" align="center"/>

### 发布应用

点创建版本

<img src="/assets/ZwIxb5fmQon35TxNe5bccLL3nEc.png" src-width="480" class="markdown-img m-auto" src-height="83" align="center"/>

确保应用是审核通过状态

<img src="/assets/Uk7tbeTGboKElhxxDD9cxdxenGg.png" src-width="339" class="markdown-img m-auto" src-height="64" align="center"/>

建立群，并接入机器人

<img src="/assets/BDjkbEwESoRMpVxW5lacSSFFnbb.png" src-width="329" class="markdown-img m-auto" src-height="445" align="center"/>

 

<img src="/assets/A60LbBZ3ZoivhGxX9gacdiFUnmg.png" src-width="328" class="markdown-img m-auto" src-height="177" align="center"/>

### 将群设成飞书文档库的管理员

打开「知识空间设置」

<img src="/assets/QjzVbOYV1oHuEJx0ePacehR2nHb.png" src-width="178" class="markdown-img m-auto" src-height="259" align="center"/>

「成员设置」-&gt;「添加管理员」中添加，把这个 群加成 **管理员**。

<img src="/assets/VXMNbc9g7ogqEHxeFnWc8uejnng.png" src-width="1041" class="markdown-img m-auto" src-height="520" align="center"/>

并记住知识库的地址，在浏览器地址栏中。下方截图中的框选部分

<img src="/assets/AxwvbdUqyoP2WjxPy1Rc68HynBd.png" src-width="843" class="markdown-img m-auto" src-height="47" align="center"/>

## 导出飞书文档

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

### 翻译文档为英文

使用edge库去翻译，有可能翻译的并不好

```ts
npm run trans_en
```

生成的文档在

<img src="/assets/KabZbcHZfo8uMlxxelccMyOjn5f.png" src-width="358" class="markdown-img m-auto" src-height="133" align="center"/>

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

<img src="/assets/NPi7biYogolFhPxYWi7c9ms0ntb.png" src-width="406" class="markdown-img m-auto" src-height="100" align="center"/>

访问http://localhost:5173/ 即可

# 飞书文档编写注意事项

## 文章封面图片

文档的第一行的图片，会转成文档属性的cover字段

图片参考微信公众号的长宽比例： 2.35:1

高度是160宽度就是376

高度是320宽度就是752

高度是800宽度就是1880

## 文章支持的属性字段

文档的第二行，可以配文档属性。支持yaml

```ts
layout: home  #指明用home layout（非必须。vitepress属性，如果是首页就用home.非首页不用填）
title: 学技术   #标题
hide: false   #是否不导出当前页，非必须
hide_child: true #是否导出子节点，非必须 
keywords:  #用于搜索和网站seo，非必须 
  - feishu
  - vitepress
```

## 文章的类别

文章的分类会自动匹配到飞书文档的根结点名（不区分大小写）

例如本文章根目录结点名是product.

在导出文章时，会自动分配

```ts
if (category) meta["categories"] = meta.categories || [category.trim().toLowerCase()];
```

### 参考项目

导出飞书文档参考：[链接](https://github.com/longbridgeapp/feishu-pages)

博客样式参考：[链接](https://github.com/foru17/luoleiorg/tree/main)

本人博客演示效果

[github_page地址](https://ftyszyx.github.io/feishu-vitepress/)

[阿里云地址](https://blog.bytefuse.cn/)

