---
create_time: 1752714251
edit_time: 1752718163
title: 2017-7-17 https代理
categories:
  - other_platform
---


# 1. 网络加速

在国内开发最痛苦的事就是网络。很多语言的第三方库都需要从外网下载，国内因为墙的原因，基本上是无法下载。

所以要找各种加速方法

比如：

docker镜像，没有国内的镜像代理，只能在cloudflare上搭一个代理跳转。算是解决了。

python,rust,npm,flutter,这些语言的第三方库，也是无法下载，好在国内的阿里扛起了大旗，免费做了同步镜像。

ubuntu的apt软件下载，也需要靠阿里。

但是还有一个github。

我的博客代码是在github上的。因为买的是阿里云99元的服务器，无法编译，所以编译资源也是用github action.

这样每次播客有更新，就需要服务器从github release上下载最新资源包。

但是这个下载是超级的慢。

于是我使用https://github.com/cmliu/CF-Workers-GitHub  的方法在cloudflare部署了一个，

但是也不稳定

## 1.1 siteproxy

https://github.com/netptop/siteproxy

这个项目的方案和CF-Workers-GitHub  类似，相当于地址重定向

但是这个项目主要是为了浏览网页，试了一下用于文件下载，有点问题。

没有源码，也不清楚他的原理 是啥

# 2. tinyproxy

https://github.com/tinyproxy/tinyproxy

安装

```yaml
sudo apt-get install tinyproxy
```

编辑配置文件/etc/tinyproxy/tinyproxy.conf

```yaml
port 8888  //开放端口
Timeout 600  // 请求超时时长
Allow 127.0.0.1 // 允许连接的IP地址，多个再新增一条，如果完全允许则删除此行
Allow 127.0.0.2
BasicAuth user password //连接用户密码，需要对应版本1.10以后，否则服务启动失败
```

启动

```yaml
service tinyproxy start
service tinyproxy restart
service tinyproxy stop
```

测试

```yaml
curl -x <http://127.0.0.1:8787> www.baidu.com // 无需用户名密码
curl -x <http://user:password@127.0.0.1:8888> www.baidu.com  // 需要用户名密码
```

