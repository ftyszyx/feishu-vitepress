---
create_time: 1776941155
edit_time: 1776941332
title: Grsaiapi
categories:
  - skill
---


# 1. Gpt image api

### 1.1.1 节点信息

Host(国内直连)

https://grsai.dakka.com.cn 

### 1.1.2 图片生成

POST`/v1/draw/completions`

## 1.1 API地址 

请求方式:POST

响应方式:stream 或 回调接口

请求头 Headers

```yaml
{
  "Content-Type": "application/json",
  "Authorization": "Bearer apikey"
}
```

请求参数 (JSON)

```json
{
  "model": "gpt-image-2",
  "prompt": "描述您想要生成的图像内容的提示词",
  "size": "1:1",
  "urls": [
    "https://example.com/example1.png",
    "https://example.com/example2.png"
  ],
  "webHook": "https://example.com/callback",
  "shutProgress": false
}
```

参数说明

model（必填）

类型: `string`

示例: `"gpt-image-2"`

描述:

支持模型:

gpt-image-2

prompt（必填）

类型: `string`

示例: `"一只可爱的猫咪在草地上玩耍"`

描述:

提示词

size（选填）

类型: `string`

示例: `"1:1"`

描述:

输出图像比例

可选："auto"

"1:1"

"3:2"

"2:3"

"16:9"

"9:16"

5:4

4:5

"4:3"

"3:4"

"21:9"

"9:21"

"1:3"

"3:1"

"2:1"

"1:2"

urls（选填）

类型: `string[]`

示例: `["https://example.com/image1.jpg", "https://example.com/image2.jpg"]`

描述:

参考图片的URL，支持多张图片

webHook（选填）

类型: `string`

示例: `"https://your-webhook-url.com/callback"`

描述:

进度与结果的回调链接

接口默认以Stream流式响应进行回复

如果填了webHook，进度与结果则以Post请求回调地址的方式进行回复

请求头: Content-Type: application/json

---

如果不使用回调，而使用轮询result接口方式获取结果，需要接口立即返回一个id

则webHook参数填"-1"，那么会立即返回一个id

shutProgress（选填）

类型: `boolean`

示例: `false`

描述:

关闭进度回复，直接回复最终结果,建议搭配webHook使用

默认false

```yaml
参数说明
```

