---
create_time: 1734103586
edit_time: 1734105341
title: vmware虚拟机安装
categories:
  - skill
---


去https://softwareupdate.vmware.com/cds/vmw-desktop/ws/下载对应版本

vmtools需要手动安装

 **步骤一：更新软件源列表**

在Linux系统中，我们可以使用以下命令来更新软件源列表：

1. `sudo apt-get update`

 **步骤二：更新软件**

接下来，我们需要更新虚拟机中的软件。使用以下命令进行更新：

1. `sudo apt-get upgrade`

 **步骤三：安装open-vm-tools-desktop**

安装open-vm-tools-desktop可以解决VMware Tools灰色无法安装的问题。使用以下命令进行安装：

1. `sudo apt-get install open-vm-tools-desktop-y`

