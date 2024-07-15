# Intro

# 为什么做这个

目前的静态博客如vitepress，主要是用markdown来写内容。

markdown虽然可读性比较好，但有以下几个疼点：

1、文章中贴图片有点麻烦，需要先保存图片到asset目录下，然后在markdown中写图片地址。

2、语法虽然简单，但有时还是记不住（年经大了，记忆力下降）

3、不能方便的插入图表，流程图之类的。

4、换行很讨厌，如果不强制换行，所有的东西全挤在一行里。

平时工作主要用飞书写文档，觉得很方便，所以就想能不能在飞书写文档，然后自动将飞书的文档导出成博客的文章。

# 主要功能介绍

1. 将飞书文档导出成markdown文件（集成到了github action，自动）
2. 生成导出的文章的静态博客系统(使用vitepress实现，集成到了github action，自动)
3. 自动翻译中文文档为英文(目前不是自动，因为机器翻译的文章经常会把一些空格或者符号搞乱，导致编译不过，需要手动修改，所以暂时先手动)
4. 集成了umami访问统计（修改了一部分源码）
5. 集成了artalk评论系统 （功能可用，但后台管理页面丑陋，后面找到合适的系统，再换掉）

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

## 说明

以上流程都已集成到github action,可以实现自动化，具体参考 [github action自动化流程](https://ftyszyx.github.io/feishu-vitepress/feishu__2024_3_16_product_myblog_github%20action%20intro)

同时也实现了自动同步到国内阿里云流程，具体参考[博客自动同步到阿里云](https://ftyszyx.github.io/feishu-vitepress/feishu__2024_4_6_product_myblog_aliyun_auto)

### 参考项目

导出飞书文档参考：[链接](https://github.com/longbridgeapp/feishu-pages)

博客样式参考：[链接](https://github.com/foru17/luoleiorg/tree/main)

本人博客演示效果

[github_page地址](https://ftyszyx.github.io/feishu-vitepress/)

[阿里云地址](https://blog.bytefuse.cn/)

# 详细说明

[地址](https://blog.bytefuse.cn/feishu__2024_3_7_product_myblog_intro)
