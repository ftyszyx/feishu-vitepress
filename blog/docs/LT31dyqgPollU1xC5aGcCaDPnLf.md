---
create_time: 1761622729
edit_time: 1768530586
title: Postgresql
categories:
  - skill
---


# 1. PostgreSQL `array_agg()` 函数是一个聚合函数，它返回一个包含了一个分组中的所有的值的组成的数组。

ARRAY_AGG(user_role.role_id)

COALESCE(ARRAY_AGG(user_role.role_id) FILTER (WHERE user_role.role_id IS NOT NULL), '{}'::integer[])

COALESCE:返回第一个非空参数

## 1.1 用法 

```yaml
psql -U dbuser -d exampledb -h 127.0.0.1 -p 5432
```

显示全部数据库

```yaml
\l
```

// 选择数据库

```yaml
\c dbname
```

// 列出当前数据库的所有表格。

```yaml
\d
```

// 查看psql命令列表。

```yaml
\?
```

// 查看SQL命令的解释，比如\h select。

```yaml
\h
```

// 列出所有用户。

```yaml
\du
```

 

// 列出当前数据库和连接的信息。

```yaml
\conninfo
```

```md
// 创建数据库
CREATE DATABASE dbname

// 删除数据库
DROP DATABASE dbname

# 创建新账户
CREATE USER $username WITH PASSWORD 'aaaaaa';
  
# 创建新数据库并将 OWNER 设置为新创建的帐户
CREATE DATABASE $dbname OWNER $username;

# 给新用户授权
GRANT ALL PRIVILEGES ON DATABASE $dbname TO $username;

# 导入文件
psql -U $username -h 10.116.147.14 -d $dbname -f public.sql
```

# 2. Postgres 代替redis

### 2.1.1 UNLOGGED table

https://dev.to/polliog/i-replaced-redis-with-postgresql-and-its-faster-4942

