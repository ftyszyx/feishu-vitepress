---
create_time: 1768545722
edit_time: 1782802552
title: licenseHub优化记录
categories:
  - product
---


# 1. 2026-1

# 2. 注册码可以叠加

之前只能使用一次注册码，如果同时使用多个注册码，时间只会计算最大的那个。

现在修改为，可以叠加使用。

# 3. 注册码可以标记为已使用

因为没有接入支付。需要手动发货，如果没有修改状态的功能，会有点混乱

<img src="/assets/WOK5bstGdog8amx7a6cc8Z0anZd.png" src-width="1146" class="markdown-img m-auto" src-height="525" align="center"/>

标记使用后，就不能被人工删除，防止误删

# 4. 增加状态搜索

<img src="/assets/WyvwbVQOQoN8J0xHMXGc847Jnff.png" src-width="946" class="markdown-img m-auto" src-height="229" align="center"/>

# 5. 过期时间和过期次数放在设备表

之前放在注册码表，不是很合理

<img src="/assets/U4LCbAOljoaLVrxXkuMcDM13nic.png" src-width="1672" class="markdown-img m-auto" src-height="113" align="center"/>

# 6. 增加角色的权限管理

<img src="/assets/D09db8yZKoCAzYxMtg3caEKHnWd.png" src-width="1225" class="markdown-img m-auto" src-height="669" align="center"/>

# 7. 接入支付

## 7.1 授权签名能力 

### 7.1.1 行为变化

- 客户端调用绑定或检查接口时，除原有 `expire_time` / `remain_count` 外，还会拿到可验签的 `license` 对象。
- 服务端没有生成授权签名密钥前，新的绑定/检查流程会失败；上线前需要先在后台系统设置中生成密钥，并将公钥配置到客户端构建环境。
- 轮换密钥会影响旧客户端验签，提交中的前端确认文案也明确提示：使用旧公钥构建的客户端将无法通过授权校验。

第一次使用时一定生成私钥

<img src="/assets/FdqkbUiS4oczIuxhjelcAooynCe.png" src-width="1314" class="markdown-img m-auto" src-height="526" align="center"/>

### 7.1.2  

