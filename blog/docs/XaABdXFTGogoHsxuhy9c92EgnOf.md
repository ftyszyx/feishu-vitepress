---
cover: /assets/LVzQbnuDNobZFexpz9lcg31Pn8b.jpeg
create_time: 1741336156
edit_time: 1741571807
title: 用gralde命令行打包
categories:
  - skill
---


# 1. 官方文档:

https://developer.android.com/build/building-cmdline?hl=zh-cn

# 2. 步骤

## 2.1 先安装gradle

（要和Unity导出来的工程使用的gralde版本一致）

https://docs.gradle.org/current/userguide/installation.html#ex-installing-manually

需要有java&gt;11

```yaml
java -version
并设置JAVA_HOME
echo %JAVA_HOME%
```

下载完后，将gradle加到环境变量

测试

<img src="/assets/Uu6Pbv3frobrgsxqn8Ycn8BlnHd.png" src-width="940" class="markdown-img m-auto" src-height="423" align="center"/>

## 2.2 给项目生成gradle wrapper

```yaml
gradle wrapper
```

 会生成

<img src="/assets/GAZnbnx0OoPFC1xhjoWcI09Cn4c.png" src-width="491" class="markdown-img m-auto" src-height="90" align="center"/>

## 2.3 构建

列出所有任务

```yaml
gradle tasks
```

<img src="/assets/BHNdb2k95o3oQnxZoT9cLCdDnsg.png" src-width="627" class="markdown-img m-auto" src-height="247" align="center"/>

执行

```yaml
gradlew task-name
例如：gradlew assembleRelease
```

如何构建apk

<img src="/assets/QH1LbaQKFowncMxKbtrcdx7DnHe.png" src-width="868" class="markdown-img m-auto" src-height="87" align="center"/>

这将在 `project_name/module_name/build/outputs/apk/` 中创建一个名为 `module_name-debug.apk` 的 APK。该文件已使用调试密钥进行签名并使用 `zipalign` 对齐，因此您可以立即将其安装到设备上。

安装

```yaml
gradlew installDebug
```

