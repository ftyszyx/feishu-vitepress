---
title: unity 内存分析工具
keywords:
  - unity
  - memory profiler
create_time: 1721205501
categories:
  - skill
---


# 官方文档

[地址](https://docs.unity3d.com/Packages/com.unity.memoryprofiler@1.0/manual/memory-profiler-window-reference.html)

## Summary 窗口

### Memory usage on device

<img src="/assets/CIKrbK940oDu0pxh3Kfca5kDn6d.png" src-width="1093" class="markdown-img m-auto" src-height="162" align="center"/>

The application footprint in physical memory. It includes all Unity and non-Unity allocations resident in memory at the time of the capture.

意思是说，这里显示的是系统的总被使用的内存为3.94G。其它应用使用了1.07G。

但是我在xcode中看到

<img src="/assets/NIJzb0dNHoUjPhxYwtfcfaZuncb.png" src-width="792" class="markdown-img m-auto" src-height="221" align="center"/>

上面说应用全用了1.98个G内存。差距有点大。

### **Allocated Memory Distribution**

Displays how your allocated memory is distributed across different memory categories.

这里才是unity跟踪到的内存分配：总共有1.22G。但还是小于xcode中显示的，而且这里可以点inspect去查看具体是什么。

<img src="/assets/PuPRbYzS0oZfrIxPgencDmPrnld.png" src-width="1081" class="markdown-img m-auto" src-height="210" align="center"/>

### **Managed Heap Utilization**

意思是Unity内存分配的内存，不是用户分配的，

Displays a breakdown of the memory that Unity manages which you can't affect, such as memory in the managed heap, memory used by a virtual machine, or any empty memory pre-allocated for similar purposes.

<img src="/assets/L3hkbWD6ToiEBgx2r1dc2mPbnyh.png" src-width="1098" class="markdown-img m-auto" src-height="196" align="center"/>

### **Top Unity Objects Categories**

列出用**Allocated Memory Distribution中最大的几项**

Displays which types of Unity Objects use the most memory in the snapshot.

<img src="/assets/SLqQbDn6SogRrtxdie8cWMxznkg.png" src-width="1080" class="markdown-img m-auto" src-height="209" align="center"/>

## 如何分析

## 1、先了解应用占了多少内存

## 查看总内存中占比最多的明细

## 查看unity objects最多的分类

从上面解释可以看出，我们只用从**Allocated Memory Distribution**的inspect点进去看明细就行。因为这是Unity能分析的所有内存占用。xcode的内存，我们可以先忽略

# 
