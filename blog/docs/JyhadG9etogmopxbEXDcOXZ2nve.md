---
title: flutter学习
keywords:
  - flutter
  - android gui
create_time: 1723717008
edit_time: 1751436249
categories:
  - skill
---


Flutter usage:

https://docs.flutter.dev/get-started

Dart lanuage

https://dart.dev/docs

Github

https://github.com/flutter/flutter

中文资料

https://book.flutterchina.club/

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

# 2. 常用命令

## 2.1 运行

```yaml
Flutter run main.dart
```

## 2.2 检查工程

```yaml
flutter analyze
```

# 3. fllutter的包

地址：https://pub.dev/packages

## 3.1 国内加速

```yaml
eport PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

包管理文件

pubspec.yaml

安装dependence

```yaml
flutter packages get
```

添加一个包

```yaml
flutter pub add provider
```

# 4. 一些特殊的语法

## 4.1 __internal_

__internal is just a name for a private constructor_.

## 4.2 并行

dart中的异常是单线程的

# 5. widgets

https://docs.flutter.dev/ui/widgets

Widgets类中build 是入口

widgets分statelesswidgest（不变的），statefullwidget(可变的）

statefullwidget没有build method.是通过state object的build

## 5.1 常用的widgetts

widgets列表

https://docs.flutter.dev/reference/widgets

<img src="/assets/RB7pbezdQox7WoxXLaIcEJfYn1d.png" src-width="301" class="markdown-img m-auto" src-height="209" align="center"/>

## 5.2 layout

## 5.3 boxtypes

<img src="/assets/Aa6Eb5Mq7oWtItx0RYQclUpenPh.png" src-width="898" class="markdown-img m-auto" src-height="243" align="center"/>

# 6. 夸组件状态管理

## 6.1 inheritedWidget

https://juejin.cn/post/6844904066607218701

inheritedWidget 是一个特殊的 Widget，它将作为另一个子树的父节点放置在 Widget 树中。该子树的所有 widget 都必须能够与该 InheritedWidget 暴露的数据进行交互。

<img src="/assets/CbJVbGhoXoPO1Wxw0nBc1gGznid.png" src-width="712" class="markdown-img m-auto" src-height="468" align="center"/>

本质是一个widget,实现了updateShouldNotify方法

将return turn 表示通过子节点。需要重现build

## 6.2 provider

## 6.3 ChangeNotifier

<img src="/assets/AiRKbKt05oT4ItxUOkwc0S0ZnKe.png" src-width="723" class="markdown-img m-auto" src-height="504" align="center"/>

