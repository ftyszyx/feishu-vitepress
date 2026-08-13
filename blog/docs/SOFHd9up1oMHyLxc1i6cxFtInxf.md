---
create_time: 1778939644
edit_time: 1786517522
title: LockPass
categories:
  - product
---


# 1. 项目简介

LockPass 是一款注重隐私与安全的密码管理工具，用于集中保存不断增长的账号、密码和其他敏感信息。

市面上已有成熟的密码管理器；LockPass 的目标是提供一个可自托管、可按个人需求持续打磨的选择。

官网：https://lockpass.bytefuse.cn/

源码：https://github.com/ftyszyx/lockpass-next

# 2. 重做的原因

旧版 LockPass（https://github.com/ftyszyx/lockpass）验证了基本方向，但在同步、附件、可维护性和安全设计上仍存在明显不足：

1. 同步流程繁琐：需要先备份到云盘，再从云盘恢复，容易产生版本不一致。
2. 附件能力受限：无法保存图片和压缩文件等附件。
3. 界面与操作稳定性不足：存在较多影响日常使用的问题。
4. 数据迁移机制缺失：后续迭代和结构调整的成本较高。
5. 另外还有很多安全问题
    1. 锁屏后未及时清除内存中的密钥材料，存在暴露风险。
    2. 备份和恢复流程缺少完整性校验。
    3. 旧的加密不是很强
        旧版派生方式：`key = SHA256(安全密钥 + 主密码)`。
        SHA-256 设计为高速哈希，若用于直接派生解锁密钥，面对离线猜测主密码的攻击时成本偏低。

因此，新版本从同步体验、数据模型与安全架构重新设计，并借助现代开发工具提高迭代效率。

# 3. 安全设计

对于密码管理工具，安全是基础。LockPass 通过主密码、安全密钥和分层密钥管理，尽量减少敏感数据暴露面。

用户需要安全保存的关键材料：

<table header_row="1">
<colgroup>
<col width="160"/>
<col width="360"/>
<col width="260"/>
</colgroup>
<thead>
<tr><th><p>凭据</p></th><th><p>作用</p></th><th><p>保存原则</p></th></tr>
</thead>
<tbody>
<tr><td><p>主密码</p></td><td><p>用户记忆，并在解锁保险库时输入。</p></td><td><p>不保存、不上传；丢失后无法找回。</p></td></tr>
<tr><td><p>安全密钥（Secret Key）</p></td><td><p>客户端生成的高熵随机密钥；与主密码共同派生解锁密钥。</p></td><td><p>用户应离线保存；受信任设备可安全保存；不上传。</p></td></tr>
</tbody>
</table>

系统仅在必要时生成和使用下列临时密钥。它们不是用户需要记忆或手动管理的凭据。

<table header_row="1">
<colgroup>
<col width="160"/>
<col width="360"/>
<col width="260"/>
</colgroup>
<thead>
<tr><th><p>密钥</p></th><th><p>来源与用途</p></th><th><p>存在范围</p></th></tr>
</thead>
<tbody>
<tr><td><p><code>unlockKey</code></p></td><td><p>由 Argon2id 基于主密码和安全密钥派生；用于解开或包装 <code>vaultKey</code>。</p></td><td><p>仅在一次解锁过程中短暂存在。</p></td></tr>
<tr><td><p><code>vaultKey</code></p></td><td><p>创建保险库时随机生成；用于加解密条目和附件。</p></td><td><p>仅在已解锁的会话内存在。</p></td></tr>
<tr><td><p><code>wrappedVaultKey</code></p></td><td><p>使用 <code>unlockKey</code> 通过  <strong>AES-256-GCM</strong> 加密 <code>vaultKey</code> 后生成。</p></td><td><p>可保存到本地密文库和服务器；不包含可直接使用的明文密钥。</p></td></tr>
</tbody>
</table>

`vaultKey`加密生成`wrappedVaultKey`的流程如下：

用户数据的加密解密流程如下：

 **用户解锁时获取vaultkey流程如下：**

上述设计将敏感信息置于以下防护边界中：

<table header_row="1">
<colgroup>
<col width="240"/>
<col width="660"/>
</colgroup>
<thead>
<tr><th><p>威胁场景</p></th><th><p>风险缓解方式</p></th></tr>
</thead>
<tbody>
<tr><td><p>本地数据库或服务器数据泄露</p></td><td><p>攻击者只能获得密文及非敏感元数据。服务器不持有解密所需的完整密钥，不能直接读取条目。</p></td></tr>
<tr><td><p>受信任设备被攻陷，安全密钥泄露</p></td><td><p>攻击者仍需获得主密码。Argon2id 提高了离线猜测主密码的计算成本</p></td></tr>
</tbody>
</table>

