---
title: vpn
tags:
  - develop
keywords:
  - vpn
  - clash_windows
create_time: 1717592186
edit_time: 1784300780
categories:
  - skill
---


Rprx: vless-reality协议 v2ray

 **VLESS**：轻量、灵活、速度快， **依赖 TLS 加密**，可搭配多种传输方式（TCP/WS/gRPC 等），适合日常看资讯、拉取世界杯海外赛事数据。

 **Trojan**： **完全伪装成正常 HTTPS 网站**，抗封锁极强，最稳，但性能开销更大，适合严格网络环境。

# 1. 协议

## 1.1 一、传统经典款（老协议，现在逐步淘汰）

1.  **Shadowsocks (SS)**
    - 原理：AES 简单加密，轻量极速
    - 优点：最简单、占用极低、速度快
    - 缺点： **特征明显，极易被识别封锁**，现在基本不能日常用
    - 用途：内网、海外服务器本地中转、测试用

2.  **ShadowsocksR (SSR)**
    - SS 加强版，加了混淆
    - 缺点：协议老旧、混淆容易被识别， **国内基本大面积失效**

---

## 1.2 二、现代主流协议（和 VLESS/Trojan 同级，最常用）

### 1.2.1 VMess / VMessAEAD

- VLESS 的 **前辈协议**，Xray/V2ray 原生协议
- 优点：生态最成熟、配置多、兼容旧客户端
- 缺点：旧版 VMess 有漏洞，必须用  **VMessAEAD**；特征比 VLESS 明显
- 适用：兼容老旧设备、老客户端用户

### 1.2.2 Hysteria / Hysteria2（极强推荐！）

- 基于  **QUIC 协议**（UDP），新一代极速协议
- 优点：
    - 速度天花板， **弱网、延迟高环境碾压 Trojan/VLESS**
    - 抗封锁强，可伪装成抖音 / 视频流量
    - 适合 **服务器批量拉取世界杯实时赛事、赔率、高频数据**

- 缺点：UDP 部分运营商限制；客户端支持不如 VLESS 全

### 1.2.3 TUIC

- 极简 QUIC 协议，比 Hysteria 更轻量
- 优点：资源占用极低、速度快、抗封锁好
- 缺点：生态较小，客户端少

---

## 1.3 三、伪装最强 / 特殊场景协议

### 1.3.1 Reality（VLESS 专属）

- VLESS + Reality， **不用域名证书，直接伪装成真实网站 TLS 指纹**
- 优点： **无证书、无域名、抗封锁极强、速度快**，比 Trojan 更灵活
- 用途：你做海外服务器、爬数据首选之一

### 1.3.2 ShadowTLS

- 给 SS 套上标准 TLS，伪装成 HTTPS
- 优点：简单、轻量、比普通 SS 稳很多
- 缺点：上限不如 Trojan/VLESS

### 1.3.3 NaiveProxy

- 基于 Chrome 标准 HTTP/2， **完全伪装成正常浏览器访问**
- 优点：伪装极强，流量和普通浏览器一模一样
- 缺点：CPU 开销大，速度一般

# 2. clouadflare(不稳定）

Worker:

https://github.com/yonggekkk/Cloudflare-vless-trojan

https://www.youtube.com/watch?v=uQFI6aNbJ1w

## 2.1 新建 worker,粘贴代码

主要代码在https://github.com/yonggekkk/Cloudflare-vless-trojan/tree/main/Vless_workers_pages

<img src="/assets/GUFKbvZeaot65qxEAYAcA8G4nJh.png" src-width="1312" class="markdown-img m-auto" src-height="711" align="center"/>

使用

<img src="/assets/WSWmbZjfQoIYvtxskahc3id5nld.png" src-width="963" class="markdown-img m-auto" src-height="481" align="center"/>

## 2.2 修改userid

定义 一个环境变量

<img src="/assets/NsClbVAcXoagv6xgS69czTwsnSM.png" src-width="1752" class="markdown-img m-auto" src-height="720" align="center"/>

生成一个uuid

https://www.kinde.com/tools/online-uuid-generator/

<img src="/assets/SkwDbiKZAoABzOx8WWCcQ2iMn0e.png" src-width="1138" class="markdown-img m-auto" src-height="669" align="center"/>

<img src="/assets/Uau7b5qq8o9ezfxuhN2c9uuvnKg.png" src-width="1316" class="markdown-img m-auto" src-height="171" align="center"/>

## 2.3 添加自定义域名

<img src="/assets/A0jHbEmMJoNq49xkk27cTj8kn2c.png" src-width="1377" class="markdown-img m-auto" src-height="381" align="center"/>

## 2.4 访问

域名/uuid

# 3. clash_windows

https://github.com/clash-verge-rev/clash-verge-rev

# 4. Clash linux

https://github.com/nelvko/clash-for-linux-install

# 5. clouadflare_vpn

https://feifei.537393.xyz/posts/freetunnel/

