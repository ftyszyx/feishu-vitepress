---
create_time: 1769652794
edit_time: 1770026654
title: moltbot
categories:
  - skill
---


https://github.com/moltbot/moltbot

# 1. 阿里云轻量云服务器体验

最近很火的moltbot，可以利用ai skill能力自动操作电脑。

阿里云动作很快，立马推出了免部署的云服务器服务，我想试试

https://developer.aliyun.com/article/1709047?spm=a2c6h.12883283.index.38.5f1f43075Ot0VX

<img src="/assets/KuXqbeSGIosKLaxyMxjcgRaMnzh.png" src-width="1002" class="markdown-img m-auto" src-height="472" align="center"/>

有点贵，我现在用的服务器才99元一年，这个要290一个月，不玩了。

# 2. 本地体验

https://www.53ai.com/news/gerentixiao/2026012974251.html

https://docs.openclaw.ai/

## 2.1 用wsl

安装node.js

<img src="/assets/OlTEb51JdowzcwxMmQ5cUHPnnqb.png" src-width="1247" class="markdown-img m-auto" src-height="806" align="center"/>

一键安装

```yaml
curl -fsSL https://openclaw.ai/install.sh | bash
```

或者npm

```yaml
npm i -g openclaw
openclaw onboard
```

## 2.2 windows本地

```yaml
npm i -g openclaw@latest
openclaw onboard
```

安装完后，如果网关没有启动，可以执行

```yaml
openclaw gateway
```

```yaml
openclaw dashboard
```

可以配置

配置全在C:\Users\pc\.openclaw

```yaml
openclaw configure
```

```yaml
http://127.0.0.1:18789/?token=40b40b3e376b1926c6da36ce636e91d61f20e1e2c0802d35
```

### 2.2.1 异常

```bash
07:47:22 [gateway] [plugins] failed to load plugin: Error: Cannot find module 'clawdbot/plugin-sdk'
Require stack:
- C:\Users\pc\AppData\Roaming\npm\node_modules\openclaw\extensions\minimax-portal-auth\index.ts (plugin=minimax-portal-auth, source=C:\Users\pc\AppData\Roaming\npm\node_modules\openclaw\extensions\minimax-portal-auth\index.ts)
07:47:22 [canvas] host mounted at http://127.0.0.1:18789/__openclaw__/canvas/ (root C:\Users\pc\.openclaw\canvas)
07:47:22 [heartbeat] started
07:47:22 [gateway] agent model: minimax/MiniMax-M2.1
07:47:22 [gateway] listening on ws://127.0.0.1:18789 (PID 36348)
07:47:22 [gateway] listening on ws://[::1]:18789
07:47:22 [gateway] log file: \tmp\openclaw\openclaw-2026-02-02.log
07:47:22 [browser/service] Browser control service ready (profiles=2)
07:47:23 [discord] [default] Discord Message Content Intent is disabled; bot may not respond to channel messages. Enable it in Discord Dev Portal (Bot → Privileged Gateway Intents) or require mentions.
07:47:23 [discord] [default] starting provider (@openclaw)
07:47:25 [openclaw] Uncaught exception: Error: Fatal Gateway error: 4014
    at GatewayPlugin.handleReconnectionAttempt (file:///C:/Users/pc/AppData/Roaming/npm/node_modules/openclaw/node_modules/@buape/carbon/src/plugins/gateway/GatewayPlugin.ts:420:7)
    at GatewayPlugin.handleClose (file:///C:/Users/pc/AppData/Roaming/npm/node_modules/openclaw/node_modules/@buape/carbon/src/plugins/gateway/GatewayPlugin.ts:469:8)
    at WebSocket.<anonymous> (file:///C:/Users/pc/AppData/Roaming/npm/node_modules/openclaw/node_modules/@buape/carbon/src/plugins/gateway/GatewayPlugin.ts:379:9)
    at WebSocket.emit (node:events:508:28)
    at WebSocket.emitClose (C:\Users\pc\AppData\Roaming\npm\node_modules\openclaw\node_modules\ws\lib\websocket.js:273:10)
    at TLSSocket.socketOnClose (C:\Users\pc\AppData\Roaming\npm\node_modules\openclaw\node_modules\ws\lib\websocket.js:1346:15)
    at TLSSocket.emit (node:events:520:35)
    at node:net:346:12
    at TCP.done (node:_tls_wrap:649:7)
```

安装了这个才可以

```yaml
npm i -g clawdbot@latest
```

