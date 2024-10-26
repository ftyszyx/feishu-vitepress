---
cover: /assets/Um9JbWwIFodQDjxcMjfcPCjKnHh.jpeg
create_time: 1729850795
edit_time: 1729867293
title: docker相关
categories:
  - skill
---


现在国内下载docker镜像基本上是下不了了，即使是配置了国内的第三方镜像加速服务也是不行的。

比如我这里配了主流的三个

<img src="/assets/Nw62blsNzohkG5xnV3RcOqkOnVc.png" src-width="373" class="markdown-img m-auto" src-height="113" align="center"/>

但一样是下载失败

如何自己推荐加速服务呢？

自已建：https://github.com/bboysoulcn/registry-mirror

使用cloudflare代理：https://github.com/ImSingee/hammal

## 使用cloudflare

### 下载代码

首先下载仓库  代码到本地

https://github.com/ImSingee/hammal 

### 安装库

```yaml
npm install
```

###  **创建 Workers 项目**

进入 [Cloudflare Dashboard](https://dash.cloudflare.com/) 创建一个新的 Workers 项目，给他一个命名（例如 `hammal`）

<img src="/assets/J7FQbVclCojDjtxouFhcD5GVnHg.png" src-width="681" class="markdown-img m-auto" src-height="219" align="center"/>

取完名字后，直接点部署

<img src="/assets/VHs8bMcgAoJBhsx7dzmc5V9XnWd.png" src-width="498" class="markdown-img m-auto" src-height="124" align="center"/>

### 配置项目

复制 `wrangler.toml.sample` 文件改名 `wrangler.toml` 并修改其 `name` 和 `account_id`

<img src="/assets/BV2ibYX6voh71Zx7R92cxy7Jnng.png" src-width="664" class="markdown-img m-auto" src-height="388" align="center"/>

account_id 可以从 CF Workers Dashboard 右侧获得

<img src="/assets/ENDfbnNYhoUfYWxe1qecXHx6nxf.png" src-width="1227" class="markdown-img m-auto" src-height="350" align="center"/>

###  **创建 cache 缓存 kv**

在克隆好的项目目录下执行 `npx wrangler kv:namespace create hammal_cache` 来创建缓存 kv，记录下来输出的 id，填写到 `wrangler.toml` 文件中

```yaml
npx wrangler kv:namespace create hammal_cache
```

第一次会弹出页面，点allow

<img src="/assets/KuTKbJWpVo6jogx8dZpc6LqUnjg.png" src-width="504" class="markdown-img m-auto" src-height="808" align="center"/>

###  **Deploy**

在克隆好的项目目录下执行 `pnpm run deploy` 来部署项目

进入你的 Workers 脚本的 dashboard，为它[绑定一个自定义域名](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/#set-up-a-custom-domain-in-the-dashboard)（必要，因为默认的 `workers.dev` 域名被墙了）

###  **本地配置**

使用你的自定义域名作为 docker registry mirror 即可

`sudo tee /etc/docker/daemon.json <<EOF`
`{`
`"registry-mirrors": [`
`"https://hammal.example.com"`
`]`
`}`
`EOF`

