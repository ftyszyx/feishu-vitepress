---
create_time: 1761622729
edit_time: 1761622956
title: Postgresql
categories:
  - skill
---


# 1. PostgreSQL `array_agg()` 函数是一个聚合函数，它返回一个包含了一个分组中的所有的值的组成的数组。

ARRAY_AGG(user_role.role_id)

COALESCE(ARRAY_AGG(user_role.role_id) FILTER (WHERE user_role.role_id IS NOT NULL), '{}'::integer[])

COALESCE:返回第一个非空参数

