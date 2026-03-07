---
create_time: 1769652794
edit_time: 1772769357
title: openclaw（的确是难用）
categories:
  - skill
---


https://github.com/moltbot/moltbot

[文档](https://docs.openclaw.ai/platforms)

# 1. 本地体验 

https://damodev.csdn.net/697eed9b7c1d88441d9111e8.html

powershell(以管理员方式打开）

```yaml
https://damodev.csdn.net/697eed9b7c1d88441d9111e8.html
```

## 1.1 用wsl（没成功）

https://github.com/spoto-team/openclaw-wsl-guide

先设置网络为镜像

安装node.js

<img src="/assets/OlTEb51JdowzcwxMmQ5cUHPnnqb.png" src-width="1247" class="markdown-img m-auto" src-height="806" align="center"/>

npm

```yaml
npm i -g openclaw
openclaw onboard --install-daemon
```

或者一键安装

```yaml
curl -fsSL https://openclaw.ai/install.sh | bash
```

验证安装

```yaml
which openclaw
openclaw --version
openclaw gateway status
```

### 1.1.1 windows本地

```yaml
npm i -g openclaw@latest
openclaw onboard --install-daemon
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

### 1.1.2 异常

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

# 2. 源码运行

```yaml
git clone https://github.com/openclaw/openclaw.git
cd openclaw

pnpm install
pnpm ui:build # auto-installs UI deps on first run
pnpm build

pnpm openclaw onboard --install-daemon

# Dev loop (auto-reload on TS changes)
pnpm gateway:watch
```

这里增加model provider

<img src="/assets/D2pRbrEEkoBM5NxjIvwcXbFWnsb.png" src-width="1160" class="markdown-img m-auto" src-height="293" align="center"/>

入口：

openclaw.mjs-》await import("./dist/entry.js");

```js
import("./cli/run-main.js")
    .then(({  **runCli** }) => runCli(process.argv))
    .catch((_error_) => {
      console.error(
        "[openclaw] Failed to start CLI:",
        _error_ instanceof Error ? (_error_.stack ?? _error_.message) : _error_,
      );
      process.exitCode = 1;
    });
```

# 3. 飞书插件

penClaw飞书插件的地址如下：

https://github.com/m1heng/clawdbot-feishu.git

按照插件的说明文档，执行下方命令即可安装：

```yaml
openclaw plugins install @m1heng-clawd/feishu
```

# 4. 使用docker（还是不成功）

使用这个项目

```yaml
https://github.com/justlovemaki/OpenClaw-Docker-CN-IM
```

启动后，打开http://127.0.0.1:18789

## 4.1 连接网关

<img src="/assets/R7LJbmWjMo7qivxGbPFcs5fMndh.png" src-width="854" class="markdown-img m-auto" src-height="622" align="center"/>

## 4.2 连接网关异常

```yaml
closed before connect conn=65f201be-2149-422a-b948-44875b45ca59 remote=172.19.0.1 fwd=n/a origin=http://127.0.0.1:18789 host=127.0.0.1:18789 ua=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 code=1008 reason=pairing requi
```

<img src="/assets/Iwc8bJeTFoX7QCxzANDcY1oTnEe.png" src-width="584" class="markdown-img m-auto" src-height="497" align="center"/>

这个docker内网配对有点麻烦，直接把配对验证关掉

```bash
__
_# 危险：禁用设备认证（如在 Docker 环境中无法获取设备信息），可选 true/false_
OPENCLAW_GATEWAY_DANGEROUSLY_DISABLE_DEVICE_AUTH=true
_# 插件全局控制_
OPENCLAW_PLUGINS_ENABLED=true
```

## 4.3 qq机器人

https://q.qq.com/qqbot/openclaw/login.html

# 5. 暴露

https://openclaw.allegro.earth/

# 6. 各种官方skill

https://clawhub.ai/skills?sort=downloads

