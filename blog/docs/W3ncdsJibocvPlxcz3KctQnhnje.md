---
create_time: 1781683546
edit_time: 1781686169
title: codex使用
categories:
  - skill
---


### 1.1.1 官网: https://sub2api.1postpro.com/

# 1. 安装软件

## 1.1 codex桌面版本

### 1.1.1 Windows用户下载

### 1.1.2  **微软商店下载**

<img src="/assets/ChPPbvYLMoSdygxZDQqcxACRnxe.png" src-width="795" class="markdown-img m-auto" src-height="682" align="center"/>

### 1.1.3 白屏 打不开 下载不动     请往下滑看平替vscode下载教程

<img src="/assets/OtAdbv7iNouTSxxURYUczZxNn5c.png" src-width="1200" class="markdown-img m-auto" src-height="932" align="center"/>

<img src="/assets/JpxGbiY1eoGnEHxkUYccH5Yqn1f.png" src-width="1200" class="markdown-img m-auto" src-height="932" align="center"/>

无需魔法 直接打开下载即可使用 配合该文档使用 

## 1.2 Ccswitch

下载安装地址：

https://ccswitch.io/zh/ (主要是用来配置用第三方api key）

# 2. 获取api key

登录中转站,新建一个key

<img src="/assets/J2N3bizTloCmRlxQdsrcmeYbnRd.png" src-width="1870" class="markdown-img m-auto" src-height="500" align="center"/>

选择分组

<img src="/assets/NJuMbSrFLoHq62xoR6DczpjLnXf.png" src-width="509" class="markdown-img m-auto" src-height="270" align="center"/>

完成后，导入ccswitch

<img src="/assets/RqqabfbEnoFVnHxkyqec9bvineb.png" src-width="1165" class="markdown-img m-auto" src-height="83" align="center"/>

# 3. ccswitch中配置

点编辑

<img src="/assets/EMrgbIsIWohn1nxUDnBcvYLdnne.png" src-width="1240" class="markdown-img m-auto" src-height="81" align="center"/>

修改一下使用的模型为gpt5.5

<img src="/assets/LSVTbedVSoRz0sx4dBVcxZPFnng.png" src-width="1210" class="markdown-img m-auto" src-height="269" align="center"/>

点保存后,启用当前配置

<img src="/assets/XkyRb5KzWo4f3kxADJScGjJQnVb.png" src-width="1289" class="markdown-img m-auto" src-height="86" align="center"/>

重启codex即可使用了。

# 4. codex使用

设置中切换语言，默认是英文，软件有可能没下载中文语言包，要过一段时间才能切成中文

<img src="/assets/J42Hbwe9Tof13bxaRkzciWWynMA.png" src-width="900" class="markdown-img m-auto" src-height="358" align="center"/>

打开codex,先选择工程目录

<img src="/assets/AXybb3ShqoXJfTx8H0ecXosGnbh.png" src-width="523" class="markdown-img m-auto" src-height="205" align="center"/>

然后就可以对话了

<img src="/assets/IHsbbHwQcoTUOsxAdlvczqq1nTg.png" src-width="927" class="markdown-img m-auto" src-height="346" align="center"/>

如果不想让ai每次操作电脑都问你，改一下模式为完全访问

<img src="/assets/VqZ0bcQpfoqaOxxKFxWcExfynzg.png" src-width="486" class="markdown-img m-auto" src-height="242" align="center"/>

切换模型，

从上到下，推理能力变强，消耗也变大

<img src="/assets/EsntbaNaIovUJVxQi4NcpcTvnUc.png" src-width="214" class="markdown-img m-auto" src-height="226" align="center"/>

命令

输入“/” 会弹出codex的一些命令，如压缩上下文，切目标模式

<img src="/assets/WceqbJ2nqoz1EdxTbEfcadU7nrf.png" src-width="457" class="markdown-img m-auto" src-height="370" align="center"/>

还可以直接执行skill

<img src="/assets/LjWsb5rptowtVexVAvTcjjx2nfc.png" src-width="455" class="markdown-img m-auto" src-height="245" align="center"/>

使用“@”添加文件上下文

<img src="/assets/D7rEbxvm7oZQR4xJQb5ckjLAnUc.png" src-width="644" class="markdown-img m-auto" src-height="184" align="center"/>

# 5. 一些必备工具安装

## 5.1 vscode

下载地址：https://code.visualstudio.com/ 

说明： 主要用来查看代码，编写代码，程序员必备

下载完后需要安装codex插件，方便和桌面端同步使用，效率更高

 

<img src="/assets/HhOEbLBXYoG2BBxhUNHcWMfensd.png" src-width="1200" class="markdown-img m-auto" src-height="796" align="center"/>

<img src="/assets/IU6kbwO6ooGYjWxfIjNcuy3Rnfd.png" src-width="1200" class="markdown-img m-auto" src-height="796" align="center"/>

<img src="/assets/I8eYbYMyloqsGmxJJfmcB2GRnqh.png" src-width="1200" class="markdown-img m-auto" src-height="796" align="center"/>

下载好安装好codex 扩展组件后 看图片操作打开 

<img src="/assets/WACabOttno0moix5bOvcLVHNnbg.png" src-width="1200" class="markdown-img m-auto" src-height="796" align="center"/>

 

## 5.2 node.js

https://node.org.cn/en

说明：最强大的js解释引擎，有了node.js，codex可以方便的自己手搓各种好用的工具。

而且node.js是做各种前端应用的基础

## 5.3 python

https://www.python.org/

说明：脚本引擎，codex可以方便的自己手搓各种好用的工具。

# 6. Codex cli

codex命令行端

安装方式参考：https://github.com/openai/codex

就一个命令，需要提前安装好node.js

```yaml
npm install -g @openai/codex
```

