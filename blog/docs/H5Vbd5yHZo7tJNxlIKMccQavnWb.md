---
cover: /assets/AzrLb0E7toDsfKxKSfAcgQacnfg.png
create_time: 1746413322
edit_time: 1746432041
title: 生成地形数据
categories:
  - skill
---


# 1. dem数据

我们从[GDEMV3 30M 分辨率数字高程数据](https://www.gscloud.cn/sources/accessdata/aeab8000652a45b38afbb7ff023ddabb?pid=302#)

<img src="/assets/QE21bv9w2oOuWbxa8LacvMmknIe.png" src-width="587" class="markdown-img m-auto" src-height="318" align="center"/>

使用dem.tif就行 

# 2. Dem转地形

## 2.1 使用cesium-trerrain-builder

源工程地址：https://github.com/geo-data/cesium-terrain-builder（没有编译，需要自己编译）

说明文档：https://www.cnblogs.com/jiujiubashiyi/p/17104115.html（很详细） 

步骤：

可以使用https://github.com/tum-gis/cesium-terrain-builder-docker

```yaml
docker run -it --name ctb -v "d:/docker/terrain:/data"  tumgis/ctb-quantized-mesh
```

下一次可以直接启动Docker start

```yaml
docker start ctb
docker exec -it ctb bash
```

然后使用，生成切片

```yaml
ctb-tile --output-dir ./terrain-tiles dem.tif
```

生成layer.json

```yaml
ctb-tile --output-dir /data/tilesets/terrain/test -l /data/rasters/ASTER_GDEM_V2_30m.tif
```

<img src="/assets/FkKKbAgnYo27CaxeEDKc2iuInee.png" src-width="1138" class="markdown-img m-auto" src-height="1005" align="center"/>

# 3. 配置服务器

使用nginx

https://github.com/geo-data/cesium-terrain-builder/issues/96

