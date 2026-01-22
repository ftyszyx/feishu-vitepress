---
cover: /assets/KQYHb6WTGoZXJoxHcjbcekqCnOe.jpeg
create_time: 1752595587
edit_time: 1768697032
title: licenseHub注册码发卡验证平台
categories:
  - product
---


我的注册码管理平台，让你轻松管理软件授权！

项目开源地址：https://github.com/ftyszyx/LicenseHub

# 1. 背景

最近我写了一个PC端的程序，开始琢磨如何通过它来赚点小钱。 最常见的方案就是软件注册码了。 简单来说，就是：

1. 用户可以免费下载软件。
2. 软件有试用期，期间可以免费使用所有功能。
3. 试用期结束后，需要输入注册码才能继续使用。
4. 注册码由开发者提供，可以有时间限制，也可以永久有效。

所以，我就开始寻找现成的注册码管理方案。

# 2. 现有的开源方案调查

 首先想到的就是去GitHub上找轮子。 结果还真找到了一些：

## 2.1 kamiFaka

https://github.com/Baiyuetribe/kamiFaka

这个项目是部分开源的，有专业版和开源版。 它集成了支付和注册码生成，页面也做得挺漂亮。

<img src="/assets/VDCGbZ8VhoxpivxnLFzclwLPnEf.png" src-width="786" class="markdown-img m-auto" src-height="456" align="center"/>

但它的卡密是手动填写的，而且没有过期时间的概念，不符合我的需求。

## 2.2 dujiaoka

https://github.com/assimon/dujiaoka

这个项目和kamiFaka类似，卡密也是一次性的商品，不满足我的需求。

## 2.3 xxgkamiexe

 https://github.com/xiaoxiaoguai-yyds/xxgkamiexe

这个系统没有支付功能，但和我的需求比较接近。 它可以批量生成注册码，并且可以设置注册码的有效时间和使用次数。 

<img src="/assets/CtwbbXQMBoYXqZxuMVucef73nCh.png" src-width="1280" class="markdown-img m-auto" src-height="337" align="center"/>

它还提供了一个验证注册码是否有效的接口，方便软件判断注册码是否过期。

<img src="/assets/A6WsbUiDgo6hD3xdheUc1jidn8f.png" src-width="1280" class="markdown-img m-auto" src-height="321" align="center"/>

但可惜的是，它没有应用试用期的功能。

# 3. 自己实现

既然没有找到完全符合需求的方案，那就只能自己动手了！

## 3.1 方案

整个系统采用前后端分离设计。

我决定采用前后端分离的设计：

1. 前端：使用Vue3构建一个管理后台。
2. 后端：最近在学Rust，正好拿这个项目练手，Web框架选择Salvo（[https://github.com/salvo-rs/salvo](https://github.com/salvo-rs/salvo)）。
3. 初期不加入支付功能，只实现注册码生成和验证接口。

## 3.2 第一步设计数据库模型

 主要有以下几张表：

- user, role：负责用户管理。
- apps：应用表。
- reg_codes：注册码表。
- devices：绑定设备表。

## 3.3 系统的权限管理

之前做后台权限时，权限字段是存在role表中的，修改起来不够灵活。 最近我发现了一个开源项目Casbin（[https://casbin.org/](https://casbin.org/)），它专门为权限问题设计了一套规则。

首先，Casbin需要一个权限配置文件，就像下面这样： 

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

（具体含义可以参考Casbin的文档：[https://casbin.org/docs/syntax-for-models](https://casbin.org/docs/syntax-for-models)）

简单来说，它定义了权限判断的规则。

还需要一个policy（策略）文件，保存在数据库中，可以由管理员编辑。 它对应上面的policy_definition。

<img src="/assets/GorhbmvKko8UXqxhXrXcJ6atnGf.png" src-width="771" class="markdown-img m-auto" src-height="212" align="center"/>

当request_definition和policy_definition匹配上后，就表示允许访问。

虽然看起来有点抽象，但Casbin确实能简化权限判断的逻辑，让开发者省心不少。

## 3.4 效果展示

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

虽然功能比较简单，但基本够用。 以后会慢慢完善。

# 4. 开发过程遇到的坑和一些感悟

1. 服务器框架从axum到salvo的原因

刚开始我选择了比较流行的Axum。 但是，在开发过程中，我想接入Swagger UI方便调试。 Axum没有内部集成Swagger UI，需要单独接入utoipa。 这就导致我需要为每一个接口重新写一份utoipa的定义。

类似如下面这种

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

我不想写重复的东西，感觉很麻烦。 于是我找到了Salvo，这个国人开发的框架。 它内部集成了Swagger UI，代码变得简洁多了。

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

Rust的宏很强大，可以通过代码生成代码。 但是，宏用得太多了也会有很多困扰，因为你不清楚最终生成的代码是什么，排查错误时很不方便。

# 5. 结尾

总而言之，这次开发经历让我收获了很多。大家如果觉得这个系统对你有用，可以提建议。

