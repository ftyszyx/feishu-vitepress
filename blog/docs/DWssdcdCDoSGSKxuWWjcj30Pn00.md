---
create_time: 1784001398
edit_time: 1786888132
title: Wemory 微忆
categories:
  - product
---


 **Wemory（微忆）**是一款面向 Windows 微信用户的本地数据读取、备份和导出工具，支持聊天记录、朋友圈、联系人、群成员和公众号内容。

- 适用平台：Windows
- 使用前提：电脑端微信已安装并保持登录在线

下载地址：https://wemory.bytefuse.cn/

隐私说明：数据仅在本机读取和处理，不上传服务器，也不修改微信本地数据。

# 1. 1. 产品概览

Wemory（微忆）可在 Windows 本地读取、备份和导出微信聊天记录、朋友圈记录、联系人及群成员信息。

请从文档顶部的下载地址获取最新版本。

核心功能：

1. 读取和备份微信聊天记录
2. 读取和备份微信朋友圈记录
3. 导出好友列表
4. 导出群成员列表
5. 保留已接收的聊天消息，朋友圈防撤回
6. 公众号批量采集和导出
7. ai工具支持

# 2. 2. 工作原理与隐私

微信数据保存在本地 SQLite 数据库中，数据库内容经过加密。

Wemory 在微信进程运行期间从本机内存中获取数据库解密密钥，并在本地读取解密后的数据。

隐私声明：Wemory 不会将你的微信数据上传到服务器，也不会修改微信本地数据。请妥善保管导出文件，避免泄露个人信息。

# 3. 3. 使用指南

## 3.1 3.1 首次连接微信

### 3.1.1  **在 Windows 上登录微信**

打开软件后，提示连接微信

### 3.1.2 选择微信数据目录

<img src="/assets/E1EGb1PYqoxbM2xQK2kcKn7znzd.png" src-width="997" class="markdown-img m-auto" src-height="755" align="center"/>

### 3.1.3 设置缓存目录（可以直接下一步）

<img src="/assets/FJ3Pbt5lXoCKe1xBDqmcCMyLnoe.png" src-width="1026" class="markdown-img m-auto" src-height="759" align="center"/>

### 3.1.4 选择账号

<img src="/assets/FPIHbVVMjoYcGbxeTtOcPKkxnqg.png" src-width="1070" class="markdown-img m-auto" src-height="783" align="center"/>

### 3.1.5 获取解密密钥

请确保 Windows 版微信保持登录在线。

<img src="/assets/Sf3Fb8e9oo08TIxBQG1cIk4wnod.png" src-width="1098" class="markdown-img m-auto" src-height="800" align="center"/>

<img src="/assets/ZuGObUgwLo6FtLxfdIbceURUnUh.png" src-width="1078" class="markdown-img m-auto" src-height="805" align="center"/>

### 3.1.6 完成

<img src="/assets/SQBAbV76uoyTgRxuO4ac51mYnng.png" src-width="985" class="markdown-img m-auto" src-height="731" align="center"/>

### 3.1.7 直接进入主页

<img src="/assets/WDQBbabVMoQ5MOx2TIWcVe5Lncd.png" src-width="1920" class="markdown-img m-auto" src-height="1128" align="center"/>

## 3.2 3.2 聊天记录：读取、备份与导出

可以看到当前的全部聊天信息，并已经分好类

<img src="/assets/ELwYbLW6HouyvsxmC4RcKcdFnCO.png" src-width="608" class="markdown-img m-auto" src-height="86" align="center"/>

### 3.2.1 私聊

<img src="/assets/HJOYb1yzToHwmGxuaQNc8uSEn0b.png" src-width="1589" class="markdown-img m-auto" src-height="1082" align="center"/>

### 3.2.2 群聊

<img src="/assets/VIYObmdh1oZJKExOrVpcn0HTn5f.png" src-width="1288" class="markdown-img m-auto" src-height="791" align="center"/>

### 3.2.3 保留已接收的聊天消息

开启后，Wemory 会在本地保留已经接收并读取到的消息。

<img src="/assets/RwMHbNcZRoA2YyxYYcicdxpYnbd.png" src-width="1264" class="markdown-img m-auto" src-height="812" align="center"/>

### 3.2.4 导出聊天记录

选择需要导出的会话或群聊，然后点击“导出”。

<img src="/assets/Eq4Ub46zwowBlUxpvOcciRD5nwb.png" src-width="1168" class="markdown-img m-auto" src-height="807" align="center"/>

支持导出为 HTML 或 PDF。

<img src="/assets/Noqtbo3qOoBK3QxUS3ecZOZpngf.png" src-width="1016" class="markdown-img m-auto" src-height="744" align="center"/>

