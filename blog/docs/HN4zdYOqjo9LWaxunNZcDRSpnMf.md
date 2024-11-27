---
title: 给自己做一个1password：其它快捷功能(九）
create_time: 1725716328
edit_time: 1725719648
categories:
  - product
---


# 1. 入口

在密码库页面和系统管理页面都有入口

<img src="/assets/SsIhbQvSSoXtdFxLuOicSFJznMf.png" src-width="877" class="markdown-img m-auto" src-height="419" align="center"/>

<img src="/assets/SW2vbTHk5oYCyMxfL20cDcWJnd7.png" src-width="479" class="markdown-img m-auto" src-height="462" align="center"/>

# 2. 密码生成器

<img src="/assets/GFn5bNfEDovDOmxf38ec4RT7nZe.png" src-width="517" class="markdown-img m-auto" src-height="295" align="center"/>

分三种类型的密码：

1、随机密码：可以数字，字母，符号的任意组合，长度也可以自已设置。用途比较广

2、pin密码：只能是数字。主要是给银行卡使用

<img src="/assets/SbRcblnvMoHnHox0m60ch72Yndb.png" src-width="514" class="markdown-img m-auto" src-height="185" align="center"/>

3、易记忆密码：英文单词组合，方便记忆

<img src="/assets/ZNoBbUEU8oiFw2xNeQPcw81cnjb.png" src-width="515" class="markdown-img m-auto" src-height="290" align="center"/>

# 3. 本地备份和还原

<img src="/assets/VjqabkYNnoQA1fxAqcEcKMNTnvb.png" src-width="254" class="markdown-img m-auto" src-height="150" align="center"/>

会将软件主要的数据：

1、密钥数据（软件生成的25位密码）secret.key

2、软件设置信息set.json

3、本地数据库文件lockpass.db

<img src="/assets/Up9Nbnawqo2rfyxDxVtcE5Gyn4c.png" src-width="566" class="markdown-img m-auto" src-height="484" align="center"/>

打包成一个zip压缩包。

<img src="/assets/GddHb3wt2oigFnxKlTLcpiPwntg.png" src-width="403" class="markdown-img m-auto" src-height="177" align="center"/>

你可以将此文件转移到安全位置

当需要还原时，点本地还原，选择备份文件即可

<img src="/assets/T2aabmJatoakO9xZf50ciLScnYb.png" src-width="283" class="markdown-img m-auto" src-height="150" align="center"/>

# 4. 网盘的备份和还原

目前只支持备份到阿里云盘

<img src="/assets/Vq2gbxRm0oQLGdxElOpcMxJnnoh.png" src-width="395" class="markdown-img m-auto" src-height="185" align="center"/>

如果是第一次，会提示网盘的授权。

<img src="/assets/U0FObPUhwoLlRQxAEi3ciNAInDc.png" src-width="404" class="markdown-img m-auto" src-height="789" align="center"/>

 

点允许后，需要再选一次备份

<img src="/assets/PMtCb0yMToXHM3x4T05cgSINndM.png" src-width="592" class="markdown-img m-auto" src-height="108" align="center"/>

备份成功提示

<img src="/assets/FUvzbGw06oqNlUx5Bq2ckIHSnCf.png" src-width="417" class="markdown-img m-auto" src-height="138" align="center"/>

你就可以在你自己的阿里网盘上看到备份好的文件

网盘还原：

<img src="/assets/LsQXbsMZvocOwyxEgRxckWLInNh.png" src-width="397" class="markdown-img m-auto" src-height="193" align="center"/>

选择你要还原的备份

<img src="/assets/GTwDbQZDDoP2UDx5qsPcNhCknLb.png" src-width="511" class="markdown-img m-auto" src-height="363" align="center"/>

点确定后开始还原，并会自动重启

<img src="/assets/DlvdbcNyooAHVKxXHBGcw2SLnQf.png" src-width="418" class="markdown-img m-auto" src-height="153" align="center"/>

# 5. csv导入和导出

因为我们大部分的密码存在了浏览器里，如果想把相关数据导入到此软件，需要去浏览器里导出自己的密码。一般会生成一个csv。

然后就可以用此功能将chrome和edge的账号密码导入到软件内

导入：

<img src="/assets/Z8AcbaAqLogEK6xdvvZcBPTNnkd.gif" src-width="876" class="markdown-img m-auto" src-height="656" align="center"/>

导出

<img src="/assets/UhzFbtpiDousJ7xaUKOcLnDZn8d.gif" src-width="874" class="markdown-img m-auto" src-height="644" align="center"/>

# 6. 修改主密码

慎用，会将所有数据用新密码重新加密

<img src="/assets/ENzwbTpqwoWnJDx2lgRcLuR4nfb.png" src-width="240" class="markdown-img m-auto" src-height="416" align="center"/>

# 7. 切换账号

<img src="/assets/DCdXb8fHzoUugsxw2whcZRJ2nCg.gif" src-width="860" class="markdown-img m-auto" src-height="642" align="center"/>

# 8. 结语

 **如果有bug可以在** **https://github.com/ftyszyx/lockpass/issues** **上说明，或者发邮件** **whyzi@qq.com**

