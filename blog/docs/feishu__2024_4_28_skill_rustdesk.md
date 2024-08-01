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
categories:
  - skill
---


# 背景：

对于一个开发，远程控制是刚需.

之前用过todesk,teamviwer,向日葵远程

<table>
<colgroup>
<col width="100"/>
<col width="170"/>
<col width="201"/>
<col width="261"/>
</colgroup>
<tbody>
<tr><td></td><td><p>连接速度</p></td><td><p>对mac支持</p></td><td><p>软件友好性</p></td></tr>
<tr><td><p>todesk</p></td><td><p>快</p></td><td><p>好</p></td><td><p>非常好</p></td></tr>
<tr><td><p>teamviwer</p></td><td><p>慢(服务器在国外，经常连接不上）</p></td><td><p>不好（mac远程延时很大）</p></td><td><p>不是特别好</p></td></tr>
<tr><td><p>向日葵远程</p></td><td><p>慢</p></td><td><p>好</p></td><td><p>不是特别好</p></td></tr>
</tbody>
</table>

 todesk最优，我也用了两年的vip服务（一年300多)。

最近在网上找到了rustdesk,于时想试用一下，看能不能节约这300.

# 安装客户端

去官网下载最新版本https://github.com/rustdesk/rustdesk/releases

选x86_64.msi

# 安装服务器

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
    image: rustdesk/rustdesk-server:latest
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
    image: rustdesk/rustdesk-server:latest
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

# 配置客户端

解锁网络配置

<img src="/assets/TEehbX77so38uaxDOP2cUrFknag.png" src-width="822" class="markdown-img m-auto" src-height="322" align="center"/>

填入你的服务器地址和密钥

<img src="/assets/Z1CsbATDsoX43qxyGQFcw4D0nBd.png" src-width="561" class="markdown-img m-auto" src-height="318" align="center"/>

连接客户端

<img src="/assets/A60VbgI33oPabdxWHTRczBXtn0d.png" src-width="793" class="markdown-img m-auto" src-height="350" align="center"/>

# 问题处理

## Docker 启动报错

```yaml
Registered email required (-m option). Please pay and register
```

# 总结

完全免费：当然你可以使用server pro版本，但感觉个人版本就可以满足需求了。

完全可控：你自己的服务器，不用担心隐私被泄露

速度快，运行很流畅：试用了一下，远程反应很快，基本没有延迟。（有可能服务器和客户端都在一个局域网内有关吧）

强烈推荐

