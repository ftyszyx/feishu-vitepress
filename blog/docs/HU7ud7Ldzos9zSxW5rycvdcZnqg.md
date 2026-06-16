---
create_time: 1781337142
edit_time: 1781584737
title: 发布过程
categories:
  - product
---


这个产品有：pc端，一个landing page，一个后台服务。

发布时有一些复杂，需要记录一下。

# 1. 发布环境

1. Aliyun oss （用来存储静态资源）
2. edge one  （用来搭建网站）
3. 域名 （自己申请）
4. 服务器（1panel后台）

# 2. Aliyun oss cdn

## 2.1 为什么要用oss

1. pc打出的包，要让用户快速下载，最好的方式就是上传到cdn
2. Pc包要检查更新，需要存一个更新配置，也要保存cdn

主要作用就是加快静态资源的下载

## 2.2 配置过程

### 2.2.1 新建一个bucket

https://oss.console.aliyun.com/bucket

建个bucket,并设置cros

### 2.2.2 配置跨域

因为做了landingpage，landingpage需要能访问cdn中的资源，但是域名不一样，会有跨域问题。所以要配置跨域

打开你的 Bucket：`bytefuse`

左侧菜单： **数据安全** -&gt;  **跨域设置**

点  **创建规则**

<img src="/assets/CQd6bwX8To0ThSxehcZc6AAbn1f.png" src-width="866" class="markdown-img m-auto" src-height="996" align="center"/>

### 2.2.3  配置域名

有些文件如apk，用aliyun的域名是不让下载的。所以需要配置自己的域名 

<img src="/assets/WorBb9SdloHCNOxeSQYcISKinJg.png" src-width="1021" class="markdown-img m-auto" src-height="178" align="center"/>

配了自定义域名，绑定好了，发现有个末开启的标识（好抽象）

<img src="/assets/MkD3bRsKBo8f3wxt9VVcex8EnFg.png" src-width="1434" class="markdown-img m-auto" src-height="81" align="center"/>

查了一下应该是没配https的原因，点证书托管，跳到这里

<img src="/assets/Mktrb8gbJoMKPSxMRrGcfpEbnog.png" src-width="1486" class="markdown-img m-auto" src-height="348" align="center"/>

 可以在1panel申请自定义证书，然后配在这里

# 3. Edge one 

有两个网站：

https://www.lockpass.cn (landing page)

https://admin.lockpass.cn  (后台）

Edge one大大简化了网站部署的工作量和服务器的压力，只用关联好github 仓库，设置好构建命令即可。

<img src="/assets/Fvy8bA9c4oj1sGxAbTlcXEPenbg.png" src-width="411" class="markdown-img m-auto" src-height="287" align="center"/>

