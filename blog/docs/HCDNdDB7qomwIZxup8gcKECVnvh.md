---
create_time: 1764075128
edit_time: 1764161873
title: chromium 嵌入式浏览器
categories:
  - skill
---


下载地址1：https://chromium.woolyss.com/download/zh-cn/

无法播放视频

https://chromium.woolyss.com/

这里下载的可以

https://github.com/Hibbiki/chromium-win64

# 1. 一些技巧

1.通过 chrome://media-internals 查看具体流媒体失败的原因

<img src="/assets/IEbqbNPHqohdvWx9cyHcHuqYnMg.png" src-width="1872" class="markdown-img m-auto" src-height="1288" align="center"/>

通过chrome://components/ 查看组件

<img src="/assets/HyjwbKe9ko48hwxSCSKciZGYnfe.png" src-width="1872" class="markdown-img m-auto" src-height="1288" align="center"/>

1.通过命令行启动查看闪退原因

<img src="/assets/E8gLb63fHogyhkxiLlwcV8myndc.png" src-width="1152" class="markdown-img m-auto" src-height="150" align="center"/>

可以不启动插件

```text
chrome.exe --disable-extensions  --user-data-dir="D:\temp\chromium_test"
```

# 2. 如何自己编译chromium

让ai写了编辑脚本

通过github action去下载源码：有50个G,好吓人。

<img src="/assets/EXh3b7HNVo1FpfxdBL9cbruDnud.png" src-width="1103" class="markdown-img m-auto" src-height="69" align="center"/>

