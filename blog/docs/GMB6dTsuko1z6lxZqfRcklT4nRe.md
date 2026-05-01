---
create_time: 1772159639
edit_time: 1777545657
title: Codex
categories:
  - skill
---


https://github.com/openai/codex

# 1. 安装

```yaml
npm i -g @openai/codex
```

# 2. 使用

codex

# 3. 查看使用量

## 3.1 安装

npx @ccusage/codex@latest  

## 3.2 查看

ccusage-codex daily

ccusage-codex monthly --json

# 4. 5.5上下文大小

GPT-5.5 官方 API 规格是  **1,050,000 context window**，最大输出  **128,000 tokens**。但官方也写了：GPT-5.5 的输入超过  **272K tokens** 后，会按 long-context 价格计费，输入 2x、输出 1.5x。参考：[OpenAI GPT-5.5 model docs](https://developers.openai.com/api/docs/models/gpt-5.5)。

你本机 Codex 当前内置 catalog 里 `gpt-5.5` 是：

```json
{
  "context_window": 272000,
  "max_context_window": 272000,
  "effective_context_window_percent": 95
}
```

所以 Codex 显示  **256k** 基本是这么来的：`272000 * 95% ≈ 258400`，UI 再按 256k 档位展示。它显示的是 Codex 当前给这个模型配置的“可用上下文预算”，不是模型理论上限。

可以改，但分两层：

```toml
# ~/.codex/config.toml
model_context_window = 1050000
model_auto_compact_token_limit = 950000
```

官方 Codex 配置参考里有这两个键：`model_context_window` 是 active model 可用上下文，`model_auto_compact_token_limit` 是触发自动压缩的 token 阈值；也有 `model_catalog_json` 可以加载自定义模型 catalog。参考：[Codex config reference](https://developers.openai.com/codex/config-reference)。

我建议先用 `model_context_window` 试，不要先改 `model_catalog_json`。另外你现在用的是自定义 `sky_router` provider，不是官方 `openai` provider；即使 Codex 侧改到 1M，如果代理网关或账号 long-context tier 不支持，后端还是可能拒绝或提前截断。超过 272K 还会进 long-context 计费档，这个要确认成本策略。

我解决了，顶层的window配置被覆盖了，可能是codex ide才有的问题。

 

~/.codex/config.toml

```sql
model_context_window = 1050000
model_auto_compact_token_limit = 945000
# 新增的model_catalog_json
model_catalog_json = "~/.codex/model_catalog.json"
```

 

~/.codex/model_catalog.json内容如下：

关键是

      **"context_window": 1050000,**

 **"auto_compact_token_limit": 945000,**

 

```sql
{
  "models": [
    {
      "slug": "gpt-5.5",
      "display_name": "GPT-5.5",
      "supported_reasoning_levels": [
        {
          "effort": "low",
          "description": "Fast responses with lighter reasoning"
        },
        {
          "effort": "medium",
          "description": "Balances speed and reasoning depth"
        },
        {
          "effort": "high",
          "description": "Greater reasoning depth"
        },
        {
          "effort": "xhigh",
          "description": "Extra high reasoning"
        }
      ],
      "shell_type": "local",
      "visibility": "list",
      "supported_in_api": true,
      "priority": 0,
      "base_instructions": "default",
      "supports_reasoning_summaries": false,
      "support_verbosity": false,
      "truncation_policy": {
        "mode": "tokens",
        "limit": 10000
      },
      "context_window": 1050000,
      "auto_compact_token_limit": 945000,
      "supports_parallel_tool_calls": true,
      "experimental_supported_tools": []
    }
  ]
}
```

