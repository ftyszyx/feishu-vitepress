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

开源项目列表

https://github.com/topics/electron

# 新项目start

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

<img src="/assets/CX9Jb1f3Oo3QauxaryPc6icbnYc.png" src-width="775" class="markdown-img m-auto" src-height="292" align="center"/>

# 发布

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

# Rebuild native

参考：

https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules

因为electron对node.js做了修改，如果你遇到下面这种错误，就需要重新编译

```js
Error: The module '/path/to/native/module.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION $XYZ. This version of Node.js requires
NODE_MODULE_VERSION $ABC. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
```

## 安装系统编译环境

<img src="/assets/E2KBbdUcQo17tUxTOImcSgHvnYg.png" src-width="886" class="markdown-img m-auto" src-height="345" align="center"/>

## 安装node-gyp

```js
npm install -g node-gyp
```

## 安装electron/rebuild

https://github.com/electron/rebuild?tab=readme-ov-file

```js
npm install --save-dev @electron/rebuild
```

重新编译

可以在package.json的scripts中加一条

```js
"rebuild": "electron-rebuild -f -o robotjs"
```

编译

```js
npm run rebuild
```

# Build

打包推荐使用Electron Forge

github:https://github.com/electron/forge

安装库和创建模板

```sql
npm install -g @electron-forge/cli
npx electron-forge init --template=vite-typescript
npm install electron -D
```

运行

```sql
npm run start
```

打包

```sql
npm run make
```

发布

```sql
npm install --save-dev @electron-forge/publisher-github
```

# 其它

## Ipc invoke的错误信息

当render进程调用main进程的方法 

```yaml
ipcMain.handle(webToManMsg.Register, async (_, info) => {
    return await AppModel.getInstance().user?.Register(info)
  })
```

如果此时main进程中的方法rigister发生异常

<img src="/assets/NN94b6CUJoJ7zixQgUDc0PpQnNb.png" src-width="750" class="markdown-img m-auto" src-height="135" align="center"/>

此时主进制中捕获到的错误信息是

<img src="/assets/Ehddb8wvSoOSf6xVrCEc9pZ5nRd.png" src-width="624" class="markdown-img m-auto" src-height="53" align="center"/>

**为什么我的错误信息被污染了呢？**

我查了官方的文档，有人有同样的疑问

https://github.com/electron/electron/issues/24427

这个用户，查看了electron的源码，发现这源码是这么写的

<img src="/assets/P8nnbvIRBo9NNKxjIOJcXgP6nDe.png" src-width="664" class="markdown-img m-auto" src-height="148" align="center"/>

如果有错误，底层会将错误内容改掉

他建议官方像如下这么写，就没问题了

<img src="/assets/ThYkbO5m4okTCExUnlDcbhf1nqf.png" src-width="601" class="markdown-img m-auto" src-height="147" align="center"/>

这个问题讨论了半天，官方最后给了一个解决方法，就是自己把error包装一下。文档如下：

https://github.com/ash0x0/electron/commit/a22bc080a5cc4bea31c60bbd2d45706109a819ee

**这个解决方案有点恶心，相当于，你自己把error捕获，把error当一个正确的参数返回。**

**这样你的很多写法都有点受影响 。**

**官方意思是说应该把main进程当服务端，服务端如果有异常，直接发给客户端，是不安全的，这样会暴露隐私。所以官方还是建议，如果要给错误信息给前端，应该要自己包装一下。**

## Crash捕捉

可以设置闪退的存储路径 

```yaml
app.setPath('crashDumps', 'crashs')
```

然后启动闪退捕捉

```yaml
crashReporter.start({
      productName: 'MyElectron',
      companyName: 'MyCompany',
      uploadToServer: false
    })
```

解析

https://blog.vincentqiao.com/electron-crash

目前没有开箱即用的工具，有点不方便 

## 调试

https://www.electronjs.org/zh/docs/latest/tutorial/debugging-main-process

在启动electron命令后加 --inspect或者 --inspect-brk（表示第一行就暂停）

然后打开chrome浏览器

- 通过访问 `chrome://inspect` 来连接 Chrome 并在那里选择需要检查的Electron 应用程序。

