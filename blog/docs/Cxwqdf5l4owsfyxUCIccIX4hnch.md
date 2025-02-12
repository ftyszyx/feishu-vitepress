---
create_time: 1739239786
edit_time: 1739240236
title: linux访问windows共享
categories:
  - skill
---


# 1. Windows上分享一个文件夹

\\192.168.3.33\github

## 1.1 linux安装smbclient

```yaml
sudo apt install smbclient cifs-utils
```

## 1.2 列出远程电脑的共享

```yaml
smbclient -L //windows_ip_address  -U your_linux_username
smbclient -L //192.168.3.33  -U zzz
```

# 2. 建立一个本地目录

```yaml
sudo mkdir /mnt/windowsshare
```

# 3. 挂上共享目录

```yaml
sudo mount -t cifs //windows_ip_address/SharedFolder /mnt/windowsshare -o user=windows_username,password=windows_password,uid=$(id -u),gid=$(id -g) 


sudo mount -t cifs //192.168.3.33/github /mnt/windowsshare -o user=zzz,password=11,,uid=$(id -u),gid=$(id -g)
```

