---
create_time: 1772156634
edit_time: 1772263042
title: Claude code
categories:
  - skill
---


https://github.com/anthropics/claude-code

查看使用量

```yaml
npx ccusage@latest
```

# 1. 安装

要翻墙

```yaml
irm https://claude.ai/install.ps1 | iex
```

## 1.1 添加模型

https://github.com/farion1231/cc-switch

添加供应商

<img src="/assets/E7DnbaA1Zo7FQvxvtfJcZf4HnIg.png" src-width="882" class="markdown-img m-auto" src-height="106" align="center"/>

# 2. 使用

命令行中输入claude 回车

就可以直接使用了

# 3. vscode中有插件

<img src="/assets/Vzs1b7zzvo88XGxD4IrcK2lLnFe.png" src-width="1278" class="markdown-img m-auto" src-height="455" align="center"/>

# 4. 具体使用

## 4.1 规则定义

/init

初始化claude.md 写全文规则（全工程）

拆分规则,根据文件后缀定义rules

.claude/rules/*.md（按path限定）

```yaml
# claude.md
@docs/ar
```

## 4.2 模式

Plan 模式 ：ai去设计

## 4.3 skill

.claude/skills/ddd/

```yaml
skill.md
scripts/
references/
assets/
```

```yaml

```

## 4.4 subagents

## 4.5 权限

.claude/settings.json

```yaml
{
 "permissions":{
 "allow":[
 "Bash()",
 ],
 "deny":[
 "Bash(rm -rf *)",
 "Write(node_modules/**)",
 "Write(.env*)"
 ]
 }
}
```

## 4.6 快捷键

Ctrl +R 搜索历史promot

ctrl+S  暂存当前prompt

shift+Tab X2    进和plan

Esc esc    撤销上一步操作

alt+v     粘贴图片

```yaml
@src/auth.rs  引用
！npm test   执行命令并回传
```

claude无人值守跑

```yaml
claude --permission-mode=dontAsk
```

# 5. 让ai自己找问题

Agent-brower

bb-brower

