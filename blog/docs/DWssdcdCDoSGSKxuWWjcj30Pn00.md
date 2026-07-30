---
create_time: 1784001398
edit_time: 1785336163
title: Wemory 微忆
categories:
  - product
---


# 1. 功能说明

wemory：是一个能读取和导出windows端微信聊天记录，朋友圈记录，和好友通讯录的工具

下载地址： https://wemory.bytefuse.cn/

主要功能如下

1. 读取和备份微信本地的聊天记录
2. 读取和备份微信本地的朋友圈记录
3. 导出和备份自己的全部好友
4. 导出和备份群成员
5. 聊天防撤回，朋友圈防撤回

# 2. 原理说明

微信的数据是使用sqlite保存的，但是经过了加密。

通过扫描微信进程的内存，获取微信加密的key,程序即可读取到解密后的信息。

声明：本软件不上传信息到服务器，也不修改你本地的数据。

# 3. 使用说明

## 3.1 第一次使用，先连接自己的微信

### 3.1.1  **首先要在windows上登录自己的微信**

打开软件后，提示连接微信

### 3.1.2 选择微信数据目录

<img src="/assets/U2PIbyxp1oIRvdxuafEcMMg9nlc.png" src-width="1280" class="markdown-img m-auto" src-height="752" align="center"/>

选自动检测，如果检测失败，可以自己打开微信设置查看，然后通过浏览目录设置

<img src="/assets/WDYib7m1Mok5eaxtG7bcNSCxnee.png" src-width="192" class="markdown-img m-auto" src-height="210" align="center"/>

<img src="/assets/LyZHbfOyXoMyGoxYzAEcSmXvnmb.png" src-width="640" class="markdown-img m-auto" src-height="560" align="center"/>

### 3.1.3 设置缓存目录（可以直接下一步）

<img src="/assets/Sf5bbf83boBj98xBWAVcIShnnne.png" src-width="674" class="markdown-img m-auto" src-height="501" align="center"/>

### 3.1.4 选择账号

<img src="/assets/UWbkbVHF1ofaV2xfTbccNEc6nDg.png" src-width="677" class="markdown-img m-auto" src-height="505" align="center"/>

### 3.1.5 获取key

<img src="/assets/KF1ubSXsKooZcUxs3uccXXuSnyg.png" src-width="675" class="markdown-img m-auto" src-height="532" align="center"/>

### 3.1.6 完成

<img src="/assets/SQBAbV76uoyTgRxuO4ac51mYnng.png" src-width="985" class="markdown-img m-auto" src-height="731" align="center"/>

## 3.2 以后就可以直接进入主页

<img src="/assets/WDQBbabVMoQ5MOx2TIWcVe5Lncd.png" src-width="1920" class="markdown-img m-auto" src-height="1128" align="center"/>

## 3.3 聊天功能

可以看到当前的全部聊天信息，并已经分好类

<img src="/assets/ELwYbLW6HouyvsxmC4RcKcdFnCO.png" src-width="608" class="markdown-img m-auto" src-height="86" align="center"/>

### 3.3.1 私聊

<img src="/assets/HJOYb1yzToHwmGxuaQNc8uSEn0b.png" src-width="1589" class="markdown-img m-auto" src-height="1082" align="center"/>

### 3.3.2 群聊

<img src="/assets/Qea1bZK1rouAkCxCPfYceXTrnGc.png" src-width="1611" class="markdown-img m-auto" src-height="1019" align="center"/>

### 3.3.3 聊天防撤回

开启后，会防止微信pc端删除已经接收到的信息

<img src="/assets/PvOLbdparoD4AFxOCRBckwiLnxc.png" src-width="959" class="markdown-img m-auto" src-height="612" align="center"/>

### 3.3.4 聊天导出

勾选你要导出的群，点导出

<img src="/assets/PMNObfwTBoEO5gxmHmrcMEoFnoh.png" src-width="1541" class="markdown-img m-auto" src-height="1073" align="center"/>

可以导出html或者 pdf

<img src="/assets/Noqtbo3qOoBK3QxUS3ecZOZpngf.png" src-width="1016" class="markdown-img m-auto" src-height="744" align="center"/>

## 3.4 朋友圈功能

<img src="/assets/Hhy0bTDJooHORdxlBpVc2i8Vnhg.png" src-width="1279" class="markdown-img m-auto" src-height="752" align="center"/>

### 3.4.1 防删除

开启后，只要已经读取到的朋友圈信息，如果对方删除了，本地还是可见

<img src="/assets/MZ6gbXGKxo1l6kxnbUOcERasnoc.png" src-width="1653" class="markdown-img m-auto" src-height="89" align="center"/>

<img src="/assets/ArbubKT3Iou5DFxwUGUcZqHwnBh.png" src-width="696" class="markdown-img m-auto" src-height="221" align="center"/>

### 3.4.2 导出

<img src="/assets/Td6ibEbbnoHsbdxGCV5civUrnzc.png" src-width="1566" class="markdown-img m-auto" src-height="91" align="center"/>

可以设置导出时间范围，发送人，等

<img src="/assets/JHahbEbi9oR2FhxGbGjcqpW6nWh.png" src-width="892" class="markdown-img m-auto" src-height="1015" align="center"/>

