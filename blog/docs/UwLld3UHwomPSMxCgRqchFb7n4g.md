---
create_time: 1770001322
edit_time: 1770046358
title: 玩玩n8n,全自动流水线：下载→提音→转文字→带时间戳！
categories:
  - skill
---


有时候刷抖音，看到一个好视频，就先下载下来分析一下。

但是手动下载、提音频、转字幕，太费时间，于是想用一个n8n一键搞定。

下面我做的这个工作流的介绍，在配置好工作流后， **只要复制一个抖音分享链接，就会输出结果到你要的目录，挺方便，分享一下过程。**

# 1. 功能介绍

✅ 自动下载原视频（MP4）

✅ 自动提取背景音乐/人声（MP3）

✅ 自动语音转文字，生成纯文本 + 带时间戳的JSON字幕文件

整个过程无需人工干预，结果直接存到指定文件夹，拿来就能做内容分析、知识整理！

# 2.  **它是怎么工作的？**

核心是  **n8n**（一个强大的低代码自动化平台）+ 几个关键组件：

-  **FFmpeg**：处理音视频格式转换
-  **Whisper**（最好配CUDA加速）：业界最强的语音识别模型
-  **自研n8n节点**：包括抖音解析、FFmpeg调用、Whisper集成等（代码已开源 👉 [https://github.com/ftyszyx/n8n_workflow](https://github.com/ftyszyx/n8n_workflow)）

# 3. 使用起来超简单：

## 3.1 启动n8n

```yaml
set N8N_RESTRICT_FILE_ACCESS_TO="D:\downloads"
n8n start
```

## 3.2 导入工作流

[capcut_http_workflow.json](/assets/TUGEbkc98or7isx4gVecTB1dnuh.json)

<img src="/assets/VklibTR3poQ5R5xZxbicC34Pnvf.png" src-width="1347" class="markdown-img m-auto" src-height="253" align="center"/>

## 3.3 在“Douyin Parse”节点粘贴任意抖音分享链接

在douyin parse中输入要解析的文本

<img src="/assets/FaxLb3YMqobfb4xc102ck84YnNd.png" src-width="209" class="markdown-img m-auto" src-height="171" align="center"/>

<img src="/assets/IYncbe18NojyoaxffMfcLbIvnBc.png" src-width="392" class="markdown-img m-auto" src-height="360" align="center"/>

# 4. 执行后输出结果

<img src="/assets/QdY3brjKaozHhFx3RHNc1ERXnFY.png" src-width="581" class="markdown-img m-auto" src-height="237" align="center"/>

分别是视频、音频、纯文本、带时间轴的字幕

# 5. 总结

AI时代，技术实现越来越简单，没有什么是实现不了的。

