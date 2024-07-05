---
title: C# Language Learning
tags:
  - develop
keywords:
  - c#
create_time: 1715049459
categories:
  - skill
---

# Multithreading

## Summary

Thread、ThreadPool、Task、Parallel

From the timeline of technology development, Microsoft launched these in the following order: Thread=&gt;ThreadPool=&gt;Task=&gt;Parallel

Thread

The advantage is that it provides a rich multi-threaded operation API, but the disadvantage is that the number of threads is not limited, and the threads cannot be reused, so the TheadPool technology is introduced

ThreadPool

The advantage is that the limitation of the number of threads and the reuse of threads are solved, but the disadvantage is that there are fewer APIs and the thread waiting problem is more troublesome to solve, so the Task technology is introduced

Task

The advantage is that the rich API and the convenient management of multiple threads, but the disadvantage is that the number of threads is more troublesome, so the Parrel technology is introduced

Parallel

The advantage is that the rich API, multi-threading is easy to manage, and the number of threads is simple to control, but the main thread will also participate in the calculation, resulting in the blocking problem of the main thread (but this problem can be solved by wrapping a layer) 

### Parallel

Documentation: https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/task-parallel-library-tpl

```yaml
Parallel.ForEach(sourceCollection, item => Process(item));
```

# Net core

gitHub  runtime

https://github.com/dotnet/corehttps://github.com/dotnet/runtime

net

https://docs.microsoft.com/dotnet/core/

The current version

https://github.com/dotnet/core/blob/main/releases.md