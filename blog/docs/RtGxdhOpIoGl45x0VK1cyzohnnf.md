---
create_time: 1745401600
edit_time: 1750674354
title: Cesium
categories:
  - skill
---


# 1. 参考资料

官方api:https://cesium.com/learn/cesiumjs/ref-doc/

教程：https://cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/

网上例子：https://github.com/jiawanlong/Cesium-Examples

mark3d库的文档：http://mars3d.cn/dev/guide/data/xyz.html（虽然不是写cesium的，但知识都是通的，讲的很好）

# 2. 加载地形和贴片

## 2.1 什么是地形（terrain）

就是高度信息，cesium加载后可以在地表生成起伏的地面效果,如下图

<img src="/assets/A98fb045Xox5BcxSnKYcVuzpnbd.png" src-width="613" class="markdown-img m-auto" src-height="253" align="center"/>

## 2.2 获取地形数据

### 2.2.1 首先要获取dem的数据

<img src="/assets/Tx6mb6aILoWaNdxN8jxcyy7KnFf.png" src-width="994" class="markdown-img m-auto" src-height="316" align="center"/>

以https://www.gscloud.cn/为例：目前免费的只有30m的精度。

而且这里的高度是包含建筑物的，非地表高度（实测）

<img src="/assets/G58rbaJl6orqjGxXtZucnYj4nSg.png" src-width="1315" class="markdown-img m-auto" src-height="874" align="center"/>

### 2.2.2 使用工具将dem的tif数据转成切片

cesium定义了一个terrain的数据格式quantized-mesh： 

https://github.com/CesiumGS/quantized-mesh

有人已经实现了：

https://github.com/ahuarte47/cesium-terrain-builder/tree/master-quantized-mesh

功能主要是利用gdal库将tif栅格图片转成quantized-mesh.

测试过，可以用。

注意哈，这个人实现的代码在上github地址的一个分支上。

生成的数据大概如下：

<img src="/assets/ZQWUbBgUToYhk5xNF6qc6yg7ngd.png" src-width="1138" class="markdown-img m-auto" src-height="1005" align="center"/>

## 2.3 地形服务器

这个简单，直接用nginx

https://github.com/geo-data/cesium-terrain-builder/issues/96

## 2.4 什么是贴片（影像切片）

贴片是一张图片，覆盖在地形上，如果没有贴片，地图上显示的是全蓝

贴片有免费的数据，而且可以多种数据叠加。我推荐使用高德的

下面的示例代码，使用了两个贴片的叠加的效果

因为高德的坐标不是wgs84，需要转换

```java
_//高德贴图_
  const amapLayer = new Cesium.UrlTemplateImageryProvider({
    url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    minimumLevel: 1,
    maximumLevel: 18,
    credit: "© 高德地图",
    tilingScheme: new GCJ02TilingScheme(),
  });
  _viewer_?.imageryLayers.addImageryProvider(amapLayer);
  _//高德标题_
  const amaptitleLayer = new Cesium.UrlTemplateImageryProvider({
    url: "https://webst02.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}",
    minimumLevel: 1,
    maximumLevel: 18,
    credit: "© 高德地图",
    tilingScheme: new GCJ02TilingScheme(),
  });
```

<img src="/assets/CDDKbSsxpoMYhPxii6tcCE5Rnkc.png" src-width="967" class="markdown-img m-auto" src-height="241" align="center"/>

但是Viewer只用一个坐标系统，这就导致百度地图（BD09坐标系统）、高德地图（火星坐标系统）、腾讯地图（火星坐标系统）不能与天地图（接近于WGS84坐标系统的China2000）无偏移叠加。这就导致底图切换没有什么意义。 

## 2.5 如何自己生成影像切片

比如无人机正投影拍的影像切片也是tif格式，如何生成cesium可用的切片呢？

直接用gdal的工具即可，很方便

```yaml
gdal2tiles.py -z 14-22 -d  ./input/result.tif ./output/image
```

# 3. 坐标系

## 3.1 ECEF坐标系

也叫地心地固直角坐标系。其原点为地球的质心，x轴延伸通过本初子午线（0度经度）和[赤道](https://zhida.zhihu.com/search?content_id=173382326&content_type=Article&match_order=1&q=%E8%B5%A4%E9%81%93&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NDY2NzIyNzcsInEiOiLotaTpgZMiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzMzODIzMjYsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.heivMbBVbwE3I1TVKIHbtkTTkhFSryJS9qd8Cu0erWo&zhida_source=entity)（0deglatitude）的交点。 z轴延伸通过的北极（即，与地球旋转轴重合）。 y轴完成右手坐标系，穿过赤道和90度经度。

<img src="/assets/DlkFb9jaXopYcBxc6VScwxQ3n4e.png" src-width="969" class="markdown-img m-auto" src-height="705" align="center"/>

## 3.2  WGS-84坐标

也就是也叫经纬高坐标系(经度(longitude)，纬度(latitude)和高度(altitude)LLA坐标系)。，全球地理坐标系、大地坐标系。可以说是最为广泛应用的一个地球坐标系，它给出一点的大地纬度、大地经度和大地高程而更加直观地告诉我们该点在地球中的位置，故又被称作纬经高坐标系。WGS-84坐标系的X轴指向BIH([国际时间服务机构](https://zhida.zhihu.com/search?content_id=173382326&content_type=Article&match_order=1&q=%E5%9B%BD%E9%99%85%E6%97%B6%E9%97%B4%E6%9C%8D%E5%8A%A1%E6%9C%BA%E6%9E%84&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NDY2NzIyNzcsInEiOiLlm73pmYXml7bpl7TmnI3liqHmnLrmnoQiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzMzODIzMjYsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.TTk3LRvzN1OooEL1kT9qXNvGjrbYvUJoXUkLYw_9Dvc&zhida_source=entity))1984.0定义的零子午面(Greenwich)和[协议地球极](https://zhida.zhihu.com/search?content_id=173382326&content_type=Article&match_order=1&q=%E5%8D%8F%E8%AE%AE%E5%9C%B0%E7%90%83%E6%9E%81&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NDY2NzIyNzcsInEiOiLljY_orq7lnLDnkIPmnoEiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoxNzMzODIzMjYsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.PPgaD1uP7jgRs6aXTbQ_KMNhk2BOgGIFdfjawcTwM_0&zhida_source=entity)(CTP)赤道的交点。Z轴指向CTP方向。Y轴与X、Z轴构成右手坐标系。

（1）：大地纬度是过用户点P的基准椭球面法线与赤道面的夹角。纬度值在-90°到+90°之间。北半球为正，南半球为负。

（2）：大地经度是过用户点P的子午面与本初子午线之间的夹角。经度值在-180°到+180°之间。

（3）：大地高度h是过用户点P到基准椭球面的法线距离，基准椭球面以内为负，以外为正。

<img src="/assets/AzZpbLIXMo6qRgx4AercyoILn0c.png" src-width="688" class="markdown-img m-auto" src-height="284" align="center"/>

## 3.3 东北天坐标系（ENU）

也叫站心坐标系以用户所在位置P为坐标原点。

坐标系定义为： X轴：指向东边 Y轴：指向北边 Z轴：指向天顶

## 3.4  旋转

<img src="/assets/G4xfbStU2oTxzvxxo5kcRGi5n9e.png" src-width="547" class="markdown-img m-auto" src-height="293" align="center"/>

# 4. 第三方免费工具：

QGIS

