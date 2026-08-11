---
create_time: 1778939644
edit_time: 1786371977
title: lockpass_new
categories:
  - product
---


# 1. 项目简介：

主要功能是保存密码，因为现在ai时代，新的平台不断出现，账号密码爆炸，人脑记不住。

也有一些做的很成熟的密码管理器，我就想用一下自己设计的，自己做的放心，可以随便折腾。

官网：https://lockpass.bytefuse.cn/

源码：https://github.com/ftyszyx/lockpass-next

# 2. 为什么要做

之前做了一个https://github.com/ftyszyx/lockpass。但是发现有很多疼点

1. 同步不方便：需要先备份到云盘，再从云盘拉回来，容易造成不同步
2. 不能保存图片压缩文件
3. 界面操作有很多bug
4. 还有就是之前的数据库没有migrate设计，后续优化很麻烦
5. 另外还有很多安全问题
    1. 锁屏不清密钥，密码信息还在内存，不安全
    2. 备份和恢复时没有完整性检验
    3. 旧的加密不是很强
        之前是key = SHA256(secret.key里的随机key + 用户主密码)
        ai说SHA256 速度极快，攻击者可以每秒尝试大量密码。

所以现在可以重做一个，而且现在ai能力很强，可以快速迭代。

# 3.  安全性设计

密码保存工具，安全机制是基础，在AI的建议下设计方案如下：

用户需要关注的密钥：

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
<tr><td><p>主密码</p></td><td><p>用户记忆并在解锁时输入</p></td><td><p>不保存、不上传</p></td></tr>
<tr><td><p>安全密钥（Secret Key）</p></td><td><p>客户端生成的高熵随机密钥； </p></td><td><p>用户离线备份；受信任设备安全保存；不上传</p></td></tr>
</tbody>
</table>

软件中间过程中产生的密钥

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
<tr><td><p><code>unlockKey</code></p></td><td><p>通过 Argon2id (主密码，secretKey）派生；用于 加密vaultKey</p></td><td><p>只在一次解锁过程中短暂存在</p></td></tr>
<tr><td><p><code>vaultKey</code></p></td><td><p>创建保险库时随机生成；用于加解密条目和附件</p></td><td><p>只在已解锁会话内存在</p></td></tr>
<tr><td><p><code>wrappedVaultKey</code></p></td><td><p>使用 <code>unlockKey</code> 通过 <strong>AES-256-GCM</strong>加密 <code>vaultKey</code>生成</p></td><td><p>可保存到本地密文库和服务器</p></td></tr>
</tbody>
</table>

加密和解密流程如下图：

vaultKey的加密过程

数据的加密过程

方案能解决的安全问题如下：

<table header_row="1">
<colgroup>
<col width="240"/>
<col width="660"/>
</colgroup>
<thead>
<tr><th><p>威胁</p></th><th><p>目前的方案</p></th></tr>
</thead>
<tbody>
<tr><td><p>本地 SQLite 或服务器数据泄露</p></td><td><p>只暴露密文及非敏感元数据；服务器没有解密密钥，不能直接解密条目。</p></td></tr>
<tr><td><p>受信任设备被黑客攻陷，安全密钥泄露</p></td><td><p>攻击者没有主密码；需要结合wrappedVaultKey离线猜测主密码，但Argon2id算法增加了难度，时间成本增加</p></td></tr>
</tbody>
</table>

# 4. windows软件使用

pc端：下载地址：https://lockpass.bytefuse.cn/

第一次打开，选择要连接的服务器，可以用官网的，也可以用自建的。

<img src="/assets/JNsfbRyTyozSQlxqkKhcrdCsnwd.png" src-width="1279" class="markdown-img m-auto" src-height="818" align="center"/>

如果有账号就选 登录，没账号就选 创建新账号

