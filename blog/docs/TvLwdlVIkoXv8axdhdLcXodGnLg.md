---
hide: false
create_time: 1736735335
edit_time: 1739929432
title: 包管理
categories:
  - skill
---


c++的包管理是一大痛点，以前如果要手动放入一个库，需要手动把源码拷贝过来，但是如果这个库又依赖很多其它的库，那就没办法了，

# 1. Conan（不好用，放弃）

https://docs.conan.io/2/tutorial/consuming_packages.html

## 1.1 安装

Windows 下要以管理员运行（需要python3)

```bash
pip install conan -i https://mirrors.aliyun.com/pypi/simple/
```

查看有没有效

<img src="/assets/JcBqbiLRno5OCBxoQlpc0ZvxnTe.png" src-width="868" class="markdown-img m-auto" src-height="186" align="center"/>

如果是linux中没有效，需要手动执行一下

```yaml
source ~/.profile
```

## 1.2 使用

官方示例代码

git clone https://github.com/conan-io/examples2.git

### 1.2.1  **conanfile.txt**

```toml
[requires]
zlib/1.2.11

[generators]
CMakeDeps
CMakeToolchain
```

### 1.2.2 编译配置

还需要生成一个系统的全局配置（只需要操作一次）

```toml
conan profile detect --force
```

<img src="/assets/VwMnbSQ07oERO1xW87YcyxbOnvf.png" src-width="527" class="markdown-img m-auto" src-height="28" align="center"/>

默认是生成在 **/profiles** folder, located in the Conan user home

<img src="/assets/HI1EbkyHTonxxnxoESYcKa01nJe.png" src-width="659" class="markdown-img m-auto" src-height="214" align="center"/>

如果你有多个配置，可以在通过--profiler=来指定

比如，可以指定一个debug

<img src="/assets/NAlTbgTeEon58Yx77zWct0pCn0e.png" src-width="352" class="markdown-img m-auto" src-height="158" align="center"/>

<img src="/assets/EkM7b4mkOodseCx4mIncCFj7n6g.png" src-width="849" class="markdown-img m-auto" src-height="216" align="center"/>

### 1.2.3 安装库

```toml
conan install . --output-folder=build --build=missing
```

## 1.3 编译代码

### 1.3.1 方法1：

```toml
$ cd build
$ cmake ..   -DCMAKE_TOOLCHAIN_FILE="conan_toolchain.cmake"
$ cmake --build . --config Release
或者
cmake --build . --config Debug
```

### 1.3.2 式2：

Use cmakepresets

```toml
$ cmake --preset conan-default
$ cmake --build --preset conan-debug
$ build\Debug\foo.exe
foo/1.0: Hello World Release!

$ cmake --build --preset conan-release
$ build\Release\foo.exe
foo/1.0: Hello World Release!
```

## 1.4 库中心地址

```bash
https://conan.io/center
```

## 1.5 问题

1、库安装后，vstudio和vscode都无法找到库的头文件。导致无法代码提示

# 2. Vcpkg（不好用，放弃）

https://github.com/microsoft/vcpkg

官方文档：https://learn.microsoft.com/zh-cn/vcpkg/get_started/get-started?pivots=shell-powershell

vcpkg是windows为c++设计的包管理工具

## 2.1 安装

```text
## 1. 克隆 vcpkg

git clone https://github.com/Microsoft/vcpkg.git
cd vcpkg

## 2. 运行引导脚本

.\bootstrap-vcpkg.bat

##  **加环境变量**

$env:VCPKG_ROOT = "C:\path\to\vcpkg"
$env:PATH = "$env:VCPKG_ROOT;$env:PATH"
```

因为vcpkg很多库是从github上下载，需要vpn,如何加速，设置windows系统代理

<img src="/assets/Svdtbi5LuoeB8XxsADdc5AfYnFe.png" src-width="773" class="markdown-img m-auto" src-height="716" align="center"/>

## 2.2 配置项目

### 2.2.1 初始化

在项目目录下

```sql
vcpkg new --application
```

就会生成

<img src="/assets/IhjqbdRz3oAeCYxdDn2c0r9bnBe.png" src-width="255" class="markdown-img m-auto" src-height="56" align="center"/>

### 2.2.2 添加库

```sql
vcpkg add port fmt
```

<img src="/assets/TXnkbiuDEoF44vx3oQtc2k7pnNf.png" src-width="639" class="markdown-img m-auto" src-height="216" align="center"/>

### 2.2.3 配置cmake

针对cmake，需要新建CMakePresets.json

```bash
{
  "version": 2,
  "configurePresets": [
    {
      "name": "vcpkg",
       "generator": "Visual Studio 17 2022",
      "binaryDir": "${sourceDir}/build",
      "cacheVariables": {
        "CMAKE_TOOLCHAIN_FILE": "$env{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake"
      }
    }
  ]
}
```

`CMakeUserPresets.json`

JSON复制

```text
{
    "version": 2,
    "configurePresets": [
      {
        "name": "default",
        "inherits": "vcpkg",
        "environment": {
          "VCPKG_ROOT": "<path to vcpkg>"
        }
      }
    ]
  }
```

`CMakePresets.json` 文件包含一个名为“vcpkg”的预设，用于设置 `CMAKE_TOOLCHAIN_FILE` 变量。 `CMakeUserPresets.json` 文件会将 `VCPKG_ROOT` 环境变量设置为指向包含 vcpkg 本地安装的绝对路径。 建议不要将 `CMakeUserPresets.json` 签入版本控制系统。

配置cmake 

```bash
cmake --preset=default
```

编译

```bash
cmake --build build
```

### 2.2.4 其它

#### 2.2.4.1 
#### 2.2.4.2 指定版本

##### 2.2.4.2.1 先要给你的所有库添加基线

```bash
vcpkg x-update-baseline --add-initial-baseline
```

更新基线

```bash
若要更新清单中的基线，请使用 [vcpkg x-update-baseline](https://learn.microsoft.com/zh-cn/vcpkg/commands/update-baseline)。
```

<img src="/assets/JhqvbR2uGodtnJxXBHGcvn6vnRg.png" src-width="914" class="markdown-img m-auto" src-height="281" align="center"/>

然后再指定版本

```bash
"overrides": [
    {
      "name": "ffmpeg",
      "version": "5.1.2"
    }
  ],
```

这操作有点怪哈

## 2.3 总结

优点：添加库后，库可以直接在代码提示中使用

# 3. 手工导入（最终选择）

## 3.1  

