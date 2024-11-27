---
create_time: 1731984452
edit_time: 1731984586
title: node版本管理
categories:
  - skill
---


node现在版本太多了，而且互不兼容。

现在可以通过nvm来管理node不同的版本

# 1. nvm使用

```yaml
安装：
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

安装node
nvm install 22

查看当前
node -v
npm -v

切换
nvm use 22
```

