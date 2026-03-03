---
create_time: 1772437430
edit_time: 1772443127
title: Pi agent
categories:
  - other_platform
---


# 1. 使用

https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent

## 1.1 安装

```yaml
npm install -g @mariozechner/pi-coding-agent
```

## 1.2 启动

```yaml
pi
```

## 1.3 增加自定义Providers

Add providers via `~/.pi/agent/models.json`

说明：https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/models.md

```json
{
  "providers": {
    "deepseek": {
      "baseUrl": "https://api.deepseek.com",
      "api": "openai-completions",
      "apiKey": "",
      "models": [
      { "id": "deepseek-reasoner" },
        { "id": "deepseek-chat" }
      ]
    }
  }
}
```

## 1.4 对话

<img src="/assets/LTEXbSPNfoMTTWxMqGrcx4Oynbb.png" src-width="812" class="markdown-img m-auto" src-height="490" align="center"/>

## 1.5 扩展 pi extensions

Place in `~/.pi/agent/extensions/`, `.pi/extensions/`, or a <u>pi package</u> to share with others. See <u>docs/extensions.md</u> and <u>examples/extensions/</u>.

https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/extensions.md

## 1.6 Pi packages

# 2. 主要的结构

<img src="/assets/Lc5YbkwkloKQHjxouX0cYdZ0n0d.png" src-width="692" class="markdown-img m-auto" src-height="286" align="center"/>