# 4. 桌面端使用指南

下载桌面端：https://lockpass.bytefuse.cn/

## 4.1 创建账号并完成初始化

首次打开桌面端时，先选择要连接的服务器。可以使用官网提供的服务，也可以连接自建服务器。

<img src="/assets/JNsfbRyTyozSQlxqkKhcrdCsnwd.png" src-width="1279" class="markdown-img m-auto" src-height="818" align="center"/>

已有账号请选择“登录”；没有账号请选择“创建新账号”，随后会在浏览器中完成账号创建。

<img src="/assets/Uga5bkDsRoBx8yxRyPBcjco1nHd.png" src-width="416" class="markdown-img m-auto" src-height="326" align="center"/>

 **注意：**完成邮箱验证后，请设置主密码。主密码无法找回，请务必自行牢记。

<img src="/assets/RUNxbHdAYo8v1FxWOFZca1wQnFg.png" src-width="374" class="markdown-img m-auto" src-height="300" align="center"/>

 **生成安全密钥**

<img src="/assets/CUsObdKSxoDzRcxVtEsc5bUYnfc.png" src-width="386" class="markdown-img m-auto" src-height="257" align="center"/>

 **注意：**请将安全密钥保存到离线且安全的位置。它不能找回主密码，也不能单独解锁保险库；遗失后无法恢复。

<img src="/assets/STCpbNaE5obHOUxAd9VcaZjSnHb.png" src-width="380" class="markdown-img m-auto" src-height="385" align="center"/>

确认安全密钥已妥善保存后，点击“完成创建”。

浏览器会弹出提示，选择“打开 LockPass”返回桌面端。

<img src="/assets/SUecbprcAoTO6fxJSU3cqswhnVf.png" src-width="450" class="markdown-img m-auto" src-height="216" align="center"/>

账号创建完成后，桌面端会提示输入主密码和安全密钥以解锁保险库。

<img src="/assets/G7kUbGP8boCTDhx5QFIcKZgungf.png" src-width="1279" class="markdown-img m-auto" src-height="818" align="center"/>

点击“进入”后即可进入主界面，初始化完成。

<img src="/assets/REzKb8lNfoZnIqxVlvicRwrDn9b.png" src-width="1275" class="markdown-img m-auto" src-height="839" align="center"/>

## 4.2 创建保险库

<img src="/assets/J8ALbpUbpoadkFxEu9lcNgOTnoc.png" src-width="1279" class="markdown-img m-auto" src-height="818" align="center"/>

## 4.3 添加条目

<img src="/assets/RSGwb6zlCoJl9Nx8bzacYLH9nvQ.png" src-width="1281" class="markdown-img m-auto" src-height="850" align="center"/>

选择要创建的条目类型。

<img src="/assets/YWWYbXgpIotlEAxhMW8cuAe0nld.png" src-width="579" class="markdown-img m-auto" src-height="272" align="center"/>

填写条目信息。

<img src="/assets/GA2Hb3OoRo4ZWbxNX6HcmUHRnVe.png" src-width="1279" class="markdown-img m-auto" src-height="818" align="center"/>

可点击密码生成按钮，让 LockPass 生成高强度密码。

<img src="/assets/TMoqbdsQgoGR4HxQUtPcQZDmnbb.png" src-width="1279" class="markdown-img m-auto" src-height="818" align="center"/>

点击“完成”后，条目将保存到保险库中。

<img src="/assets/E2uQb2uSHoLBkixP1D2ca8CBnKh.png" src-width="1272" class="markdown-img m-auto" src-height="840" align="center"/>

## 4.4 同步条目

服务器连接正常时，条目的密文会自动同步到服务器。

<img src="/assets/YBXbb6dDmo1ksOxipdrcRR2Gncb.png" src-width="629" class="markdown-img m-auto" src-height="414" align="center"/>

# 5. 浏览器插件使用指南

# 6. 一些要做的功能

1. windows桌面端需要增加开关，可以通过window hello 人脸 或者windows hello pin 来解锁，不需要用主密码解锁 
2. 浏览器插件 端需要实现密码的自动填 入和自动增加功能

