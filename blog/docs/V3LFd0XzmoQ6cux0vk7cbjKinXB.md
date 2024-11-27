---
cover: /assets/ZsmZbpMm0oaUCOxSpzGcxQjvn4b.gif
create_time: 1714032130
edit_time: 1729475407
title: Nginx
categories:
  - skill
---


# 1. nginx-ui使用

本人又要自己搭服务器了，搭服务器离不开反向代理，目前通用的反向代理还是nginx.没有之一。

但在我接触nginx的这几年，我深深的被nignx的配置给恶心到了，这次我想搞个带gui的。

功夫不负有心人，我找到了一个开源项目，[nginx-ui](https://github.com/0xJacky/nginx-ui)

## 1.1 安装

 选择docker-compose

先建三个文件夹

```ts
/root/work/nginx
/root/work/nginx_ui
/root/work/my_nginx
```

在/root/work/my_nginxi新建文件  docker-compose.yml 

```yaml
version: '3.3'
services:
    nginx-ui:
        stdin_open: true
        tty: true
        container_name: nginx-ui
        restart: always
        environment:
            - TZ=Asia/Shanghai
        volumes:
            - '/root/work/nginx:/etc/nginx'
            - '/root/work/nginx_ui:/etc/nginx-ui'
            - '/var/www:/var/www'
        ports:
            - 9080:80
            - 9443:443
        image: 'uozi/nginx-ui:latest'
```

运行

```yaml
docker-compose up -d
```

然后就可以访问了

## 1.2 配置

先要配置一下nginx日志路径 

<img src="/assets/HYSBb3E9doRNegxoPRFclIGbnif.png" src-width="565" class="markdown-img m-auto" src-height="233" align="center"/>

```yaml
/var/log/nginx/access.local.log
/var/log/nginx/error.local.log
```

再配置站点：

<img src="/assets/MopJbQS5aoM3vpxkRKicr46wnQh.png" src-width="181" class="markdown-img m-auto" src-height="268" align="center"/>

## 1.3 自动签发证书

- 一键申请和自动续签 Let's encrypt 证书

#### 1.3.1.1 Let's encrypt

官网：https://letsencrypt.org/

如何使用(手工配置）： 

https://diamondfsd.com/lets-encrytp-hand-https/

https://andyyou.github.io/2019/04/13/how-to-use-certbot/

官方文档：https://eff-certbot.readthedocs.io/

 在nginx ui中如何操作

##### 1.3.1.1.1 配置acme用户

<img src="/assets/M6yCbO6j7oqaUmx2A8UceN9Nn6L.png" src-width="1309" class="markdown-img m-auto" src-height="348" align="center"/>

##### 1.3.1.1.2 为站点启用tls

<img src="/assets/X6mkbmUQoow2UnxQqmZccLHMnXd.png" src-width="867" class="markdown-img m-auto" src-height="303" align="center"/>

系统为会你增加一个server2，此时开始下方的let's encrypt加密

<img src="/assets/KgMLbDgkYofMw1xNB3McdT4gncb.png" src-width="876" class="markdown-img m-auto" src-height="570" align="center"/>

选择acme用户，点下一步

<img src="/assets/Srujb0ocwokp38xn1aqcbduhn2R.png" src-width="621" class="markdown-img m-auto" src-height="542" align="center"/>

成功后就ok

注意事项：

nginx_ui不要设置反向代理。否则为不成功

# 2. Nginx配置学习

官方文档：

https://docs.nginx.com/nginx/admin-guide/web-server/we

静态网站配置

https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/

## 2.1 问题1：单页面应用要怎么配

[参考文章](https://www.barwe.cc/2022/06/20/nginxtryfilesinspa)

之前我的博客是这么配的

```csharp
location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
}
```

但是在访问

首页时正常：[链接](https://blog.bytefuse.cn/)

在首页中点开子页面正常 [链接](https://blog.bytefuse.cn/feishu__2024_4_28_product_bytefuse_intro)

但如果直接访问[链接](https://blog.bytefuse.cn/feishu__2024_4_28_product_bytefuse_intro) 就不正常，显示404

这是因为上面的配置只会去匹配 根目录下的 $root/feishu__2024_4_28_product_bytefuse_intro 文件 

所以 报错

目标是匹配到$root/feishu__2024_4_28_product_bytefuse_intro.html

```csharp
root /usr/share/nginx/html;
index index.html
location / {
    try_files $uri $uri.html $uri/ =404;
}
```

这样，url:/feishu__2024_4_28_product_bytefuse_intro

会匹配$oot/feishu__2024_4_28_product_bytefuse_intro

再匹配$oot/feishu__2024_4_28_product_bytefuse_intro.html

再匹配$oot/feishu__2024_4_28_product_bytefuse_intro/index.html

如果都匹配不到，再匹配404

