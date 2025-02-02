---
create_time: 1738421014
edit_time: 1738421061
title: 遇到的问题
categories:
  - skill
---


# 1. windows1935端口无法绑定

 Attaching to srs_server

Gracefully stopping... (press Ctrl+C again to force)

Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:1935 -&gt; 0.0.0.0:0: listen tcp 0.0.0.0:1935: bind: An attempt was made to access a socket in a way forbidden by its access permissions.

#### 1.1.1.1  **正确的解决方案**

简单地重新设置“TCP 动态端口范围”，以便 Hyper-V 只保留我们设置的范围内的端口。您可以通过以管理员权限运行以下命令将“TCP 动态端口范围”重置为 49152–65535，但如果您认为它太大，也可以将其更改为较小的范围。

请在命令行中执行下列命令设置动态端口范围：

代码语言：javascript

复制

```js
netsh int ipv4 set dynamic tcp start=49152 num=16384
netsh int ipv6 set dynamic tcp start=49152 num=16384
```

