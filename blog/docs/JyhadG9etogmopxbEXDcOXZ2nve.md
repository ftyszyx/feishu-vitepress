---
title: flutter学习
keywords:
  - flutter
  - android gui
create_time: 1723717008
edit_time: 1751073933
categories:
  - skill
---


# 1. 安装

## 1.1 安装flutter sdk

https://docs.flutter.dev/get-started/install/windows

windows版本

https://docs.flutter.dev/get-started/install/windows/desktop

<img src="/assets/DyXNb9sdNo0xoixn2z7cHvXtn3b.png" src-width="933" class="markdown-img m-auto" src-height="156" align="center"/>

将文件解压到一个目录（自己定）

但是这个目录有个要求：

1、不要有特殊字符（中文 ，空格之类的）

2、不需要特殊权限（不要放c盘）

<img src="/assets/Gwu2bUgxuoNRcaxsyjucbc3knmh.png" src-width="526" class="markdown-img m-auto" src-height="281" align="center"/>

## 1.2 加入环境变量

将“D:\flutter\sdk\flutter\bin”加入path环境变量 

## 1.3 检查是否安装成功了

```yaml
flutter doctor
```

# 2. 国内加速

```yaml
eport PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

