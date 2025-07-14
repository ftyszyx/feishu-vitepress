---
create_time: 1737901304
edit_time: 1752374704
title: github加速
categories:
  - skill
---


# 1. Github 代理

https://ghfast.top/

增加

```bash
git config --global url."https://mirror.ghproxy.com/https://github.com/".insteadof "https://github.com/"
```

查看

```bash
git config --list
```

取消

```bash
git config --global --unset url.https://mirror.ghproxy.com/https://github.com/.insteadof
```

https://www.7ed.net/gitmirror/hub.html

# 2. github无法连接

https://zhuanlan.zhihu.com/p/521340971

<img src="/assets/T8fpbdh06oBCcWxHULHchdimngd.png" src-width="926" class="markdown-img m-auto" src-height="121" align="center"/>

在这个网站找github的ip

https://dnschecker.org/#A/github.com

然后修改host

C:\Windows\System32\drivers\etc\hosts

```yaml
20.205.243.166 github.com
```

# 3. github代理加速

https://github.com/cmliu/CF-Workers-GitHub

