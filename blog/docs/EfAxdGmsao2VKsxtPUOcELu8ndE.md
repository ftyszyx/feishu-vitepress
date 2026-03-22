---
create_time: 1769652794
edit_time: 1774086873
title: openclaw
categories:
  - skill
---


https://github.com/moltbot/moltbot

[文档](https://docs.openclaw.ai/platforms)

# 1. 本地体验 

### 1.1.1 windows本地

```yaml
npm i -g openclaw@latest
openclaw onboard --install-daemon
```

安装完后，如果网关没有启动，可以执行(因为windows安装服务会失败，所以只能命令行启动）

```yaml
openclaw gateway --port 18789
```

如果不知道webui，可以用下面命令

```yaml
openclaw dashboard
```

可以配置

配置全在C:\Users\pc\.openclaw

```yaml
openclaw configure
```

```yaml
http://127.0.0.1:18789/?token=$$
```

### 1.1.2 飞书插件

penClaw飞书插件的地址如下：

https://github.com/m1heng/clawdbot-feishu.git

按照插件的说明文档，执行下方命令即可安装：

```yaml
openclaw plugins install @m1heng-clawd/feishu
```

# 2. 使用docker（还是不成功）

使用这个项目

```yaml
https://github.com/justlovemaki/OpenClaw-Docker-CN-IM
```

启动后，打开http://127.0.0.1:18789

## 2.1 连接网关

<img src="/assets/R7LJbmWjMo7qivxGbPFcs5fMndh.png" src-width="854" class="markdown-img m-auto" src-height="622" align="center"/>

## 2.2 连接网关异常

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

## 2.3 qq机器人

https://q.qq.com/qqbot/openclaw/login.html

# 3. 暴露

https://openclaw.allegro.earth/

# 4. 各种官方skill

https://clawhub.ai/skills?sort=downloads

