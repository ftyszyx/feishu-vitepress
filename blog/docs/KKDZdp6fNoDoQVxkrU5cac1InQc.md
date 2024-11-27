---
title: appflowy体验
create_time: 1723689468
edit_time: 1723712339
categories:
  - skill
---


# 1. 项目地址：

https://github.com/AppFlowy-IO/AppFlowy

# 2. 编译

https://docs.appflowy.io/docs/documentation/appflowy/from-source

## 2.1 安装flutter sdk

https://docs.flutter.dev/get-started/install/windows

windows版本

https://docs.flutter.dev/get-started/install/windows/desktop

<img src="/assets/UdOlb8dWyozqcyxRMcicHlTBnqh.png" src-width="933" class="markdown-img m-auto" src-height="156" align="center"/>

将文件解压到一个目录（自己定）

但是这个目录有个要求：

1、不要有特殊字符（中文 ，空格之类的）

2、不需要特殊权限（不要放c盘）

<img src="/assets/OUHnbyXBHoka4Wx1o6ycpWUnnph.png" src-width="526" class="markdown-img m-auto" src-height="281" align="center"/>

## 2.2 加入环境变量

将“D:\flutter\sdk\flutter\bin”加入path环境变量 

## 2.3 检查是否安装成功了

```yaml
flutter doctor
```

<img src="/assets/Qbt9b6zHQotukcx26TzcvQQvnmf.png" src-width="738" class="markdown-img m-auto" src-height="375" align="center"/>

## 2.4 配置flutter

- Make sure to enable the flutter stable channel

```yaml
flutter channel stable
```

- Enable the specified platform first if you don't enable it before and then select the desktop device.

```yaml
flutter config --enable-windows-desktop
```

- Fix any problems reported by flutter doctor

```yaml
flutter doctor
```

## 2.5 安装llvm

https://github.com/llvm/llvm-project

https://github.com/llvm/llvm-project/releases/download/llvmorg-16.0.0/LLVM-16.0.0-win64.exe

不知道干啥 的，好像是编译器的一个基础组件。

安装时选择加到环境变量path

## 2.6 安装rust

因为后端是rust写的

- install rust
    - Download `rustup.exe` from [https://win.rustup.rs/x86_64](https://win.rustup.rs/x86_64)
    - Call rustup.exe from powershell or cmd

Copy

```
.\rustup-init.exe --default-toolchain stable --default-host x86_64-pc-windows-msvc -y
```

It is a good idea to check your rustc version after this step, and compare it to the current supported one in AppFlowy. Run the command:

Copy

```
rustup --version
```

- Look for  `rustc 1.77.2`You can find the supported version [here](https://github.com/AppFlowy-IO/AppFlowy/blob/0.5.6/.github/workflows/flutter_ci.yaml#L29).

In case you need to checkout/downgrade your version, you can replace the version number in this command:

## 2.7 
