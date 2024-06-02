---
title: vscode源码学习
tags:
  - develop
keywords:
  - vscode
  - sourcecode
create_time: 1717146969
categories:
  - skill
---


项目地址：

https://github.com/microsoft/vscode

编译说明：

https://github.com/microsoft/vscode/wiki/How-to-Contribute

参考：

https://github.com/fzxa/VSCode-sourcecode-analysis/blob/master/chapter-1.md

https://blog.csdn.net/zhugangsong/category_12600296.html

# 编译

## 安装环境

我的电脑是window

先安装环境：

注意安装node时要安装native modules

- if you install Node on your system using the Node installer from the <u>Node.JS</u> page then ensure that you have installed the 'Tools for Native Modules'. Everything should work out of the box then.

## Build

```csharp
cd vscode
yarn
```

有报错

build error "MSB8040: Spectre-mitigated libraries are required

<img src="/assets/CaRtbJvUbojQqSxTK2YcbhTQnce.png" src-width="968" class="m-auto" src-height="321" align="center"/>

上面有写

<img src="/assets/CJmsbm0vnoXR0sxxNg4cHQs6nGh.png" src-width="800" class="m-auto" src-height="228" align="center"/>

安装一下

<img src="/assets/HUkeb4IIvovrEax3TSCc7SiTn7c.png" src-width="799" class="m-auto" src-height="561" align="center"/>

### Build 脚本

执行下面命令，ts会被编译成js

```csharp
yarn watch
```

### 启动

```csharp
.\scripts\code.bat
.\scripts\code-cli.bat #这一步不知道干啥的
```

### 调试

打开chrome调试面板

<img src="/assets/KhJVbN4gKoYttsx4YIqcOcI6nae.png" src-width="872" class="m-auto" src-height="175" align="center"/>

## 启动分析

程序的启动主要是两个命令

```ts
yarn watch
code.bat
```

 我们依次分析

### Yarn watch

