---
create_time: 1768385195
edit_time: 1768403155
title: bugly自动分析工作流使用说明
categories:
  - skill
---


# 1. 功能说明：

根据提供的bugly链接从bugly获取闪退堆栈，解析堆栈，保存到csv

全程自动化，批量操作

# 2. 代码地址

svn://192.168.0.13/share_lib/trunk/client/build2/tools/n8n_bugly

# 3. 使用说明

需要node.js &gt;22

## 3.1 安装n8n

```bash
安装
npm install -g n8n
启动：
n8n start
```

## 3.2 安装自定义节点

### 3.2.1 bugly和crashprase

在C:\Users\{username}\.n8n\nodes目录下checkout代码

切到命令行，执行

```bash
npm install C:\Users\pc\.n8n\nodes\n8n_bugly -S
```

### 3.2.2 安装feishu node

```
npm install n8n-nodes-feishu-lite -S
```

最终package.json配置如下

```json
{
  "name": "installed-nodes",
  "private": true,
  "dependencies": {
    "n8n-nodes-bugly": "file:n8n_bugly",
    "n8n-nodes-feishu-lite": "^0.4.3"
  }
}
```

### 3.2.3 重新启动n8n即可

```
n8n start
```

## 3.3 新建工作流

浏览器访问这个地址

<img src="/assets/Pi0IbXmXjo36wyxpNTCcScAknDd.png" src-width="932" class="markdown-img m-auto" src-height="216" align="center"/>

<img src="/assets/Nk3GbtnoXo1TEIxWtxjc9aK3nvc.png" src-width="1046" class="markdown-img m-auto" src-height="282" align="center"/>

### 3.3.1 导入工作流配置

选择

<img src="/assets/XXh8bneIToSVkKx4HQ6cglSenee.png" src-width="822" class="markdown-img m-auto" src-height="216" align="center"/>

### 3.3.2 导入成功

<img src="/assets/BiqPb7bQuolj6MxI62IcaXvfnmg.png" src-width="1046" class="markdown-img m-auto" src-height="374" align="center"/>

## 3.4 新建一个datatable

<img src="/assets/YdHVb5GHBopInhxt3u8cOCjcnJf.png" src-width="432" class="markdown-img m-auto" src-height="344" align="center"/>

导入bugly.csv

<img src="/assets/DQLObbhYnol0ADxHz9gcYMkanIh.png" src-width="552" class="markdown-img m-auto" src-height="560" align="center"/>

## 3.5 配置工作流

### 3.5.1 配置bugly账号信息

<img src="/assets/T9uUb7hGYoS9izxN1emcBzoXnUg.png" src-width="1046" class="markdown-img m-auto" src-height="352" align="center"/>

主要是下面这两个

<img src="/assets/Qwk5bRCDCoGWj1xF64ycQp3LnIb.png" src-width="934" class="markdown-img m-auto" src-height="616" align="center"/>

<img src="/assets/UTtjb6jHNo51Y7xBIapcZGzNnwh.png" src-width="1046" class="markdown-img m-auto" src-height="448" align="center"/>

### 3.5.2 配置解析路径

<img src="/assets/S4P8bsuhMoOolmxwMRlcRjDdnMe.png" src-width="980" class="markdown-img m-auto" src-height="374" align="center"/>

<img src="/assets/XRIIbnaSdoypVhxC4ercZyuQnkb.png" src-width="632" class="markdown-img m-auto" src-height="662" align="center"/>

### 3.5.3 配置你要写的datatable

<img src="/assets/ZSmUbAQaJolSFRx2pbzc8nTdnoc.png" src-width="668" class="markdown-img m-auto" src-height="329" align="center"/>

<img src="/assets/T82JbfnWsoQ903xKko5cRPE2nrc.png" src-width="702" class="markdown-img m-auto" src-height="662" align="center"/>

## 3.6 执行工作流

<img src="/assets/Me0hbhMI3o3fZDxoSdrcRVhcnhh.png" src-width="807" class="markdown-img m-auto" src-height="520" align="center"/>

## 3.7 导出csv

<img src="/assets/EwPWbzDVhotqPmxDZwLctrHEnYC.png" src-width="1046" class="markdown-img m-auto" src-height="278" align="center"/>

# 4. 完成

