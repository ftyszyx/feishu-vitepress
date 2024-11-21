---
create_time: 1731886801
edit_time: 1732090955
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

## risefront

https://pkg.go.dev/code.pfad.fr/risefront

服务器主入口是用这个库启动的

<img src="/assets/AD7IbKMd1oFBrzxtdhscYkjbnSe.png" src-width="682" class="markdown-img m-auto" src-height="525" align="center"/>

这个库好像是用来做热更新的

<img src="/assets/P2Gqb9dQ6oTFG6x63n3cNqTLnbe.png" src-width="1689" class="markdown-img m-auto" src-height="104" align="center"/>

怎么实现的：

因为这个项目是基于overseer:https://github.com/jpillora/overseer

overseer这个主进程，为程序创建一个运行子进程

- `overseer` uses the main process to check for and install upgrades and a child process to run `Program`.

主进程会代理所有子进程的通信

参考文档：https://blog.csdn.net/flynetcn/article/details/134084549

## sse

项目还用到一个sse

主要是服务器向客户端推送消息，但他是单向的

<img src="/assets/Qxzwbd015osuz5xzRfbc8tZznmg.png" src-width="513" class="markdown-img m-auto" src-height="349" align="center"/>

这里有介绍：

https://www.ruanyifeng.com/blog/2017/05/server-sent_events.html

服务器怎么实现的？

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[50%]" width-ratio="50">
<img src="/assets/GqU8bcoPvo3xE3xvKkfc3SRInzb.png" src-width="355" class="markdown-img m-auto" src-height="195" align="center"/>

</div>
<div class="w-[50%]" width-ratio="50">
<img src="/assets/HajRbKs6ioa6b5xUVOrc3h2Onib.png" src-width="605" class="markdown-img m-auto" src-height="238" align="center"/>

</div>
</div>

##  zaplog

项目使用zaplog来记录日志：

https://github.com/uber-go/zap

zaplog有两个日志记录器，一个是logger，一个是Sugared Logger

logger记录日志时，需要明确的类型。而sugaredlog不用。

nginx-ui为了方便记录日志，使用了sugared log

<img src="/assets/Es38bYC4AotENLxM4PMcmV8unAc.png" src-width="891" class="markdown-img m-auto" src-height="287" align="center"/>

但sugar log默认不记录到文件。

所以需要加一个文件记录的功能

有两个第三方库：

一个是以时间来分割文件：

```yaml
[github.com/lestrrat-go/file-rotatelogs](https://github.com/lestrrat-go/file-rotatelogs)
```

 

一个是文件大小分割。

```yaml
gopkg.in/natefinch/lumberjack.v2
```

我还是使用时间分割吧。

```go
import rotatelogs "github.com/lestrrat-go/file-rotatelogs"
l, _  **:=** rotatelogs.New(
        filename **+**".%Y%m%d%H%M",
        rotatelogs.WithMaxAge(30 *****24 *****time.Hour),    _// 最长保存30天_        rotatelogs.WithRotationTime(time.Hour *****24), _// 24小时切割一次_)
zapcore.AddSync(l)
```

测试了一下的确可以，不过发现，日志文件中有不可见的字符

<img src="/assets/VOeJbCghloMNDExkEuIctQJwnpo.png" src-width="574" class="markdown-img m-auto" src-height="90" align="center"/>

应该是console的颜色控制符

怎么去掉颜色字符

```go
encoderConfig.EncodeLevel = colorLevelEncoder
改成
 encoderConfig.EncodeLevel = zapcore.CapitalLevelEncoder
```

完美

## nginx的配置

## 证书的更新机制

/api/acme_users?

<img src="/assets/NrJKbRYAyoMzYzxIdcBcWIoFnUe.png" src-width="910" class="markdown-img m-auto" src-height="182" align="center"/>

对应的数据层

<img src="/assets/YCmIbBG50ocR03xKj9YcU4xmnLf.png" src-width="1173" class="markdown-img m-auto" src-height="233" align="center"/>

