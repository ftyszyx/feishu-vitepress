---
create_time: 1768893318
edit_time: 1768897567
title: 公众号
categories:
  - skill
---


公众号相关

https://zhuanlan.zhihu.com/p/1946969507491971326

https://cloud.tencent.com/developer/article/2574812

https://markdown.com.cn/editor

https://github.com/doocs/md

# 1. 主要流程：

1. 从飞书文档（个人博客）中整理全部的文章
2. 将文章标题，内容，作者，时间，封面图，都保存到一张多维表格A中
3. 多维表格A有一列是发布公众号按键
4. 点击此按键，会触发n8n工作流，工作流，会将文章发布到微信公众号中，并将状态同步到多维表格中

一些技术点：

1. 飞书的文档，需要能转成markdown,
2.  使用https://grsai.com/的api帮优化文档，生成封面提示词
3. 根据封面提示词生成封面，使用nano-banana-fast
4. 图片保存到oss中（阿里云）
5. 所有内容都要保存在飞书的多维表格中，内容可查
6. markdown导到微信时，需要能通过https://github.com/doocs/md进行格式转换
7. 后期还需要支持发布到小红书、知乎等没有api接口的平台，也许需要https://github.com/toema/n8n-playwright的支持

<img src="/assets/ZzNRb3KM1oXkwSxtFPScv6kvnKg.png" src-width="1394" class="markdown-img m-auto" src-height="799" align="center"/>

