---
title: nginx服务搭建
tags:
  - develop
create_time: 1714032130
categories:
  - skill
---


# nginx-ui使用

本人又要自己搭服务器了，搭服务器离不开反向代理，目前通用的反向代理还是nginx.没有之一。

但在我接触nginx的这几年，我深深的被nignx的配置给恶心到了，这次我想搞个带gui的。

功夫不负有心人，我找到了一个开源项目，[nginx-ui](https://github.com/0xJacky/nginx-ui)

## 安装

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

## 配置

先要配置一下nginx日志路径 

<img src="/assets/HYSBb3E9doRNegxoPRFclIGbnif.png" src-width="565" class="m-auto" src-height="233" align="center"/>

```yaml
/var/log/nginx/access.local.log
/var/log/nginx/error.local.log
```

再配置站点：

<img src="/assets/MopJbQS5aoM3vpxkRKicr46wnQh.png" src-width="181" class="m-auto" src-height="268" align="center"/>

## 自动签发证书

- 一键申请和自动续签 Let's encrypt 证书

#### Let's encrypt

官网：https://letsencrypt.org/

如何使用： 

https://diamondfsd.com/lets-encrytp-hand-https/

https://andyyou.github.io/2019/04/13/how-to-use-certbot/

官方文档：https://eff-certbot.readthedocs.io/

先安装[cerbot](https://certbot.eff.org/instructions?ws=nginx&os=centosrhel7)

```yaml
yum install certbot
```

使用webroot模式获取证书：

```yaml
certbot certonly --webroot -w /var/www/example -d [example.com](http://example.com/) -d [www.example.com](http://www.example.com/)
```

_这个命令会为 example.com 和 www.example.com 这两个域名生成一个证书，使用 --webroot 模式会在 /var/www/example 中创建 .well-known 文件夹，这个文件夹里面包含了一些验证文件，certbot 会通过访问 example.com/.well-known/acme-challenge 来验证你的域名是否绑定的这个服务器。这个命令在大多数情况下都可以满足需求，_

需要写你的邮件

<img src="/assets/LOJkb6eg9orOatx1oSpcvdudnZd.png" src-width="618" class="m-auto" src-height="108" align="center"/>

<img src="/assets/RyeLbjeOwoaMRzx2BDnccamrnB5.png" src-width="563" class="m-auto" src-height="186" align="center"/>

<img src="/assets/Xxowb9cMCofth2xuaMfcBIV9nwc.png" src-width="571" class="m-auto" src-height="214" align="center"/>

# Nginx配置学习

