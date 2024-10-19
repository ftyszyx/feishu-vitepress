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

# 修改记录

1. 文本内的格式化内容，转成markdown时要去掉空格
   比如：
   ```
   **ab ** 是无效的
   **ab** 要转成这样才行
   ```

## 2024/10/11

### 删除artalk,使用giscus做评论系统

artalk后台不好用，今天通过网友介绍，发现giscus这个评论系统，它依赖于github的discussions功能，自己不用部署服务器，非常简洁

步骤：
先按照giscus配置好你的github项目
https://giscus.app/zh-CN

配置好后，拿到你的配置

```
<script src="https://giscus.app/client.js"
        data-repo="ftyszyx/feishu-vitepress"
        data-repo-id=""
        data-category="[在此输入分类名]"
        data-category-id="[在此输入分类 ID]"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="light_tritanopia"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
</script>

```

修改blog\docs\.vitepress\theme\site_config.ts下的giscus配置

```
 giscus: {
    repo: "ftyszyx/feishu-vitepress",
    repoId: "",
    category: "General",
    categoryId: "",
    data_mapping: "pathname",
  },
```

完成

效果如下：

![image](https://github.com/user-attachments/assets/b272b772-35c4-42d5-8adf-ee6a7abf2f60)

完美

## 2024/10/19

1. 标题可以直接使用文章标题

  这样就可以不用写yaml了，飞书文档如下：
  
  ![image](https://github.com/user-attachments/assets/f0ff8127-e06f-4b5d-9fc0-ce078508f9eb)
  
  博客效果：
  
  ![image](https://github.com/user-attachments/assets/1e94f546-2d8a-4072-8fc3-1f063b3547b4)



4. 封面图片优先使用文章的封面
   
  飞书可以编辑封面
  
   ![image](https://github.com/user-attachments/assets/af12ca06-f453-4c48-ba0d-ac743d73e4f3)

   效果
   
   ![image](https://github.com/user-attachments/assets/fa2022cc-0704-41a3-9839-160494dabb2b)

   
6. 显示文章修改时间，并以这个时间排序

   文章页面：
   
   ![image](https://github.com/user-attachments/assets/bb80fc3f-8907-4a7d-a863-29ce0603c767)

   首页排序：

   ![image](https://github.com/user-attachments/assets/c11264b5-eca3-436f-b8be-97e9aa8989d4)


