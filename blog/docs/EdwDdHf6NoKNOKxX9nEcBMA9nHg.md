---
cover: /assets/PV0sbFKGnoPf5WxzmZJc7XchnEf.gif
create_time: 1728872372
edit_time: 1729668711
title: Unity渲染相关
categories:
  - skill
---


# 官方文档

https://docs.unity3d.com/2022.3/Documentation/Manual/render-pipelines.html

# 一些教程

## Catlike coding

非常细节，一步步的指导

https://catlikecoding.com/unity/tutorials/rendering/

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

# Shader

shader是gpu上的程序

unity有很多内置的shader.参考下表

https://docs.unity3d.com/Manual/shader-built-in.html

## 怎么写shader

可以用shader graph,hlsl语言

### Shader graph

https://docs.unity3d.com/Packages/com.unity.shadergraph@17.0/manual/index.html

### HLSL语言

https://docs.unity3d.com/Manual/writing-shader-writing-shader-programs-hlsl.html

### Shaderlab

Unity 定制的语言

https://docs.unity3d.com/Manual/SL-Reference.html

