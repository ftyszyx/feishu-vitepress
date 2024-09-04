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

#  

