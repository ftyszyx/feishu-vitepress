---
title: 给自己做一个1password：自已的密码管理器demo已经完成，简单介绍一下（三）
cover: /assets/QvSPbcJjYo3htyxwDmhciLu7nTT.png
create_time: 1725638674
edit_time: 1725752417
categories:
  - product
---


# 主要功能

利用业余时间，断断续续的把密码管理器实现了。基本功能如下：

1.  **双密码机制:** 主密码和25字符的key(软件生成）组合成超强密码
2.  **AES数据加密:** 本地存储的敏感信息通过aes-256-cbc进行加密存储
3.  **多种密码信息支持:** 登陆信息、银行卡信息、笔记信息的保存
4.  **保险库功能:**将不同的密码信息分类保存
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

# 代码开源地址

https://github.com/ftyszyx/lockpass

# 下载地址

目前是github自动打的包

https://github.com/ftyszyx/lockpass/releases

## Windows平台（主要测试）：

32位

<img src="/assets/EorObdgCQoC5VWxu3RJcBrCGnzd.png" src-width="381" class="markdown-img m-auto" src-height="38" align="center"/>

 64位就下载

<img src="/assets/XxWObtM2goQcQBxVfmdcBHh6nLc.png" src-width="324" class="markdown-img m-auto" src-height="31" align="center"/>

## mac平台（没测试过）

如果有问题可以issue我

<img src="/assets/DgLTbzwxloA6k3x63bycaCnHnth.png" src-width="698" class="markdown-img m-auto" src-height="159" align="center"/>

## linux平台（没测试过）

如果有问题可以issue我

<img src="/assets/IFU0bIxuQoJqcuxJz9HcJHyrnng.png" src-width="583" class="markdown-img m-auto" src-height="84" align="center"/>

# 说明

1. 目前只是个demo版本，有可能会有各种问题。如果因使用本软件造成你的数据丢失，本人不负任何责任。
2. 如果遇到软件bug，请提交问题给我。

 **如果有bug可以在** **https://github.com/ftyszyx/lockpass/issues** **上说明，或者发邮件** **whyzi@qq.com**

