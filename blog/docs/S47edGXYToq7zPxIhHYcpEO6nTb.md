---
create_time: 1775113295
edit_time: 1775141469
title: 中转站
categories:
  - skill
---


方案： 

https://github.com/Wei-Shaw/sub2api

New api 可以统计用量https://github.com/QuantumNous/new-api

CLIProxyAPI 将codex转成标准 api服务

https://github.com/router-for-me/CLIProxyAPI

需要一个海外服务器

# 1. 加速

## 1.1 使用clouadflaretunel

安装claudflare turnel,来加速你的http访问

```md
# Add cloudflare gpg key
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

# Add this repo to your apt repositories
echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main' | sudo tee /etc/apt/sources.list.d/cloudflared.list

# install cloudflared
sudo apt-get update && sudo apt-get install cloudflared
```

使用https://github.com/XIU2/CloudflareSpeedTest

获取优选ip，配置turnnel

## 1.2 使用 **回源端口**

、最实用：免费版 “域名 → IP: 端口” 完整步骤

以  **nas.xxx.com** **→ 123.45.67.89:5000** 为例：

1.  **DNS 记录**
    - Type:  **A**
    - Name: `nas`
    - Content: `123.45.67.89`
    -  **云朵：橙色（开启代理）**
    <img src="/assets/PUcWbf7dzo5EAHxPyzocs0Gwnx1.webp" src-width="512" class="markdown-img" src-height="384"/>

2.  **设置回源端口（Origin Rule）**
    - 进入  **Rules → Origin Rules**
    - Add Rule
    - Field:  **Hostname** → Value: `nas.xxx.com`
    - Action:  **Rewrite origin port** → Port: `5000`
    <img src="/assets/ZKk2bivxYo1D9oxXWxdcT0Nzn25.png" src-width="512" class="markdown-img" src-height="384"/>

3.  **开启 HTTPS**
    - SSL/TLS → 设为  **Full 或 Strict**
    - Cloudflare 自动发免费证书

4.  **访问**
    - 直接打开：`https://nas.xxx.com`
    -  **不用加 :5000**，自动转发

# 2. 反代理

https://github.com/router-for-me/Cli-Proxy-API-Management-Center

