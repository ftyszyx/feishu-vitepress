---
create_time: 1767418911
edit_time: 1768024551
title: webcloner-功能优化记录
categories:
  - product
---


# 1. 2026-1

## 1.1 微博采集的结束时间问题

之前结束时间也是以当天的0点为时间点，导致你选了结束时间是1.24号，但是1月24号的内容是不会采集的。

让人误解。

所以修改了一下，如果你选择了1.240号，软件自动采集到1.25号的0点。这样24号的内容也会保存。

<img src="/assets/IIMTbC7AYo0RilxUevvcRCsmnHh.png" src-width="2465" class="markdown-img m-auto" src-height="365" align="center"/>

## 1.2 保存后的html样式修改

微博之前的保存样式是内容靠左，没有总条数。

优化了一下

<img src="/assets/VYQbbQtNNofDOFxRRdDcp9YQndd.png" src-width="2456" class="markdown-img m-auto" src-height="1190" align="center"/>

## 1.3 微博专栏的备份

之前专栏的内容是无法保存

<img src="/assets/QgbabBz12owuPpxe2w5cbjR9nId.png" src-width="519" class="markdown-img m-auto" src-height="391" align="center"/>

<img src="/assets/TEYhbgvPPo4wkixcToscnQMvnug.png" src-width="592" class="markdown-img m-auto" src-height="316" align="center"/>

现在支持了

<img src="/assets/BepibkxPGo1kkixySDDcHTVBnve.png" src-width="603" class="markdown-img m-auto" src-height="417" align="center"/>

点后打开对应的文章页面

<img src="/assets/QdngbOUSmoXeaNxRfRXcZKcMnxp.png" src-width="1181" class="markdown-img m-auto" src-height="811" align="center"/>

这个页面是保存成一个mhtml

<img src="/assets/RgpFblxHCok93qxkrWOca6Zxnjg.png" src-width="1128" class="markdown-img m-auto" src-height="308" align="center"/>

## 1.4 处理部分微博不支持搜索采集的问题

有些人的微博不支持搜索功能，如下，只能通过全部微博采集

<img src="/assets/HfIDbHaXEoLfMOxEb1LckduSnuf.png" src-width="594" class="markdown-img m-auto" src-height="549" align="center"/>

在页面中增加了开关，是否使用时间范围，关掉此选项即可。

<img src="/assets/UHkLbz9y4o6MWUx28pCcZGXPnfb.png" src-width="454" class="markdown-img m-auto" src-height="517" align="center"/>

