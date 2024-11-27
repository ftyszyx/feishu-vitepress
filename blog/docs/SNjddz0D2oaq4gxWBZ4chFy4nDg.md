---
title: 飞书博客-第三方工具的配置
keywords:
  - feishu
  - vitepress
  - 个人博客
create_time: 1714040918
edit_time: 1714207791
categories:
  - product
---


# 1. 点击统计umami

[umami](https://github.com/ftyszyx/umami)主要功能是统计网站的访问数据 ，这个系统ui设计美观，功能精简，非常不错。

但我的需求是要能让系统提供一个api给网站获取当前网页的访问数。

umami虽然有api,但是有两个问题：

1. api访问需要权限验证（需要在在博客里面存上自己token,有泄密风险）
2. 官方api返回的数据是用来画图的，不好用

所以我对这个项目Fork了并做了修改

修改后的github网址：https://github.com/ftyszyx/umami.git

主要改了两点：

## 1.1 增加获取网站点击数据api

/api/websites/${umami_website_id}/blogpage

获取网站每个网页的统计数据，这个api不需要权限

格式如下：

```yaml
{
    "views": [
        {
            "url_path": "/",
            "num": 11
        },
        {
            "url_path": "/feishu__2023_1_21_skill_vim",
            "num": 4
        }
}
```

## 1.2 同时要处理跨域问题

因为我的博客在github上，在访问其它网站时会有跨域问题，所以我干脆把跨域放开，当时你也可以设置具体的地址。

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

## 1.3 重新编译container

因为修改了代码，需要自己编译container。参考原项目的github action配置，很容易，具体参考github actions里的修改 

## 1.4 注意事项

第一次登陆的账号： **admin**密码是   **umami**

进去后一定要修改，不然成公厕了。

具体使用文档，参考官方：[umami文档](https://umami.is/docs)

# 2. 第三方评论系统artalk

使用[artalk](https://artalk.js.org/)是因为参考别的博客系统也用这个，

但是搭完后，这个后台页面真是丑啊，请看：

<img src="/assets/SOAmbW19Bouo78xyfENc6CKjnvc.png" src-width="1202" class="markdown-img m-auto" src-height="532" align="center"/>

第一次进后台，我都不知道怎么用有点迷糊,具体使用请看[官方文档](https://artalk.js.org/guide/intro.html)

## 2.1 注意事项

安装完系统后，需要在配置文件 中修改账号密码

我是docker启动的

在工程目录下/data/artalk.yml中

添加账号密码

<img src="/assets/TKTObVrHMo6FFJx9Q9kc52NRnSf.png" src-width="471" class="markdown-img m-auto" src-height="134" align="center"/>

同时需要重启docker

