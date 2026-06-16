---
create_time: 1778939644
edit_time: 1781514727
title: lockpass_new
categories:
  - product
---


# 1. 竞品

https://bitwarden.com/

https://1password.com/

# 2. 项目简介：

主要功能是保存密码，因为现在ai时代，新的平台不断出现，账号密码爆炸。

# 3. 为什么要做

之前做了一个https://github.com/ftyszyx/lockpass。但是发现有很多疼点

1. 同步不方便，并非一键
2. 不能保存图片压缩文件
3. 界面操作有很多bug，没有手机端
4. 还有就是之前的数据库没有migrate设计，新版本更新了数据库字段会很麻烦
5. 另外就是ai帮我分析出之前的lockpass有一些安全问题
    1. 锁屏不清密钥，密码信息还在内存，不安全
    2. 备份和恢复时没有完整性检验
    3. 旧的加密不是很强
        之前是key = SHA256(secret.key里的随机key + 用户主密码)
        ai说SHA256 速度极快，攻击者可以每秒尝试大量密码。
        密码管理器应该用“故意很慢”的 KDF

所以现在可以重做一个，而且现在ai能力很强，可以快速迭代。

# 4. 原型设计

## 4.1 pc端

