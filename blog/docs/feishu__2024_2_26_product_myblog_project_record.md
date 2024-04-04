---
create_time: 1711417448
title: project_record
categories:
  - product
---


# project_record

# 2024/3/25

## Gihub action中增加的环境变量无法识别

解决需要在jobs上加上环境变量名

<img src="/assets/L7UWbibvXoQSwxxqJg3cl9h5ncj.png" src-width="308" src-height="104" align="center"/>

# 2024/3/26

## github action中提交代码step提示无权限

```sql
**Error: **Error: Pushing to <u>https://github.com/ftyszyx/myblog</u>
[56](https://github.com/ftyszyx/myblog/actions/runs/8423006609/job/23063634395#step:8:59)remote: Permission to ftyszyx/myblog.git denied to github-actions[bot].
```

怀疑是权限问题，

查看permision 文档：https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs

加了permision：

<img src="/assets/OeyXb9q53oWH4axfsLtcdlAgnSf.png" src-width="449" src-height="212" align="center"/>

又有新的报错

```sql
error: failed to push some refs to '<u>https://github.com/ftyszyx/myblog</u>'
```

知道原因了，我搞了两次提交，

<img src="/assets/WBBWbyyrCoepLuxUohucjTq6nBd.png" src-width="499" src-height="282" align="center"/>

导致异常，合并成一次提交，就好了

<img src="/assets/J0E8bmHUlo0idPxWAR0cdMdMnZc.png" src-width="410" src-height="148" align="center"/>

##  <u>pages build and deployment</u> 怎么去掉

Github 上配了pages。会自动加了一个workflow

<img src="/assets/XERKbDeATog68jxZ2SWcmypjnjd.png" src-width="866" src-height="210" align="center"/>

我想定制这一流程，选这个

<img src="/assets/JhhWbKuiqo5SbqxLdspc1Nphnhe.png" src-width="532" src-height="274" align="center"/>

然后把这个workflow右边的run log全删除

<img src="/assets/KED6b8FGIowVszxjxptcw8fGn5d.png" src-width="971" src-height="266" align="center"/>

这个workflow就消失了，世界清静了！

<img src="/assets/ZR5TbQAisoRNJwxx8L8cx0GGn5d.png" src-width="372" src-height="172" align="center"/>

## preview时发现cover图片找不到

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

# 2024/3/27

## github部署后，因为base路径不对，导致 网页显示异常

因为github page网址是https://ftyszyx.github.io/myblog

所以 baseurl要修改一下

<img src="/assets/IMLfb0iCooB8AfxcROWcxNIFnmh.png" src-width="613" src-height="331" align="center"/>

<img src="/assets/Muc0bjrToooEIfxscKScmKWunVb.png" src-width="781" src-height="256" align="center"/>

还有问题，这个basepath修改了后，vitepress不会处理cover的链接

Vitepress有接口，可以在网页中获取base

https://vitepress.dev/guide/asset-handling#base-url

<img src="/assets/UDP3bkjoGoHs09xpEHacLV6EnBg.png" src-width="757" src-height="547" align="center"/>

# 2024/3/28

## 页面样式太丑，需要调整

尤其是siderbar太宽，内容太窄

## 增加搜索

vitepress内部支持

## 增加评论

用artalk实现，需要自己搭服务器

# 2024/3/29

## 多语言支持

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

## 增加点击统计

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

## 增加浏览统计

参考这个

https://clarity.microsoft.com/

## 怎么同步到公众号

## 怎么cloude page

## 
## 如果图片变成图床中的地址

会不会有问题

图片地址变绝对链接有优势，可以

