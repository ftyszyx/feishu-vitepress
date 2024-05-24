---
title: Electron 开发学习
tags:
  - develop
keywords:
  - Electron
  - windows
create_time: 1716458038
categories:
  - skill
---


官方文档

https://www.electronjs.org/docs/latest/tutorial/quick-start

## 新项目start

```yaml
mkdir my-electron-app && cd my-electron-app
npm init
```

- `entry point` should be `main.js`.

安装库

```yaml
npm install --save-dev electron
```

增加启动命令

```yaml
{
  "scripts": {
    "start": "electron ."
  }
}
```

新建一个main.js

```yaml
const { app, BrowserWindow } = require("electron");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");
};
app.whenReady().then(() => {
  createWindow();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
```

新建一个index.html

```yaml
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'" />
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>, Chromium <span id="chrome-version"></span>, and Electron
    <span id="electron-version"></span>.
  </body>
</html>
```

启动

```yaml
npm run start
```

<img src="/assets/CX9Jb1f3Oo3QauxaryPc6icbnYc.png" src-width="775" class="m-auto" src-height="292" align="center"/>

## 发布

安装依赖

```ts
npm install --save-dev @electron-forge/cli
npx electron-forge import
```

打包

```ts
npm run make
```

打好的包在out/目录下

