---
cover: /assets/FFWSblP6zo229NxRuDqcodDJntg.jpeg
create_time: 1762350667
edit_time: 1762351641
title: webcloner-告别截图！WebCloner全新微博备份方案，长微博、高清图一个都不少
categories:
  - product
---


告别截图！WebCloner全新微博备份方案，长微博、高清图一个都不少

# 1.  **正文**

之前我跟大家分享过用WebCloner备份新浪微博的方法，是通过网页截图的方式实现的。 虽然当时解决了动态列表的问题，但最近我发现这种方案存在一些问题。

 **问题1：长微博不完整**

截屏保存的时候，有些长微博无法完整显示。 微博首页只显示部分内容，需要展开才能看到全文。

<img src="/assets/L1xYb5O0zo2WJ1xzdpKcklQHnlb.png" src-width="536" class="markdown-img m-auto" src-height="283" align="center"/>

 **问题2：图片无法放大**

微博中的图片无法放大，有些图片会看不清楚。

<img src="/assets/SNwub84nGoqmgAx3ZwectuULnmc.png" src-width="357" class="markdown-img m-auto" src-height="161" align="center"/>

考虑到备份的主要目的是保存内容，样式是次要需求，我决定彻底升级微博备份方案！

 **全新方案：抓取原始数据，生成本地网页**

 **备份效果**

<img src="/assets/SeCDbwD1MocQhRxPQ4YcI3UYnDc.gif" src-width="1626" class="markdown-img m-auto" src-height="1172" align="center"/>

 **输出目录**：

<img src="/assets/UTvwbHPr1ozZx5xuojUcbMqNnpJ.png" src-width="610" class="markdown-img m-auto" src-height="107" align="center"/>

-  **html目录：** 存放程序生成的页面，每100条微博生成一个页面，按照开始时间和结束时间命名。

<img src="/assets/AAOcbatSkoN2j1xIQozc6t4YnUh.png" src-width="383" class="markdown-img m-auto" src-height="35" align="center"/>

-  **页面内容：** 完美处理了长微博和图片的问题，图片会保存最高清的版本！

<img src="/assets/Wto5bpareoPUMixN0z8cPgGDndc.png" src-width="1035" class="markdown-img m-auto" src-height="350" align="center"/>

<img src="/assets/Qf8CbGmWOoxLPTxEoGXcXCTqnPb.png" src-width="742" class="markdown-img m-auto" src-height="463" align="center"/>

点击图片后会弹出一个大图显示，方便查看。

<img src="/assets/V1o0bC91NocX5exRLkOcEVKfnVc.png" src-width="1625" class="markdown-img m-auto" src-height="629" align="center"/>

 **resource目录：** 保存所有的图片资源，方便用户查看。

<img src="/assets/DvGgb49OaoWxJzx8qwZcg37nnNd.png" src-width="673" class="markdown-img m-auto" src-height="271" align="center"/>

# 2. 总结

大家可以试用一下，有问题可以联系我，QQ：2246855973。

下载地址：https://webcloner.bytefuse.cn/zh-CN

