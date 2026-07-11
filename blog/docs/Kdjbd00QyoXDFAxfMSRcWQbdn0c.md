---
create_time: 1783576733
edit_time: 1783670379
title: Winstore
categories:
  - other_platform
---


# 1. 开通账号

需要准备身份证

https://storedeveloper.microsoft.com/

<img src="/assets/SrkpbYciMoRr5lxHowfctKSYnJE.png" src-width="1323" class="markdown-img m-auto" src-height="503" align="center"/>

<img src="/assets/AgXIbbDLuof79XxYzEhc4kqon9c.png" src-width="1113" class="markdown-img m-auto" src-height="488" align="center"/>

要用手机edge浏览器（登录了microsoft账号），扫码后，需要上传身份证信息

# 2. 创建应用

<img src="/assets/CU3DbaHAko4YIIxCcMOctODQnlH.png" src-width="566" class="markdown-img m-auto" src-height="200" align="center"/>

你的包是 Tauri NSIS installer，所以填：

```text
/S
```

注意是大写 `S`，前面有 `/`。

下面这个复选框：

```text
安装程序在无提示模式下运行，但不需要切换。
```

不要勾。因为我们的 installer  **需要** **/S** **才会静默安装**。

所以这里这样填：

- 安装程序参数：`/S`
- 复选框：不勾

如果后面还有卸载参数，一般 NSIS 是：

<img src="/assets/LF6HbUS8domlRHxISL4cYRzFnBe.png" src-width="1359" class="markdown-img m-auto" src-height="558" align="center"/>

https://nsis.sourceforge.io/Docs/AppendixD.html

```text
用户已取消安装：1
应用程序已存在：1638
安装已在进行：1618
磁盘空间已满：112
需要重新启动：3010
网络故障：12029
已在安装期间拒绝包：1625
```

