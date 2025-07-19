---
cover: /assets/KdGhboAEyochG8xwe2rcFKVrnnd.png
create_time: 1752762638
edit_time: 1752847594
title: 2017-7-18 cursor不能用了！！！！
categories:
  - other_platform
---


# 1. cursor突然不能用了

# 2. 大批人在问

https://forum.cursor.com/t/this-model-provider-doesnt-serve-your-region/118453/36

<img src="/assets/UhjHb7SzKoCu6UxwjxMcuDpsn8l.png" src-width="771" class="markdown-img m-auto" src-height="243" align="center"/>

# 3. 官方说可以退款

https://docs.cursor.com/account/regions#what-you-can-do-today

<img src="/assets/DJtSbt7bQoduRIxWqg9cvRSknnf.png" src-width="776" class="markdown-img m-auto" src-height="296" align="center"/>

# 4. 我要退款

去你妈的，找开源方案

# 5. 开源的

## 5.1 roo-code

https://github.com/RooCodeInc/Roo-Code

Fork from cline

vscode插件形式

<img src="/assets/FdQDbmd7Oo5A9YxtdYgc4VrXnmb.png" src-width="670" class="markdown-img m-auto" src-height="626" align="center"/>

## 5.2 cline

https://github.com/cline/cline

vscode插件形式

### 5.2.1 使用

<img src="/assets/YJCwbxkYIo1X33xgiFpcSxypnXb.png" src-width="654" class="markdown-img m-auto" src-height="229" align="center"/>

<img src="/assets/ZVbZbImn3ok3wMxKGNQcsPJPnVh.png" src-width="705" class="markdown-img m-auto" src-height="205" align="center"/>

用不了自己的gemini

<img src="/assets/SiPObWxGBoYDctxxmtGc70qanwD.png" src-width="656" class="markdown-img m-auto" src-height="494" align="center"/>

同样的配置roo-code可以用

### 5.2.2 源码

编译

```yaml
npm run install:all
```

Debug

1. Launch by pressing `F5` (or `Run`-&gt;`Start Debugging`) to open a new VSCode window with the extension loaded. (You may need to install the <u>esbuild problem matchers extension</u> if you run into issues building the project.)

# 6. 
## 6.1 void

https://voideditor.com/

Vscode 换皮

## 6.2 claude_code

https://github.com/anthropics/claude-code

 只是一个命令行终端

## 6.3 gemini-cli

https://github.com/google-gemini/gemini-cli

使用gemni apikey

多注册google账号

https://aistudio.google.com/

在环境变量中加入

 GEMINI_API_KEY，就可以

<img src="/assets/ApnobOKo8o6Ftrx2FLncy6OencH.png" src-width="930" class="markdown-img m-auto" src-height="366" align="center"/>

### 6.3.1 源码分析

用户输入在inputprompt.tsx中输入文本

handlerinput()-&gt; handleSubmitAndClear(buffer.text);

app.tsx

```xml
<InputPrompt
                  buffer={buffer}
                  inputWidth={inputWidth}
                  suggestionsWidth={suggestionsWidth}
                  onSubmit={handleFinalSubmit}
                  userMessages={userMessages}
                  onClearScreen={handleClearScreen}
                  config={config}
                  slashCommands={slashCommands}
                  commandContext={commandContext}
                  shellModeActive={shellModeActive}
                  setShellModeActive={setShellModeActive}
                  focus={isFocused}
                />
```

handleFinalSubmit

```yaml
const handleFinalSubmit = useCallback(
    (submittedValue: string) => {
      const trimmedValue = submittedValue.trim();
      if (trimmedValue.length > 0) {
        submitQuery(trimmedValue);
      }
    },
    [submitQuery],
  );
```

调用 useGeminiStream中的submitQuery

submitquery先处理输入

```yaml
const { queryToSend, shouldProceed } = await prepareQueryForGemini(
        query,
        userMessageTimestamp,
        abortSignal,
        prompt_id!,
      );
```

处理@ 和

```java
// Handle @-commands (which might involve tool calls)
        if (isAtCommand(trimmedQuery)) {
          const atCommandResult = await handleAtCommand({
            query: trimmedQuery,
            config,
            addItem,
            onDebugMessage,
            messageId: userMessageTimestamp,
            signal: abortSignal,
          });
          if (!atCommandResult.shouldProceed) {
            return { queryToSend: null, shouldProceed: false };
          }
          localQueryToSendToGemini = atCommandResult.processedQuery;
        } else {
          // Normal query for Gemini
          addItem(
            { type: MessageType.USER, text: trimmedQuery },
            userMessageTimestamp,
          );
          localQueryToSendToGemini = trimmedQuery;
        }
      } else {
        // It's a function response (PartListUnion that isn't a string)
        localQueryToSendToGemini = query;
      }
```

