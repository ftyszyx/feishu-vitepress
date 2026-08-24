---
create_time: 1787482846
edit_time: 1787482985
title: Opencode
categories:
  - skill
---


# 1. 问题1： this model does not support image input，不能识图

我的模型明明能识别图，

```json
"models": {
    "grok-4.6": {
      "name": "grok-4.6",
      "attachment": true,
      "modalities": {
        "input": [
          "text",
          "image"
        ],
        "output": [
          "text"
        ]
      }
    }
  }
```

