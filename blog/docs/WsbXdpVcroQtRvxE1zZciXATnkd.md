---
create_time: 1783587609
edit_time: 1785830325
title: 安全机制的原理
categories:
  - product
---


# 1.  前言

本文主要说明底层的安全机制

# 2. 关键词

1. 主密码：用户记忆并在解锁时输入的密码，不明文保存、不上传服务器，也不直接加密 vault 条目。
2. `recoveryKey`：客户端生成的高熵 Secret Key 类安全密钥，展示给用户离线保存；已信任设备默认另存到系统安全存储。面向用户时称为“安全密钥 / Secret Key”，不能称为“恢复密码”或暗示它能找回主密码。
3. `unlockKey`：由主密码、`recoveryKey` 和 KDF 参数按固定编码派生。
4. `vaultKey`：随机生成的数据加密密钥，用于加密 vault 内敏感数据。
5. `wrappedVaultKey`：使用 `unlockKey` 加密后的 `vaultKey`，只以密文形式保存；服务端同步和新设备恢复相关流程当前按协议预留/待完成处理。

