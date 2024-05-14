---
title: C#语言学习
tags:
  - develop
keywords:
  - c#
create_time: 1715049459
categories:
  - skill
---


# 多线程

## 汇总

Thread、ThreadPool、Task、Parallel

从技术发展的时间线上，微软推出这几个的顺序是：Thread=&gt;ThreadPool=&gt;Task=&gt;Parallel

Thread

优点在于提供了丰富的多线程操作API，缺点在于线程个数的使用不加限制，以及无法复用线程，因此推出了TheadPool技术

ThreadPool

优点在于解决了线程个数的限制以及线程的复用，缺点在于API较少而且线程等待问题解决起来较为麻烦，因此推出了Task技术

Task

优点在于丰富的API，以及多线程的方便管理，缺点在于线程数量控制较为麻烦，因此推出了Parrel技术

Parallel

优点在于丰富的API，多线程方便管理，线程数量控制简单，但是主线程也会参与计算，导致主线程的阻塞问题（但是这个问题可以通过包一层来解决） 

### Parallel

文档：https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/task-parallel-library-tpl

```yaml
Parallel.ForEach(sourceCollection, item => Process(item));
```

# Net core

gitHub  runtime

https://github.com/dotnet/core

https://github.com/dotnet/runtime

网

https://docs.microsoft.com/dotnet/core/

当前的版本

https://github.com/dotnet/core/blob/main/releases.md

