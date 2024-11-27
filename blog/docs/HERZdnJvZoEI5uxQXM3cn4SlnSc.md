---
title: Rustdesk使用
tags:
  - develop
keywords:
  - rustdesk
  - todesk
  - 远程
  - 免费
  - 开源
  - mac 远程
  - windows 远程
  - teamviwer
create_time: 1716887079
edit_time: 1725784897
categories:
  - skill
---


# 1. 背景：

对于一个开发，远程控制是刚需.

免费快速开源的远程控制软件rustdesk,如果想在国内使用，需要自己部署服务器。

阿里云之前新人有优惠，搞了一个99元一年的服务器。今天尝试部署一下。记录过程中遇到的问题，以及如何解决。

有想自己部署的可以参考。

# 2. 安装客户端

去官网下载最新版本https://github.com/rustdesk/rustdesk/releases

选x86_64.msi

# 3. 安装服务器

https://github.com/rustdesk/rustdesk-server

使用docker安装

建一个docker-compose.yml

```csharp
version: "3"

networks:
  rustdesk-net:
    external: false

services:
  hbbs:
    container_name: hbbs
    ports:
      - 21115:21115
      - 21116:21116
      - 21116:21116/udp
      - 21118:21118
    image: rustdesk/rustdesk-server:1.1.10-3
    command: hbbs -r rustdesk.example.com:21117
    volumes:
      - ./data:/root
    networks:
      - rustdesk-net
    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    ports:
      - 21117:21117
      - 21119:21119
    image: rustdesk/rustdesk-server:1.1.10-3
    command: hbbr
    volumes:
      - ./data:/root
    networks:
      - rustdesk-net
    restart: unless-stopped
```

启动

```csharp
docker-compose up -d
```

启动后，当前目录会有证书文件生成

<img src="/assets/H0Qvb3YFBo6inwxg56fcMBcyn1f.png" src-width="653" class="markdown-img m-auto" src-height="175" align="center"/>

将.pub文件复制下来

# 4. 配置客户端

解锁网络配置

<img src="/assets/TEehbX77so38uaxDOP2cUrFknag.png" src-width="822" class="markdown-img m-auto" src-height="322" align="center"/>

填入你的服务器地址和密钥

<img src="/assets/Z1CsbATDsoX43qxyGQFcw4D0nBd.png" src-width="561" class="markdown-img m-auto" src-height="318" align="center"/>

连接客户端

<img src="/assets/A60VbgI33oPabdxWHTRczBXtn0d.png" src-width="793" class="markdown-img m-auto" src-height="350" align="center"/>

# 5. 问题处理

## 5.1 Docker 启动报错

如果启动时报错：

启动rustk desk docker报错

```yaml
Registered email required (-m option). 
 Please pay and register on https://rustdesk.com/server
```

原因是docker 的版本低了，需要用1.1.10-3

官方有写

<img src="/assets/RvBFblFZxoI83exxSvZcXGWknLf.png" src-width="922" class="markdown-img m-auto" src-height="138" align="center"/>

注意：docker-compose中有两个地方要改

# 6. 总结

完全免费：当然你可以使用server pro版本，但感觉个人版本就可以满足需求了。

完全可控：你自己的服务器，不用担心隐私被泄露

速度快，运行很流畅：试用了一下，远程反应很快，基本没有延迟。（有可能服务器和客户端都在一个局域网内有关吧）

强烈推荐

