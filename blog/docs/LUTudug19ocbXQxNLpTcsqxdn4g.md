---
cover: /assets/IV4Xb2QHjouWKBxU0KecPmZKnXg.jpeg
create_time: 1739158416
edit_time: 1739158669
title: 碰撞检测
categories:
  - skill
---


，比如包围盒、球体、胶囊体、凸包等，还有空间划分的方法，比如BSP树、四叉树、八叉树、网格划分等。另外，还有像分离轴定理（SAT）、GJK算法这样的精确检测算法。

物理引擎如Havok、PhysX、Bullet等是如何实现这些算法的 

大多数游戏引擎（如Unity、Unreal）或物理引擎（如Havok、Bullet、PhysX）采用以下流程：

1.  **Broad Phase**：使用BVH或八叉树筛选潜在碰撞对。
2.  **Narrow Phase**：对筛选出的物体对使用GJK/SAT进行精确检测。
3.  **碰撞响应**：计算碰撞法向量、穿透深度，并施加力或调整位置。
4.  **CCD**：对高速物体启用连续检测。

