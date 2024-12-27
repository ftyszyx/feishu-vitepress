---
create_time: 1734079515
edit_time: 1734083643
title: ubuntu虚拟机安装
categories:
  - skill
---


使用的是virtualbox安装

# 1. 问题1：

鼠标没有用

原因是虚拟机鼠标设置成了触摸板，改成ps/2就行了

<img src="/assets/JJAHbm7Ycowu1nxaNVDcoUPRnFf.png" src-width="498" class="markdown-img m-auto" src-height="346" align="center"/>

# 2. 增强功能无效

<img src="/assets/BxTrbMlbqoUhgoxAe1PcU2Gpngf.png" src-width="878" class="markdown-img m-auto" src-height="568" align="center"/>

 

# 3. ssh如何连接

安装sshd

Ubuntu缺省没有安装SSH Server，使用以下命令安装：

```ts
sudo apt  install openssh-server
```

查看ssh有没有启动

```ts
sudo ps -e |grep ssh
有sshd说明ssh服务已经启动，如果没有启动，请输入sudo service ssh start，回车后ssh服务就会在Ubuntu 系统下启动了
```

<img src="/assets/H9bKbryBIouR2hxGGXecqqdVnxe.png" src-width="544" class="markdown-img m-auto" src-height="183" align="center"/>

查看虚拟机的ip

在windows上查看ipconfig

<img src="/assets/AZqvbwpspo48O8xsNsBcfuN2nAb.png" src-width="726" class="markdown-img m-auto" src-height="438" align="center"/>

但还是连不上，使用调试命令查看

```ts
ssh root@169.254.224.19 -v
```

提示

```ts
debug1: Authentications that can continue: publickey,password,keyboard-interactive
Permission denied, please try again.
```

修改`/etc/ssh/sshd_config`

 enable password authentication, uncomment

```text
#PasswordAuthentication yes
```

修改后重启ssh

```ts
sudo /etc/init.d/ssh restart
```
