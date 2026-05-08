---
create_time: 1775113295
edit_time: 1778139404
title: API 中转站搭建指南
categories:
  - skill
---


# 1. API 中转站搭建指南

> 本指南记录从零搭建 API 中转服务的完整流程，涵盖方案选型、服务器配置、访问加速及图片接口使用。

## 1.1 方案选型

经过对比和实测，最终选择 [sub2api](https://github.com/Wei-Shaw/sub2api) 作为中转方案。

<table header_row="1">
<colgroup>
<col width="244"/>
<col width="244"/>
<col width="244"/>
</colgroup>
<thead>
<tr><th><p>方案</p></th><th><p>说明</p></th><th><p>结论</p></th></tr>
</thead>
<tbody>
<tr><td><p><a href="https://github.com/QuantumNous/new-api">New API</a></p></td><td><p>可统计 API 用量</p></td><td><p>用户体验较差，不推荐</p></td></tr>
<tr><td><p><a href="https://github.com/router-for-me/CLIProxyAPI">CLIProxyAPI</a></p></td><td><p>将 Codex 转为标准 API 服务</p></td><td><p>仅中转服务，无 Web 管理页面</p></td></tr>
<tr><td><p><a href="https://github.com/Wei-Shaw/sub2api">sub2api</a></p></td><td><p>中转 + Web UI 一体化</p></td><td><p>✅ 最终选用</p></td></tr>
</tbody>
</table>

### 1.1.1 选择 sub2api 的理由

- UI 简洁，一目了然
- 可生成多种类型的优惠码
- 支持自动导入 ccsswith，无需手动配置
- 同时提供中转服务和 Web 管理页面

## 1.2 海外服务器

中转服务需要部署在海外服务器上。

-  **服务商**：Recknerd
-  **费用**：约 70 元/年

## 1.3 Codex Plus 账号

中转需要 Codex Plus 账号作为后端 API 来源。

-  **获取方式**：闲鱼代充值
-  **费用**：约 15 元/月

## 1.4 访问加速

服务器位于美国，国内直接访问延迟较高，需配置 CDN 加速。

### 1.4.1 方案一：Cloudflare Tunnel

安装 Cloudflare Tunnel 加速 HTTP 访问：

```bash
# 添加 Cloudflare GPG Key
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

# 添加 apt 仓库
echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main' | sudo tee /etc/apt/sources.list.d/cloudflared.list

# 安装 cloudflared
sudo apt-get update && sudo apt-get install cloudflared
```

搭配 [CloudflareSpeedTest](https://github.com/XIU2/CloudflareSpeedTest) 获取优选 IP，配置 Tunnel。

### 1.4.2 方案二：回源端口（推荐）

免费版 Cloudflare 支持「域名 → IP:端口」的完整代理。以 `nas.xxx.com` → `123.45.67.89:5000` 为例：

 **1. 配置 DNS 记录**

- 类型： **A**
- 名称：`nas`
- 内容：`123.45.67.89`
- 云朵： **橙色（开启代理）**

<img src="/assets/HWWNbKIWvowMsdxuD8Oc50OenXf.webp" src-width="512" class="markdown-img m-auto" src-height="384" align="center"/>

 **2. 设置回源端口（Origin Rule）**

- 进入  **Rules → Origin Rules**
- 添加规则：Field  **Hostname** → Value `nas.xxx.com`
- Action： **Rewrite origin port** → Port `5000`

<img src="/assets/Z5rhbU4bMoc6W5x7J01ckL5ynBb.png" src-width="512" class="markdown-img m-auto" src-height="384" align="center"/>

 **3. 开启 HTTPS**

- SSL/TLS 设为  **Full** 或  **Strict**
- Cloudflare 自动签发免费证书

 **4. 访问**

- 直接打开 `https://nas.xxx.com`，无需加端口号，自动转发

## 1.5 图片接口

sub2api 支持图片生成与编辑接口。

### 1.5.1 生成图片

```bash
curl https://your-sub2api.com/v1/images/generations \
  -H "Authorization: Bearer sk-xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2",
    "prompt": "a cute orange cat astronaut",
    "size": "1024x1024",
    "response_format": "b64_json"
  }'
```

### 1.5.2 编辑图片

```bash
curl https://your-sub2api.com/v1/images/edits \
  -H "Authorization: Bearer sk-xxx" \
  -F "model=gpt-image-2" \
  -F "prompt=replace background with aurora sky" \
  -F "image=@input.png" \
  -F "mask=@mask.png"
```

也支持不带 `/v1` 的别名路径：

- `POST /images/generations`
- `POST /images/edits`

## 1.6 最终效果

<img src="/assets/FZykbzNceoojVYxdDfococKknld.png" src-width="2552" class="markdown-img m-auto" src-height="922" align="center"/>

<img src="/assets/KeX1ba2RPoIU1Exl5dccpqcXnAb.png" src-width="2053" class="markdown-img m-auto" src-height="174" align="center"/>

