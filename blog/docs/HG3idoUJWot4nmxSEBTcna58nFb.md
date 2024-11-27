---
create_time: 1731550094
edit_time: 1731565815
title: 2024-11-14 Docker虚拟机
categories:
  - other_platform
---


目前个人电脑常用的有两大操作系统:windows 和mac os.

如果你是一个pc端软件的开发者，需要软件同时适配这两个操作系统，就需要分别有两台电脑，或者安装虚拟机。

但是现在都不用了。现在有container环境，就可以直接在container中安装windows和mac，非常轻量级。

而且都是同一个人做的。

Windows:

https://github.com/dockur/windows

macos

https://github.com/dockur/macos

windows基本安装完后，还可以使用rdp连接。

作者还录了一个视频，讲了背后的原理

https://www.youtube.com/watch?v=xhGYobuG508

windows我在linux上试过了，今天试一下mac

建一个docker-compose.yml

```yaml
vi docker-compose.yml
```

写入下面内容

```yaml
services:
  macos:
    image: dockurr/macos
    container_name: macos
    environment:
      VERSION: "13"
    devices:
      - /dev/kvm
    cap_add:
      - NET_ADMIN
    ports:
      - 8006:8006
      - 5900:5900/tcp
      - 5900:5900/udp
    stop_grace_period: 2m
```

启动

```yaml
docker-compose up -d
```

# 1. 怎么使用

浏览器访问ip：8086

- Start the container and connect to <u>port 8006</u> using your web browser.

- Choose `Disk Utility` and then select the largest `Apple Inc. VirtIO Block Media` disk.

<img src="/assets/HJzFbq87louTJ3xryBQcLs6yneh.png" src-width="344" class="markdown-img m-auto" src-height="312" align="center"/>

<img src="/assets/R0ZRbyGgnosMvyxUY8dcTiT5nsf.png" src-width="827" class="markdown-img m-auto" src-height="368" align="center"/>

- Click the `Erase` button to format the disk, and give it any recognizable name you like.

<img src="/assets/CvZ1bJaG3oj8c3xBzQjcu9U0ntd.png" src-width="802" class="markdown-img m-auto" src-height="358" align="center"/>

- Close the current window and proceed the installation by clicking `Reinstall macOS`.

<img src="/assets/W9cMb0lQnoouOWxiFPTcxhoHnGe.png" src-width="376" class="markdown-img m-auto" src-height="321" align="center"/>

- When prompted where you want to install it, select the disk you just created previously.
- After all files are copied, select your region, language, and account settings.

Enjoy your brand new machine, and don't forget to star this repo!

