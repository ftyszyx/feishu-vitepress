---
title: bugly分析工具-开发记录
tags:
  - develop
create_time: 1717379027
categories:
  - product
---


# 2024-6-3

选择**electron-vite做为脚手架**

```csharp
npm create @quick-start/electron@latest
```

加antd

```csharp
npm install antd -S
```

加tailwind

```csharp
npm install -D tailwindcss
npx tailwindcss init

修改tailwind.config.js
content: ['./src/renderer/src/**/*.{html,js,tsx,tx}'],

在主css中加入tailwind宏定义，这边加到tailwind.css
@tailwind base;
@tailwind components;
@tailwind utilities;

然后启动修改监听
npx tailwindcss -i ./src/renderer/src/assets/tailwind.css -o ./src/renderer/src/assets/tailwind_out.css --watch

这个监听可以加到package.json
```

# 2024-6-8

## buglyl登陆

```ts
export function openAuthorize() {
  if (oauthWin) return;
  let { BrowserWindow } = require('@electron/remote');
  oauthWin = new BrowserWindow({
    width: 860,
    height: 570,
    alwaysOnTop: true,
    resizable: false,
    maximizable: false,
    minimizable: false,
    fullscreenable: false,
  });
  // 在窗口关闭时触发 当你接收到这个事件的时候, 你应当移除相应窗口的引用对象，避免再次使用它
  oauthWin.on('closed', () => {
    oauthWin = null;
  });
  // 当窗口失去焦点时触发
  oauthWin.on('blur', (e) => {});
  // 处理窗口内链接跳转
  oauthWin.webContents.on('will-navigate', (e, url) => {
    if (url?.indexOf('?scenes=1') !== -1) {
      // 授权成功自动关闭窗口
      destroy();
    }
    console.log('处理窗口内链接跳转: ', url);
  });
  // 发起授权
  const redirectUri = urlEncode(process.env.VUE_APP_REDIRECT_URI);
  const url = `${process.env.VUE_APP_AUTHORIZE_URL}/connect/authorize?tenantId=${store.state.app.userInfo.tenantId}&userId=${store.state.app.userInfo.id}&redirectUri=${redirectUri}`;
  oauthWin.loadURL(url).then();
}
```

# 2024-6-12

增加本地数据库

本来是想用sqlite，但最近发现一个开源项目[ duckdb](https://github.com/duckdb/duckdb).网上评论说性能很好，而且功能强大。

反正这两个相对于我来说都是新的东西，还不如用后者

# 2024-6-13

在拿到token后，使用axios库在prender中去请求数据

但是报错

<img src="/assets/YuZNbGbk7oVqduxz7dRcOHQrnSh.png" src-width="1369" class="m-auto" src-height="218" align="center"/>

这是跨域问题，参考：

https://www.cnblogs.com/zhouyun-yx/p/17921692.html

# 待做

1、bugly登陆

2、高级搜索页