### 6.3.2 举例

<img src="/assets/L9OIbHOqeoou0xxy28ucE7I6n3g.png" src-width="754" class="markdown-img m-auto" src-height="120" align="center"/>

最终，`gemini-cli` 发送给 Gemini 模型的，并不是你输入的那一行简单文本，而是类似下面这样经过精心包装的多部分内容

```json
[
  {
    "text": "请总结一下 @src/config/config.ts 这个文件的作用"
  },
  {
    "text": "\n--- Content from referenced files ---"
  },
  {
    "text": "\nContent from @src/config/config.ts:\n"
  },
  {
    "text": "/**\n * @license\n * Copyright 2025 Google LLC\n * SPDX-License-Identifier: Apache-2.0\n */\n\nimport yargs from 'yargs/yargs';\nimport { hideBin } from 'yargs/helpers';\nimport process from 'node:process';\n// ... (config.ts 文件的所有剩余内容) ...\n"
  },
  {
    "text": "\n--- End of content ---"
  }
]
```

### 6.3.3 总结：

从代码逻辑看，工具只是把用户需要提交的代码上下文和用户的输入组装成一个包发给ai，

并没有做过多的事。

那cursor应该也是如此，只是一个ui的包装而已。

# 7. 商业的

## 7.1 copilot

vscode插件

有代码补全，操作起来感觉没有cursor顺手，

比如，每次自动执行命令，都要我点一下，自动修改文件，自动读取文件是没问题的

<img src="/assets/B4nBbUPVvo6llfxIIdGcqOvknCc.png" src-width="535" class="markdown-img m-auto" src-height="216" align="center"/>

有点不聪明，让他处理所有的报错，没处理完就退出了

<img src="/assets/OBvwbWgHRoqB79xdOwAcynUWnjf.png" src-width="536" class="markdown-img m-auto" src-height="344" align="center"/>

<img src="/assets/DVP1bK7wpoKRDLxcRMXcFCkOnUh.png" src-width="747" class="markdown-img m-auto" src-height="249" align="center"/>

想换个高级模型，要收费

<img src="/assets/VKKublp7koe8hBxiV8XcXUHJnle.png" src-width="822" class="markdown-img m-auto" src-height="396" align="center"/>

价格挺轻民，cursor的一半。

## 7.2 kiro

ide 

https://kiro.dev/

还没开放

 

## 7.3 trae

https://www.trae.cn/

字节ide

## 7.4 Vscode 中的gemni code

# 8. ai代理

目前最强的ai是google 的gemini pro

但是需要翻墙。

我有国外服务器，搭了一个https://github.com/snailyp/gemini-balance

使用cherrystudio可以检查是否可用https://github.com/CherryHQ/cherry-studio

## 8.1 使用openai接口模式

<img src="/assets/CHIKbffEWoeGeKxsU0hczILcn5g.png" src-width="647" class="markdown-img m-auto" src-height="345" align="center"/>

填上地址和密码即可

<img src="/assets/EP7MbN1tko8BBfxqz7qcVKOxnje.png" src-width="956" class="markdown-img m-auto" src-height="244" align="center"/>

## 8.2 使用gemini模式

去https://ai.google.dev/gemini-api/docs/models?hl=zh-cn找模型列表 

复制id

<img src="/assets/QpBdbxwdkoMmE3xYfPBcFwNinbe.png" src-width="809" class="markdown-img m-auto" src-height="502" align="center"/>

添加模型

<img src="/assets/Jl0ebN7sToHEIyxtMpkcMHdknOf.png" src-width="555" class="markdown-img m-auto" src-height="310" align="center"/>

测试

<img src="/assets/MFC4bV5aNoCKJHxtzHMcMD1GnbY.png" src-width="944" class="markdown-img m-auto" src-height="482" align="center"/>

<img src="/assets/GgIAbDXoQoZKl4xSVAFceujcnng.png" src-width="538" class="markdown-img m-auto" src-height="303" align="center"/>

## 8.3 gemini-balance 项目分析

# 9. vscode插件开发

了解这个项目前提要先知道vscode插件是怎么回事

## 9.1 资源：

有个中文文档：https://liiked.github.io/VS-Code-Extension-Doc-ZH/#/

官方文档 ：https://code.visualstudio.com/api

## 9.2 注册事件

package.json-》

```json
"contributes": {
    "commands": [
      {
        "command": "testhello.helloWorld",
        "title": "Hello World"
      }
    ]
  },
```

插件的入口：activate和deactivate

```js
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "testhello" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('testhello.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from testhello!');
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
```

## 9.3 简单了解

能力

### 9.3.1  https://code.visualstudio.com/api/extension-capabilities/extending-workbench

