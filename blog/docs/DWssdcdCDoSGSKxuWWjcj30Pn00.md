---
create_time: 1784001398
edit_time: 1784203106
title: wechat
categories:
  - product
---


参考：

https://www.ji75.com/abouts

# 1. weflow:

https://github.com/hicccc77/WeFlow

已经有人做了工具，可惜被腾讯告了，删库跑路了

<img src="/assets/UsMzb5UK9o3cW7xDBSCceQRHn9c.png" src-width="904" class="markdown-img m-auto" src-height="360" align="center"/>

但是可以下载

https://github.com/hicccc77/weflow-releases/

写的好有意思

<img src="/assets/ZZmQb9oJ9ouUS6x4EQycjOUlnDf.png" src-width="879" class="markdown-img m-auto" src-height="202" align="center"/>

这个软件做的太美了，太优秀了

<img src="/assets/Cm6fbwFUyoUG2wx2xINcmpi4nms.png" src-width="1781" class="markdown-img m-auto" src-height="947" align="center"/>

作者应该花了不少心思

## 1.1 原理分析

### 1.1.1 定位weixin的pid及主要dll

找窗口对应的 PID
点击工具栏的“准星”图标，拖到微信窗口上，Process Explorer 会定位到窗口所属进程，左侧列表中的 `PID` 列就是进程 ID。

查看该进程加载的全部 DLL
选中 `Weixin.exe` 后按 `Ctrl+D`，下方面板会显示已加载的 DLL、路径、版本等。也可以右键进程 -&gt; `Properties` -&gt; `DLLs`。

可以用https://learn.microsoft.com/sysinternals/downloads/process-explorer

<img src="/assets/FBrTbo7POosypjx8Fopcsqwinmb.png" src-width="1256" class="markdown-img m-auto" src-height="244" align="center"/>

```yaml
tasklist /FI "IMAGENAME eq Weixin.exe" /FO CSV /NH
```

### 1.1.2 数据的解密

微信在本地存了一份数据，但是加密了，需要找到解密的密钥

微信存在本地的图片和视频资源也加密了，https://github.com/Evil0ctal/WeChat-Channels-Video-File-Decryption

