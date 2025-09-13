---
create_time: 1757645822
edit_time: 1757656390
title: 卡密
categories:
  - product
---


开源的：

https://github.com/assimon/dujiaoka

docker安装

```ts
- Docker Compose 安装: ``docker-compose -f docker-compose.yml up -d web``
- Docker Run 安装: ``docker run -dit --name dujiaoka -p 80:80 -p 9000:9000 -e WEB_DOCUMENT_ROOT=/app/public jiangjuhong/dujiaoka``
```

有问题，启动不启动，文档没说明

https://github.com/assimon/dujiaoka/wiki/2.x_bt_install

用宝塔

先安装https://www.bt.cn/new/download.html

安装证书

请选择以下其中一种方式解决不安全提醒

 1、下载证书，地址：https://dg2.bt.cn/ssl/baota_root.pfx，双击安装,密码【www.bt.cn】

 2、点击【高级】-【继续访问】或【接受风险并继续】访问

 教程：https://www.bt.cn/bbs/thread-117246-1-1.html

 mac用户请下载使用此证书：https://dg2.bt.cn/ssl/mac.crt

