---
title: vscode源码学习
tags:
  - develop
keywords:
  - vscode
  - sourcecode
create_time: 1717146969
categories:
  - skill
---


项目地址：

https://github.com/microsoft/vscode

编译说明：

https://github.com/microsoft/vscode/wiki/How-to-Contribute

参考：

https://github.com/fzxa/VSCode-sourcecode-analysis/blob/master/chapter-1.md

https://blog.csdn.net/zhugangsong/category_12600296.html

# 编译

## 安装环境

我的电脑是window

先安装环境：

注意安装node时要安装native modules

- if you install Node on your system using the Node installer from the <u>Node.JS</u> page then ensure that you have installed the 'Tools for Native Modules'. Everything should work out of the box then.

## Build

```csharp
cd vscode
yarn
```

有报错

build error "MSB8040: Spectre-mitigated libraries are required

<img src="/assets/CaRtbJvUbojQqSxTK2YcbhTQnce.png" src-width="968" class="markdown-img m-auto" src-height="321" align="center"/>

上面有写

<img src="/assets/CJmsbm0vnoXR0sxxNg4cHQs6nGh.png" src-width="800" class="markdown-img m-auto" src-height="228" align="center"/>

安装一下

<img src="/assets/HUkeb4IIvovrEax3TSCc7SiTn7c.png" src-width="799" class="markdown-img m-auto" src-height="561" align="center"/>

### Build 脚本

执行下面命令，ts会被编译成js

```csharp
yarn watch
```

### 启动

```csharp
.\scripts\code.bat
.\scripts\code-cli.bat #这一步不知道干啥的
```

### 调试

打开chrome调试面板

<img src="/assets/KhJVbN4gKoYttsx4YIqcOcI6nae.png" src-width="872" class="markdown-img m-auto" src-height="175" align="center"/>

## 编译启动分析

程序的启动主要是两个命令

```ts
yarn watch
code.bat
```

 我们依次分析

### Yarn watch

```ts
"watch": "npm-run-all -lp watch-client watch-extensions",
```

npm-run-all的lp

```
-l, --print-label  - - - - Set the flag to print the task name as a prefix
                               on each line of output. Tools in tasks may s
-p, --parallel <tasks>   - Run a group of tasks in parallel.
                               e.g. 'npm-run-all -p foo bar' is similar to
```

就是同时执行

--max-old-space-size 设置Node可用的最大内存单位M

```ts
"watch-client": "node --max-old-space-size=4095 ./node_modules/gulp/bin/gulp.js watch-client",
```

和

```ts
"watch-extensions": "node --max-old-space-size=4095 ./node_modules/gulp/bin/gulp.js watch-extensions watch-extension-media",
```

然后执行[gulp](https://gulpjs.com/)

大概看了一下，watch-client主要就是编译

src/**下面的ts，到out/目录下

<img src="/assets/Z7JbbgO9WoRBJxx7Kz4ceQ3znde.png" src-width="1367" class="markdown-img m-auto" src-height="79" align="center"/>

<img src="/assets/GmRdbQ7cAohrtSx2fB8cJ9Sangh.png" src-width="628" class="markdown-img m-auto" src-height="392" align="center"/>

同理watch-extensions应该是编译插件

因为我们的工程没有插件，就不管了。

具体编译细节就不研究了，现在的主流已经不用glup这种原始的ts编译工具了。没有学习价值。

我们只要知道，yarn watch后我们可以安心的在src目录下写ts脚本了就行。

### code.bat

先执行了

```ts
node build/lib/preLaunch.js
```

主要是去执行

```ts
yarn electron
```

然后找到product名字

在product.json中找nameShort字段就是之前编译出来的二进制程序

<img src="/assets/QdLkbnMmdoACSpxtrXKcILP5nde.png" src-width="961" class="markdown-img m-auto" src-height="116" align="center"/>

然后执行

```ts
%CODE% . %*  //%*表示命令行参数。我们执行时没带参数，所以是空
```

相当于

<img src="/assets/E4U1b5DVqo2SO3xzStjc0CfDngf.png" src-width="499" class="markdown-img m-auto" src-height="26" align="center"/>

总结：

```ts
yarn electron
.build\electron\Code - OSS.exe
```

### yarn electron

```ts
node build/lib/electron
```

这个命令就是给electron打包

生成的资源在.build/electron

