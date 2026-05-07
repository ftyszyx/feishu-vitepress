---
create_time: 1775113295
edit_time: 1778063528
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

# 2. openai批量卡

卖 GPT Plus 号的人，核心是用 **低成本虚拟卡 + 黑卡 / 盗刷 + 少量合规离岸卡**，配合批量注册脚本，走 “试用→绑卡→扣费→倒卖→弃卡” 的短周期黑产链。下面把来源和风险讲透：

---

### 2.1.1 一、最主流：国内可买的境外虚拟信用卡（合法 / 灰色）

这是个人小卖家的主力，成本低、开卡快、支持美元订阅。

-  **代表平台（2026 可用）**
    - WildCard（野卡）：国内手机号 + 支付宝实名，开 Visa 虚拟卡，年费约 70 元，可绑 OpenAI、Midjourney。
    - 其他：EpicCard、OneKey Card、MoonCard、NobePay，均为 **预付费 Visa/Master**，人民币充值，一键生成境外卡号、有效期、CVV。

-  **流程**：批量开卡→充小额（1–5 美元）→注册 OpenAI 账号→绑卡开 7 天 Plus 试用→改邮箱密码→卖号→卡内余额耗尽即弃。
-  **成本**：单卡开卡费 5–15 美元，可复用 3–5 次（风控严后次数减少）。

### 2.1.2 二、黑产核心：黑卡 / 盗刷信用卡（违法，量大）

大卖家 / 工作室靠这个规模化，风险极高。

-  **来源**
    1. 暗网购 “卡料”：境外用户泄露的信用卡号、有效期、CVV、账单地址，单价 5–20 美元 / 条。
    2. 盗刷 / 拖库：黑客攻击小网站、支付平台，批量窃取真实信用卡信息。
    3. “四件套” 银行卡：收购国内 / 境外他人银行卡 + 身份证 + U 盾 + 手机号，用于注册支付账户后开虚拟卡。

-  **特点**：额度高、无需实名、用完即弃； **100% 违法**，涉及诈骗、洗钱，买家账号随时被封、关联 IP / 设备拉黑。

### 2.1.3 三、小众：合规境外实体 / 离岸账户（少量，稳定）

头部团队或个人长期做的，成本高但稳定。

-  **方式**
    1. 境外银行开户：美国富港、新加坡 DBS、香港招商永隆，需护照 + 地址证明，视频面签，年费几百元。
    2. 离岸公司账户：注册岛国公司（如 BVI），开对公账户，用于批量订阅，合规但成本高（开户 + 维护约 5000 元 / 年）。

-  **用途**：用于 “正常代付”“低价区套利”（如土耳其、阿根廷区低价订阅），非批量试用，账号更稳。

### 2.1.4 四、辅助：礼品卡 / 充值卡（补充，不稳定）

- 美区 App Store、Google Play 礼品卡，或境外电商预付卡，用于间接支付 OpenAI 订阅； **成功率低、易风控**。

---

### 2.1.5 五、完整黑产链路（2026 标准流程）

1.  **资源准备**：批量境外邮箱（临时域名邮箱）、境外手机号（接码平台）、虚拟卡 / 黑卡池、代理 IP 池。
2.  **自动化注册**：脚本批量注册 OpenAI 账号→接码验证→绑卡→开通 7 天 Plus 试用→修改邮箱密码→绑定新手机号（可选）。
3.  **售卖**：按 “试用号（7 天）15–30 元、独享号（月）50–100 元” 标价，闲鱼、Telegram、小红书引流。
4.  **弃卡 / 换卡**：卡内余额不足或触发风控即丢弃，换一批卡继续循环。

---

### 2.1.6 六、风险警示（必看）

-  **对买家**：账号 **90% 以上 7 天内封禁**；用黑卡账号可能被 OpenAI 起诉；关联设备 / IP 被拉黑，后续无法注册任何 OpenAI 服务。
-  **对卖家**：虚拟卡违反支付协议，封号 + 冻结资金；黑卡 / 盗刷涉嫌刑事犯罪，可判刑 + 罚金。

---

### 2.1.7 七、个人合规替代（稳定不翻车）

- 用 WildCard 等合规虚拟卡， **手动单账号注册**，绑定自己的邮箱和手机号，订阅官方 Plus（约 20 美元 / 月），避免批量操作。
- 国内 AI 聚合平台（如 New-API、OneAIPlus），免注册 OpenAI 账号，直接调用 GPT-4，按用量付费，合规稳定。

---

要不要我帮你整理一份 **合规虚拟卡（WildCard）手动注册 + 绑卡 + 订阅 GPT Plus**的详细避坑步骤，你跟着操作就能自己用？

