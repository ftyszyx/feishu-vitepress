---
title: 软件破解
tags:
  - develop
keywords:
  - c#
  - donet
create_time: 1716126315
edit_time: 1734497431
categories:
  - skill
---


# 1. Donet

加密：

https://github.com/mkaring/ConfuserEx/

反编译神器：dnspy

https://github.com/dnSpyEx/dnSpy

# 2. electron react 

解包

```ts
asar e app.asar app
```

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
                //clearInterval(timer);
        }
},5000);
```

打包

```ts
asar p app app.asar
```

注意如果resouce目录下有app.asar.unpacked目录，需要在打包时将其排除

<img src="/assets/Iabrb9Y2CoYiU6x83DacmpAMncg.png" src-width="444" class="markdown-img m-auto" src-height="58" align="center"/>

```csharp
asar pack app app.asar --unpack **/node_modules/sharp/**/*
```

否则程序运行不了

### 2.1.1 如何还原webpack（带map)

用[reverse-sourcemap](https://github.com/davidkevork/reverse-sourcemap)这个包就行

```ts
npm install --global reverse-sourcemap
reverse-sourcemap js/
```

# 3. 微信网页调试

1、在微信打开debugmm.qq.com/?forcex5=true开启调试

2、手机开启usb调试，并连电脑

3、打开chrome 输入  [chrome://inspect/#devices](https://www.52pojie.cn/chrome://inspect/#devices)

<img src="/assets/CpOdbeyjjonFkfxVwFVcSUqlnKg.png" src-width="637" class="markdown-img m-auto" src-height="607" align="center"/>

（注：此时我是将u手机连接到电脑上，并且开启usb 可以看到最后一排有一个Lenovo L78032"我自己的手机" ，如果没有，请检查是否开启usb调试，是否在手机允许电脑调试，插拔数据线  刷新页面  等待30秒）
第四步：利用手机 打开想要调试的页面
我打开吾爱[破解](https://www.52pojie.cn/)公众号 这时 chrome 调试页面会出现相关连接（如果没有 检查以上操作   等待30秒）

<img src="/assets/RBApbFDLeosM0cxxogfcorwwnkh.png" src-width="861" class="markdown-img m-auto" src-height="398" align="center"/>

点击  inspect  会跳转到调试页面   （如果空白屏，请检查梯子，第一次打开会有些慢，浏览器需要下载一些支持插件）

<img src="/assets/MWyYbNb3FolsI8xkz7ocLexenVg.png" src-width="1920" class="markdown-img m-auto" src-height="986" align="center"/>

# 4. chrome插件

## 4.1 找到插件的key

<img src="/assets/SxEybsz5DoVO7cxCfg3c9GkFnoh.png" src-width="212" class="markdown-img m-auto" src-height="296" align="center"/>

<img src="/assets/AZZRbjLI7oFkRJxyWzdcL2uunuf.png" src-width="925" class="markdown-img m-auto" src-height="192" align="center"/>

## 4.2 代码位置 

地址栏输入chrome:version 回车

<img src="/assets/BiQeb5Sj0oC6yVx3rWwcIn6ynGd.png" src-width="782" class="markdown-img m-auto" src-height="242" align="center"/>

找对应key的文件夹即可。

<img src="/assets/R1GJbBXAloh6jmxrmdoc2yrfnLh.png" src-width="950" class="markdown-img m-auto" src-height="572" align="center"/>

## 4.3 
