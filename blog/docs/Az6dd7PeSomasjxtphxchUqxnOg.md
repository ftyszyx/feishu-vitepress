---
create_time: 1752595587
edit_time: 1752661105
title: 注册码管理平台(卡密）
categories:
  - product
---


# 1. 背景

最近写了一个pc端的 程序，考虑如何收费呢？

一般的方案是用户购买一个注册码，用注册码登录即可。

所以需要一个生成注册码的服务器 。

我大概列了 这几个需求

1. 用户可以在网站上购买应用，购买成功后 ，服务 器会自动生成一个注册码提供给用户。（不需要用户登录）
2. 用户可以通过网站自助查询对应的订单（查到对应的注册码）
3. 注册码有时效概念，到期就无效
4. 可以后台手动生成注册码
5. 需要提供查询注册码是否有 效的接口给客户端
6. 需要提供绑定机器码和注册码的接口给客户端
7. 支持微信和支付宝支付
8. 服务器还可以配置应用的其它的信息，如：版本号，最新版本下载地址，更新公告，资源下载地址等，方便应用自动更新

要些一个工具应用能有完整的生态链，这个服务器程序是必须的。不然你做的 东西就无法实现价值。

# 2. 现有的开源方案调查

我也找到了几个开源方案

## 2.1 [kamiFaka](https://github.com/Baiyuetribe/kamiFaka)

https://github.com/Baiyuetribe/kamiFaka

部分开源，分专业版和开源版本。

专业版本好像多了分销功能

功能做的挺完美的的 ，ui颜值很高。

开发框架：

服务端：python(flask)

前端：vue

开源版本用户端：

<img src="/assets/LnmDbdCU6o8Uwqx732lc0wusnhh.png" src-width="1023" class="markdown-img m-auto" src-height="477" align="center"/>

后端 

<img src="/assets/KANDbvJchoCsRnx8vifcfJt5nKe.png" src-width="1815" class="markdown-img m-auto" src-height="847" align="center"/>

## 2.2 xxgkami

https://github.com/xiaoxiaoguai-yyds/xxgkami

没试用，php写的，先只记录一 下

好像没支付，只有发卡

## 2.3 dujiaoka

https://github.com/assimon/dujiaoka

php写的，没试用，看功能应该是完整的

## 2.4 总结一下

kamifaka挺符合我心意的，可惜就是前端没有源码，感觉后面 如果要调整前端页面有点难。

另外它的注册码好像没有有效期的设置，有点不符合要求。

另外两个 都是用php写的，我好久没有写php了，不想再搭php的环境了，所以还没试用。

心想现有Ai了，写程序已经不是一个 体力活了，要不自己整一个？方便日后维护

# 3. 设计

## 3.1 开发框架选择

管理员前端：不用说了，肯定是 vue3。

用户购买页：有可能还涉及到产品的展示，有可能在next.js和nuxt.js中选一个 ，倾向于nuxt.js(vue)

服务器：最近在学 rust，想拿一个项目练手，所以就用 rust了。

## 3.2 数据表

用户表

```yaml
pub id: i32,
    pub username: String,
    pub password: String, 
    pub created_at: DateTime, 
    pub balance: i64,
    pub inviter_id: Option<i32>,
    pub invite_count: i32, 
    pub invite_rebate_total: i64,
    pub role_id: i32,
```

角色表

```yaml
#[sea_orm(primary_key)]
    pub id: i32,
    pub name: String,
    #[schema(value_type = String)]
    pub created_at: DateTime,
```

产品表（对应一个app)

商品表（对应用户可以购买的商品）

订单表（用户支付时对应的订单信息）

订单日志表

注册码表

注册码日志表

## 3.3 后端功能拆分

## 3.4 管理员前端功能

