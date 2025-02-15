---
create_time: 1737896970
edit_time: 1739503603
title: 常用操作
categories:
  - skill
---


# 1. 查找磁盘占用

## 1.1 获取系统情况

```bash
df -h
```

<img src="/assets/PPJQbrr4UohDewx3w78cf7Ulnqc.png" src-width="874" class="markdown-img m-auto" src-height="369" align="center"/>

## 1.2 查看一个目录的情况

```bash
ls -A|xargs du -sh
```

- `ls -A` 列出当前目录下的所有文件和目录，包括隐藏的，但不包括 `.` 和 `..`。
- `xargs du -sh` 将 `ls -A` 的输出作为 `du -sh` 的参数。

<img src="/assets/Dy5ub7mS4oq8UBxsORncrEAWn1c.png" src-width="677" class="markdown-img m-auto" src-height="717" align="center"/>

# 2. 软件安装apt

升级源

```bash
apt upgrade
```

查看软件版本

```bash
apt info app
```

# 3. hombrew国内安装

 ubuntu

Change ~/.bashrc

```bash
#将Homebrew源替换成中科大的Homebrew源
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"
#增加Homebrew环境变量
export PATH="/opt/homebrew/bin:$PATH"
```

```bash
source .bashrc
```

Install

```bash
/bin/bash -c "$(curl -fsSL https://mirrors.ustc.edu.cn/misc/brew-install.sh)"
```

加环境变量 

```bash
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/cartier/.bashrc
source .bashrc
```

测试

```bash
brew help
```

删除

```bash
brew cleanup opencv
```

# 4. 查看npu占用

```yaml
perf list | grep npu
```

