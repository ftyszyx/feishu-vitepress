---
create_time: 1769664987
edit_time: 1769670338
title: ai接口
categories:
  - skill
---


https://github.com/router-for-me/CLIProxyAPI

现在ai各大厂家竞争激烈，赔钱赚吆喝。虽然接入api很便宜，但是最便宜的是各种客户端，基本是免费的。

所以这个项目就是不走正式api,直接通过各模型的客户端接口白嫖大模型。

# 1. cliProxyAPI

这个项目更完善

https://help.router-for.me/introduction/quick-start.html

启动前修改密码，同时allow-remote给true

<img src="/assets/S6TrbdzHIobVSkxNynpcElNdnSb.png" src-width="601" class="markdown-img m-auto" src-height="185" align="center"/>

# 2. aiclient-2-api

https://github.com/justlovemaki/AIClient-2-API

```yaml
docker run -d -p 3000:3000 -p 8085-8087:8085-8087 -p 1455:1455 -p 19876-19880:19876-19880 --restart=always -v "your_path:/app/configs" --name aiclient2api justlikemaki/aiclient-2-api
```

Web: localhost:3000

Default password:`admin123` 

