---
create_time: 1758202843
edit_time: 1758203993
title: 怎么让ai帮美化ppt
categories:
  - other_platform
---


最近写了个ppt,想让ai帮美化一下

但是ppt不是纯文本，如何让ai识别呢。

市面上有不少现成的工具，都 要收费。我不想用。

最近发现一个开源项目：https://github.com/microsoft/markitdown

一直霸占github的trending榜，而且还是微软开发的。

这个工具介绍说能将大部分的文档格式转成markdown

<img src="/assets/Jr4xbxwl1oAT7DxLi0dc0Tbin2c.png" src-width="599" class="markdown-img m-auto" src-height="409" align="center"/>

我想：用markitdown先将ppt转成markdown,然后给ai,让他优化，我再根据ai的建议去修改。应该就可以了。

安装简单

```yaml
pip install "markitdown[all]"
```

转化

```yaml
markitdown test.pptx > document.md
```

