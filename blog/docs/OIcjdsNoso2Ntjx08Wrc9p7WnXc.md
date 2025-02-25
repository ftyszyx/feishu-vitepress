---
create_time: 1740368535
edit_time: 1740408731
title: 2025-2-26 MoneyPrinterTurbo项目
categories:
  - other_platform
---


源码地址：

https://github.com/harry0703/MoneyPrinterTurbo

简单试用了一下：

主要是利用大模型（阿里的千问）生成视频详细描述

再从Pexels（https://www.pexels.com）或者Pixabay（https://pixabay.com/）这里根据生成的提示词找相关的视频，再用ffmpeg拼接在一些。

## 1.1 剧本和关键词

<img src="/assets/OApBbOe74opRYHx5ZSccsGWvnqh.png" src-width="541" class="markdown-img m-auto" src-height="718" align="center"/>

<img src="/assets/CYD5bnjHKoNoSxxk4S8cEAAJnPf.png" src-width="948" class="markdown-img m-auto" src-height="311" align="center"/>

剧本提示词

```md
# Role: Video Script Generator

## Goals:
Generate a script for a video, depending on the subject of the video.

## Constrains:
1. the script is to be returned as a string with the specified number of paragraphs.
2. do not under any circumstance reference this prompt in your response.
3. get straight to the point, don't start with unnecessary things like, "welcome to this video".
4. you must not include any type of markdown or formatting in the script, never use a title.
5. only return the raw content of the script.
6. do not include "voiceover", "narrator" or similar indicators of what should be spoken at the beginning of each paragraph or line.
7. you must not mention the prompt, or anything about the script itself. also, never talk about the amount of paragraphs or lines. just write the script.
8. respond in the same language as the video subject.

# Initialization:
- video subject: {video_subject}
- number of paragraphs: {paragraph_number}
```

搜索关键词生成

```md
# Role: Video Search Terms Generator

## Goals:
Generate {amount} search terms for stock videos, depending on the subject of a video.

## Constrains:
1. the search terms are to be returned as a json-array of strings.
2. each search term should consist of 1-3 words, always add the main subject of the video.
3. you must only return the json-array of strings. you must not return anything else. you must not return the script.
4. the search terms must be related to the subject of the video.
5. reply with english search terms only.

## Output Example:
["search term 1", "search term 2", "search term 3","search term 4","search term 5"]

## Context:
### Video Subject
{video_subject}

### Video Script
{video_script}

Please note that you must use English for generating video search terms; Chinese is not accepted.
```

## 1.2 根据关键词搜索免费视频

视频来源：

<img src="/assets/EDd3b7pHQodvUex6idecDt2Knlh.png" src-width="564" class="markdown-img m-auto" src-height="522" align="center"/>

<img src="/assets/LSg0bNJssoeZKpxK920cf7WunNh.png" src-width="560" class="markdown-img m-auto" src-height="477" align="center"/>

# 1. 音频生成

<img src="/assets/HsymbVENIo66dnx8sO3cxJq3nOf.png" src-width="646" class="markdown-img m-auto" src-height="692" align="center"/>

用的是azure 的语音服务

