---
create_time: 1729904051
edit_time: 1729931288
title: cloudflare
categories:
  - skill
---


# Worker

worker可以让你利用cloudflare的服务器资源。和github action类似，但是比github action更灵活，因为他可以运行javascript和python.

https://developers.cloudflare.com/workers/get-started/guide/

## 通过命令行新建worker

### 新建

```yaml
npm create cloudflare@latest -- my-first-worker
```

### 运行

```yaml
npm run dev
```

### 部署

```yaml
npm run deploy
```

但每次deploy都报错

Fetch error。从github issue上看，应该是cloudflare 被国内墙了。

所以无法通过命令行使用。

