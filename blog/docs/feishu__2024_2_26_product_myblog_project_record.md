---
title: 飞书博客-项目日志
keywords:
  - feishu
  - vitepress
  - log
cover: /assets/LFBVb2RCPoun7NxaQhecqO4nnyh.png
create_time: 1711417448
categories:
  - product
---


# 问题处理

## 2024/3/25

### Gihub action中增加的环境变量无法识别

解决需要在jobs上加上环境变量名

<img src="/assets/L7UWbibvXoQSwxxqJg3cl9h5ncj.png" src-width="308" class="markdown-img m-auto" src-height="104" align="center"/>

## 2024/3/26

### github action中提交代码step提示无权限

```sql
**Error: **Error: Pushing to <u>https://github.com/ftyszyx/myblog</u>
[56](https://github.com/ftyszyx/myblog/actions/runs/8423006609/job/23063634395#step:8:59)remote: Permission to ftyszyx/myblog.git denied to github-actions[bot].
```

怀疑是权限问题，

查看permision 文档：https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs

加了permision：

<img src="/assets/OeyXb9q53oWH4axfsLtcdlAgnSf.png" src-width="449" class="markdown-img m-auto" src-height="212" align="center"/>

又有新的报错

```sql
error: failed to push some refs to '<u>https://github.com/ftyszyx/myblog</u>'
```

知道原因了，我搞了两次提交，

<img src="/assets/WBBWbyyrCoepLuxUohucjTq6nBd.png" src-width="499" class="markdown-img m-auto" src-height="282" align="center"/>

导致异常，合并成一次提交，就好了

<img src="/assets/J0E8bmHUlo0idPxWAR0cdMdMnZc.png" src-width="410" class="markdown-img m-auto" src-height="148" align="center"/>

###  <u>pages build and deployment</u> 怎么去掉

Github 上配了pages。会自动加了一个workflow

<img src="/assets/XERKbDeATog68jxZ2SWcmypjnjd.png" src-width="866" class="markdown-img m-auto" src-height="210" align="center"/>

我想定制这一流程，选这个

<img src="/assets/JhhWbKuiqo5SbqxLdspc1Nphnhe.png" src-width="532" class="markdown-img m-auto" src-height="274" align="center"/>

然后把这个workflow右边的run log全删除

<img src="/assets/KED6b8FGIowVszxjxptcw8fGn5d.png" src-width="971" class="markdown-img m-auto" src-height="266" align="center"/>

这个workflow就消失了，世界清静了！

<img src="/assets/ZR5TbQAisoRNJwxx8L8cx0GGn5d.png" src-width="372" class="markdown-img m-auto" src-height="172" align="center"/>

### preview时发现cover图片找不到

看了build的结果，cover中的图片的确是没有

因为cover中的图片写在了vitepress page meta中

有可能vitepress认为这里的资源是无效的，应该只用纯文本

参考：https://vitepress.dev/guide/frontmatter

解决方案是把图片放到（不太好）

https://vitejs.dev/guide/assets.html#the-public-directory

在build end中加hook,自己复制过去

```sql
buildEnd: async (siteconfig) => {
    const coverurls: string[] = await createContentLoader("/*.md", {
      excerpt: true,
      includeSrc: false,
      render: false,
      transform: (rawData) => {
        return rawData
          .filter(({ frontmatter }) => frontmatter.cover)
          .map(({ frontmatter }) => {
            return frontmatter.cover;
          });
      },
    }).load();
    coverurls.forEach((item) => {
      const picpath = path.join(siteconfig.root, item);
      const picfile_name = path.basename(picpath);
      const destpath = path.join(
        siteconfig.outDir,
        siteconfig.assetsDir,
        picfile_name,
      );
      // console.log("write", picpath, destpath);
      copyFileSync(picpath, destpath);
    });
  },
```

## 2024/3/27

### github部署后，因为base路径不对，导致 网页显示异常

因为github page网址是https://ftyszyx.github.io/myblog

所以 baseurl要修改一下

<img src="/assets/IMLfb0iCooB8AfxcROWcxNIFnmh.png" src-width="613" class="markdown-img m-auto" src-height="331" align="center"/>

