---
title: node.js学习
keywords:
  - node.js
create_time: 1722220382
categories:
  - skill
---


# c++组件

vscode开发需要安装Node.js Modules Intellisense组件

node写c++的组件，需要使用node-gyp:https://github.com/nodejs/node-gyp

## 安装node-gyp

```sql
npm install -g node-gyp
```

## 安装环境

还需要安装工具，这里以windows为例，

先安装python:我装了Python 3.8

安装 Visual C++ Build Environment:

可以使用visual studio install来安装：

<img src="/assets/Bd2nb48r2opnRDx8LSecUf5knvh.png" src-width="894" class="markdown-img m-auto" src-height="315" align="center"/>

<img src="/assets/RXCEbhvjYogRcHxZIoacWGb4nmf.png" src-width="488" class="markdown-img m-auto" src-height="152" align="center"/>

## 如何写node组件

https://nodejs.org/api/n-api.html

### Node-API介绍

我们使用Node-API不用v8api(因为v8api会在不同版本node.js下有兼容问题）

<img src="/assets/AiS5b6v1koSf6ZxQGBpc0loBnHg.png" src-width="1261" class="markdown-img m-auto" src-height="79" align="center"/>

### node-addon-api依赖

因为Node-Api只支持c语言的语法，为了支持c++，需要安装node-addon-api

https://github.com/nodejs/node-addon-api/blob/main/doc/setup.md

为了兼容不同的node.js版本，最好只包含一个头文件

```sql
#include <node_api.h>
```

### Node-API的编译

Linux

For Linux developers, the necessary C/C++ toolchain packages are readily available. [GCC](https://gcc.gnu.org/) is widely used in the Node.js community to build and test across a variety of platforms. For many developers, the [LLVM](https://llvm.org/) compiler infrastructure is also a good choice.

Mac

```sql
xcode-select --install
```

Windows

```sql
visual studio c++ toos
```

node-gyp

node-pre-gyp

### building.gyp文件

因为是从gyp-next来的

有个简单的文档

https://github.com/nodejs/gyp-next/blob/main/docs/UserDocumentation.md

例子：

https://github.com/nodejs/node-gyp/blob/main/docs/binding.gyp-files-in-the-wild.md

### Hello world

建一个c++文件hello.cpp

```sql
#include <napi.h>

Napi::String Method(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  return Napi::String::New(env, "world");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "hello"), Napi::Function::New(env, Method));
  return exports;
}

NODE_API_MODULE(hello, Init)
```

建一个binding.gyp(编译add one的配置）

```sql
{
    "targets": [
        {
            "target_name": "hello",
            "sources": [
                "hello.cpp"
            ],
            "dependencies": [
                "<!(node -p \"require('node-addon-api').targets\"):node_addon_api"
            ]
        }
    ]
}
```

再写一个index.js调用模块

```sql
const binding = require("./build/Release/hello");
console.log(binding.hello());
```

新建package.json用来编译和运行

```sql
{
    "dependencies": {
         "node-addon-api": "*"
    }
    "scripts": {
        "start": "node index.js",
        "build":"node-gyp configure &&node-gyp build"
    }
}
```

执行编译命令

```sql
npm run build
```

运行

```sql
npm run start
```

<img src="/assets/XL9IbNFuZojqdIxgUGEcGFDNn9f.png" src-width="443" class="markdown-img m-auto" src-height="110" align="center"/>

## 说明

### 模块的入口

```sql
void Initialize(Local<Object> exports);//模块的Ini函数
NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize) //NODE_GYP_MODULE_NAME 模块名，指定模块的初始函数
```

hello.cc中的初始函数

```sql
void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "hello", Method);
}
```

将方法method设到hello模块中

也可以使用Node-API（与javascript runtime无关）

```sql
napi_value init(napi_env env, napi_value exports)
NAPI_MODULE(NODE_GYP_MODULE_NAME, init)
```

# 细节

## async函数堆栈打印不完整

如下：没有定位到出错问题的stack

<img src="/assets/H2RsbwRSmosnahx4pMYc3dpcn5B.png" src-width="683" class="markdown-img m-auto" src-height="222" align="center"/>

官方有此问题：

https://github.com/nodejs/node/issues/11865

