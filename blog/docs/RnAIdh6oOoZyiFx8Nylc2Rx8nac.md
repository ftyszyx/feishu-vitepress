---
create_time: 1769138368
edit_time: 1769678566
title: n8n使用后的一点感想
categories:
  - skill
---


# 1. n8n的优点

1. 项目完全开源，整个系统结构简单，就是一个node.js应用，可以一键本地运行，这是其它的工作流无法做到的

Coze: 虽然也开源，但是系统复杂，包含了多个docker服务

1. 因为相当于是一个node.js平台，所以npm大量的开源库都可以直接拿来用，工具很丰富。
2. 界面操作很灵活，内置的节点很好用
3. 很适合用来快速搭建一些想法原型

# 2. 缺点

1. 零代码类工具通用的疼点就是当需求变复杂时，画的图就变的不可维护

下图是我实现了一个小功能：

<img src="/assets/VOMhbqOdVoa5tixSOtQcZ9MjnZe.png" src-width="1764" class="markdown-img m-auto" src-height="195" align="center"/>

- 将飞书一篇文章解析成markdown
- 将其中的全部图片上传阿里云oss
- 将阿里云oss产生的图片url替换回markdown
- 将最终markdown上传到一个飞书多维表格。

看图中的流程，已经有点复杂了。而且这还不是我要的功能的全部。有点难以接受了。

所以我感觉，n8n适合做一些简单的小功能，如果把所有功能硬往里面塞会适得其反。

如果做复杂的应用，还是直接在Node.js上做，我觉得会更好。

