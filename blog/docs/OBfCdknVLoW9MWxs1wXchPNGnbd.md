---
create_time: 1786329841
edit_time: 1786334346
title: LockPass 安全机制与流程
categories:
  - product
---


本文依据仓库 `docs/security-model.md` 整理，说明 LockPass 的密钥派生、保险库解锁、受信任设备、安全存储与密文同步流程。

<div class="callout callout-bg-5 callout-border-5">
<div class='callout-emoji'>🔒</div>
<p> **核心结论：**LockPass 的服务器只负责账号认证、设备管理和密文分发，不持有保险库解密凭据。主密码、安全密钥、<code>unlockKey</code>、<code>vaultKey</code> 和条目明文均不上传服务器。</p>
</div>

# 1. 一、核心安全原则

1. 主密码和密钥明文只在客户端内存中短暂存在；条目明文只在已解锁会话中出现。
2. 主密码与安全密钥共同通过带版本参数的 Argon2id 派生 `unlockKey`，二者缺一不可。
3. `vaultKey` 由密码学安全随机源生成，持久化时必须保存为 `wrappedVaultKey`。
4. 条目、附件索引、备份包和密钥包统一使用 AES-256-GCM 加密并认证。
5. 服务器和普通本地存储只保存密文、版本信息及白名单内的同步元数据。
6. 密文格式、KDF 参数、本地 schema、服务器 schema 和同步协议均带版本。
7. 默认解锁不依赖 Windows Hello、Windows PIN、指纹或人脸，也不保留免主密码解锁材料。

# 2. 二、密钥层级与加密流程

<table header_row="1">
<colgroup>
<col width="160"/>
<col width="360"/>
<col width="260"/>
</colgroup>
<thead>
<tr><th><p>密钥</p></th><th><p>来源与用途</p></th><th><p>保存规则</p></th></tr>
</thead>
<tbody>
<tr><td><p>主密码</p></td><td><p>用户记忆并在解锁时输入；参与派生 <code>unlockKey</code></p></td><td><p>不保存、不上传</p></td></tr>
<tr><td><p>安全密钥（Secret Key）</p></td><td><p>客户端生成的高熵随机密钥；与主密码共同派生 <code>unlockKey</code></p></td><td><p>用户离线备份；受信任设备安全保存；不上传</p></td></tr>
<tr><td><p><code>unlockKey</code></p></td><td><p>通过 Argon2id 派生；用于解开 <code>wrappedVaultKey</code></p></td><td><p>只在一次解锁过程中短暂存在</p></td></tr>
<tr><td><p><code>vaultKey</code></p></td><td><p>创建保险库时随机生成；用于加解密条目和附件</p></td><td><p>只在已解锁会话内存在</p></td></tr>
<tr><td><p><code>wrappedVaultKey</code></p></td><td><p>使用 <code>unlockKey</code> 加密后的 <code>vaultKey</code></p></td><td><p>可保存到本地密文库和服务器</p></td></tr>
</tbody>
</table>

主密码和安全密钥不是普通字符串拼接。KDF 输入包含域隔离标签与长度前缀；主密码先做 NFKC normalization 和 UTF-8 编码。修改主密码时只需用新的 `unlockKey` 重新包裹 `vaultKey`，不需要重加密全部条目。

# 3. 三、首次启用或新设备恢复

1. 用户先登录服务器账号，再输入主密码和安全密钥。
2. 客户端完整执行 Argon2id，并用 AES-256-GCM 验证、解开 `wrappedVaultKey`。
3. 只有解锁成功后，桌面端才把安全密钥写入系统安全存储。
4. Web 端生成不可导出的 AES-256-GCM 设备密钥，加密安全密钥后把密文保存到 IndexedDB。
5. 当前设备或浏览器被标记为受信任设备；主密码、`unlockKey` 和 `vaultKey` 始终不持久化。

# 4. 四、受信任设备日常解锁

“快速解锁”只代表用户通常只需输入主密码，并不代表免主密码。客户端仍会读取或解开安全密钥并完整执行 Argon2id。

<div class="callout callout-bg-3 callout-border-3">
<div class='callout-emoji'>❗</div>
<p>安全密钥不能单独解锁保险库，也不能找回或重置主密码。丢失所有受信任设备和离线保存的安全密钥后，服务器无法恢复保险库内容。</p>
</div>

# 5. 五、加密与存储边界

- AES-256-GCM 的 AAD 绑定用途、对象 ID、保险库或账号范围、格式版本、密钥 ID 和 revision。
- 解密时必须使用与加密时完全相同的 AAD，防止密文被调包到其他条目、保险库或账号。
- 同一 `keyId` 下不得复用 nonce；nonce 使用密码学安全随机源生成的 96-bit 值。
- 禁止使用 `Math.random`、时间戳、对象 ID 或 revision 单独生成 nonce。

