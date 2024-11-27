---
title: 密码管理器github说明
create_time: 1725104206
edit_time: 1725846449
categories:
  - product
---


一个密码管理器

## 1.1  **背景**

互联网时代，账号密码太多，之前的方法是保存在一个记事本中。但缺乏安全性，搜索也不方便。

市面上有不少密码管理工具，但都需要服务器。但密码这种敏感信息，存在别人服务器上总感觉不放心。

心想基本功能只是一个加密存储和搜索，实现起来应该不难，于是自己参考1password做了一个。

目前功能尚不完善，我会在使用过程中不断优化。大家也可以试用一下，有什么建议可以提。

我的目标目前很简单：

1、只个人使用，不搞什么分享，协作这些复杂的完意

2、不要服务器，只提供网盘备份和恢复功能。自己的数据自己掌握

## 1.2  **原理介绍**

1、类似1password的双密码机制：主密码（用户自己记住）+key(软件生成长度为25的随机密码）

2、机密信息使用aes-256-cbc加密算法。密钥是 sha256(主密码+key)

3、数据存在本地，使用sqlite数据库

## 1.3  **功能介绍**

1.  **双密码机制:** 主密码和25字符的key(软件生成）组合成超强密码
2.  **AES数据加密:** 本地存储的敏感信息通过aes-256-cbc进行加密存储
3.  **多种密码信息支持:** 登陆信息、银行卡信息、笔记信息的保存
4.  **保险库功能:** 将不同的密码信息分类保存
5.  **多账号功能:** 软件可以切换不同的账号（这样你可以将你父母的你自己密码信息隔离保存，因为不同账号主密码可以不同）
6.  **随机密码生成工具:** 再也不用担心密码不够安全，不符合网站的需求。工具帮你随机按需生成密码
7.  **键盘自动输入:** 通过快捷键呼出密码快捷搜索窗口，选中后，自动输入账号密码
8.  **多语言支持:**  支持中文和英文的快速切换
9.  **本地备份文件的导出和导入:**   可以将个人信息保存成zip文件，同时也可以导入此备份信息。
10.  **云盘备份和恢复:**  可以将软件数据保存到云盘，或者从云盘上恢复相应的备份。（目前只支持阿里云盘）
11.  **csv导入和导出:** 可以导入chrome或者edge浏览器导出的csv密码文件到软件中，也可以导出软件的密码信息成csv
12.  **修改主密码:** 可以方便的修改主密码（注意备份）
13.  **程序自动更新:** 支持从github上更新最新版本
14.  **开机自启动**
15.  **系统锁定，软件也锁定**

## 1.4  **演示效果**

### 1.4.1  **保险库**

<img src="/assets/J2JSbjsYpots6zxdObtcLQjNnvg.gif" src-width="918" class="markdown-img m-auto" src-height="614" align="center"/>

### 1.4.2  **增保密信息**

<img src="/assets/WIpwbuzdpov0QBx3gfhcv5hmnJd.gif" src-width="874" class="markdown-img m-auto" src-height="654" align="center"/>

### 1.4.3  **保密信息预览**

<img src="/assets/PaRDbyqASo5B6rx57X2cfdd0nTe.gif" src-width="974" class="markdown-img m-auto" src-height="728" align="center"/>

### 1.4.4  **保密信息编辑**

<img src="/assets/VZtRbLDijoYEqAx02CccGMeMnhd.gif" src-width="878" class="markdown-img m-auto" src-height="652" align="center"/>

### 1.4.5  **用户设置功能**

<img src="/assets/Ud6ibdHu7o4PCSxPeuicyVfXngd.gif" src-width="872" class="markdown-img m-auto" src-height="612" align="center"/>

### 1.4.6  **密码生成器**

<img src="/assets/R0yGbj9laoiboRx2fZ8ce9Nmnld.gif" src-width="1028" class="markdown-img m-auto" src-height="656" align="center"/>

### 1.4.7  **tray托盘**

<img src="/assets/O9iNbgRj3ok9YbxggjdcwlZynDS.png" src-width="244" class="markdown-img m-auto" src-height="140" align="center"/>

### 1.4.8  **自动输入**

<img src="/assets/OGoGb6j3RoGgUwxQbITcpQPjnSf.gif" src-width="1120" class="markdown-img m-auto" src-height="726" align="center"/>

### 1.4.9  **csv导入**

<img src="/assets/Z7RObWhM0ouHS3xy4vKcvdV1nbg.gif" src-width="876" class="markdown-img m-auto" src-height="656" align="center"/>

### 1.4.10  **csv导出**

<img src="/assets/X170bJ7sAoigCQxBD5HcmunnnRg.gif" src-width="874" class="markdown-img m-auto" src-height="644" align="center"/>

### 1.4.11  **多账号**

<img src="/assets/PL7hbSig9oE2dyxlGXzc4Ep2neg.gif" src-width="860" class="markdown-img m-auto" src-height="642" align="center"/>

### 1.4.12  **网盘备份和还原**

<img src="/assets/SLj9bpWP7oZ2nsx25X4cLgpwn5f.gif" src-width="882" class="markdown-img m-auto" src-height="656" align="center"/>

 **开发说明**

### 1.4.13  **下载代码**

```text
git clone https://github.com/ftyszyx/lockpass.git
```

### 1.4.14  **安装依赖**

```text
npm install
```

### 1.4.15  **运行**

```text
npm run dev
```

## 1.5  **使用的库**

### 1.5.1  **打包**

[electron-vite](https://github.com/alex8088/electron-vite)

<u>electron-builder 打包</u>

<u>electron-builder github</u>

其实打包流程就是 electron vite先把main render preload下的脚本用vite打包到out目录下 然后electron-build把资源打成asar

## 1.6  **遇到的问题汇总**

