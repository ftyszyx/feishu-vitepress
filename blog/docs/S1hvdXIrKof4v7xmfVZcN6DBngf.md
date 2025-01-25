---
cover: /assets/FTPzbPoz5omrgDxO1UAcGDvbnlb.gif
create_time: 1732093061
edit_time: 1737712537
title: ssh连接
categories:
  - skill
---


# 1. windows怎么安装

https://github.com/PowerShell/Win32-OpenSSH/releases

安装完后，输入命令有反应表示 正常

<img src="/assets/GmyJbvgYPoRV7sxFLPlcDpSYn3e.png" src-width="704" class="markdown-img m-auto" src-height="149" align="center"/>

# 2. 如何生成秒钥

```go
ssh-keygen -t rsa -C "rumenz@qq.com"
-t:指定加密算法
-C 是加个备注
```

会在

C:\Users\zyx\.ssh目录下生成私钥和公钥

<img src="/assets/In9abwAknoiqcixqOlXcUixrnFe.png" src-width="351" class="markdown-img m-auto" src-height="245" align="center"/>

# 3. 如何无密码连接linux

## 3.1 将公钥加到authorized_keys中

如果没有就新建一个文件

<img src="/assets/QaETblbouoGuVtxTUllcuVrfnfL.png" src-width="557" class="markdown-img m-auto" src-height="52" align="center"/>

```go
cat id_rsa_test.pub >>authorized_keys
```

## 3.2 修改配置

编辑 /etc/ssh/sshd_config 文件，进行如下设置

```go
#能用pubkey登录
PubkeyAuthentication yes
#root能登录
PermitRootLogin yes
#这个目录要配对
AuthorizedKeysFile      .ssh/authorized_keys
```

改用私钥登录

改当前目录到.ssh目录下，执行下面命令

```go
ssh username@ip -p port –i id_rsa
```

# 4. ssh文件权限

密钥需要设置成600，别人不可读

```go
$ chmod 600 ~/.ssh/id_rsa
$ chmod 600 ~/.ssh/id_rsa.pub
```

authorized_keys需要设置成644只有文件所有者才能写

# 5. ssh连接调试

## 5.1 查找连接问题，可以加-v

```go
ssh username@ip -v
```

## 5.2 查看服务器日志，可以查看

```go
/var/log/secure
```

<img src="/assets/CgtHbtVkBoyNNJxEidQccdICnid.png" src-width="1068" class="markdown-img m-auto" src-height="138" align="center"/>

## 5.3 使用调试模式

```go
/usr/sbin/sshd -p 10022 -d
-d     以调试模式运行。服务器将在前台运行并发送非常详细的调试日志信息，服务器将只允许接入一个连接，并且不派生出子进程。仅用于调试目的。
-p 10022 指定端口
```

# 6. vscode怎么密钥连ssh

打开remote view

<img src="/assets/POJvbqyTIoOwFIxagzdctNc0n0g.png" src-width="572" class="markdown-img m-auto" src-height="53" align="center"/>

选设置

<img src="/assets/ZZdlbScPFoKp4bxbah1czVsvnmf.png" src-width="487" class="markdown-img m-auto" src-height="75" align="center"/>

Open config

<img src="/assets/WrKmbYDozo6gLrxCnXecRXEdnRF.png" src-width="396" class="markdown-img m-auto" src-height="77" align="center"/>

Add identifile

<img src="/assets/KVJeb5rpVocufSxSPKvcEPTSn3b.png" src-width="501" class="markdown-img m-auto" src-height="107" align="center"/>

ok