<img src="/assets/Muc0bjrToooEIfxscKScmKWunVb.png" src-width="781" class="markdown-img m-auto" src-height="256" align="center"/>

还有问题，这个basepath修改了后，vitepress不会处理cover的链接

Vitepress有接口，可以在网页中获取base

https://vitepress.dev/guide/asset-handling#base-url

<img src="/assets/UDP3bkjoGoHs09xpEHacLV6EnBg.png" src-width="757" class="markdown-img m-auto" src-height="547" align="center"/>

## 2024/3/28

### 页面样式太丑，需要调整

尤其是siderbar太宽，内容太窄

### 增加搜索

vitepress内部支持

### 增加评论

用artalk实现，需要自己搭服务器

## 2024/3/29

### 多语言支持

毕竟是展示自己用的，还是要加英语，

英文可以通过机器生成，框架参考官方。

先找个参考的软件，我经常使用一款插件：沉浸式翻译

https://immersivetranslate.com/

https://github.com/immersive-translate/immersive-translate/

他是用google翻译的，效果还行

找一下相关的gogole 翻译npm 库

用这个库https://github.com/vitalets/google-translate-api?tab=readme-ov-file#readme

但免费的google 翻译有限制

如果提示有次数限制了，需要用代理，这里有免费的代理

https://free-proxy-list.net/

太麻烦了，换微软件 的

https://github.com/plainheart/bing-translate-api

### 增加点击统计

目前找到的只能统计点击 数，但我还想看到整 个网站的所有点击，并能排序

这就需要一个汇总功能 

看有一个开源项目https://github.com/ftyszyx/umami

看能不能在上面改一下实现 

umami挺强大，功能很完善。值得学习，使用next.js，前后端一套代码

而且数据库是在yarn build时就初始化了，很优秀

参考其代码增加api

```ts
export interface MyblogWebInfo {
  url_path: string;
  num: number;
}
export interface MyBlogResp {
  list: MyblogWebInfo[];
}
export default async (
  req: NextApiRequestQueryBody<MyblogReq>,
  res: NextApiResponse<MyBlogResp>,
) => {
  const views = await getBlogStats(req.query);
  // console.log('get views', views);
  return ok(res, { views });
};
```

同时要处理跨域问题

修改next.config.js的headers返回

```ts
{
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
```

这里还有一个点是要去注册一个自己的container账号

这个cotainer 是上传到ghcr.io这是github cotainer

https://www.chenshaowen.com/blog/github-container-registry.html

官方文档

https://docs.github.com/en/actions/publishing-packages/publishing-docker-images

Github cotainer reg

https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry

<img src="/assets/PbAabyFktoGBKex4ZRicN4dxnkf.png" src-width="740" class="markdown-img m-auto" src-height="126" align="center"/>

所以先要搞acess tokens

https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

### 增加浏览统计

参考这个

https://clarity.microsoft.com/

使用了一下，也正常能用了，就是在chrome上发现很多报错

vitepress third-party cookie will be blocked. clarity

<img src="/assets/Ul4jb4wYcoQ7MlxD4EJc1fc5nCg.png" src-width="1588" class="markdown-img m-auto" src-height="49" align="center"/>

在network上看到

<img src="/assets/ILMqbdRSsog8gYxr76ocllwPnwe.png" src-width="878" class="markdown-img m-auto" src-height="348" align="center"/>

感觉应该是clarity导致 的

先关了，看到报错有不心烦

## 
## 2024/4/7

### 怎么cloude page

https://www.misterma.com/archives/901/

https://pages.cloudflare.com/

搞定了，感觉cloudeflare做的真是友好。

不过访问速度还是慢，还是要考虑一下国内部署

### 阿里云域名申请

买了一个域名bytefuse.cn 字节融合的意思，

感觉挺符合这个项目的，因为这是把飞书和vitepress打通的一个项目。

同时 还有另外一个含义，byte就是表示计算机，打通计算机和人之前的桥梁。多酷啊

域名买 完后就要去备案了 。

遇到个填空，要写网站名

<img src="/assets/SOU6bVj2UocvlOxir0acCoNMnxb.png" src-width="696" class="markdown-img m-auto" src-height="160" align="center"/>

但里面有名称指引：

