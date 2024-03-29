---
create_time: 1711598238
title: feishu_write_tips
---


# feishu_write_tips

# cover

If the first block of the article is an image, it will become the article cover of Vitepress.

Fill in the cover field of frontmatter

#Frontmatter

If the first or second block of the article is a yaml or json block, it will be converted into vitepress's frontmatter.

The supported fields are as follows

```yaml
layout: home #Indicate to use home layout
title: learn technology #title
hide: false #Whether not to export the current
hide_child: true #Indicates that child nodes are also exported
categories: #category
  -code
tags: #tags
  - develop
```