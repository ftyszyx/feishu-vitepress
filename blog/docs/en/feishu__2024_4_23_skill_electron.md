---
title: Electron Dev Learning
tags:
  - develop
keywords:
  - Electron
  - windows
create_time: 1716458038
categories:
  - skill
---

Official documentation

https://www.electronjs.org/docs/latest/tutorial/quick-start

List of open source projects

https://github.com/topics/electron

## New project start

```yaml
mkdir my-electron-app && cd my-electron-app
npm init
```

- `entry point` should be `main.js`.

Install the library

```yaml
npm install --save-dev electron
```

Added startup commands

```yaml
{
  "scripts": {
    "start": "electron ."
  }
}
```

Create a new main.js

```yaml
const { app, BrowserWindow } = require("electron");const createWindow = () => {
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

Create a new index.html

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

initiate

```yaml
npm run start
```

<img src="/assets/CX9Jb1f3Oo3QauxaryPc6icbnYc.png" src-width="775" class="m-auto" src-height="292" align="center"/>

## Publish

Install dependencies

```ts
npm install --save-dev @electron-forge/cli
npx electron-forge import```

pack

```ts
npm run make
```

The finished package is in the out/ directory

# Some knowledge points

## httponly for cookies

'httponly' and 'js' in the web code. 'xss', 'document.cookie' is not available for 'httponly'. However, the server side is available as usual.

https://newsn.net/say/cookie-httponly.html

## Content Security Policy (CSP)

https://www.electronjs.org/docs/latest/tutorial/security#7-define-a-content-security-policy