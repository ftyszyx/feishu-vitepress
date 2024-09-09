---
title: rustdesk服务器搭建记录
create_time: 1725767866
categories:
  - skill
---


# 背景：

免费快速开源的远程控制软件rustdesk,如果想在国内使用，需要自己部署服务器。

阿里云之前新人有优惠，搞了一个99元一年的服务器。今天尝试部署一下。记录过程中遇到的问题，以及如何解决。

有想自己部署的可以参考。

# 参考

服务器官方地址：https://github.com/rustdesk/rustdesk-server

网上：

https://www.cnblogs.com/ryanyangcs/p/18186163

启动rustk desk docker报错

```yaml
Registered email required (-m option). 
 Please pay and register on https://rustdesk.com/server
```

原因是docker 的版本低了，需要用1.1.10-3

docker-compose中有两个地方要改

