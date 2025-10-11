---
cover: /assets/KQYHb6WTGoZXJoxHcjbcekqCnOe.jpeg
create_time: 1752595587
edit_time: 1760169248
title: 注册码管理平台(卡密）
categories:
  - product
---


项目开源地址：

# 1. 背景

最近写了一个pc端的程序，考虑如何通过软件获取收益呢？

一般的方案通过软件注册码的方式。

1. 用户下载软件无门槛
2. 软件有一定的试用期，在试用期内可以免费使用
3. 如果超过试用期，打开软件时需要填写注册码。
4. 注册码需要软件开发者提供，每个注册码会有时间限制，也可以是不限时间。

# 2. 现有的开源方案调查

 我想网上应该有现成的方案吧。

## 2.1 kamiFaka

https://github.com/Baiyuetribe/kamiFaka

部分开源，分专业版和开源版本。

集成了支付和注册码生成。页面做的挺漂亮的。

系统中的卡密相当于就是注册码。新增卡密是这样的。

和我想要的功能不一样，这个卡密是手动填的，而且没有时效性。

<img src="/assets/VDCGbZ8VhoxpivxnLFzclwLPnEf.png" src-width="786" class="markdown-img m-auto" src-height="456" align="center"/>

## 2.2 dujiaoka

https://github.com/assimon/dujiaoka

和kamifaka功能类似，卡密也是一次性的商品，不满足需求。

## 2.3 xxgkamiexe

 https://github.com/xiaoxiaoguai-yyds/xxgkamiexe

这个系统没有支付，和我有需求比较相符

可以批量生成注册码，注册码分时间类型（可以定义有效时间）和次数类型（定义次数）

<img src="/assets/CtwbbXQMBoYXqZxuMVucef73nCh.png" src-width="1280" class="markdown-img m-auto" src-height="337" align="center"/>

还提供一个验证注册码是否有效的接口，可以用来让软件判断注册码是否过期。

<img src="/assets/A6WsbUiDgo6hD3xdheUc1jidn8f.png" src-width="1280" class="markdown-img m-auto" src-height="321" align="center"/>

可惜的是没有应用试用期的功能 

# 3. 自己实现

目前没有找到合适的方案可用。我就自己动手吧。

## 3.1 方案

整个系统采用前后端分离设计。

1. 前端就是一个管理员后台，使用vue3.
2. 后端：最近在学 rust，想拿一个项目练手，所以就用 rust了。 web框架使用salvo：

https://github.com/salvo-rs/salvo

1. 先不加入支付，只用实现注册码生成和验证接口即可。

## 3.2 第一步设计数据库模型

 主要有基础的表：user,role,(负责用户管理）

应用表：apps

注册码表：reg_codes

绑定设备表：devices

## 3.3 系统的权限管理

之前做的后台权限的字段是存在role表中，权限的修改不是特别灵活。

最近发现一个开源项目叫casbin:https://casbin.org/

专门权限问题设计了一套规则。我想试试。

首先casbin有一个权限配置文件，就像下面这个，说明见文档：https://casbin.org/docs/syntax-for-models

```yaml
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m= r.sub == p.sub && r.obj == p.obj && r.act == p.act
```

sub表示资源请求者

obj:请求的资源

Act: 动作（读写改）

还需要一个policy（策略）文件，保存在数据库中，可以由管理员编辑。对应上面的policy_definition

<img src="/assets/GorhbmvKko8UXqxhXrXcJ6atnGf.png" src-width="771" class="markdown-img m-auto" src-height="212" align="center"/>

当request_definition和policy_definition匹配上后。就表示允许。

看起来简单，实则有点抽象。

反正权限的判断逻辑现在被casbin负责了，开发者可以省心了。

## 3.4 基本流程

### 3.4.1 创建一个应用

<img src="/assets/Nohdbg42JoE3tLx2BBBcJ4Qenil.png" src-width="1355" class="markdown-img m-auto" src-height="500" align="center"/>

<img src="/assets/E1STbOR0ToUzFrxPJmkckFbOnJd.png" src-width="724" class="markdown-img m-auto" src-height="700" align="center"/>

### 3.4.2 批量生成注册码

<img src="/assets/FDNTbvVFTolOwfxqTNzcUiOjnOd.png" src-width="1535" class="markdown-img m-auto" src-height="475" align="center"/>

<img src="/assets/VJAqbckdzohgwMxrWltc7SYynSh.png" src-width="523" class="markdown-img m-auto" src-height="329" align="center"/>

生成的注册码

<img src="/assets/IHaMbSnesov0dBxGb8nczoQynrc.png" src-width="1229" class="markdown-img m-auto" src-height="569" align="center"/>

### 3.4.3 验证注册码接口

<img src="/assets/J7qbbVWFloPGj3xU1Mbc2xbRncb.png" src-width="682" class="markdown-img m-auto" src-height="441" align="center"/>

#### 3.4.3.1 试用

如果是试用用户，可以不填注册码

<img src="/assets/X5SFb9cSiotk2sx2bRtcJkHen3P.png" src-width="884" class="markdown-img m-auto" src-height="608" align="center"/>

返回内容

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "code_type": 0,
    "expire_time": "2025-10-21T07:37:54.307715500Z",
    "remaining_count": null
  },
  "success": true
}
```

此时后台可以查到用户的试用信息

<img src="/assets/NoMjbDlEIoUXGKxuvGccYguZn04.png" src-width="1501" class="markdown-img m-auto" src-height="397" align="center"/>

#### 3.4.3.2 正式用户

填注册码

<img src="/assets/E4A9byFIhoVuC7xVBYPcZc2knZb.png" src-width="1008" class="markdown-img m-auto" src-height="646" align="center"/>

返回 

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "code_type": 0,
    "expire_time": "2026-06-21T07:39:51.714245400Z",
    "remaining_count": null
  },
  "success": true
}
```

