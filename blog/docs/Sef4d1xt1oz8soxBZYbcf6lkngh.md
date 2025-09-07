---
cover: /assets/ENxDbaNRBomiGZxnjfccgJqJnMh.jpeg
create_time: 1757035362
edit_time: 1757207931
title: 遇到的问题
categories:
  - product
---


# 1. 如何处理href不是链接而是javascript脚本的情况

新浪的博客分页

<img src="/assets/LlC9bd0IXoyccfx6n4Dct605n2b.png" src-width="547" class="markdown-img m-auto" src-height="106" align="center"/>

这些href的值是javascript脚本

<img src="/assets/YW9cblgCWoLnx9xJZVQcaocznte.png" src-width="723" class="markdown-img m-auto" src-height="218" align="center"/>

如何定位这些标签，并触发换页呢。

之前做爬虫的做法是，定位到next，然后不断点next，直到找不到next为止。

所以目前的方案是：


1. 找到网页的全部a link标签
2. 如果link标签不是有效的href,检查其文本内容是不是"下一页“  ’next'等
3. 如果是，点触发点击，再循环遍历新网页的Link，
4. 直到找不到next为止

# 2. 截的图有被一些固定标题挡住

<img src="/assets/KhVGbPhsToYrGJx8M6Yczx5Nn7f.png" src-width="917" class="markdown-img m-auto" src-height="555" align="center"/>

当截取一个很长的网页时，如果页面上有固定的页眉、导航栏或工具条（通常使用 position: fixed 或 position: sticky CSS属性），截图工具在“滚动”页面时，这个固定的元素会一直停留在原位，导致它出现在最终长图的中间位置。为了解决这个问题，我将在截图前，通过执行一小段JavaScript代码，暂时隐藏掉页面上所有固定的和粘性的元素。这样，它们就不会干扰长截图的生成了。

# 3. qq空间分页点击搞出死循环

之前分页检查的关键字如下：

```yaml
const NEXT_EXACT = /^(下一页|下一頁|下页|更多|Next|More|Older|next|more|older|加载更多|點擊查看更多|下一張|下一张|下一章)\s*(>|&gt;|»)?\s*$/i;
```

可qq空间菜单项有一个固定的 “更多”

<img src="/assets/OsLlbiLEDoPlsyxKfDScXhtpnze.png" src-width="1042" class="markdown-img m-auto" src-height="131" align="center"/>

导致一直触发分页点击

看来之种分页检查，不能默认开放，检查的规则还是要用户自己输入 才行

