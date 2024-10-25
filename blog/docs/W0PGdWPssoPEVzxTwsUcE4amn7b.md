---
cover: /assets/UiOlblBcvo4J2Px2TLjc2tJQnEc.png
create_time: 1729668893
edit_time: 1729734615
title: catlikecoding教程学习
categories:
  - skill
---


主要是学习catlikecoding的一些问题记录

# 官网

https://catlikecoding.com/

# 基础

## Building-gragh

这里为了让点表现好点，作者需要做一个新的材质

给shader命名

```sql
**Shader** "Graph/Point Surface" {}
```

 **CGPROGRAM**

CGPROGRAM 是 Unity 着色器中的一个重要指令，它标志着 Cg/HLSL 代码块的开始

```sql
CGPROGRAM
ENDCG
```

 **Pragma**

```sql
#pragma surface ConfigureSurface Standard fullforwardshadows
```

 **pragma surface:**

这告诉 Unity 我们正在定义一个表面着色器。

表面着色器是 Unity 特有的高级着色器类型，简化了许多常见的光照计算。

 **ConfigureSurface:**

这是你的表面着色器函数的名称。

在你的代码中，你需要定义一个名为 ConfigureSurface 的函数来实现着色器的主要逻辑。

 **Standard**

这指定了要使用的光照模型。

Standard 表示使用 Unity 的标准 PBR（基于物理的渲染）光照模型。

 **fullforwardshadows:**

这是一个编译指令，启用完整的前向渲染阴影支持。

它允许对象在前向渲染路径中接收阴影。

这里又有一个概念:

什么是前向渲染

 **前向渲染（Forward Rendering）：**

这是一种渲染技术，其中场景中的每个对象都被单独渲染，同时考虑所有影响它的光源。

它是相对于延迟渲染（Deferred Rendering）而言的另一种主要渲染方法。

为什么这很重要：

不是所有的渲染路径都默认支持完整的阴影功能。

启用这个选项可以确保在使用前向渲染时，物体能够正确地与场景中的阴影进行交互。

启用完整的阴影支持可能会增加渲染的计算负担。

然而，对于大多数现代硬件来说，这通常不是一个重大问题，而且带来的视觉改善通常值得这额外的计算成本。

为材质设置一个属性，光滑度

```sql
float _Smoothness;
        void ConfigureSurface(Input input, inout SurfaceOutputStandard surface){ 
            surface.Smoothness = _Smoothness;
        }
```

把这个属性设为可调

```sql
Properties{
        _Smoothness("Smoothness", Range(0, 1)) = 0.5
    }
```

增加材质的颜色

```sql
surface.Albedo = input.worldPos;
```

 surface.Albedo 设置表面的反照率（漫反射颜色）。在Unity的标准着色器中，Albedo 通常是一个 RGB 颜色值。

### 用urp写shader

#### 新建

这回使用shader graph图形化工具

<img src="/assets/H3TsbL8t5ofNxFxFhL7cbOsunQg.png" src-width="690" class="markdown-img m-auto" src-height="332" align="center"/>

双击打开后是这样的

<img src="/assets/R2TNbS5GBokMekxe1CrcXQHOn9b.png" src-width="692" class="markdown-img m-auto" src-height="536" align="center"/>

#### 增加用户可调属性

增加smooth属性

<img src="/assets/V1Wbbt6sroR8aYxUcNPcOkB0nag.png" src-width="438" class="markdown-img m-auto" src-height="218" align="center"/>

#### 增加内部节点

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[45%]" width-ratio="45">
<img src="/assets/YRXZbWfovo0I63xyLp1cjQfjnnc.png" src-width="330" class="markdown-img m-auto" src-height="399" align="center"/>
</div>
<div class="w-[54%]" width-ratio="54">
<img src="/assets/Xpy7bXtWyoN6h1xfGMCcELvfnDh.png" src-width="283" class="markdown-img m-auto" src-height="285" align="center"/>
</div>
</div>

最终同样效果

<img src="/assets/U3cqbqXzJofKJ0xWQc7ckri8nKh.png" src-width="1282" class="markdown-img m-auto" src-height="631" align="center"/>