## 3.3 3.3 朋友圈：读取、保留与导出

<img src="/assets/Kw45bDAwDo3LFsxNbAtcsLDNnHd.png" src-width="1874" class="markdown-img m-auto" src-height="1095" align="center"/>

### 3.3.1 保留已读取的朋友圈

开启后，已被 Wemory 读取的朋友圈内容会保留在本地；即使发布者之后删除，仍可在 Wemory 中查看。

<img src="/assets/MZ6gbXGKxo1l6kxnbUOcERasnoc.png" src-width="1653" class="markdown-img m-auto" src-height="89" align="center"/>

<img src="/assets/ArbubKT3Iou5DFxwUGUcZqHwnBh.png" src-width="696" class="markdown-img m-auto" src-height="221" align="center"/>

### 3.3.2 导出

<img src="/assets/Td6ibEbbnoHsbdxGCV5civUrnzc.png" src-width="1566" class="markdown-img m-auto" src-height="91" align="center"/>

导出时可按时间范围、发布者等条件筛选。

<img src="/assets/OZjgbOA8Jok56mxK4qjcLEjxnde.png" src-width="1141" class="markdown-img m-auto" src-height="1122" align="center"/>

## 3.4 3.4 公众号：采集与导出

### 3.4.1 采集

方法如下：

1. 先在微信内部浏览器打开公众号

<img src="/assets/YgGcbVCCFoSPufxZ9q2crhWWnVe.png" src-width="1344" class="markdown-img m-auto" src-height="503" align="center"/>

打开里面的一篇文章

<img src="/assets/JLyDbHiYUoxGTRxZcypcZshDnoN.png" src-width="1110" class="markdown-img m-auto" src-height="1055" align="center"/>

复制链接

<img src="/assets/Bj06bo8AdoPa11xrERhcnln7nWc.png" src-width="1198" class="markdown-img m-auto" src-height="480" align="center"/>

发给自己备用

<img src="/assets/HD3UbBxYuoTZcAxJX58cVwC3nMd.png" src-width="3648" class="markdown-img m-auto" src-height="731" align="center"/>

新增采集

<img src="/assets/GCOhb2ZmyoZn7qxwl67cHolknvd.png" src-width="1660" class="markdown-img m-auto" src-height="836" align="center"/>

输入刚才的文章链接，点解析

<img src="/assets/Fdb7bwx1voUYo2xcXO9cb8qrnqf.png" src-width="1121" class="markdown-img m-auto" src-height="435" align="center"/>

在微信中点刚才的链接，

<img src="/assets/Nrwub1tCUobsn7x0egjcrgMMnfc.png" src-width="3648" class="markdown-img m-auto" src-height="873" align="center"/>

再点获取授权

<img src="/assets/EewFbRk8RoiXKvxmGsWcVuWynDX.png" src-width="1118" class="markdown-img m-auto" src-height="665" align="center"/>

成功后，选择范围，开始采集

<img src="/assets/L2MIb1nX6oyaX1x6t6scWy2Jn3g.png" src-width="1124" class="markdown-img m-auto" src-height="711" align="center"/>

<img src="/assets/ShbCbUaZHo4752xA88XcNOmDn5w.png" src-width="1794" class="markdown-img m-auto" src-height="777" align="center"/>

### 3.4.2 导出

<img src="/assets/WKNtbD6qYogIMdx9rL9ckvzVnyh.png" src-width="1565" class="markdown-img m-auto" src-height="962" align="center"/>

<img src="/assets/SFDkb3A1cokYV4xOnQ9cD9Jjnqd.png" src-width="1156" class="markdown-img m-auto" src-height="718" align="center"/>

## 3.5 3.5 联系人与群成员导出

<img src="/assets/LkALbhNBMo6R5rxpDNQcCUCungG.png" src-width="1892" class="markdown-img m-auto" src-height="927" align="center"/>

<img src="/assets/OaNzb2ooGoboKDxIF8XcvZZfnnc.png" src-width="907" class="markdown-img m-auto" src-height="456" align="center"/>

# 4. 4. 常见问题

## 4.1 数据库目录检测失败

如果自动检测失败，请在微信设置中查看文件存储位置，然后在 Wemory 中手动选择对应目录。

<img src="/assets/MJx0bFAyBotHHsxcZkqcZP53nHf.png" src-width="192" class="markdown-img m-auto" src-height="210" align="center"/>

<img src="/assets/I0FibyyAOo7RdHxEfNGcmZssnfg.png" src-width="640" class="markdown-img m-auto" src-height="560" align="center"/>

通过浏览目录选择

## 4.2 获取解密密钥失败

确认 Windows 版微信已登录并保持在线，同时检查当前微信版本是否受 Wemory 支持。

