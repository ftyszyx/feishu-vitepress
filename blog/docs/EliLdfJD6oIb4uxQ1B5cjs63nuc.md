---
create_time: 1728532512
edit_time: 1728549251
title: frp
categories:
  - skill
---


```text
title: frp内网穿透
```

# 1. 参考

源码：

https://github.com/fatedier/frp

文档：

https://gofrp.org/zh-cn/

## 1.1 使用说明

https://gofrp.org/zh-cn/docs/setup/

把frps放到你买的服务器上

配置frps.toml为你开放的

```text
bindPort = 21100
```

需要后台运行，所以要使用systemd

参考：

https://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html

https://gofrp.org/zh-cn/docs/setup/systemd/

