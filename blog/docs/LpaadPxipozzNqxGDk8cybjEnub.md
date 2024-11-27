---
title: 其它有用的库
create_time: 1726708701
edit_time: 1726714267
categories:
  - product
---


# 1. CrystalDiskInfo_dll_lib

https://github.com/ftyszyx/CrystalDiskInfo_dll_lib

ManagementObjectSearcher can't get the correct searial number,sometime.

To obtain the correct disk name and serial number, the best approach is to use CrystalDiskInfo(https://github.com/hiyohiyo/CrystalDiskInfo) . However, CrystalDiskInfois a Windows software written in C++. As a result, it cannot be directly used in one's own project. Therefore, I wrapped CrystalDiskInfo into a DLL. Now, other languages or Windows applications can also accurately distinguish the disk serial number with the help of CrystalDiskInfo. I have open-sourced this project on GitHub. If you are interested in it, you can check it out and use it.

https://github.com/ftyszyx/CrystalDiskInfo_dll_lib

ManagementObjectSearcher经常获取不到正确的硬盘序列号。

为了获取正确的磁盘名称和序列号，最好的方法是使用 CrystalDiskInfo。但是，CrystalDiskInfo 是一个用 C++ 编写的 Windows 软件，不能在自己的项目中直接使用。所以，我将 CrystalDiskInfo 封装成了一个 DLL。现在，其他语言或 Windows 应用程序也可以借助 CrystalDiskInfo 正确地区分磁盘序列号。我已在 GitHub 上开源了这个项目。如果你对此感兴趣，可以查看并使用它。https://github.com/ftyszyx/CrystalDiskInfo_dll_lib

# 2. robotjs

Robotjs (https://github.com/octalmage/robotjs)is build use V8 API.So it must be rebuilt for different Node versions.

This is a big trouble when installing on a platform that has no build environment..

So I rewrapped Robotjs with Node API and prebuilt it. Now you can install robotjs_addon with just one command 

npm install robotjs_addon

And it is compatible with different Node versions. It's open source. You can check it out if you are interested.https://github.com/ftyszyx/robotjs

Warm: some api is removed,because there is no need for me, you can help to improve.

Robotjs(https://github.com/octalmage/robotjs) 是使用 V8 API 构建的。所以它必须针对不同的 Node 版本进行重新编译。如果你的电脑没有编译环境，安装这个库会报错。

所以我用 Node API 重写了 Robotjs 的封装api.并进行了预编译。

现在你可以仅用一个命令安装 robotjs：

“npm install robotjs_addon”

并且它与不同的 Node 版本兼容。

代码已开源。如果你感兴趣，可以查看一下。

https://github.com/ftyszyx/robotjs

注意：接口有减少，因为我暂时没用到

