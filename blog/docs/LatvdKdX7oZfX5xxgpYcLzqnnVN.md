---
create_time: 1766658533
edit_time: 1769138362
title: n8n
categories:
  - skill
---


  

# 1. 本地运行

```text
npm install -g n8n
n8n start
```

# 2. 如何安装节点

https://docs.n8n.io/integrations/community-nodes/installation/

通过命令行安装npm package

https://docs.n8n.io/integrations/community-nodes/installation/manual-install/

打开n8n的nodes目录 

windows:

C:\Users\pc\.n8n\nodes

```text
npm i n8n-nodes-nodeName
```

重启n8n

# 3. 自制n8n节点

package name starts with `n8n-nodes-`

- Include `n8n-community-node-package` in your package keywords.

文档：https://docs.n8n.io/integrations/creating-nodes/overview/

## 3.1 Node的文件结构

https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/structure/

一个node的文件结构

<img src="/assets/BnyJbNjeooFPUnxLuJNciehInOb.png" src-width="692" class="markdown-img m-auto" src-height="249" align="center"/>

# 4. 使用feishu node

https://www.npmjs.com/package/n8n-nodes-feishu-lite

## 4.1 先去https://open.feishu.cn/创建一个应用

<img src="/assets/GtBhbpFoWo0RrNxo3okcysvln2b.png" src-width="850" class="markdown-img m-auto" src-height="507" align="center"/>

添加文档相关的权限

<img src="/assets/Zkw4b5kxgoe5Pnx8O42ct2NCnEg.png" src-width="906" class="markdown-img m-auto" src-height="398" align="center"/>

发布应用

<img src="/assets/D9Lob2Q69oaJM3xvR97cK6EOnfc.png" src-width="1359" class="markdown-img m-auto" src-height="458" align="center"/>

新建一个表格或者文档，添加此应用

<img src="/assets/GquCbVHR1o2fGAxG4fQcVTGyn7e.png" src-width="882" class="markdown-img m-auto" src-height="672" align="center"/>

<img src="/assets/NwBxbMnlmourPbx3u0HcrstQnwh.png" src-width="587" class="markdown-img m-auto" src-height="339" align="center"/>

 

