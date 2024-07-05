---
title: Software cracking
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

Encrypt:

https://github.com/mkaring/ConfuserEx/

Decompilation artifact: dnspy

https://github.com/dnSpyEx/dnSpy

# electron react 

https://www.youtube.com/watch?v=yTEryF1IvD0

How to open the console

Add at the end of the main program

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

pack```ts
sar p test app.asar
```

Unpacking

```ts
asar e app.asar test
```

Note that if there is an app.asar.unpacked directory in the resouce directory, you need to exclude it when packing

<img src="/assets/Iabrb9Y2CoYiU6x83DacmpAMncg.png" src-width="444" class="m-auto" src-height="58" align="center"/>
```csharp
asar pack app app.asar --unpack **/node_modules/sharp/**/*
```

Otherwise, the program will not run

### How to restore webpack (with map)

Just use the [reverse-sourcemap](https://github.com/davidkevork/reverse-sourcemap) package

```ts
npm install --global reverse-sourcemap
reverse-sourcemap js/
```