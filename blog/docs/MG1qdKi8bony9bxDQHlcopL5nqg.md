---
create_time: 1784001348
edit_time: 1785309127
title: aimeter(ai使用量统计工具）
categories:
  - product
---


# 1. 功能说明：

一个桌面工具，通过中转站api，统计ai token的真实使用量

下载地址：https://aimeter.bytefuse.cn/

# 2. 为什么做这个

经常使用一些中转站的api服务，但是呢很多中转站的计费api都不一样，为了知道我每天用了多少钱，之前是使用ccswitch，其内置了一个计费小模块，挺好用。

但是最近不想使用ccswitch了，如果为了只使用他的计费模块去安装ccswitch，感觉有点鸡肋，于是让ai写了一个。

## 2.1 为什么是做一个桌面端程序

因为程序需要定时的去请求api和保存数据，如果做网站的话还需要配一套服务端程序和数据库，把问题变复杂了，而且维护成本也高

## 2.2 为什么使用tauri

编译出来的程序比较轻量，只有6M.

# 3. 使用方法

## 3.1 添加采集接口

<img src="/assets/CMGsbYF8romE6zxsgb2czwM5n4e.png" src-width="1182" class="markdown-img m-auto" src-height="792" align="center"/>

根据官方的接口，配置，这里不细讲

<img src="/assets/QHJzbpeSIo671XxbImBc1W0Vnxc.png" src-width="674" class="markdown-img m-auto" src-height="702" align="center"/>

配置完后点刷新，可以立即统计

<img src="/assets/POfQbtqqFoI8PKxh1mMcWa1dncb.png" src-width="901" class="markdown-img m-auto" src-height="87" align="center"/>

关掉页面后，软件会定时自动统计接口的使用量，并保存。

## 3.2 从概览中看统计结果

<img src="/assets/SROrb1wRzoOvvbxPdWVcKNnNneg.png" src-width="1136" class="markdown-img m-auto" src-height="656" align="center"/>

<img src="/assets/JGsTbShPAoB411x5pa2cRSconld.png" src-width="871" class="markdown-img m-auto" src-height="420" align="center"/>

# 4. 结尾

一个简单的工具，满足了自己的需求

