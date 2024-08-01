---
title: 怎么破解android包
create_time: 1722416402
categories:
  - skill
---


# 如何对android包解包

## 使用apktool解包

下载地址：https://apktool.org/

当然你首先要有安装过java sdk,具体去查一下

```yaml
java -jar apktool.jar d a.apk
```

过程如下：

<img src="/assets/GMKobhdTRoNkOZxLTj8ct2k3n8g.png" src-width="917" class="markdown-img m-auto" src-height="240" align="center"/>

成功后，在相应的文件夹可以看到

java代码在smali目录下

so库在lib目录下

## 使用将smali转成java

地址：https://github.com/pxb1988/dex2jar/releases

下载后解压，然后把apk放到目录下：执行如下命令

<img src="/assets/MGmCbd7GyoFVD6xhpU1cna6pneh.png" src-width="594" class="markdown-img m-auto" src-height="250" align="center"/>

```yaml
d2j-dex2jar.bat -f 1.apk
```

结果就是1-dex2jar.jar

## 使用jd-jui查看jar的源码

https://java-decompiler.github.io/

把上一步的jar文件拖到jd_gui窗口中就可以看到最终的java代码

<img src="/assets/RmMqbRksgozsyOxXBuYcqE9SnHb.png" src-width="705" class="markdown-img m-auto" src-height="401" align="center"/>

可以将源码导出，方便用其它软件打开

<img src="/assets/LU8zbrWoBo5a9ZxliOnc3wxJnjc.png" src-width="246" class="markdown-img m-auto" src-height="190" align="center"/>

