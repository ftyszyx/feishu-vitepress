---
create_time: 1778480043
edit_time: 1781688893
title: 醒了，就要到
categories:
  - product
---


最近做了一个小 App，叫 wakeTo，中文名是「醒到」。

它的 slogan 是：醒了，就要到。

这是一个完全由 AI 协助开发出来的 Android App，核心功能很简单：闹钟响了以后，不能随手一划就关掉，必须完成指定任务，才能真正停止。

<div class="callout callout-bg-3 callout-border-3">
<div class='callout-emoji'>⏰</div>
<p> <strong>下载地址：</strong><a href="https://waketo.bytefuse.cn/">https://waketo.bytefuse.cn/</a></p>
<p>一句话概括：它不是只把你叫醒，而是逼你完成一个动作，让你真的离开床。</p>
</div>

## 1.1 为什么想做这个

有一天我看到一个新闻：一款叫 Erly 的闹钟 App，由个人开发，一个月下载量接近 10 万，营收大约 1 万美元。

这个数据非常亮眼。

它本质上还是一个闹钟，但特别的地方在于：闹钟响了以后，用户必须完成任务才能关闭。比如做题、扫码之类的操作。它不是单纯提醒你起床，而是给你增加一点「必须行动」的成本。

另外，它还做了打卡记录，用类似游戏化的方式，让人看到自己的坚持。

我看完之后第一感觉是羡慕：这些人真的很会抓需求。

闹钟这个品类看起来很老，但「起不来」这个问题一直存在。很多时候，人不是不知道该起床，而是醒来以后太容易反悔。普通闹钟只能提醒你醒，不能保证你真的起来。

所以我也想做一个类似的小产品，顺便试一下：现在用 AI 做一个完整 App，到底能做到什么程度。

## 1.2 产品核心：关闹钟之前，先完成任务

醒到的设计很克制，界面只有三页：闹钟、记录、设置。尽量做到一眼就会用。

它和系统闹钟最大的区别，是可以给闹钟绑定任务。目前支持三种任务：

<table header_row="1">
<colgroup>
<col width="101"/>
<col width="238"/>
<col width="328"/>
</colgroup>
<thead>
<tr><th><p>任务</p></th><th><p>作用</p></th><th><p>适合场景</p></th></tr>
</thead>
<tbody>
<tr><td><p>做题</p></td><td><p>让大脑先醒过来</p></td><td><p>防止半睡半醒时随手关闹钟</p></td></tr>
<tr><td><p>扫码</p></td><td><p>强制你走到指定位置</p></td><td><p>把二维码贴在阳台、洗手间或书桌旁</p></td></tr>
<tr><td><p>走路</p></td><td><p>让身体真正动起来</p></td><td><p>适合需要离开床、走几步再清醒的人</p></td></tr>
</tbody>
</table>

这些任务是关闭闹钟的前提条件。即使你把 App 从后台 kill 掉，闹钟也会继续响。

当然，如果你直接把 App 删除了再安装，那我也没办法。

## 1.3 第一次打开：先给必要权限

第一次打开时，App 会申请必要权限，主要是为了保证闹钟能准时响起，并且响起时能正常提醒。

<img src="/assets/Y3WNbB6QTozDrmxgNW7cCP8NnUc.png" src-width="409" class="markdown-img" src-height="504"/>

如果不给这些权限，闹钟类 App 的体验就会大打折扣。这个地方我尽量保持简单，只申请和闹钟提醒相关的必要权限。

## 1.4 闹钟页：创建一个任务闹钟

主界面就是闹钟列表。点右侧加号，可以新建一个闹钟。

<img src="/assets/N6SobgnyHoQEQlxAWHrcZ8aYnph.png" src-width="435" class="markdown-img" src-height="943"/>

新建闹钟时，除了设置时间，还可以选择关闭闹钟前必须完成的任务。

<img src="/assets/ZBnWb05yXocGZUxgTpEcJHfjnKV.png" src-width="426" class="markdown-img" src-height="412"/>

<img src="/assets/IVPbbhCd3oPTFfxQjQgcGMBpn5f.png" src-width="428" class="markdown-img" src-height="307"/>

## 1.5 三种任务：让你从不同层面醒过来

### 1.5.1 做题：先把脑子叫醒

数学题适合那种醒了但还迷糊的状态。你必须认真算一下，不能凭肌肉记忆把闹钟关掉。

<img src="/assets/HFE9bOMEoovsKBxeDsscrzL0nld.png" src-width="409" class="markdown-img" src-height="554"/>

### 1.5.2 扫码：逼自己离开床

扫码任务更直接。你可以把二维码贴在阳台、洗手间、书桌旁，闹钟响了以后，只有走到那里扫到码，才能关闭闹钟。

<img src="/assets/IoI8bidWOonqmFxPjzZcJAesnSc.png" src-width="383" class="markdown-img" src-height="554"/>

### 1.5.3 走路：让身体真的动起来

走路任务适合需要一点身体动作的人。不是醒了就算，而是要动起来才算。

<img src="/assets/Q0wTbBoT3oTf36xPLfFc2Q6Bnpg.png" src-width="306" class="markdown-img" src-height="323"/>

## 1.6 记录页：把起床变成可见的坚持

记录页会统计每天完成任务的数量。我还放了一个类似 GitHub 的热力图，让你能直观看到自己的坚持。

这一块的 UI 我很满意，AI 设计得还挺漂亮。

<img src="/assets/NwVlbigcKo382PxCT2FcAyHGn2i.png" src-width="435" class="markdown-img" src-height="943"/>

<img src="/assets/JIZUb871jo8zbWxNummcaj6CnLe.png" src-width="393" class="markdown-img" src-height="469"/>

## 1.7 设置页：管理扫码位置

设置页没做得很复杂，主要用来管理扫码位置。

<img src="/assets/XBCFb4Bd1o9Xhnx3sefcIwYrn4f.png" src-width="370" class="markdown-img" src-height="103"/>

添加一个位置后，App 会生成对应的二维码。

<img src="/assets/X21CbjmX5ozGBAxtWpDcLhatnfg.png" src-width="398" class="markdown-img" src-height="346"/>

展开二维码后，可以自己保存图片，然后打印出来。

<img src="/assets/L9JMbpaGboO9MwxIDJucy36JnSb.png" src-width="372" class="markdown-img" src-height="360"/>

比如你把它贴在阳台。下次闹钟响了，你就必须走到阳台扫这个码，才能关掉闹钟。

## 1.8 总结

醒到的功能现在基本完成了，Android 包也已经打好，可以直接下载体验。

> 我做这个 App 的想法很简单：普通闹钟负责把你叫醒，醒到负责让你真的行动起来。

下载地址：[https://waketo.bytefuse.cn/](https://waketo.bytefuse.cn/)

有兴趣的朋友可以试试，也欢迎提改进意见。

