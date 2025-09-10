---
keywords:
  - webcloner
  - 新浪微博
  - 备份
create_time: 1757294226
edit_time: 1757409612
title: webcloner功能演示-备份我的新浪微博
categories:
  - product
---


# 1. 如何处理动态列表

新浪微博有点特殊，全部内容都在同一个页面中。通过一个动态列表展示

<img src="/assets/DrUqbsAPbofdU0xNQEHcgve0nxd.png" src-width="697" class="markdown-img m-auto" src-height="519" align="center"/>

如果直接调用浏览器的截图，是获取不到完整内容的，因为动态列表组件只会渲染可屏幕内的节点，如下图，

屏幕外的节点全不见了。

<img src="/assets/RxQxbnRo3o60LhxIEhTcq8r1nfh.png" src-width="411" class="markdown-img m-auto" src-height="545" align="center"/>

通过节点名，我知道了这是一个开源vue组件vue-recycle-scroller

https://github.com/Akryum/vue-virtual-scroller

同时也知道了，这个项目是用vue开发的。

<img src="/assets/OWhxbOIq8oBeWaxHPtgcwIVJnic.png" src-width="740" class="markdown-img m-auto" src-height="378" align="center"/>

从开源项目的文档中得知，可以通过修改buffer值，来控制显示的节点数量。

于是，我目前的方案是

可以先找到vue-recycle-scroller组件根结点node

```yaml
const targetNode = document.querySelector(itemWrapperSelector);
```

然后获取vue属性

```yaml
scroller.__vue__
```

修改buffer为一个超级大的值

```yaml
scroller.__vue__.buffer=500000
```

 这样，动态列表失效了，会渲染全部结点。

此时再保存网页，就可以了。

现在的问题是，如果节点太多，会不会造成浏览器崩溃。

不过，我看到微博有搜索框。可以通过时间范围分段截屏，不过呢，这样的话逻辑有点复杂了。

<img src="/assets/V6vwbbvk2oa0HIx82h1cTBDNnkc.png" src-width="630" class="markdown-img m-auto" src-height="179" align="center"/>

# 2. 账号

新增账号方式没变

<img src="/assets/PaJ5bG6tzoFKKexx8vdc74N7nYb.png" src-width="479" class="markdown-img m-auto" src-height="247" align="center"/>

# 3. 任务 

为了处理微博这种特殊的情况，增加了一个平台字段，如下

<img src="/assets/LWqcbgQ1QonlDCxi2nhcOzORnVh.png" src-width="461" class="markdown-img m-auto" src-height="559" align="center"/>

# 4. 效果

图片和mhtml都生成出来了，效果挺好。

<img src="/assets/PeDubfKAaosX3ZxNQ34c4nG6nkf.png" src-width="1061" class="markdown-img m-auto" src-height="156" align="center"/>

<img src="/assets/WbA0b2dfioLcTwxYJiZcwDVpnyd.png" src-width="1175" class="markdown-img m-auto" src-height="648" align="center"/>

<img src="/assets/UlQ5bd2uoo5SgqxHtG5ciEnlnPh.png" src-width="996" class="markdown-img m-auto" src-height="239" align="center"/>

