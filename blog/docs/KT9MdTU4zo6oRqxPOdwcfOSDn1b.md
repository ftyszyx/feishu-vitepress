---
create_time: 1737901304
edit_time: 1737901341
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

