---
title: unity渲染相关
create_time: 1728872372
categories:
  - skill
---


# 官方文档

https://docs.unity3d.com/2022.3/Documentation/Manual/render-pipelines.html

# 渲染要做的事

<img src="/assets/W1m2bJgFhobpz0xvYLDcdSkVncg.png" src-width="901" class="markdown-img m-auto" src-height="365" align="center"/>

A render pipeline follows these steps:

1. Culling, where the pipeline decides which objects from the scene to display. This usually means it removes objects that are outside the  **camera**
 view (<u>frustum culling</u>) or hidden behind other objects (<u>occlusion culling</u>
).
2. Rendering, where the pipeline draws the objects with their correct lighting into  **pixel**
 buffers.
3.  **Post-processing**
, where the pipeline modifies the pixel buffers to generate the final output frame for the display. Example of modifications include color grading, bloom, and  **depth of field**
.

# 三个render pipline

The <u>Built-In Render Pipeline</u> 

The <u>Universal Render Pipeline (URP)</u> is a Scriptable Render Pipeline ,可定制

The <u>High Definition Render Pipeline (HDRP)</u> is a Scriptable Render Pipeline 

# Build-in render pipeline

## Graphics tiers等级

通过  **graphics tiers** 设置等级

```yaml
Graphics.activeTier
```

Project-setting中可以设置

<img src="/assets/RV5jbLgV0o74aZxdHeAc5d1Rnwb.png" src-width="934" class="markdown-img m-auto" src-height="376" align="center"/>

## render path

### Forward render

只能算4个点光源

### Deferred Shading

