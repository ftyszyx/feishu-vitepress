---
create_time: 1748503594
edit_time: 1748697764
title: Cesiuum 3d tile
categories:
  - skill
---


http://mars3d.cn/dev/guide/data/xyzDown.html#%E5%9C%B0%E5%9B%BEurl%E7%9A%84xyz%E5%8F%82%E6%95%B0

https://blog.csdn.net/weixin_45782925/article/details/124360642

`3D Tiles`是`Cesium`于2016年3月定义的一种三维模型瓦片数据格式

在3D Tiles中一组数据由`tileset`（瓦片数据集）进行组织

https://cesium.com/learn/3d-tiling/tiler-data-formats/

<img src="/assets/RD7ubA4oUo12XIxQu1jcH7jKnKb.png" src-width="890" class="markdown-img m-auto" src-height="425" align="center"/>

# 1. 地形切片

瓦片文件通常按照以下规则命名：`{level}/{x}/{y}.terrain`

- `level`：缩放级别 (整数)。
- `x`：瓦片在 X 轴上的索引 (整数)。
- `y`：瓦片在 Y 轴上的索引 (整数)。

### 1.1.1 layer.json

```json
{
        "attribution": "",
        "bounds": [-180, -90, 180, 90],
        "description": "",
        "extensions": ["metadata", "octvertexnormals"],
        "format": "quantized-mesh-1.0",
        "maxzoom": 22,
        "metadataAvailability": 10,
        "minzoom": 0,
        "name": "",
        "projection": "EPSG:4326",
        "scheme": "tms",
        "tiles": ["{z}/{x}/{y}.terrain?v={version}"],
        "version": "1.1.0"
}
```

- `bounds`: 数据集的边界范围 (经度最小值、纬度最小值、经度最大值、纬度最大值)。
- `minzoom`: 最小缩放级别。
- `maxzoom`: 最大缩放级别。
- `attribution`: 数据来源的归属信息。
- `tiles`: 瓦片数据的 URL 模板 (例如 `//{s}.example.com/tiles/{z}/{x}/{y}.terrain`).
- `format`: 瓦片数据的格式 (通常为 `quantized-mesh-1.0`)

### 1.1.2  **瓦片数据文件 (.terrain):** 

每个瓦片文件都包含该区域的地形数据，格式为 Quantized Mesh

`.terrain` 文件是一个二进制文件，它并非简单的图像数据，而是经过精心设计的结构，以优化存储和渲染性能。  主要包含以下几个部分：

-  **Header (头部):** 包含关于瓦片数据的元信息，用于快速解析文件。
-  **Vertex Data (顶点数据):** 包含瓦片中所有顶点的位置、法线和纹理坐标等信息。 顶点的位置经过量化，以减小存储空间。
-  **Index Data (索引数据):** 包含三角形索引，定义了如何将顶点连接成三角形网格。
-  **Edge Indices (边缘索引):** 可选部分，用于简化地形边缘的渲染，减少裂缝。
-  **Extension Data (扩展数据):** 可选部分，用于存储额外的属性，例如水体掩码、高度偏移等。

 **各部分详解:**

-  **Header:**
    -  **Magic Number (魔数):** 通常用于标识文件类型，例如 "qmesh" 或者一个特定的十六进制值。
    -  **Version (版本号):** 指示 Quantized Mesh 格式的版本。
    -  **Bounding Sphere (边界球):** 一个球体，完全包含瓦片的地形。 用于视锥体裁剪，快速判断瓦片是否在视野内。 包含球心坐标 (X, Y, Z) 和半径。
    -  **Minimum and Maximum Height (最小和最大高度):** 瓦片中地形的最小和最大高度值。 用于高度缩放和量化。
    -  **Horizon Occlusion Point (地平线遮挡点):** 一个点，用于判断瓦片是否被地平线遮挡。 如果相机位于地平线遮挡点之上，则瓦片可见。 包含 X, Y, Z 坐标。
    -  **Quantized Volume Scale (量化体积缩放):** 一个比例因子，用于将量化的顶点坐标转换为实际的地理坐标。
    -  **Quantized Volume Offset (量化体积偏移):** 一个偏移量，用于将量化的顶点坐标转换为实际的地理坐标。
    -  **Vertex Count (顶点数量):** 瓦片中顶点的数量。
    -  **Triangle Count (三角形数量):** 瓦片中三角形的数量。
    -  **Extension Bitmask (扩展位掩码):** 一个位掩码，指示瓦片中包含哪些扩展数据。 例如，如果位掩码的某一位被设置，则表示瓦片包含水体掩码数据。
    -  **Edge Mask (边缘掩码):** 一个位掩码，指示瓦片的哪些边缘是可见的。 用于简化地形边缘的渲染。

