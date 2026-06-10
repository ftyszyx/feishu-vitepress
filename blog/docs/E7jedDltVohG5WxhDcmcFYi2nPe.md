---
cover: /assets/M6uvbiIn4oUzObxI5TYc8i17nVc.jpeg
create_time: 1774067371
edit_time: 1781012352
title: 微博备份工具使用教程：备份微博、评论、转发和视频到本地
categories:
  - product
---


<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>📌</div>
<p> <strong>微博克隆器</strong> 是一款 Windows 本地备份工具，适合将自己的微博正文、图片、视频、评论和转发内容保存到本地，用于个人资料归档、账号迁移前整理和长期留档。</p>
<p>适用范围：请仅用于备份本人或已获授权的微博内容。</p>
</div>

<table>
<colgroup>
<col width="150"/>
<col width="520"/>
</colgroup>
<tbody>
<tr><td><p> <strong>官网下载</strong></p></td><td><p><a href="https://weibocloner.bytefuse.cn/">https://weibocloner.bytefuse.cn/</a></p></td></tr>
<tr><td><p> <strong>运行环境</strong></p></td><td><p>Windows 客户端</p></td></tr>
</tbody>
</table>

# 1. 这版工具优化了什么

1. 使用微博 M 端协议保存内容，减少正文、评论、转发、视频等资料在备份时的遗漏。
2. 优化微博登录与任务执行流程，减少重复登录和验证打断。
3. 增加任务管理、备份记录和结果查看能力，适合定期归档自己的微博资料。

# 2. 支持备份哪些内容

<table header_row="1">
<colgroup>
<col width="140"/>
<col width="110"/>
<col width="430"/>
</colgroup>
<thead>
<tr><th><p>内容类型</p></th><th><p>是否支持</p></th><th><p>说明</p></th></tr>
</thead>
<tbody>
<tr><td><p>微博正文</p></td><td><p>支持</p></td><td><p>保存文字内容和发布时间等基础信息。</p></td></tr>
<tr><td><p>图片</p></td><td><p>支持</p></td><td><p>随微博内容一起保存，适合图文资料归档。</p></td></tr>
<tr><td><p>视频</p></td><td><p>支持</p></td><td><p>适合保存自己发布或已获授权的微博视频素材。</p></td></tr>
<tr><td><p>评论</p></td><td><p>支持</p></td><td><p>创建任务时可选择是否采集评论；开启后耗时会更长。</p></td></tr>
<tr><td><p>转发</p></td><td><p>支持</p></td><td><p>按任务配置保存相关转发内容。</p></td></tr>
<tr><td><p>专栏</p></td><td><p>支持</p></td><td><p>可用于资料型内容的长期留档。</p></td></tr>
</tbody>
</table>

# 3. 使用前准备

- 下载并安装微博克隆器 Windows 客户端。
- 准备好需要登录的微博账号。
- 确认要备份的微博用户 ID。通常打开微博主页后，地址中的数字就是用户 ID。

# 4. 新增账号

## 4.1 新建账号

进入账号管理页面，点击新建账号。

<img src="/assets/UelKbAaSgonmMExhlvUcBp7snjb.png" src-width="1898" class="markdown-img" src-height="1144"/>

平台选择微博，账号名可以填写便于自己识别的名称；账号 ID 填写需要登录的微博账号 ID，然后点击确认。

<img src="/assets/ZaLjbvWflooShVxRgggcmtXjnSh.png" src-width="672" class="markdown-img" src-height="494"/>

## 4.2 如何找到微博用户 ID

在浏览器中打开微博主页，地址栏里的一串数字通常就是微博用户 ID。

<img src="/assets/JFkQbYVFro0gEpxH9rWcxtA6n3b.png" src-width="850" class="markdown-img" src-height="57"/>

# 5. 登录账号并保存 Cookies

## 5.1 打开登录窗口

新增账号后，点击登录按钮。

<img src="/assets/NDlBbwG6ko8bm5xtXvqcU67Pnof.png" src-width="1898" class="markdown-img" src-height="150"/>

此时软件会打开内置浏览器。

<img src="/assets/RaZfbdPzfoR2f2xK85icI4X7nHg.png" src-width="1458" class="markdown-img" src-height="839"/>

## 5.2 完成登录并保存 Cookies

点击对应平台的登录按钮，登录你的微博账号。确认账号已经在软件内置浏览器中成功登录后，回到程序并点击“保存 Cookies”。

<img src="/assets/AKVKbX4mdovLe2xMt7KcBxEqnbg.png" src-width="843" class="markdown-img" src-height="298"/>

Cookies 保存成功后，账号状态会变为“已登录”。

<img src="/assets/AM9sbRAcooCqOVxCBzhczbpdn3g.png" src-width="1868" class="markdown-img" src-height="318"/>

## 5.3 确认是否登录成功

可以再次点击登录按钮，观察内置浏览器是否会自动进入你的微博首页。如果可以正常进入，说明登录状态保存成功。

