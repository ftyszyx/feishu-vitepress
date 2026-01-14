---
create_time: 1768282739
edit_time: 1768288364
title: 源码运行
categories:
  - skill
---


# 1. 源码运行

https://github.com/n8n-io/n8n?tab=contributing-ov-file

1. <u>Fork</u> the n8n repository.
2. Clone your forked repository:

```text
git clone https://github.com/<your_github_username>/n8n.git
```

1. Go into repository folder:

```text
cd n8n
```

1. Add the original n8n repository as `upstream` to your forked repository:

```text
git remote add upstream https://github.com/n8n-io/n8n.git
```

1. Install all dependencies of all modules and link them together:

```text
pnpm install
```

1. Build all the code:

```text
pnpm build
```

### 1.1.1 Start

To start n8n execute:

```text
pnpm start
```

## 1.1 Development cycle

While iterating on n8n modules code, you can run `pnpm dev`. It will then automatically build your code, restart the backend and refresh the frontend (editor-ui) on every change you make.

### 1.1.1 Basic Development Workflow

1. Start n8n in development mode:

```text
pnpm dev
```

1. Hack, hack, hack
2. Check if everything still runs in production mode:

```text
pnpm build
pnpm start
```

1. Create tests
2. Run all <u>tests</u>:

```text
pnpm test
```

1. Commit code and <u>create a pull request</u>

# 2. 源码结构

