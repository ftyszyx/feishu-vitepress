---
title: vscode source code learning
tags:
  - develop
keywords:
  - vscode
  - sourcecode
create_time: 1717146969
categories:
  - skill
---

Project Address:

https://github.com/microsoft/vscode

Compilation Notes:

https://github.com/microsoft/vscode/wiki/How-to-Contribute

Reference:

https://github.com/fzxa/VSCode-sourcecode-analysis/blob/master/chapter-1.md

https://blog.csdn.net/zhugangsong/category_12600296.html

# Compilation

## Install the environment

My computer is window

Install the environment first:

Note that native modules are installed when installing node

- if you install Node on your system using the Node installer from the <u>Node.JS</u> page then ensure that you have installed the 'Tools for Native Modules'. Everything should work out of the box then.

## Build

```csharp
cd vscode
yarn
```

There is an error

build error "MSB8040: Spectre-mitigated libraries are required<img src="/assets/CaRtbJvUbojQqSxTK2YcbhTQnce.png" src-width="968" class="m-auto" src-height="321" align="center"/>

It is written

<img src="/assets/CJmsbm0vnoXR0sxxNg4cHQs6nGh.png" src-width="800" class="m-auto" src-height="228" align="center"/>

Install it

<img src="/assets/HUkeb4IIvovrEax3TSCc7SiTn7c.png" src-width="799" class="m-auto" src-height="561" align="center"/>
### Build script

Run the following command and ts will be compiled to js

```csharp
yarn watch
```

### Launch

```csharp
.\scripts\code.bat
.\scripts\code-cli.bat #这一步不知道干啥的
```

### Debugging

Open the Chrome debugging panel

<img src="/assets/KhJVbN4gKoYttsx4YIqcOcI6nae.png" src-width="872" class="m-auto" src-height="175" align="center"/>
## Compile to start the analysis

The startup of the program is mainly two commands

```ts
yarn watch
code.bat
```

Let's analyze them in turn

### Yarn watch

```ts
"watch": "npm-run-all -lp watch-client watch-extensions",
```

npm-run-all```
-l, --print-label  - - - - Set the flag to print the task name as a prefix
                               on each line of output. Tools in tasks may s
-p, --parallel <tasks>   - Run a group of tasks in parallel.
                               e.g. 'npm-run-all -p foo bar' is similar to
```

It's all about doing it at the same time

--max-old-space-size specifies the maximum memory unit M available for the node

```ts
"watch-client": "node --max-old-space-size=4095 ./node_modules/gulp/bin/gulp.js watch-client",
```

and

```ts
"watch-extensions": "node --max-old-space-size=4095 ./node_modules/gulp/bin/gulp.js watch-extensions watch-extension-media",
```

Then execute [gulp] (https://gulpjs.com/)

After a quick look, watch-client is mainly compiled

src/** to the out/ directory

<img src="/assets/Z7JbbgO9WoRBJxx7Kz4ceQ3znde.png" src-width="1367" class="m-auto" src-height="79" align="center"/>

<img src="/assets/GmRdbQ7cAohrtSx2fB8cJ9Sangh.png" src-width="628" class="m-auto" src-height="392" align="center"/>
In the same way, watch-extensions should be a compilation plugin

Because our project doesn't have plugins, it doesn't matter.

The specific compilation details will not be studied, and the current mainstream no longer uses the original TS compilation tool such as Glup. There is no learning value.

We just need to know that after yarn watch, we can write TS scripts in the src directory with peace of mind.

### code.bat

Executed first

```ts
node build/lib/preLaunch.js
```

The main thing is to execute

```tsyarn electron
```

Then find the product name

Looking for the nameShort field in the product.json is the binary program that was compiled earlier

<img src="/assets/QdLkbnMmdoACSpxtrXKcILP5nde.png" src-width="961" class="m-auto" src-height="116" align="center"/>

Then execute

```ts
%CODE% . %* //%* indicates a command-line parameter. We execute without parameters, so it's empty
```

Equivalent

<img src="/assets/E4U1b5DVqo2SO3xzStjc0CfDngf.png" src-width="499" class="m-auto" src-height="26" align="center"/>
Summary:

```ts
yarn electron
.build\electron\Code - OSS.exe
```

### yarn electron

```ts
node build/lib/electron
```

This command is to package electron

The generated resources are in .build/electron