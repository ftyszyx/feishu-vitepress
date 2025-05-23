---
cover: /assets/ZZntbIRqRoKcYZx62cycIQiTn9d.png
create_time: 1729904051
edit_time: 1741060018
title: cloudflare
categories:
  - skill
---


# 1. Worker

worker可以让你利用cloudflare的服务器资源。和github action类似，但是比github action更灵活，因为他可以运行javascript和python.

https://developers.cloudflare.com/workers/get-started/guide/

## 1.1 通过命令行新建worker

### 1.1.1 新建

```yaml
npm create cloudflare@latest -- my-first-worker
```

### 1.1.2 运行

```yaml
npm run dev
```

### 1.1.3 部署

```yaml
npm run deploy
```

但每次deploy都报错

Fetch error。从github issue上看，应该是cloudflare 被国内墙了。

所以无法通过命令行使用。

# 2. Tunnel

## 2.1 Docker-compose

```yaml
services:
  app:
    stdin_open: true
    network_mode: host  # 很重要，需要能访问宿主网络
    tty: true
    image: cloudflare/cloudflared:latest
    restart: unless-stopped
    command: tunnel --no-autoupdate run
    environment:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
```

加一个环境变量

.evn

```yaml
TUNNEL_TOKEN=
```

# 3. 转移域名转到clouadflare

## 3.1 添加站点

<img src="/assets/XcZ3bryi2o8nVPxh2k8cUUCSnGg.png" src-width="1408" class="markdown-img m-auto" src-height="472" align="center"/>

选免费

<img src="/assets/Ws83b6rVcoQ6DhxZg3IcyBRVnCe.png" src-width="1027" class="markdown-img m-auto" src-height="676" align="center"/>

下一步

<img src="/assets/FmrvbM2xqozHacxTa3dc6vJHnBf.png" src-width="1015" class="markdown-img m-auto" src-height="566" align="center"/>

## 3.2 更改名称服务器

<img src="/assets/Ljd1bC7puonQN9xDRfWcrbBLntj.png" src-width="658" class="markdown-img m-auto" src-height="190" align="center"/>

加到买域名的地方

<img src="/assets/VmdXbeiq3oyEsWxgzWrcMbZ2nGh.png" src-width="939" class="markdown-img m-auto" src-height="360" align="center"/>

<img src="/assets/TFYob83c8oYh3ixCRKkcof2DnRh.png" src-width="946" class="markdown-img m-auto" src-height="236" align="center"/>

删除原来的三条，填上cloudfalre的两条

点保存

## 3.3 回cloudfalre检查

<img src="/assets/OUuzbecBGoEtwYxHuLFcJfHpnqb.png" src-width="961" class="markdown-img m-auto" src-height="176" align="center"/>

再继续

<img src="/assets/IqrgbGg3go8uwax9YHNcQEoonRc.png" src-width="874" class="markdown-img m-auto" src-height="266" align="center"/>

## 3.4 网站添加成功

<img src="/assets/Xrsybbd2PoJ2mLxSbV9caF75n6g.png" src-width="943" class="markdown-img m-auto" src-height="201" align="center"/>

# 4. 如何指定worker出口地址

待实践

https://nyac.at/posts/cloudflare-workers-force-region

# 5. 做图库

# 6. 优先域名（有点复杂，还是不要搞了）

网站测速https://www.itdog.cn/http

## 6.1 添加回退源名

将这个域名，回退到你的服务器Ip

<img src="/assets/X71Xbt0iio3cWjx8isDcpkQunKb.png" src-width="2465" class="markdown-img m-auto" src-height="916" align="center"/>

添加回溯源

<img src="/assets/I3x9bnZAzorbH5x0dxVcENM4nxh.png" src-width="2266" class="markdown-img m-auto" src-height="874" align="center"/>

添加主机名

<img src="/assets/EN9zbLRYxot8e6xBiFJcBIYHnCG.png" src-width="2362" class="markdown-img m-auto" src-height="835" align="center"/>

<img src="/assets/NbHLbcgjoofAtbxWm33cSDaOnbh.png" src-width="2266" class="markdown-img m-auto" src-height="1113" align="center"/>

有错误，点开

<img src="/assets/TF2sbRIwcoCk62x16fTcOtPrnne.png" src-width="2469" class="markdown-img m-auto" src-height="576" align="center"/>

添加域名所有权

<img src="/assets/KoTqbXpIBoHZ80xr47Nc82V3n7f.png" src-width="1581" class="markdown-img m-auto" src-height="771" align="center"/>

<img src="/assets/KSKJbY9PvoBtZbxUkBQcqeKenKf.png" src-width="1912" class="markdown-img m-auto" src-height="779" align="center"/>

成功了

<img src="/assets/K6ELbLpHjodRRwxRVyicPIhfnwf.png" src-width="1610" class="markdown-img m-auto" src-height="247" align="center"/>

## 6.2 添加优选

可以参考：

https://www.wetest.vip/page/cloudflare/cname.html

<img src="/assets/B0UZbjMfJoRAQjxTI5zc371tnvh.png" src-width="2575" class="markdown-img m-auto" src-height="1123" align="center"/>

将网站cname到你配好的cdn

<img src="/assets/Un1dbOGTBoad6cxT83mcfdZ2nyd.png" src-width="1796" class="markdown-img m-auto" src-height="301" align="center"/>