<table header_row="1">
<colgroup>
<col width="180"/>
<col width="380"/>
<col width="340"/>
</colgroup>
<thead>
<tr><th><p>位置</p></th><th><p>允许保存</p></th><th><p>禁止保存</p></th></tr>
</thead>
<tbody>
<tr><td><p>系统安全存储</p></td><td><p>当前账号的安全密钥</p></td><td><p>主密码、<code>unlockKey</code>、<code>vaultKey</code>、条目明文</p></td></tr>
<tr><td><p>受信任浏览器 IndexedDB</p></td><td><p>不可导出的设备密钥、安全密钥密文和必要绑定元数据</p></td><td><p>安全密钥明文、主密码、会话密钥、条目明文</p></td></tr>
<tr><td><p>普通 app data / SQLite</p></td><td><p>KDF 参数、<code>wrappedVaultKey</code>、密文对象和同步状态</p></td><td><p>安全密钥明文、主密码、会话密钥、条目明文</p></td></tr>
<tr><td><p>服务器 / PostgreSQL</p></td><td><p><code>wrappedVaultKey</code>、密文对象、版本和白名单内同步元数据</p></td><td><p>主密码、安全密钥、<code>unlockKey</code>、<code>vaultKey</code>、条目明文</p></td></tr>
<tr><td><p>解锁会话内存</p></td><td><p><code>vaultKey</code>、临时 <code>unlockKey</code>、当前条目明文</p></td><td><p>任何跨锁定或跨进程重启的持久化</p></td></tr>
<tr><td><p>加密备份包</p></td><td><p>密文 envelope、加密 manifest 和必要版本信息</p></td><td><p>安全密钥及其他解密密钥的明文</p></td></tr>
</tbody>
</table>

# 6. 六、加密同步流程

服务器账号用于身份验证、设备管理和密文分发，不是保险库解密凭据。联网时修改立即加密上传；断网时先进入本机密文待保存队列，恢复联网后先上传本机修改，再拉取服务器变化。

客户端以本地可信 checkpoint 检测回滚：event cursor 不得低于已确认高水位；同一对象的 revision 不得低于本地已见最大值；envelope AAD 中的对象 ID、保险库 ID、格式版本和 revision 必须与外层同步元数据一致。新设备首次同步只能建立基线，或由另一台可信设备、离线备份交叉校验。

# 7. 七、客户端信任边界

1. 共享的 `@lockpass/crypto` provider 负责 Argon2id、AES-256-GCM、密文 envelope 与会话状态。
2. 页面组件只传递随机 `sessionId`，不直接持有 `vaultKey`；锁定后会话和界面明文必须清理。
3. Rust 负责系统安全存储、本地数据库和文件访问。Windows 解锁只读取 Credential Manager 中的安全密钥。
4. 桌面 WebView 只加载随安装包发布的本地资源，不加载远程 script，也不使用动态代码执行能力；发布包和更新包必须签名并验证。
5. 浏览器扩展是独立客户端，复用同一加密与同步协议，但不能把完整保险库或长期密钥材料发送给 Content Script。

# 8. 八、主要威胁与剩余风险

<table header_row="1">
<colgroup>
<col width="240"/>
<col width="660"/>
</colgroup>
<thead>
<tr><th><p>威胁</p></th><th><p>处理方式与剩余风险</p></th></tr>
</thead>
<tbody>
<tr><td><p>本地 SQLite 或服务器泄露</p></td><td><p>只暴露密文及非敏感元数据；服务器没有解密密钥，不能直接解密条目。</p></td></tr>
<tr><td><p>服务器返回旧数据</p></td><td><p>已使用设备依据本地 checkpoint 检测；新设备首次同步只能建立基线。</p></td></tr>
<tr><td><p>锁定后旁人操作</p></td><td><p>锁定销毁 provider 会话和界面明文；再次进入必须输入主密码并运行 Argon2id。</p></td></tr>
<tr><td><p>受信任浏览器 Profile 失陷</p></td><td><p>攻击者可能调用不可导出设备密钥解开安全密钥，但仍需主密码；可结合密钥包离线猜测主密码。</p></td></tr>
<tr><td><p>终端恶意软件</p></td><td><p>系统安全存储不能抵抗键盘记录、进程注入、同用户凭据 API 滥用或已解锁会话窃取。</p></td></tr>
<tr><td><p>日志泄露</p></td><td><p>禁止记录主密码、token、安全密钥、解密结果和条目明文。</p></td></tr>
</tbody>
</table>

<div class="callout callout-bg-4 callout-border-4">
<div class='callout-emoji'>✅</div>
<p> **安全不变量：**任何新增功能若要求服务端保存新的明文字段，必须先更新明文白名单，说明泄露范围与用户可关闭方式；任何 schema 或密文格式变更都必须带版本并提供逐步迁移测试。</p>
</div>

