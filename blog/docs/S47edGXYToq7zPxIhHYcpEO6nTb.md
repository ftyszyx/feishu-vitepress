---
create_time: 1775113295
edit_time: 1775205988
title: 中转站
categories:
  - skill
---


# 1. 开源方案： 

New api 可以统计用量https://github.com/QuantumNous/new-api(不好用）

CLIProxyAPI 将codex转成标准 api服务（只是一个中转服务，没有web页面）

https://github.com/router-for-me/CLIProxyAPI

最终决定用https://github.com/Wei-Shaw/sub2api

1. ui简单，一目了然
2. 可以生成各种类型的优惠码
3. 可以自动导到ccswith，无需配置
4. 中转和web ui都有

## 1.1 需要一个海外服务器

买了recknerd_server  70块一年 

# 2. 需要一个codex plus账号

闲鱼上买了代充值服务15一个月

# 3. 访问加速

服务器在美国，国内访问很慢，需要加速

两种方案

## 3.1 使用clouadflare tunel

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

## 3.2 使用 **回源端口**

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

# 4.  搞定

<img src="/assets/GMvIbxxldoCDsZxdsH1cGvzdn1f.png" src-width="2552" class="markdown-img m-auto" src-height="922" align="center"/>

<img src="/assets/Bkvgb31CZo22Ndx4rGNc9lqpnAh.png" src-width="2053" class="markdown-img m-auto" src-height="174" align="center"/>

