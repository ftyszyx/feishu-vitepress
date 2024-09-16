---
title: unity 内存定制内存分配
keywords:
  - unity
  - memory profiler
  - 内存占用
  - unity内存占用分析
  - customize mem allocator
create_time: 1721805893
categories:
  - skill
---


# 背景

官方文档：

https://docs.unity3d.com/2022.3/Documentation/Manual/memory-allocator-customization.html

Unity 2022打包时新加了对unity内存分配的配置

<img src="/assets/YxOVb2PLJoLEhAxlXRickdren4f.png" src-width="1240" class="markdown-img m-auto" src-height="322" align="center"/>

如何使用这个功能来优化我们的游戏呢？

# 简介

具体看文档：

https://docs.unity3d.com/2022.3/Documentation/Manual/performance-native-allocators.html

简单总结一下就是

1、主要是c++的内存（native memory)

2、有5种类型的分配器，如下：

<img src="/assets/CuZVbBTY5oV2fNxiQ9icuP8Mn9f.png" src-width="1145" class="markdown-img m-auto" src-height="473" align="center"/>

# 分析游戏问题

## 分析依据

You can also check the memory usage reports. They are available in the log when you close the Player or Editor. To find your log files, follow the instructions on the <u>log files page</u>.

游戏关闭时，unity会在日志文件的尾部追加内存统计日志，通过分析这部分日志，来决定你的优化方向，如下：

<img src="/assets/EMMvbi7jpoGAu2xj5R9cqwgcnEf.png" src-width="1068" class="markdown-img m-auto" src-height="453" align="center"/>

## 分析步骤

参考：

https://discussions.unity.com/t/memory-allocator-customization-in-unity-2021-lts/878920/8 

### ALLOC_TEMP_TLS栈内存缓存:

属于Thread Local Storage (TLS) stack allocator

https://docs.unity3d.com/2022.3/Documentation/Manual/performance-tls-stack-allocator.html

这种内存池是使用栈分配的内存，每个线程都会有一个，如果大小不够，分配器会增加block size。

增加上限是配置大小的一倍。

如果overflow了，就使用thread safe linear allocator

If a thread’s stack allocator is full, allocations fall back to the <u>threadsafe linear allocator</u>. A few overflow allocations are fine: 1 to 10 in a frame, or a few hundred during load. However, if the numbers grow on every frame, you can increase the block sizes.

配置在这里，每个线程都可以单独配置

<img src="/assets/QZ68bzlTWovvn9xJea4cKAwQnpb.png" src-width="1160" class="markdown-img m-auto" src-height="213" align="center"/>

还有

<img src="/assets/TQtEb5ZG2oWat2xHQUBcbmtEnZc.png" src-width="1084" class="markdown-img m-auto" src-height="92" align="center"/>

可以通过查看日志中，peek allocated bytes来确定 是不是要增加配置或者减小

#### 优化点1：

看主线程：

<img src="/assets/Cym2bSB9QoRnl8xUeLvcGBYdnHe.png" src-width="1241" class="markdown-img m-auto" src-height="150" align="center"/>

大部分都在1M以下。按照文档的指引，其实可以将block size 改成1mb。这样可以节省15M内存。

#### 优化点2：

 ALLOC_TEMP_UnityGfxDeviceWorker内存设置不够，可以增加点.

<img src="/assets/PlhjbRMtioYJB0xEXkwcspJhntb.png" src-width="388" class="markdown-img m-auto" src-height="100" align="center"/>

### [ALLOC_DEFAULT] Dual Thread Allocator

参考：https://docs.unity3d.com/2022.3/Documentation/Manual/performance-dual-thread-allocator.html

1. 有三个内存分配器：
    1. 一个是bucket allocator，用于分配小内存
    2. 一个heap allocator，给主线程用，没有锁
    3. 一个heap allocator,给其它线程用，有锁，线程安全

你只能配置 heap allocator的内存

<img src="/assets/Wed8bERz0o3c7MxOe23cuYm1nuf.png" src-width="1152" class="markdown-img m-auto" src-height="91" align="center"/>

这里需要参考heap allocator的建议：

Each platform has a default block size, <u>which you can customize</u>. An allocation must be smaller than half a block. An allocation of half a block or more is too large for the dynamic heap allocator and in such cases Unity uses the virtual memory API to make the allocation instead.

如果要分配的内存大于block size的一半，heap allocator就会失效，内存由vitural memory分配

#### 主线程的

<img src="/assets/MDhhbt9qZo2EkrxHbqKcFyOYn5b.png" src-width="1194" class="markdown-img m-auto" src-height="231" align="center"/>

#### 主线程问题：

共享线程的heap allocator有80M没有命中，有可能是分配大于8M的存导致 ，可以考虑将block size 改成32Mb，看有没有改善。不过这样会增加内存占用。

#### gfx线程的

<img src="/assets/WLGLbzw6FohfqSxz2mSc6nn1nKd.png" src-width="1289" class="markdown-img m-auto" src-height="336" align="center"/>

#### 问题：

没有overflow可以试下把block size减少一倍。看还有没有没命中的。这样可以减少内存

#### Other allocators&cache

<img src="/assets/AwIVbgPLxolsRcxyz4Vc8OTbnzg.png" src-width="870" class="markdown-img m-auto" src-height="340" align="center"/>

<img src="/assets/N4VXbrGpsomzHPx14jYcCSi1n9g.png" src-width="1476" class="markdown-img m-auto" src-height="370" align="center"/>

#### 问题：

TYPETREE没有overflow可以试下把block size减少一倍。看还有没有没命中的。这样可以减少内存

CACHEOBJECTS overflow明显，可以调大点变成 8M

### Bucket allocator的问题

配置全局共享 ，主要用于小内存分配。分配速度比heap allocator快。

Block&gt;subsections&gt;bucket

The allocator reserves blocks of memory for allocations. Each block is divided into  **subsections** of 16KB. This is not configurable, and does not appear in the user interface. Each subsection is divided into  **allocations**. The allocation size is a multiple of a configured fixed size, called  **granularity**.

<img src="/assets/D57bbtUGmoGZ0yx2ufmcbixYnuc.png" src-width="1185" class="markdown-img m-auto" src-height="360" align="center"/>

#### 问题：

日志中大部分都只分配了5个block。

<img src="/assets/Vtsmbt0OvoGynJx9xRDcZlm5ngb.png" src-width="1192" class="markdown-img m-auto" src-height="133" align="center"/>

