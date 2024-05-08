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

https://letsencrypt.org/getting-started/

先安装[cerbot](https://certbot.eff.org/instructions?ws=nginx&os=centosrhel7)

这里有个助手：

<img src="/assets/XBlGbIVgJonm8zxXuNLcnrArnzg.png" src-width="1088" class="m-auto" src-height="93" align="center"/>

- https://cloud.tencent.com/developer/article/2203944

# Nginx配置学习

