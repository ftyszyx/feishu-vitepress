---
title: Bugly Analysis Tool - Development Record
tags:
  - develop
create_time: 1717379027
categories:
  - product
---

# 2024-6-3

Choosing **electron-vite as scaffolding**

```csharp
npm create @quick-start/electron@latest
```

Plus antd

```csharp
npm install antd -S
```

Plus tailwind

```csharp
npm install -D tailwindcss
npx tailwindcss init

Modify tailwind.config.js
content: ['./src/renderer/src/**/*.{ html,js,tsx,tx}'],

Add the tailwind macro definition to the main CSS, and add it to tailwind.css here
@tailwind base;
@tailwind components;
@tailwind utilities;

Then start the modification listener
npx tailwindcss -i ./src/renderer/src/assets/tailwind.css -o ./src/renderer/src/assets/tailwind_out.css --watch

This listener can be added to package.json
```

# 2024-6-8

## buglyl login

```ts
export function openAuthorize() {if (oauthWin) return;
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
  Trigger when the window is closed When you receive this event, you should remove the reference object from the window and avoid using it again
  oauthWin.on('closed', () => {
    oauthWin = null;
  });
  Triggers when a window loses focus
  oauthWin.on('blur', (e) => {});
  Handle in-window link jumps
  oauthWin.webContents.on('will-navigate', (e, url) => {
    if (url?. indexOf('?scenes=1') !== -1) {
      The window will be automatically closed when the authorization is successful
      destroy();
    }
    console.log('Handling in-window link redirects: ', url);
  });
  Initiate authorization
  const redirectUri = urlEncode(process.env.VUE_APP_REDIRECT_URI);
  const url = `${process.env.VUE_APP_AUTHORIZE_URL}/connect/authorize?tenantId=${store.state.app.userInfo.tenantId}&userId=${store.state.app.userInfo.id}&redirectUri=${ redirectUri}`;
  oauthWin.loadURL(url).then();
}
```

# 2024-6-12

Add a local database

I originally wanted to use sqlite, but recently I found an open source project [duckdb](https://github.com/duckdb/duckdb).

Anyway, both of these are new things to me, so it's better to use the latter

# 2024-6-13

After getting the token, use the axios library to request data in prender

But an error is reported

<img src="/assets/YuZNbGbk7oVqduxz7dRcOHQrnSh.png" src-width="1369" class="m-auto" src-height="218" align="center"/>

This is a cross-domain issue, reference:https://www.cnblogs.com/zhouyun-yx/p/17921692.html

It's simple

```csharp
webPreferences: {
    webSecurity: false
  }
```

However, there is still a problem when using it, and the parameters of the header cannot be set

So you still need to change the request to the main process, and the render process is only responsible for displaying the page

electron has a net library. HTTP requests can be made using net.request or net.fetch

However, I found that I could not modify the referer of the header when using net.fetch.

It doesn't work if it's set in session.defaultSession.webRequest.onBeforeSendHeaders. Other headers can be used, but referers can't. It's weird

So I used net.request instead. Found this to modify the referer header

But the cookie is lost. It's really weird

You can only write cookies yourself

I was finally able to get it

<img src="/assets/VbZdb1EJBo6brQxIBT0cOBLxn5c.png" src-width="669" class="m-auto" src-height="296" align="center"/>
## console.log Chinese garbled characters

Console

```ts
chcp
```

The current encoding is 936

GB2312 is 936 and UTF8 is 65001

The encoding needs to be modified in the package.json

```ts
"dev": "chcp 65001&&electron-vite dev --inspect=9229",
```

I was finally able to request the data# 2024-6-17

## Home:

Search Terms:

App (can be all) Version (can be all) 

Four tap pages:

<img src="/assets/EmT2b7Nsfof8caxMGlmc7oyvnza.png" src-width="252" class="m-auto" src-height="34" align="center"/>
Date Selection: (Minimum unit is days)

Content:

Show a chart:

Use ant charts

Installation:

```csharp
pm install @ant-design/charts
```

Use multiple strip diagrams.

If it is multi-app, it can be displayed

# To be done

1. Bugly login

2. Advanced search page