好奇怪哦，个人网站为什么不能用“博客”这个关键字。有点奇葩

<img src="/assets/R7ZnbDlx3oVBnVxAGq6cW20Qnog.png" src-width="1211" class="markdown-img m-auto" src-height="706" align="center"/>

算了，服了，随便取一个吧，星城起点

点提交，提示

<img src="/assets/K0oSb7GIbohHmax37Opch9BDnxe.png" src-width="607" class="markdown-img m-auto" src-height="66" align="center"/>

好吧，效率真是低下。买 了域名，已经实名过了，还要等2到3天。那只能2到3天后再试了

已经提交了，

<img src="/assets/IDkibfqMwoLQyLx4RSvcugHznB8.png" src-width="354" class="markdown-img m-auto" src-height="113" align="center"/>

过一个月后再看

# 2024/4/19

## markdown中的tailwind样式不生效

已处理，也不清楚啥问题，照着别人的项目改了一下就Ok了

# 2024/4/20

## 图片加载被截：

参考公众号的图片：

需要两种大小：一是1:1 一是2.35:1

所以我们先2.35:1吧，大小 

高度是160宽度就是376

高度是320宽度就是752

高度是800宽度就是1880

## 首页的图片经常不加载

## 翻译后，编译文档报错

SyntaxError: Element is missing end tag.

看不出是哪个文档编译错误

<img src="/assets/Ymnzbsol1oovoKxQf9YczYC5nVe.png" src-width="987" class="markdown-img m-auto" src-height="329" align="center"/>

只能一个个删除,找到对应问题文档

发现里面有&lt;这种符号。删除就Ok了

# 2024/4/21

## 备案通过

<img src="/assets/D3nUbSF17oLSYax9hMYcB96nnIh.png" src-width="793" class="markdown-img m-auto" src-height="175" align="center"/>

还没完，要去下app

<img src="/assets/DftvbuYz2oF0CCxo61Wc6A1lnzb.png" src-width="810" class="markdown-img m-auto" src-height="457" align="center"/>

必须要手机上注册，因为需要人脸识别

## markdown中图片希望居中

给imag 加一个tailwind属性 m-auto

# 2024/4/25

## 服务器国内自部署

我晕：

vitepress编译时，把服务器搞崩了

我买 的这个99块的服务器，真是够弱的

能不能让github帮我编译好，然后我去下载呢？

## 博客分类不对

已处理

## 需要自己服务器上的博客也能自动触发更新

## https证书

搞定了，使用let's encrypt 同时配合nginx_ui自动化更新

## Github action触发资源提交不会触发另一个github action

原来我用的是on:push

但是我的提交是用github action提交的，

有可能没有触发push

所以干脆，直接用定时吧，每天触发一次

# 2024/5/14

1、zip文件 没有打包

已处理：在buildend时将zip文件全复制过去

2、顶部样式有点异常

已处理

# 2024/5/19

需要给博客搞seo，不然没人访问

 首先要生成sitemap站点地图

vitepress自带支持

https://vitepress.dev/guide/sitemap-generation

生成后sitemap.xml就可以直接访问了

https://ftyszyx.github.io/feishu-vitepress/sitemap.xml

参考：https://github.com/mqyqingfeng/Blog/issues/272

## 去百度收录

登陆<u>百度搜索资源平台</u>，进入<u>用户中心</u>：

点击「添加站点」，可能需要你完善下账户信息，然后会进入站点信息填写页面，分为三步：

**第一步：输入站点**

**第三步：验证网站**

之所以需要验证网站，是为了证明你是该域名的拥有者，验证成功后，可以快捷批量添加子站点，查看所有子站数据，无需再一一验证子站点。

使用html验证

<img src="/assets/GQNUbNp7gox4drxjBRWcRzCKn9f.png" src-width="876" class="markdown-img m-auto" src-height="308" align="center"/>

然后点击「完成验证」，就会出现：

<img src="/assets/Je7GbyTRCo4kOax5YuncZNx9ndE.png" src-width="1348" class="markdown-img" src-height="668"/>

点击「我知道了」，就会跳转到 HTTPS 认证这里：

