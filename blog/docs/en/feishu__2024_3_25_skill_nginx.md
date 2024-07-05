---
create_time: 1714032130
title: Nginx
categories:
  - skill
---

# nginx-ui use

I'm going to build my own server again.,Building a server is inseparable from a reverse proxy.,At present, the general reverse proxy is still nginx.There is no one.。

But in the years I've been with NGINX, I've been deeply disgusted by the configuration of Nignx, and this time I want to make a gui.

The hard work paid off, I found an open source project, [nginx-ui](https://github.com/0xJacky/nginx-ui)

## Installation

Select docker-compose

Create three folders first

```ts
/root/work/nginx
/root/work/nginx_ui
/root/work/my_nginx
```

Create a new file docker-compose.yml in the /root/work/my_nginxi 

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
```run

```yaml
docker-compose up -d
```

Then it's accessible

## Configuration

First, configure the nginx log path 

<img src="/assets/HYSBb3E9doRNegxoPRFclIGbnif.png" src-width="565" class="m-auto" src-height="233" align="center"/>

```yaml
/var/log/nginx/access.local.log
/var/log/nginx/error.local.log
```

Reconfigure the site:

<img src="/assets/MopJbQS5aoM3vpxkRKicr46wnQh.png" src-width="181" class="m-auto" src-height="268" align="center"/>
## Automatic issuance of certificates

- One-click application and automatic renewal of Let's encrypt certificates

#### Let's encrypt

Official website: https://letsencrypt.org/

How to use (manual configuration): 

https://diamondfsd.com/lets-encrytp-hand-https/

https://andyyou.github.io/2019/04/13/how-to-use-certbot/

Official Documentation: https://eff-certbot.readthedocs.io/

How it works in the nginx ui

##### Configure the ACME user

<img src="/assets/M6yCbO6j7oqaUmx2A8UceN9Nn6L.png" src-width="1309" class="m-auto" src-height="348" align="center"/>

##### Enable TLS for your site

<img src="/assets/X6mkbmUQoow2UnxQqmZccLHMnXd.png" src-width="867" class="m-auto" src-height="303" align="center"/>

The system will add a server2 to you, and then start the let's encrypt encryption below<img src="/assets/KgMLbDgkYofMw1xNB3McdT4gncb.png" src-width="876" class="m-auto" src-height="570" align="center"/>

Select the ACME user and click Next

<img src="/assets/Srujb0ocwokp38xn1aqcbduhn2R.png" src-width="621" class="m-auto" src-height="542" align="center"/>
If you succeed, it's OK

Notes:

nginx_ui do not set up a reverse proxy. Otherwise, it is unsuccessful

# Nginx configuration learning

Official Documentation:

https://docs.nginx.com/nginx/admin-guide/web-server/we

Static site configuration

https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/

## Question 1: How to configure a single-page application?

[Reference Article] (https://www.barwe.cc/2022/06/20/nginxtryfilesinspa)

That's how my blog was matched before

```csharp
location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
}
```

But in the access

Normal at homepage: [link](https://blog.bytefuse.cn/)

Click on the subpage in the middle of the home page to open the normal [link](https://blog.bytefuse.cn/feishu__2024_4_28_product_bytefuse_intro)

However, if you go directly to [link](https://blog.bytefuse.cn/feishu__2024_4_28_product_bytefuse_intro), it will not be normal, and 404 will be displayed

This is because the above configuration will only match the $root/feishu__2024_4_28_product_bytefuse_intro files in the root directory 

So the error is reported

The goal is to match to $root/feishu__2024_4_28_product_bytefuse_intro.html```csharp
root /usr/share/nginx/html;
index index.html
location / {
    try_files $uri $uri.html $uri/ =404;
}
```

In this way, the url: /feishu__2024_4_28_product_bytefuse_intro

will match $oot/feishu__2024_4_28_product_bytefuse_intro

Match $oot/feishu__2024_4_28_product_bytefuse_intro.html again

Match $oot/feishu__2024_4_28_product_bytefuse_intro/index.html again

If you can't match it, match 404 again