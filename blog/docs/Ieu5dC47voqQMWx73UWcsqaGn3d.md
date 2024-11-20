---
create_time: 1732001725
edit_time: 1732003355
title: 问题汇总
categories:
  - skill
---


# 提交时，别人也有提交，导致冲突

You have divergent branches and need to specify how to reconcile them.

<img src="/assets/YwfHbO4qKohA8LxxnsZccyoEnff.png" src-width="721" class="markdown-img m-auto" src-height="335" align="center"/>

可以回退到合并前的版本

- 查看最近3次提交的历史版本

<img src="/assets/BBuFbQS2VooxwtxeyFpcQQcJnTc.png" src-width="656" class="markdown-img m-auto" src-height="276" align="center"/>

- 根据历史版本记录，选择`commit`地址，回退到自己合并之前的版本

<img src="/assets/UbBPbq33QoH9iAxeg69cm4CZnpb.png" src-width="700" class="markdown-img m-auto" src-height="58" align="center"/>

再pull

```yaml
git pull
```

# 还原当前文件的改动

```yaml
git checkout -- <filename>
```

此命令会使用 HEAD 中的最新内容替换掉你的工作目录中的文件。已添加到缓存区的改动，以及新文件，都不受影响。

# 还原服务器版本

如你想要丢弃你所有的本地改动与提交，可以到服务器上获取最新的版本并将你本地主分支指向到它：

```yaml
git fetch origin
git reset --hard origin/master
```

