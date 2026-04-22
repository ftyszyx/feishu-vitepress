---
create_time: 1776491953
edit_time: 1776752873
title: hermes-agent
categories:
  - skill
---


# 1. 简单使用

## 1.1 安装部署

参考文档 ：https://hermes-agent.nousresearch.com/docs 安装

配置模型 hermes model,也可以直接去 ~/.hermes/config.yml里配置

```yaml
hermes model       # Choose your LLM provider and model
hermes tools       # Configure which tools are enabled
hermes setup       # Or configure everything at once
```

开始聊天

```yaml
hermes            # classic CLI
hermes --tui      # modern TUI (recommended)
```

其它一些命令

Press `Alt+Enter` or `Ctrl+J` to add a new line. Great for pasting code or writing detailed prompts.

### 1.1.1 Interrupt the agent

If the agent is taking too long, just type a new message and press Enter — it interrupts the current task and switches to your new instructions. `Ctrl+C` also works.

### 1.1.2 Resume a session

When you exit, hermes prints a resume command:

```bash
hermes --continue    _# Resume the most recent session_
hermes -c            _# Short form_
```

## 1.2 增加飞书机器人

https://hermes-agent.nousresearch.com/docs/user-guide/messaging/feishu

```yaml
hermes gateway setup
```

通过

```yaml
hermes gateway 手动启动
hermes gateway install 安装linux服务
```

# 2. 组建团队

https://hermes-agent.nousresearch.com/docs/user-guide/profiles

2个coder  一个产品经理

~/.hermes/profiles/work/

```yaml
hermes profile create coder       _# creates profile + "coder" command alias_
coder setup                       _# configure API keys and model_
coder chat                        _# start chatting_
```

## 2.1 两个agent互通

## 2.2 开启 Profile 间内部通信（Agent↔Agent 消息调用）

修改全局 `~/.hermes/config.yaml`

yaml

```text
agent:multi_profile_enabled: true# 开启Agent互信通信agent_to_agent:enabled: trueallow: ["bot_a", "bot_b"] # 两个Profile互相放行
```

## 2.3 分别启动双网关后台服务

# 3. 五、飞书侧额外权限必开（90% 互通失败原因）

两个飞书自建应用 **都必须额外开通**：

1.  **发送消息给其他机器人权限**（飞书开放平台权限管理）开通：
    - `im:message.send` 通用发送
    - `im:resource.upload.all` 附件权限

2. 关闭飞书机器人 **防骚扰拦截**：应用设置→安全→允许接收其他机器人消息
3. 两个 Bot **拉进同一个飞书群**（最简测试场景）

> 1. 群内 @BotA → BotA 回复 → 网关转发给 BotB → BotB 群内回复，测试最快

# 4. 命令行太难用，有webui

https://github.com/nesquena/hermes-webui

# 5. 背景

openclaw小龙虾还没火几个月，又出了一个hermes-agent。现在别说普通人有焦虑，我们程序员一样有。

公司要每人每个月用光1000刀的ai额度。如果光靠我一问一答，肯定是用不完了，必须用上全自动agent这种利器。所以现在开始研究一下hermes-agent

# 6. windows部署

hermes-agent 只能在linux上部署，不支持纯windows环境，这个简单，让ai去改写源码，给他说增加windows支持即可。 

