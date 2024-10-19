---
title: il2cpp学习
keywords:
  - il2cpp
  - unity
create_time: 1723617254
edit_time: 1723690683
categories:
  - skill
---


# 官方文档：

https://docs.unity3d.com/Manual/IL2CPP.html

https://unity.com/cn/blog/engine-platform/an-introduction-to-ilcpp-internals

# 介绍

## il2cpp的功能：

 **1、将IL语言（c#编译器的中间代理）转成c++源码**

AOT compiler translates Intermediate Language (IL), the low-level output from .NET compilers, to C++ source code

 **2、A runtime library to support the virtual machine（GC，平台接口封装）**

 **功能1的实现主要是靠il2cpp.exe**

il2cpp编译器在Editor\Data\il2cpp directory，使用c#编写的。

<img src="/assets/EpJdbxreeoD32MxSmz5cRMzCnfy.png" src-width="670" class="markdown-img m-auto" src-height="255" align="center"/>

 **功能2 runtime library**

是用c++写的。称之回libil2cpp.有源码

<img src="/assets/Z2N7bEZRkor3RaxBeC7cw9N6nRc.png" src-width="641" class="markdown-img m-auto" src-height="366" align="center"/>

 

## 生成的代码解读

在导出Unity工程时，il2cpp的代码会输出到

<img src="/assets/XXsFbmRd2od3qhxL8jJcte8anZc.png" src-width="576" class="markdown-img m-auto" src-height="106" align="center"/>

1、导出的代码中函数和结构的命名

Types are named with a “_t” suffix. Methods are named with a “_m” suffix.

为了保证唯一，在结尾加上一个unique number

2、每个函数都会有两个参数

"this" pointer and the MethodInfo pointer.

<img src="/assets/Dk52bcZ46o6NkDxnPKjc4Wpsn5c.png" src-width="757" class="markdown-img m-auto" src-height="51" align="center"/>

如果是C#中的静态函数，this就是null

## i2cpp打包流程

1. 用roslyn编译代码

The Roslyn C# compiler compiles your application’s C# code and any required package code to .NET DLLs (managed assemblies).

roslyn是微软的开源项目

https://github.com/dotnet/roslyn

用来编译donet

2、代码裁剪，unity实现

Unity applies managed <u>bytecode stripping</u>. This step can significantly reduce the size of a built application.

3、il2cpp将裁剪后的代码转成c++

