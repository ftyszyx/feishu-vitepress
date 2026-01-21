---
create_time: 1768874750
edit_time: 1768891293
title: Vibecoding
categories:
  - skill
---


公司要求人人都要vibecoding，而且需要考核，不通过要裁掉。

我感觉公司有点小题大作。ai现在越来越人性化，基本人人都能用，不需要什么专业知识。因此无法量化为人的能力。用来作为符不符合岗位需求的一种指标 ，我感觉不合适。

vibecoding也不需要学习，你只需要使用就行，如果这个这个东西需要学习，说明AI还不够智能。

但是既然公司要求，我也再系统的了解一下。虽然我已经用vibecoding做了好几个项目了。

就看这个吧https://www.vibevibe.cn

# 1. 基础篇（除了hello world全是废话）

前四节全是废话，从动手开始

1.5 Hello World：你的第一个 3 分钟 AI 网页

<img src="/assets/TM6Rbv7pyoNkfTxbX0fctBzEnnd.png" src-width="765" class="markdown-img m-auto" src-height="409" align="center"/>

这提示词也是废话连篇，显得自己很专业。其实和ai对话，你直接说目的就行，下面是我说的

```text
做一个网页
页面中间显示名言：千里之行，始于足下
名言下方显示作者名字
页面要美观大方
```

效果如图：

<img src="/assets/QSlqbwWKroXpkEx7BpTcHtGtnKb.png" src-width="1654" class="markdown-img m-auto" src-height="676" align="center"/>

还有流光效果，ai就是牛，非常满意。

后面就不看了，基础篇，其它全是废话

# 2. 实战

# 3. Vibecoding 案例分享：零代码打造 AI 绘本生成器

最终成果：一个能把任意文档自动转换成儿童绘本的 AI 应用

我的提示

```md
# AI 绘本生成器
一个网页应用：用户输入一段童话故事，网站自动生成「分页 + 插画」的绘本预览，并支持打印/导出 PDF。
## 功能
- 输入故事（中文/英文）
- 设置页数与画风
- 一键生成绘本并预览
- 打印/导出 PDF（使用浏览器打印）

## 技术细节 
不使用Mock，需要使用真实数据，
使用gemnipro 来将故事内容拆分成多个分镜
并根据分镜生成分镜图片提示词，和封面图片提示词
然后根据图片提示词使用nano-banana来生成绘本的图片

nano-banana api文档：[Grsai Nano Banana API](https://grsai.ai/zh/dashboard/documents/nano-banana)
gemini api文档：[Grsai Chat API（OpenAI兼容）](https://grsai.ai/zh/dashboard/documents/chat)

环境变量（精简版）：
- GRSAI_API_KEY=（Grsai 统一 key，既用于 Chat 又用于 nano-banana）
- GRSAI_BASE_URL=（可选；默认 `https://grsaiapi.com`）
- GEMINI_MODEL=（例如 `gemini-2.5-pro`，Gemini/Chat 的“商品号/模型号”）
- NANO_BANANA_MODEL=（默认 `nano-banana`，nano-banana 的“商品号/模型号”）
- NANO_BANANA_CONCURRENCY=（默认 2）
- NANO_BANANA_SIZE=（默认 `1024x1024`）
- PORT=（默认 5175）

## 额外要求
1. 服务端每次发送外部请求，需要将请求url,数据打印出来 
 收到回包也需要打印，方便调试
```

生成的效果：

<img src="/assets/KlWobjIEbozaYdxwWQncnTNkn3e.png" src-width="1435" class="markdown-img m-auto" src-height="715" align="center"/>

<img src="/assets/WWFdbeOUKon8l5x5CAHcSIvinTf.png" src-width="1222" class="markdown-img m-auto" src-height="714" align="center"/>

<img src="/assets/Q745bXmvgojhW7xCX5kcV0V1n9e.png" src-width="850" class="markdown-img m-auto" src-height="861" align="center"/>

