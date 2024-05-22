---
title: 软件破解
tags:
  - develop
keywords:
  - c#
  - donet
create_time: 1716126315
categories:
  - skill
---


# Donet

加密：

https://github.com/mkaring/ConfuserEx/

## electron react 

https://www.youtube.com/watch?v=yTEryF1IvD0

如何打开控制台

在主程序的结尾加

```ts
let {BrowserWindow}=require('electron')
let timer=null;
timer=setInterval(()=>{
        let windows=BrowserWindow.getAllWindows();
        if(windows.length>0){
                windows.forEach(v=>{
                        if(v){
                                //v.close=()=>{};
                                v.webContents.removeAllListeners('devtools-opened');
                                v.webContents.openDevTools();
                        }
                })
                clearInterval(timer);
        }
},5000);
```

打包

```ts
sar p test app.asar
```

解包

```ts
asar e app.asar test
```

