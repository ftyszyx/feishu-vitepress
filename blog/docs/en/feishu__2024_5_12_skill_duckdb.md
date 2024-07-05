---
title: duckdb learning
tags:
  - develop
keywords:
  - duckdb
cover: /assets/CVZzbvGWXoRmgzxD0EOcLujSn8b.png
create_time: 1718175617
categories:
  - skill
---

# Official documentation

https://duckdb.org/docs/index

# node.js use

https://duckdb.org/docs/api/nodejs/reference

## Installation

```csharp
`npm` install duckdb -S
```

## Initialization

Disposition:

https://duckdb.org/docs/configuration/overview#configuration-reference

memory: indicates that it is an in-memory database

```csharp
var duckdb = require('duckdb')
var db = new duckdb. Database(
  ':memory:', //If you fill in the file pathname, you will save the file
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
  })
```

## Query

Supported SQL statements

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

## Create a connection

```csharp
const con = db.connect();
```