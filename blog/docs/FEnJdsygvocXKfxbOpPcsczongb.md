---
create_time: 1739102279
edit_time: 1739283471
title: nfs_server
categories:
  - skill
---


# 1. nfs服务介绍

       NFS就是Network File System的缩写，即网络文件系统，它最大的功能就是可以通过网络，让不同的机器、不同的操作系统可以共享彼此的文件。

       它允许网络中的计算机之间通过TCP/IP网络共享资源。将NFS主机分享的目录，挂载到本地客户端当中，本地NFS的客户端应用可以读写位于远端NFS服务器上的文件(在客户端看起来，就像访问本地文件一样)。

<img src="/assets/ZDJtbxqlzorZwZxZXXdcM0sfnMd.png" src-width="832" class="markdown-img" src-height="376"/>

 

# 2. nfs服务搭建

## 2.1 2.1    安装nfs服务器

       执行以下指令进行安装

```cpp
sudo apt install nfs-kernel-server
```

复制

<img src="/assets/WorlblUeRoALKTxKcs5cuhpOnqb.png" src-width="730" class="markdown-img" src-height="304"/>

（注意：安装之前先看看是否能联网，如果无法ping通公网看看是否开启PCI以太网）

## 2.2 2.2    配置nfs分区，编辑以下文件:

       进入路径/home/developer/，创建目录作为服务器的共享目录

```cpp
mkdir nfsroot
```

       打开nfs服务器配置文件/etc/exports

```cpp
sudo vim /etc/exports
```

       指定nfs服务器共享目录及其属性，内容如下：

```cpp
/home/developer/nfsroot  *(rw,sync,no_subtree_check,no_root_squash)
```

<img src="/assets/AADDbhV5doxjuzxbtcQc8tnNnRe.png" src-width="730" class="markdown-img" src-height="89"/>

       /home/developer/nfsroot：指定/home/developer/nfsroot为nfs服务器的共享目录

       *：允许所有的网段访问，也可以使用具体的IP

       rw：挂接此目录的客户端对该共享目录具有读写权限

       sync：资料同步写入内存和硬盘

       no_root_squash：root用户具有对根目录的完全管理访问权限

       no_subtree_check：不检查父目录的权限

## 2.3 2.3    重新启动nfs服务

       执行下面命令可以重启nfs服务器：

```cpp
sudo /etc/init.d/nfs-kernel-server reload
sudo /etc/init.d/nfs-kernel-server restart
```

复制

<img src="/assets/EgIrbCfcFo5aL8xIKKlcTU3DnYb.png" src-width="721" class="markdown-img" src-height="94"/>

(注意：如果重启失败，请重新检查nfs服务器配置文件)

## 2.4 2.4    查看已经成功共享的nfs分区:

       执行以下命令查看分区

```cpp
showmount -e
```

       创建一个文件(后面用来验证是否挂载成功)

<img src="/assets/Xy6Wbv2EhoCvsYxpW9dc7ovsn7c.png" src-width="736" class="markdown-img" src-height="60"/>

 

# 3. linux客户端

安装

```yaml
apt-get install nfs-common
```

## 3.1 nfs服务器挂载  

       首先执行以下命令 **【进入嵌入式开发板环境】：**

```cpp
adb shell
```

       执行在客户端挂载服务器共享目录的命令：

```cpp
sudo mount -t nfs 192.168.3.48:/home/developer/nfsroot /home/monster/nfs -o nolock
```

 

<img src="/assets/JUKmbYF01oIiA4xEl9dc2sDAnpW.png" src-width="1349" class="markdown-img" src-height="76"/>

(注意：需要将192.168.3.142换成自己的nfs服务器ip)

可以看到之前创建的文件已经成功挂载到开发板

       -t：挂载的文件系统类型

       -o nolock：不要文件锁

       192.168.xxx.xxx:/home/developer/nfsroot：nfs服务器ip:服务器共享目录

       /home/monster/Desktop/nfs：客户端已存在的目录

# 4. windows客户端

开启nfs功能在设置中

```yaml
mount -o anon \\192.168.3.48/home/developer/nfsroot
```

