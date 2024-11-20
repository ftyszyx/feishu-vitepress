---
create_time: 1731886801
edit_time: 1732005359
title: Nginx-ui
categories:
  - skill
---


# 前言

为什么要学习这个项目

一直想为Nginx中网站的管理，找一个优美的后台。找到了就是这个项目。

而且这个项目中还有一个功能挺吸引我的，就是他能自动的为你的https证书续期。

但是免费也是有代价的。

从6月份使用到11月份，每次证书过期，系统都没有续期成功。导致网站无法访问。

所以必须要看一下代码了，不然真的没有底。

而且发现，这套系统的文档的确是不够详细。

# 本地运行

项目地址：https://github.com/0xJacky/nginx-ui

## 编译并运行前端

```yaml
cd app
npm install
npm run build //一定要做，因为服务端编译时需要dist目录
npm run dev
```

## 启动后端（需要linux)

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>🍞</div>
<p>如果要在windows上编译和启动，需要gcc。因为项目依赖了go-sqlite3.需要gcc编译</p>
<p><a href="https://jmeubank.github.io/tdm-gcc/download/">https://jmeubank.github.io/tdm-gcc/download/</a></p>
<p>但是因为系统还使用了cron计划任务命令，所以还是需要linux</p>
</div>

下载第2项： tdm64-gcc-10.3.0-2.exe，然后一路next就可以

安装库

```yaml
go mod tidy
```

编译

```yaml
go build -tags=jsoniter  -o nginx-ui  -v main.go
```

生成配置

建一个文件app.ini

```yaml
[server]
HttpPort = 9001
Host     = 
Port     = 9001
RunMode  = debug
```

运行

```yaml
nginx-ui.exe -config app.ini
```

## 使用说明

第一次启动：

<img src="/assets/PkiJbMbsHoQByXxDN2gchCCAnpg.png" src-width="706" class="markdown-img m-auto" src-height="527" align="center"/>

# 项目说明

服务器是golang

前端是vue

## cosy

服务器使用了作者自己写的cosy框架:github.com/uozi-tech/cosy

这个cosy是基于gin：https://github.com/gin-gonic/gin做了进一步的封装

为了方便调试，我把cosy也移到了项目中。修改了一下项目结构：参考：

ftyszyx/nginx-ui.git

## sse

项目还用到一个sse

主要是服务器向客户端推送消息

 

<img src="/assets/Qxzwbd015osuz5xzRfbc8tZznmg.png" src-width="513" class="markdown-img m-auto" src-height="349" align="center"/>

这里有介绍：

https://www.ruanyifeng.com/blog/2017/05/server-sent_events.html

