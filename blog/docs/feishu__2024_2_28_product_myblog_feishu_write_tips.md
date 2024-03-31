---
create_time: 1711598238
title: feishu_write_tips
categories:
  - product
---


# feishu_write_tips

# 封面

文章的第一个block如果是图片，会变成vitepress的文章封面

填入frontmatter的cover字段

# Frontmatter

文章的第1或者第2个block如果是yaml或者json块，会转成vitepress的frontmatter

支持的字段如下

```yaml
layout: home  #指明用home layout
title: 学技术   #标题
hide: false   #是否不导出当前 
hide_child: true #表明子节点也导出 
categories: #分类
  - code
tags:  #标签
  - develop
```

# head1

##   head2有标号

## head2没标号

###  head3

#### head4