-  **Vertex Data:**
    -  **Position (位置):** 每个顶点的位置信息。 位置通常使用量化的整数值表示，以减小存储空间。量化过程将实际的地理坐标映射到一个整数范围 (例如 0 到 65535)。
        -  **X, Y, Z:** 三个分量，表示顶点在局部坐标系中的位置。
    -  **Normal (法线):** 每个顶点的法线向量。 法线向量用于光照计算，确定表面的朝向。
        -  **X, Y, Z:** 三个分量，表示法线向量的方向。 法线向量通常是单位向量，长度为 1。
    -  **Texture Coordinates (纹理坐标):** 每个顶点的纹理坐标。 纹理坐标用于将纹理映射到地形表面。
        -  **U, V:** 两个分量，表示纹理坐标。 U 和 V 的范围通常是 0 到 1。

-  **Index Data:**
    -  **Triangle Indices (三角形索引):** 一组整数，指示如何将顶点连接成三角形。 每个三角形由三个顶点的索引组成。
    -  **Index Format (索引格式):** 索引的格式可以是 16 位或 32 位整数，取决于瓦片中顶点的数量。 如果顶点数量小于 65536，则可以使用 16 位整数，否则需要使用 32 位整数。

-  **Edge Indices (可选):**
    -  **Edge Indices (边缘索引):** 一组整数，指示瓦片边缘的顶点索引。 用于简化地形边缘的渲染，减少裂缝。

-  **Extension Data (可选):**
    -  **Water Mask (水体掩码):** 一个图像，指示哪些区域是水体。 用于模拟水体效果。
    -  **Height Range (高度范围):** 一个范围，指示瓦片中地形的高度范围。
    -  **Metadata (元数据):** 额外的元数据，例如瓦片的创建时间、数据来源等。

# 2. tif切片

## 2.1 gdal工具

https://github.com/OSGeo/GDAL

https://www.osgeo.cn/gdal/download.html

# 3. 影像切片

```xml
<?xml version="1.0" encoding="utf-8"?>
<TileMap version="1.0.0" tilemapservice="http://tms.osgeo.org/1.0.0">
  <Title>Imagery</Title>
  <Abstract></Abstract>
  <SRS>EPSG:3857</SRS>
  <BoundingBox minx="108.2464683350843" miny="22.86146144414818" maxx="108.2509396822738" maxy="22.86619127430117"/>
  <Origin x="108.2464683350843" y="22.86146144414818"/>
  <TileFormat width="256" height="256" mime-type="image/png" extension="png"/>
  <TileSets profile="mercator">
    <TileSet href="11" units-per-pixel="76.43702828517625" order="11"/>
    <TileSet href="12" units-per-pixel="38.21851414258813" order="12"/>
    <TileSet href="13" units-per-pixel="19.10925707129406" order="13"/>
    <TileSet href="14" units-per-pixel="9.554628535647032" order="14"/>
    <TileSet href="15" units-per-pixel="4.777314267823516" order="15"/>
    <TileSet href="16" units-per-pixel="2.388657133911758" order="16"/>
    <TileSet href="17" units-per-pixel="1.194328566955879" order="17"/>
    <TileSet href="18" units-per-pixel="0.5971642834779395" order="18"/>
    <TileSet href="19" units-per-pixel="0.2985821417389697" order="19"/>
    <TileSet href="20" units-per-pixel="0.1492910708694849" order="20"/>
    <TileSet href="21" units-per-pixel="0.07464553543474244" order="21"/>
    <TileSet href="22" units-per-pixel="0.03732276771737122" order="22"/>
    <TileSet href="23" units-per-pixel="0.01866138385868561" order="23"/>
  </TileSets>
</TileMap>
```

- &lt;TileMap version="1.0.0" tilemapservice="http://tms.osgeo.org/1.0.0"&gt;
- version="1.0.0": TileMap规范版本
- tilemapservice: 指向TMS（Tile Map Service）标准
- Title: 瓦片地图标题为"Imagery"（影像）
- EPSG:3857: Web Mercator投影，也叫"伪墨卡托"

<img src="/assets/XBzYbhOE3oxcVtxADu3cVHysnmz.png" src-width="790" class="markdown-img m-auto" src-height="298" align="center"/>

