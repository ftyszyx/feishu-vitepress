---
create_time: 1767418911
edit_time: 1769837999
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

## 1.5 增加雪球数据采集支持，并支持保存评论

<img src="/assets/W9kNbVqx8oHGw8x62EicL0Qnn3e.png" src-width="654" class="markdown-img m-auto" src-height="634" align="center"/>

## 1.6 增加手动激活功能，激活码时效可以累加

<img src="/assets/SHSLbuhwDoWd4jxtOUccPowUnec.png" src-width="790" class="markdown-img m-auto" src-height="449" align="center"/>

<img src="/assets/GuKzbUaD7oIUhhxsQFYcaW7mnnb.png" src-width="1271" class="markdown-img m-auto" src-height="258" align="center"/>

## 1.7 雪球支持时间范围(废弃）

<img src="/assets/VNnrb1nFnorBlMxOTqychKBDnWd.png" src-width="450" class="markdown-img m-auto" src-height="617" align="center"/>

## 1.8 雪球支持分页范围下载

因为雪球不支持时间范围的搜索，为了支持部分下载，我之前是从最近遍历全部页面，找到对应的时间范围的内容。但这个方法有问题。如果要采集的作者有好几百页，而我需要采集的范围是最后一页，程序还是会从第一页便利，效率低下。所以我修改了一下，通过设置采集的分页范围来采集

<img src="/assets/ILsJbLMwCoQi0nx3CwNcN6PUnYe.png" src-width="478" class="markdown-img m-auto" src-height="568" align="center"/>

其它的没有变。

## 1.9 微博采集增加设置单html保存的微博数量

<img src="/assets/C55SbL8U7oJZIjxHFOUcPbqfnof.png" src-width="455" class="markdown-img m-auto" src-height="576" align="center"/>

这个值 的意思是，保存的单个Html最大包含多少条微博数量

## 1.10 处理获取评论会卡住的问题

一直在获取同一条评论，原因未知

<img src="/assets/YstUbzZw8owNcwxdKXxc90PlnWc.png" src-width="1252" class="markdown-img m-auto" src-height="352" align="center"/>

增加异常处理

## 1.11 优化任务的按键表现

重置增加二次确认

<img src="/assets/Z8WtbjT1doE8iDxaurNc2z62nMh.png" src-width="1201" class="markdown-img m-auto" src-height="321" align="center"/>

<img src="/assets/WIygbrmhqoLSfxx8GRyc9WuQn4f.png" src-width="607" class="markdown-img m-auto" src-height="197" align="center"/>

任务完成后，增加任务重启功能，可以重新采集任务，方便更新最新的微博内容

<img src="/assets/MZCbbnbhnoGsYaxcgeEcRvdknUS.png" src-width="279" class="markdown-img m-auto" src-height="80" align="center"/>

<img src="/assets/DQUvbCw93oTZ4txBe8BcNHlKnmh.png" src-width="280" class="markdown-img m-auto" src-height="193" align="center"/>

每个icon按键增加提示

<img src="/assets/WpBebUJeAojUXUxPX8ncMgaNnzc.png" src-width="256" class="markdown-img m-auto" src-height="106" align="center"/>

<img src="/assets/HyOWbMr52orhTYxYpImcrpsMnNh.png" src-width="244" class="markdown-img m-auto" src-height="83" align="center"/>

<img src="/assets/CJXlbWmxBokFSRx5Nmyc2xpNnWd.png" src-width="238" class="markdown-img m-auto" src-height="105" align="center"/>

