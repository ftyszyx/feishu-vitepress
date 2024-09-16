---
title: bugly分析工具-开发记录
tags:
  - develop
create_time: 1717379027
categories:
  - product
---


# 2024-6-3

选择 **electron-vite** **做为脚手架**

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

本来是想用sqlite，但最近发现一个开源项目[duckdb](https://github.com/duckdb/duckdb).网上评论说性能很好，而且功能强大。

反正这两个相对于我来说都是新的东西，还不如用后者

# 2024-6-13

在拿到token后，使用axios库在prender中去请求数据

但是报错

<img src="/assets/YuZNbGbk7oVqduxz7dRcOHQrnSh.png" src-width="1369" class="markdown-img m-auto" src-height="218" align="center"/>

这是跨域问题，参考：

https://www.cnblogs.com/zhouyun-yx/p/17921692.html

简单做法就是

```csharp
webPreferences: {
    webSecurity: false
  }
```

但实际使用时还是有问题，不能设置header的参数

所以还是需要将请求改到main 进程中，render进程只负责显示页面

electron有net库。http请求可以用net.request或者net.fetch

但发现用net.fetch时无法修改header的referer。

在session.defaultSession.webRequest.onBeforeSendHeaders里设置了也没有用。其它的header都可以就是referer不行。很是奇怪

于是改用net.request。发现这个可以修改referer header

但是cookie丢了。真是奇葩

只能自己写一下cookie

终于能取到了

<img src="/assets/VbZdb1EJBo6brQxIBT0cOBLxn5c.png" src-width="669" class="markdown-img m-auto" src-height="296" align="center"/>

## console.log中文乱码

控制台

```ts
chcp
```

显示当前编码是936

gb2312是936  utf8是65001

需要在package.json中修改编码

```ts
"dev": "chcp 65001&&electron-vite dev --inspect=9229",
```

终于能请求到数据了

# 2024-6-17

## 首页：

搜索条目：

应用（可以全部）  版本（可以全部） 

  四个tap页：

<img src="/assets/EmT2b7Nsfof8caxMGlmc7oyvnza.png" src-width="252" class="markdown-img m-auto" src-height="34" align="center"/>

日期选择：（最小单位是天）

内容：

显示一个图表：

使用ant charts

安装：

```csharp
pm install @ant-design/charts
```

用多拆线图。

如果是多app可以显示

# 待做

1、bugly登陆

2、高级搜索页

