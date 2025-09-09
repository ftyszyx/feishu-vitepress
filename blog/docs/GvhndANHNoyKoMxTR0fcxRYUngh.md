---
keywords:
  - webcloner
  - 新浪微博
  - 备份
create_time: 1757294226
edit_time: 1757340260
title: webcloner功能演示-备份我的新浪微博
categories:
  - product
---


# 1. 账号

<img src="/assets/PaJ5bG6tzoFKKexx8vdc74N7nYb.png" src-width="479" class="markdown-img m-auto" src-height="247" align="center"/>

# 2. 任务 

<img src="/assets/LWqcbgQ1QonlDCxi2nhcOzORnVh.png" src-width="461" class="markdown-img m-auto" src-height="559" align="center"/>

# 3. 遇到的问题

## 3.1 截图不全

<img src="/assets/V5UCbcmcoocUgGxEQjBcZk1KnOb.png" src-width="411" class="markdown-img m-auto" src-height="545" align="center"/>

微博的内容不像qq空间是分页的，是瀑布式，

而且是动态加载，就是说你向下滚动的时候，他的dom节点数量是不变的，只展示你能看见的内容

<img src="/assets/Y5pkb76dcoztXMxxommcO50mnxe.png" src-width="1915" class="markdown-img m-auto" src-height="485" align="center"/>

所以截屏的话，就会截不到不显示的内容。

## 3.2 想到个方法

 从动态节点名vue-recycle-scroller得知，这应该是一个开源库：

https://github.com/Akryum/vue-virtual-scroller

微博的项目应该是用vue写的

从开源项目文档可知调整节点的buffer属性就控制着页面显示的大小

可以先找到这个node

```yaml
const targetNode = document.querySelector(itemWrapperSelector);
```

然后获取vue属性

```yaml
scroller.__vue__
```

修改buffer为一个超级大的值，也不能太大，太大的话，网页保存的太大了，

再滚动到底，测试

