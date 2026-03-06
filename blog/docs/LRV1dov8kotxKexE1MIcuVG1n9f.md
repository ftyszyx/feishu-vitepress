---
create_time: 1772677367
edit_time: 1772679341
title: openfang
categories:
  - skill
---


https://www.openfang.sh/?ref=producthunt

开源：https://github.com/RightNow-AI/openfang

# 1. 安装

安装很简单，

```yaml
irm https://openfang.sh/install.ps1 | iex
openfang init
```

# 2. 使用

```yaml
openfang start
# Dashboard live at http://localhost:4200
```

web页面一次性打开无错误

<img src="/assets/ABVybKY2mowelCxgDUrcw5f9nUg.png" src-width="2552" class="markdown-img m-auto" src-height="956" align="center"/>

## 2.1 问题1

切换网页，好慢，不应该啊，rust做后端，怎么可能这么慢

<img src="/assets/OcpSbejTao9r9yxBn99cenm9nDb.png" src-width="1236" class="markdown-img m-auto" src-height="712" align="center"/>

## 2.2 问题2

第一次打开chat时，发消息会卡住

