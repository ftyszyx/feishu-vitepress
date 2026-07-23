---
create_time: 1784689789
edit_time: 1784690613
title: Idapro
categories:
  - skill
---


# 1. 快捷键

f5: 看源码

# 2. 一些功能

看汇编：

通过点击“View”中“Open subviews”-&gt;“Disaassembly”调出来的

IDA View包括两种浏览模式，一种是Text View，一种是Graph View，右键能够相互跳转

IDA View主要包括三个区域：

-  **地址区：** PE文件加载到内存后的虚地址为准，镜像地址+偏移地址，如0x00401000
-  **OpCode操作区：** 该部分默认因此，需要Options-&gt;General-&gt;设置Number of opcode bytes为8显示出来，它是16进制数
-  **反编译代码区：** IDA主功能区域，能高亮显示，双击函数或变量名能跳转对应的地址。

<img src="/assets/PtTIbhioUoaYLcxP6CzcR3uTnib.png" src-width="1462" class="markdown-img m-auto" src-height="638" align="center"/>

IDA的View有几个按钮对定位代码很重要，如下图所示：

<img src="/assets/NtUKbEbz7o8cX7xfUV8ck6RFngd.png" src-width="894" class="markdown-img m-auto" src-height="819" align="center"/>

- Open exports window 打开导出窗口
- Open import window 打开导入窗口
- Open names window 函数和参数的命名列表
- Open functions window 程序调用的所有函数窗口
- Open strings window 打开字符串显示窗口

