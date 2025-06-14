---
create_time: 1749697490
edit_time: 1749805954
title: ctb_quantized mesh分支
categories:
  - skill
---


# 1. 代码：

https://github.com/ahuarte47/cesium-terrain-builder/tree/master-quantized-mesh

# 2. ctb-tile

main()&gt;runtile

多线程

```cpp
for (int i = 0; i < threadCount ; ++i) {
    packaged_task<int(const char *, TerrainBuild *, Grid *, TerrainMetadata *)> task(runTiler); // wrap the function
    tasks.push_back(task.get_future()); // get a future
    thread(move(task), command.getInputFilename(), &command, &grid, metadata).detach(); // launch on a thread
  }
```

buil

