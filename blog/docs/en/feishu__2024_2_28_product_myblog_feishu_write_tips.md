---
create_time: 1711598238
title: feishu_write_tips
---

# feishu_write_tips

# Cover

If the first block of the article is an image, it will become the cover of the article on Vitepress

Enter the cover field of frontmatter

# Frontmatter

If the first or second block of the article is a YAML or JSON block, it will be converted to VitePress's FrontMatter

The following fields are supported

```yaml
layout: home #指明用home layout
title: Learn Technology #标题
hide: false #是否不导出当前 
hide_child: true #表明子节点也导出 
Categories: #分类
  - code
tags: #标签
  - develop
```