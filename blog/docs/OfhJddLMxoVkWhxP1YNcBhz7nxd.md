---
create_time: 1786504295
edit_time: 1786506269
title: 我用 AI 重写了一个密码管理器
categories:
  - other_platform
---


去年，AI 还没这么火的时候，我纯手工写过一个密码管理器：LockPass。

项目地址：https://github.com/ftyszyx/lockpass

当时它能解决我的一些基本需求，但用了一段时间后，问题也慢慢暴露出来。尤其是密码管理器这种工具，不能只是“能用”，还得足够稳定、足够安全、足够方便。

今年，AI 已经变成了很实用的生产力工具。我结合 AI 的分析和自己的实际使用体验，把这个项目重新做了一版，重点放在安全性和易用性上。

## 1.1 为什么要重写

旧版 LockPass 最大的问题，不是某一个功能没做好，而是很多细节叠加在一起，影响了长期使用的信心。

- 同步流程比较繁琐：需要先备份到云盘，再从云盘恢复，很容易出现不同设备之间版本不一致的问题。
- 附件能力受限：无法保存图片、压缩包等附件，很多和账号相关的材料只能放在别处。
- 界面和操作稳定性不够：日常使用时有不少影响体验的小问题。
- 数据迁移机制缺失：后续如果要调整数据结构，迭代成本会比较高。
- 安全设计也有继续加强的空间：比如锁屏后需要及时清理内存中的密钥材料，备份和恢复流程需要完整性校验，旧版密钥派生方式也不够理想。

旧版的密钥派生方式比较直接：`key = SHA256(安全密钥 + 主密码)`。

这个实现简单，但 SHA-256 本身是高速哈希。如果直接用它派生解锁密钥，一旦攻击者拿到本地数据，就可以比较高效地离线猜测主密码。对密码管理器来说，这个成本还是太低了。

## 1.2 这次重写想解决什么

所以这次重写，我没有只把界面翻新一遍，而是把几个基础能力重新梳理了一下。

- 同步要更自然：多端数据应该尽量保持一致，不再依赖手动备份和恢复。
- 数据模型要更完整：密码条目之外，也要支持附件、图片、文件等材料。
- 安全机制要更完整：重新设计了底层的安全机制以及每个密码的存储位置和边界。
- 后续迭代要更方便：数据迁移、服务端、自部署和管理后台都要提前考虑。

目前新版已经初步可用，先简单介绍一下。

项目官网：https://lockpass.bytefuse.cn/

源码：https://github.com/ftyszyx/lockpass-next

## 1.3 LockPass Next 由几部分组成

这次不再只是一个单独的桌面应用，而是拆成了几个互相配合的部分。

- 桌面端：计划支持 Mac 和 Windows，目前先打包了 Windows 版本。
- 浏览器插件端：用于辅助添加网站密码，也可以自动填入账号密码。
- Web 端：功能上和桌面端保持一致，方便在不同环境下使用。
- 服务器：负责加密数据的存储和同步。
- 服务器管理后台：用于管理后台数据和服务状态。

服务器支持自己部署。也就是说，如果你不希望把数据放在我的服务上，可以自己部署一套同步服务。

## 1.4 界面预览

桌面端主界面：

<img src="/assets/DrNgbWdAao99kLxiMshczAx0nhb.png" src-width="1275" class="markdown-img" src-height="839"/>

浏览器插件主界面：

<img src="/assets/YOovbfDJuoPLzVxyqEBc04Brn9g.png" src-width="781" class="markdown-img" src-height="564"/>

<img src="/assets/Ib0ybYp8poa1AJxHLN3cZQtDn8c.png" src-width="780" class="markdown-img" src-height="600"/>

管理后台：

<img src="/assets/PJ4QbtM6vodobMx0kmFcrWmonee.png" src-width="2560" class="markdown-img" src-height="919"/>

## 1.5 安全机制：两个凭据，三类密钥

密码管理器最核心的问题是：就算本地数据库或者服务器数据泄露，别人能不能直接拿到你的明文密码。

在 LockPass Next 里，用户需要保管两个东西：

- 主密码：由用户自己设置，需要记住。
- 安全密钥：由软件生成，需要用户妥善保存。

系统会根据主密码和安全密钥派生出下面三类密钥。普通用户不需要理解每个细节，只要知道：服务器不会保存能直接解开数据的明文密钥。

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
<tr><td><p><code>vaultKey</code></p></td><td><p>创建保险库时随机生成；用于加密和解密条目、附件等用户数据。</p></td><td><p>仅在已解锁的会话内存在。</p></td></tr>
<tr><td><p><code>wrappedVaultKey</code></p></td><td><p>使用 <code>unlockKey</code> 通过  <strong>AES-256-GCM</strong> 加密 <code>vaultKey</code> 后生成。</p></td><td><p>可以保存到本地密文库和服务器；它本身不是可直接使用的明文密钥。</p></td></tr>
</tbody>
</table>

简单理解就是：

用户数据真正由 `vaultKey` 加密；

`unlockKey` 只负责解开 `vaultKey`；

`wrappedVaultKey` 则是可以存储和同步的密文形态。

用户数据的加密和解密流程如下：

 **软件解锁时获取** **vaultKey** **的流程如下：**

## 1.6 它主要防什么

这套设计不是在说“绝对安全”，而是把风险拆开：服务器拿不到完整密钥，主密码和安全密钥也不会单独成为唯一防线。

<table header_row="1">
<colgroup>
<col width="240"/>
<col width="660"/>
</colgroup>
<thead>
<tr><th><p>威胁场景</p></th><th><p>风险缓解方式</p></th></tr>
</thead>
<tbody>
<tr><td><p>本地数据库或服务器数据泄露</p></td><td><p>攻击者只能拿到密文、同步数据和非敏感元数据。服务器不持有解密所需的完整密钥，不能直接读取条目内容。</p></td></tr>
<tr><td><p>安全密钥泄露</p></td><td><p>攻击者仍然需要主密码。Argon2id 会提高离线猜测主密码的计算成本。</p></td></tr>
<tr><td><p>主密码被撞库或过弱</p></td><td><p>仅有主密码还不够，仍然需要安全密钥才能派生出正确的 <code>unlockKey</code>。</p></td></tr>
</tbody>
</table>

## 1.7 目前的状态

现在项目的基本框架已经可用，但还有很多功能需要继续完善。我会先通过自己的真实使用持续优化，把高频场景跑顺，再慢慢补齐更多细节。

如果你对这个项目有兴趣，可以试用，也可以提建议、提 issue，甚至直接参与开发。

对我来说，这次用 AI 重写 LockPass，最有价值的地方不是“让 AI 一次性写完一个产品”，而是把过去那些一直想改、但成本太高的部分，变成了可以持续推进的工程。

