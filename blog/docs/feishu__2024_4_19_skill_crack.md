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

反编译神器：dnspy

https://github.com/dnSpyEx/dnSpy

# electron react 

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

注意如果resouce目录下有app.asar.unpacked目录，需要在打包时将其排除

<img src="/assets/Iabrb9Y2CoYiU6x83DacmpAMncg.png" src-width="444" class="markdown-img m-auto" src-height="58" align="center"/>

```csharp
asar pack app app.asar --unpack **/node_modules/sharp/**/*
```

否则程序运行不了

### 如何还原webpack（带map)

用[reverse-sourcemap](https://github.com/davidkevork/reverse-sourcemap)这个包就行

```ts
npm install --global reverse-sourcemap
reverse-sourcemap js/
```

