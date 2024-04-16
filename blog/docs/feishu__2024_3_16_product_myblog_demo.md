---
title: 演示
keywords:
  - feishu
  - vitepress
  - 支持的格式
cover: /assets/ImhUbBYi6olojBxIS8WcgJZ1n2d.png
create_time: 1713255219
categories:
  - product
---


# Demo

## 支持的文档格式

 下面是完整格式演示

## This is heading 2

### This is heading 3

#### This is heading 4

##### This is heading 5

###### This is heading 6

> This is a block quote.
> With a new line.

## Paragraph

导出飞书知识库，并按相同目录结构生成 [Static Page Generator](https://www.google.com/search?q=Static+Page+Generator) 支持 `Markdown` 文件组织方式，用于发布为**静态网站**。

Generate **Feishu Wiki** into a Markdown for work with Static Page Generators.

## Callout

<div class="callout callout-bg-1 callout-border-1 callout-color-1">
<div class='callout-emoji'>❤️</div>
<p>Red Callout</p>
<p>And a <a href="https://github.com/longbridgeapp/feishu-pages">Link</a> and <strong>Bold</strong> in the Callout.</p>
</div>

<div class="callout callout-bg-2 callout-border-2 callout-color-2">
<div class='callout-emoji'>💡</div>
<p>Orange Callout</p>
</div>

<div class="callout callout-bg-3 callout-border-3 callout-color-3">
<div class='callout-emoji'>🤖</div>
<p>Yellow Callout</p>
</div>

<div class="callout callout-bg-4 callout-border-4 callout-color-4">
<div class='callout-emoji'>✅</div>
<p>Green Callout</p>
</div>

<div class="callout callout-bg-5 callout-border-5 callout-color-5">
<div class='callout-emoji'>🐳</div>
<p>Blue Callout</p>
</div>

<div class="callout callout-bg-6 callout-border-6 callout-color-6">
<div class='callout-emoji'>🐳</div>
<p>Purple Callout</p>
</div>

<div class="callout callout-bg-14 callout-border-7 callout-color-7">
<div class='callout-emoji'>🐼</div>
<p>Gray Callout</p>
</div>

## Grid

Here is a 3 column grid example:

<div class="flex gap-3 columns-3" column-size="3">
<div class="w-[17%]" width-ratio="17">
<img src="/assets/FOn4b6wLxoO2hjxKaW5cQt0Qn5g.jpeg" src-width="440" src-height="440" align="center"/>
</div>
<div class="w-[52%]" width-ratio="52">
<img src="/assets/LzHObMYtBoGifpxyTOfccxi3nKb.png" src-width="440" src-height="440" align="center"/>
</div>
<div class="w-[29%]" width-ratio="29">
<img src="/assets/DEkxbo02yoTPuIxING3cSEMMn2b.jpeg" src-width="440" src-height="440" align="center"/>
</div>
</div>

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[70%]" width-ratio="70">
<blockquote>
<p>BlockQuote in Grid Line 1<br/>This is line 2</p>
</blockquote>
</div>
<div class="w-[30%]" width-ratio="30">
<ul>
<li><p>List Item in Grid</p>
<ul>
<li>This is level 1.1</li>
</ul>
</li>
<li><p>Level 2</p>
<ol>
<li>Level 2.1 as Ordered</li>
<li>Level 2.2</li>
</ol>
</li>
</ul>
</div>
</div>

## Bullet List

- Projects
    - GitHub
    - Twitter
        - x.com
    - Facebook 

- OpenSource
    - feishu-pages
    - feishu-docx

## Ordered List

1. This is 1 item
    1. This is a item
        1. This is i 
    2. This is b
    3. This c

2. This is 2 item
    1. This is 2.1
    2. This is 2.2

## CodeBlock

A JSON example:

```json
{
  "name": "feishu-pages",
}
```

A TypeScript example:

```ts
const name = "feishu-pages";
```

## TODO

- [x] This item is completed

- [ ] This is imcomplete

## Divider

There is a divider

---

To split contents.

## Image

An example of an image with caption.

<img src="/assets/LAHrbunRMoEmtFxjk3wc46rvnQV.png" src-width="1280" src-height="720" align="center"/>

## File

[test-file.zip](/assets/IfrlbIQ24owNtRxFeySc6bwWnjf.zip)

## Table

Currently, feishu-docx only supports pure Table.

<table header_column="1" header_row="1">
<colgroup>
<col width="180"/>
<col width="222"/>
<col width="418"/>
</colgroup>
<thead>
<tr><th><p>Name</p></th><th><p>Type</p></th><th><p>Website</p></th></tr>
</thead>
<tbody>
<tr><td colspan="3"><p>This is merge row.</p></td></tr>
<tr><td><p>GitHub</p></td><td><p>Programming</p></td><td><p><a href="https://github.com">https://github.com</a></p></td></tr>
<tr><td rowspan="2"><p>Twitter</p></td><td rowspan="2"><p>Social Network</p></td><td><p><a href="https://x.com">https://x.com</a></p></td></tr>
<tr><td><p><a href="https://twitter.com">https://twitter.com</a></p></td></tr>
<tr><td><p>Dribbble</p></td><td><p>Design</p></td><td><p><a href="https://dribbble.com">https://dribbble.com</a></p></td></tr>
</tbody>
</table>

## Equation

$$E = mc^2$$

# 流程图，画板，思维导图

在飞书编辑器里面，有流程图导出图片或复制图片的功能，将流程图的图片插入到文档中即可

下面这个 UML 图（markdown中不可见）：

选复制到粘贴板，再插入图片即可

<img src="/assets/XOrdbT96AoqESuxLdzycuqzAnNd.png" src-width="557" src-height="202" align="center"/>

下面是插入的

<img src="/assets/GbdhbPrN6oBtO7xJZTlcMETvnRh.png" src-width="816" src-height="256" align="center"/>

