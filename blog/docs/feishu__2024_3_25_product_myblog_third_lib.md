---
title: 第三方工具的配置
keywords:
  - feishu
  - vitepress
  - 个人博客
create_time: 1714040918
categories:
  - product
---


# 点击统计umami

[umami](https://github.com/ftyszyx/umami)主要功能是统计网站的访问数据 

但我的需求是要能让系统提供一个api给网站获取当前网页的访问数。

umami虽然有api,但是有两个问题：

1. api访问需要权限验证（需要在在博客里面存上自己token,有泄密风险）
2. 官方api返回的数据是用来画图的，不好用

所以我对这个项目Fork了并做了修改

github网址：

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