<img src="/assets/EKL9bPQ3PoOcpdxZPP9c3P6Gn0e.png" src-width="1898" class="markdown-img" src-height="150"/>

<div class="callout callout-bg-3 callout-border-3">
<div class='callout-emoji'>💡</div>
<p>如果无法进入微博首页，请重新登录并再次点击“保存 Cookies”。微博账号状态变化、浏览器缓存或网络环境都可能影响登录状态。</p>
</div>

# 6. 新建备份任务

账号登录成功后，就可以创建备份任务。点击“任务管理”进入任务列表。

<img src="/assets/AFqlbxLcHoW3CFx7Lvgc9Vehn3f.png" src-width="1033" class="markdown-img" src-height="414"/>

## 6.1 创建备份任务

点击“新建任务”按钮。

<img src="/assets/SfHYbmZ5YoTe0Ix132FcqP8Xn2c.png" src-width="1874" class="markdown-img" src-height="193"/>

账号选择刚才登录成功的账号；平台 ID 填写要备份的微博用户 ID。

如果需要保存评论，可以开启评论采集。评论采集会明显增加任务耗时，建议先用较小数量测试。

<img src="/assets/PZUfbw47joxYlhxHlMlcF1zdnxc.png" src-width="1164" class="markdown-img" src-height="936"/>

平台 ID 仍然取自微博主页地址中的数字。

<img src="/assets/Gwr9bFeNBoQgFnxMA1DcJWbynkg.png" src-width="1164" class="markdown-img" src-height="652"/>

## 6.2 启动、暂停和中断任务

设置完成后，点击启动任务。

<img src="/assets/CQByb8OzNoouPxxE5VCcT2xCnmf.png" src-width="1898" class="markdown-img" src-height="135"/>

任务执行过程中，可以根据需要暂停或中断。

<img src="/assets/ZSzDbLuY9owBcAxUjj0cfwlOnsL.png" src-width="1868" class="markdown-img" src-height="188"/>

# 7. 查看备份结果

任务结束后，可以打开保存目录查看备份结果。

<img src="/assets/LWnCbHHU2ohLWZxDjFtcPV8DnBc.png" src-width="653" class="markdown-img" src-height="178"/>

下面是备份结果示例。

<img src="/assets/POBbb7OZ6oIoDbxWfOwcWdRvnug.png" src-width="965" class="markdown-img" src-height="1147"/>

<img src="/assets/LJNlbQdMZoWxBrx2O7jcU1Ewnge.png" src-width="2456" class="markdown-img" src-height="1190"/>

## 7.1 具体效果下载

示例结果文件：[百度网盘下载](https://pan.baidu.com/s/14_e-ZlxcG3MXVt-8HLJ89A?pwd=yzy7)，提取码： **yzy7**

# 8. 常见问题

## 8.1 可以备份哪些微博内容？

支持备份微博正文、图片、视频、评论、转发和专栏等内容。不同内容的完整程度会受到微博页面结构、登录状态和任务配置影响。

## 8.2 评论采集为什么比较慢？

评论通常需要额外请求和展开，数量越多耗时越长。建议首次使用时先开启较小采集数量，确认结果符合预期后再扩大范围。

## 8.3 Cookies 保存失败怎么办？

先确认你已经在软件内置浏览器中完成微博登录，再点击“保存 Cookies”。如果仍然失败，可以重新打开登录窗口、重新登录并保存。

## 8.4 任务中断后可以重新执行吗？

可以。任务管理页面会保留任务与执行记录，后续可以根据需要重新启动或调整任务。

## 8.5 备份结果保存在哪里？

任务完成后，点击保存目录即可打开本地结果。建议定期把重要备份复制到其他硬盘或网盘，避免本机文件丢失。

## 8.6 是否可以备份别人的微博？

请仅备份本人或已获授权的内容。涉及他人内容时，请先确认授权范围和平台规则。

# 9. 如何使用网页版本协议？

打开设置 中的开关

<img src="/assets/GjMCbj8TloXdlYxmffkcRbwVnf4.png" src-width="1898" class="markdown-img m-auto" src-height="84" align="center"/>

<img src="/assets/NHpFbaNh9ous2MxbrercApq1ndf.png" src-width="1841" class="markdown-img m-auto" src-height="393" align="center"/>

再增加账号就可以看到网页版本

<img src="/assets/KxzMbkILnoUGOtxy8eWceu4QnYe.png" src-width="712" class="markdown-img m-auto" src-height="352" align="center"/>

# 10. 下一步

- 如果你还没有安装客户端，先访问官网下载安装：[https://weibocloner.bytefuse.cn/](https://weibocloner.bytefuse.cn/)
- 需要长期使用或完整功能时，可以购买注册码：[https://apps.bytefuse.cn/products/1](https://apps.bytefuse.cn/products/1)
- 如果遇到使用问题，可以联系 QQ：2246855973。

