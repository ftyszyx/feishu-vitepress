---
title: duckdb学习（目前1.0版本还不太稳定，有内存泄露风险，不推荐用于实际产品）
tags:
  - develop
keywords:
  - duckdb
cover: /assets/CVZzbvGWXoRmgzxD0EOcLujSn8b.png
create_time: 1718175617
categories:
  - skill
---


# 官方文档

https://duckdb.org/docs/index

# node.js使用

https://duckdb.org/docs/api/nodejs/reference

## 安装

```csharp
`npm` install duckdb -S
```

## 初始化

配置：

https://duckdb.org/docs/configuration/overview#configuration-reference

memory:表示是内存数据库

```csharp
var duckdb = require('duckdb')
var db = new duckdb.Database(
  ':memory:', //如果填文件路径名就是存文件
  {
    access_mode: 'READ_WRITE',
    max_memory: '512MB'
  },
  (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('DB created')
  }
)
```

## 查询

支持的sql

https://duckdb.org/docs/sql/introduction

`run()`, `all()` and `each()`

```csharp
db.all('SELECT 42 AS fortytwo', function(err, res) {
  if (err) {
    console.warn(err);
    return;
  }
  console.log(res[0].fortytwo)
});
```

## 创建连接

```csharp
const con = db.connect();
```

注意每个连接是有自己单独的上下文的，如果你想每次执行共享上下文，需要直接用db

# Duckdb node.js库的编译

地址：https://github.com/duckdb/duckdb-node

## 安装openssl

https://slproweb.com/products/Win32OpenSSL.html

https://openssl-library.org/source/index.html

下下来的是一堆源码，解压到一个目录，配好环境变量`OPENSSL_ROOT_DIR`

## 先安装依赖

```js
npm install
```

**下面是本人看文档流程，可忽略**

<img src="/assets/UZH7b6tHVoFKRXxoM0gcMMoCnGd.png" src-width="887" class="markdown-img m-auto" src-height="147" align="center"/>

官方建议加上--ignore-scripts

<img src="/assets/RlLEbBcnZoeVgVxkZRGciC7YnCP.png" src-width="712" class="markdown-img m-auto" src-height="215" align="center"/>

这个命令的意思是，不执行package.json中的这些命令，比如

install后会执行npm run install

<img src="/assets/MfYKb7H6rogT0qxB3vVcp7OWnlg.png" src-width="658" class="markdown-img m-auto" src-height="138" align="center"/>

因为这里他会在安装完依赖后自动编译。我希望自动编译，所以不要加

文档还写windows编译需要

- Set `OPENSSL_ROOT_DIR` to the root directory of an OpenSSL installation
- Supply the `STATIC_OPENSSL=1` option when executing `make`, or set `-DOPENSSL_USE_STATIC_LIBS=1` manually when calling `cmake`

看来要装openssl

# Duckdb 源码

