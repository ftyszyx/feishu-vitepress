---
create_time: 1735693452
edit_time: 1737363313
title: 为了在linux上玩游戏，程序员拼了
categories:
  - other_platform
---


windows是花钱的，linux是免费的，所以国外很多人的电脑使用的是linux的系统。

但是目前大部分游戏都是以windows为主。有没有办法能在linux上玩widows的游戏呢？

从两者的芯片架构来说：应该是可行的，因为windows和linux都是基于x86架构。而windows上的可运行程序其实也是x86架构支持的机器码。按理说是可以互相运行的。

但是实际是不行的。

为什么呢？因为想让linux程序上能运行windows程序，中间还有一个操作系统 。linux和windows的提供给应用程序的系统接口不一样，所以不能互相兼容。

于是，有一批开源开发者开始努力做这件事了。

# 1.  **wine**

 **首先是wine:** **https://gitlab.winehq.org/wine/wine**

开发了31年，17万多提交。目的就是使用Linux的系统接口重新实现windows上的所有dll代码。牛逼

<img src="/assets/QD3lbKITXowWlHxLvVjcIRTNnNd.png" src-width="1886" class="markdown-img m-auto" src-height="568" align="center"/>

但这还不够。wine能让window程序在Linux上运行，但是对于游戏来说，不行。

因为windows游戏上使用的是封闭的driect 3d接口

Linux上使用的是opengl

接口可以模拟，但是shader不行。windows上使用的shader是经过编译的中间代码。

但是微软没有开源这个中间代码的结构（DXIL)。直到2017，微软开源了shader编译器，相当于开放了DXIL的格式。

于是google开源了一个项目，可以将DXIL转成vulkan的中间格式：SPIR.

# 2.  **DXVK**

 **于是又一个开源项目出来了：DXVK:** **https://github.com/doitsujin/dxvk**

可以以vulkan对d3d进行模拟。

# 3. proton

https://github.com/ValveSoftware/Proton

v社：游戏开发商。

将dxvk和wine整合起来的项目

然后又将Protont和Linux整合成一个系统steamos,

