---
create_time: 1735281432
edit_time: 1770197577
title: Wsl
categories:
  - skill
---


[参考文档1](https://github.com/spoto-team/openclaw-wsl-guide/blob/main/wsl-installation.md)

wsl的磁盘位置 

<img src="/assets/VsZ5bBp3Yosv5JxnujFcw0k3nid.png" src-width="776" class="markdown-img m-auto" src-height="198" align="center"/>

# 1. Wsl docker集成

<img src="/assets/Ya9hbz5kaoxucWxwhkQc9hWanvf.png" src-width="1142" class="markdown-img m-auto" src-height="438" align="center"/>

# 2. 如何安装Linux

## 2.1 列出商店的linux版本

wsl --list --online

<img src="/assets/VmZObpveJoIt6SxGQhic21IrnAb.png" src-width="1064" class="markdown-img m-auto" src-height="502" align="center"/>

## 2.2 列出当前已经安装的

Wsl --list

## 2.3 安装

wsl --install -d &lt;Distribution Name&gt;

## 2.4 进入对应的linux版本

wsl -d ubuntu 20.04

## 2.5 删除

&gt;wsl --unregister Ubuntu-20.04

## 2.6 设置默认

```bash
wsl -s <子系统名称>
```

# 3. wsl 获取主机 ip

```text
ip route | grep default | awk '{print $3}'
```

# 4. 打开文件浏览器

```bash
explorer.exe .
```

# 5. 如何从文件导入新

```py
wsl --import-in-place MyDistro D:\WSL\MyDistro\ext4.vhdx
```

# 6. wsl网络

镜像模式通过直接将 Windows 宿主机的网络接口状态同步到 Linux 内核中，消除了虚拟子网带来的复杂性：

## 6.1 配置.wslconfig 文件

镜像模式属于全局配置，需在 Windows 用户目录下创建或修改 `.wslconfig` 文件。

步骤 1：打开文件资源管理器，导航到以下路径：

```text
C:\Users\<您的用户名>\
```

步骤 2：如果文件不存在，创建名为 `.wslconfig` 的新文件（注意前面的点号）。

步骤 3：使用记事本打开文件，添加以下配置：

```yaml
[wsl2]
# 启用镜像网络模式 - 这是最重要的配置
networkingMode=mirrored
# 启用 DNS 隧道，防止 VPN 环境下域名解析失效
dnsTunneling=true
# 强制 WSL 使用 Windows 的 HTTP 代理设置
autoProxy=true
# 启用集成防火墙支持
firewall=true

[experimental]
# 自动回收闲置内存，优化性能
autoMemoryReclaim=gradual
# 支持主机回环地址访问
hostAddressLoopback=true
```

步骤 4：保存文件。

步骤 5：在 Windows 终端中执行以下命令以应用配置：

wsl --shutdown

步骤 6：等待约 8 秒钟以确保虚拟机彻底关闭，然后重新启动 Ubuntu。

验证配置：

进入 WSL 后，执行以下命令验证网络模式：

# 7. 查看网络接口

ip addr show

# 8. 查看路由表

ip route show

# 9. 测试与局域网的连通性

ping 192.168.1.1

如果配置成功，你应该能够看到 WSL 使用与 Windows 相同的局域网 IP 地址段

# 10. 一些问题

## 10.1 迁移

将C:\Users\pc\AppData\Local\wsl{d7b62c76-ccdf-4b8a-b455-14b81ef4d62c}\ext4.vhdx

移到g:\ubuntu\ext4.vhdx

1. 先查看发行版名称和版本：

```text
wsl -l -v
```

1. 关闭WSL：

```text
wsl --shutdown
```

1. 注销原发行版（这会删除原注册，但新VHDX已安全）：

```text
wsl --unregister MyDistro
```

1. 在新位置就地导入：

```text
wsl --import-in-place MyDistro D:\WSL\MyDistro\ext4.vhdx
```

1. 启动验证：

```text
wsl -d MyDistro
```

