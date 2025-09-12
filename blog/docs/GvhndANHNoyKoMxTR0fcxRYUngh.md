---
keywords:
  - webcloner
  - 新浪微博
  - 备份
create_time: 1757294226
edit_time: 1757605779
title: webcloner功能演示-备份我的新浪微博
categories:
  - product
---


# 1. 技术的难点

## 1.1 网页中的动态列表不能显示全部内容

新浪微博有点特殊，全部内容都在同一个页面中。内容是通过一个动态列表展示

<img src="/assets/DrUqbsAPbofdU0xNQEHcgve0nxd.png" src-width="697" class="markdown-img m-auto" src-height="519" align="center"/>

如果直接调用浏览器的截图，是获取不到完整内容的，因为动态列表组件只会渲染屏幕内的节点，如下图，

屏幕外的节点全不见了。

<img src="/assets/RxQxbnRo3o60LhxIEhTcq8r1nfh.png" src-width="411" class="markdown-img m-auto" src-height="545" align="center"/>

通过节点名，我知道了这是一个开源vue组件vue-recycle-scroller

https://github.com/Akryum/vue-virtual-scroller

同时也知道了，这个项目是用vue开发的。

<img src="/assets/OWhxbOIq8oBeWaxHPtgcwIVJnic.png" src-width="740" class="markdown-img m-auto" src-height="378" align="center"/>

从开源项目的文档中得知，可以通过修改buffer值，来控制动态列表提前缓存的节点数。

于是，我目前的方案是

可以先找到vue-recycle-scroller组件根结点node

```yaml
const targetNode = document.querySelector(itemWrapperSelector);
```

然后获取vue属性

```yaml
scroller.__vue__
```

修改buffer为一个超级大的值，让动态列表能提交缓存尽量多的节点。

```yaml
scroller.__vue__.buffer=500000
```

然后通过程序模拟滚动操作，让页面不断加载新的节点。让动态列表将全部节点生成好。

## 1.2 如何让隐藏的动态列表显示出来

虽然上面的方法让所有节点都生成了,但是动态列表会控制只显示能看到的，看不到的隐藏了，如下图。

所以如果此时截图，还是不行。

<img src="/assets/M2G1b123Yo6JL7xWxlecsKL8nvh.png" src-width="1304" class="markdown-img m-auto" src-height="1166" align="center"/>

而且这些不可见的节点坐标是错误的，需要为他们重新计算位置，然后把他们显示出来

## 1.3 微博信息太多，程序没法处理怎么办

 如果节点太多，比如上千条，如果让所有节点全显示，浏览器会卡死。

不过天无绝人之路，我

不过，我看到微博有搜索框。可以通过时间范围分段截屏

<img src="/assets/V6vwbbvk2oa0HIx82h1cTBDNnkc.png" src-width="630" class="markdown-img m-auto" src-height="179" align="center"/>

https://github.com/gildas-lormeau/SingleFile

https://github.com/gildas-lormeau/SingleFile/issues/440

 https://github.com/gildas-lormeau/SingleFile/issues/483

<img src="/assets/ALNsbbDzboPnPcxRYb0cS5wsnbc.png" src-width="1206" class="markdown-img m-auto" src-height="400" align="center"/>

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