后台可以查询到注册码已经使用

<img src="/assets/VoQQbdDswockkzxa8F7cWpShnEt.png" src-width="1498" class="markdown-img m-auto" src-height="604" align="center"/>

## 3.5 总结

功能比较简单，但基本够用。以后慢慢完善

## 3.6 开发过程遇到的坑和一些感悟

1. 服务器框架从axum到salvo的原因

Axum比较流行，刚开始是用axum。

但是呢，开发过程中我想接入swagger-ui方便调试。

axum这个框架没有内部集成swagger-ui。需要单独接入utoipa。

这就导致了，我要为每一个接口重新写一份utoipa的定义，类似如下面这种

```yaml
#[utoipa::path(
    post,
    path = "/api/admin/apps",
    security(("api_key" = [])),
    request_body = AddAppReq,
    responses((status = 200, description = "Success", body = apps::Model))
)]
pub async fn add(
    State(state): State<AppState>,
    Json(req): Json<AddAppReq>,
) -> Result<ApiResponse<apps::Model>, AppError> {
    let entity = add_impl(&state, req).await?;
    Ok(ApiResponse::success(entity))
}
```

我不想写重复的东西。有点恶心。

于是我找到了salvo，这个国人开发的框架。他内部集成了swagger-ui。

于是代码就简化了，如下，很干净。

```yaml
#[endpoint(security(["bearer" = []]))] 
pub async fn add(
    <u>depot</u>:&mut Depot,
    req: JsonBody<AddAppReq>,
) -> Result<ApiResponse<apps::Model>, AppError> {
    let state = <u>depot</u>.obtain::<AppState>().unwrap();
    let entity = add_impl(&state, req.into_inner()).await?;
    Ok(ApiResponse::success(entity))
}
```

1. Rust 自定义宏的灵活性和烦恼

rust的宏很强大，可以通过代码生成代码。但是宏用的太多了，也会有很多困扰。

因为你不清楚最终生成的代码是啥。

排查错误时很不方便。