<img src="/assets/VBFtbwBguoPxOqx5szscSXwpnts.png" src-width="2446" class="markdown-img m-auto" src-height="1464" align="center"/>

等待一天后，会显示认证成功：

但是有个问题：

普通收录的sitemap方式提交没有次数，不知道是不是要交钱

<img src="/assets/PThKbaLpMocfWpxlAKNcxHMenjh.png" src-width="1256" class="markdown-img m-auto" src-height="649" align="center"/>

只能api提交

写了代码，但是提交时提示

```ts
{"error":400,"message":"over quota"}
```

网上说是因为没有提交次数了

在百度后台也查看不昨天提交的审核状态

## **谷歌收录**

https://search.google.com/

添加域名： 

<img src="/assets/QXJbbXp5TomIbkxdLH0cvDm4nwd.png" src-width="376" class="markdown-img m-auto" src-height="490" align="center"/>

添加dns解析

去阿里去添加

最后去添加索引

<img src="/assets/ESIXbuPgJoitoExZddWcsxYfnPh.png" src-width="1777" class="markdown-img m-auto" src-height="629" align="center"/>

一直提示无法抓取

<img src="/assets/VO41bYRGqo9kfsxK3R1chJiqnFf.png" src-width="884" class="markdown-img m-auto" src-height="237" align="center"/>

## 访问单独某一页时会404

nginx配置错误：

之前是

```csharp
root /usr/share/nginx/html/appname/;

location / {
       index index.html index.htm;
}
```

需要改成

```csharp
#open gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
 
    #
    index index.html;

    location / {
        # content location
        root /app;

        # exact matches -> reverse clean urls -> folders -> not found
        try_files $uri $uri.html $uri/ =404;
 
       #因为资源文件的名字都是hash,如果有修改名字会变，所以开启永久缓存
        # adjust caching headers
        # files in the assets folder have hashes filenames
        location ~* ^/assets/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
```

原理是，当配置`try_files`找不到某个页面资源，这时，nginx会尝试加载index.html，加载index.html之后，react-router就能起作用并匹配我们输入的`/home`路由，从而显示正确的home页面。

# 2024/7/4

## blog.bytefuse.cn无法访问

好几天没上去看了，发现自己部署在阿里云上的博客无法访问了。

登陆上nginx_ui看了下，访问正常

登陆到服务器上看资源目录：发现/var/www/qinglong/web下的资源目录是空的。

<img src="/assets/Q93PbsNSPovSXWxc7ubcTk5an8x.png" src-width="1174" class="markdown-img m-auto" src-height="133" align="center"/>

上青云的自动任务看执行日志，发现有报错：

<img src="/assets/D5pTbc4ugoJbAmxs8b5cW5yPnMc.png" src-width="914" class="markdown-img m-auto" src-height="353" align="center"/>

好像是从github上下载的zip文件包是坏的。

进入github账号看了下项目下的发布资源，打包是正常的

<img src="/assets/J1MybguExoC0UqxSndHclJgUnng.png" src-width="1248" class="markdown-img m-auto" src-height="450" align="center"/>

打的包是12M。但是青云脚本下的是16K。我怀疑是我用的github镜像地址出了问题。当时为了加速github资源下载，使用了https://hub.gitmirror.com/。看来这个镜像现在不能用了。

上ghproxy上看了一下，原来被墙了。

<img src="/assets/CGypbXG9Wo6O65xFC0WcGt5Snpf.png" src-width="842" class="markdown-img m-auto" src-height="150" align="center"/>

需要使用新的地址：https://mirror.ghproxy.com。

现在Ok了。

<img src="/assets/Z0wKbjP3ZoNkcZxbJfKcptN9nhB.png" src-width="1328" class="markdown-img m-auto" src-height="460" align="center"/>

不过还有一个问题就是，这个青云同步脚本，在zip文件没下载好，就把web目录下内容清空了，的确不友好。

要加一下判断，如果zip下下来的文件是坏的，就不清空web目录。

# 待处理问题 

1、如何同步到公众号，知乎，csdn

目前已知有

[蚁小二](https://www.yixiaoer.cn/)和[融媒宝](https://www.rmeibao.com/)

通过服务器推送文章到公众号：

https://blog.csdn.net/david_Xuan/article/details/136036756

