---
create_time: 1767442394
edit_time: 1767579591
title: web反编译
categories:
  - skill
---


# 1. 破解不断debugger的问题

使用fixfox，

或者使用chrome魔改版本

https://github.com/selfshore/YSbrowser

# 2. js反混淆

https://github.com/kuizuo/js-deobfuscator?tab=readme-ov-file

### 2.1.1 推荐的 AST 基于反混淆工具

1.  **javascrip** **t-deobfuscator**（最推荐通用工具） GitHub: [htt](https://github.com/ben-sb/javascript-deobfuscator?referrer=grok.com)[ps://gith](https://github.com/ben-sb/javascript-deobfuscator?referrer=grok.com)[ub.com/ben-sb/javascript-deobfuscat](https://github.com/ben-sb/javascript-deobfuscator?referrer=grok.com)[or](https://github.com/ben-sb/javascript-deobfuscator?referrer=grok.com)
    - 简单强大，支持移除常见混淆（如变量替换、字符串数组、控制流等）。
    - 在线版本：[https://deobf](https://deobfuscate.io/?referrer=grok.com)[uscate.io](https://deobfuscate.io/?referrer=grok.com)
    - 安装：npm install -g js-deobfuscator，然后用 CLI 处理文件。

2.  **JStillery** GitHub: [https://github.com/mindedsecurity/JStillery](https://github.com/mindedsecurity/JStillery?referrer=grok.com)
    - 高级工具，使用 AST 和部分求值（Partial Evaluation）进行深度反混淆。
    - 适合复杂恶意 JS 或多层混淆。
    - 在线版本：[https://mindedsecurity.github.io/jstillery/](https://mindedsecurity.github.io/jstillery/?referrer=grok.com)
    - 安装后用 ./jstillery_cli.js 文件名 处理。

3.  **REstringer**（以前的 PerimeterX 工具） GitHub: [https://github.com/HumanSecurity/restringer](https://github.com/HumanSecurity/restringer?referrer=grok.com)
    - 模块化设计，针对字符串重建和复杂逻辑简化，使用扁平化 AST（flAST）。
    - 适合特定混淆模式（如 packer 或 DOM 字符串拼接）。

4.  **de4js** 在线：[https://lelinhtinh.github.io/de4js/](https://lelinhtinh.github.io/de4js/?referrer=grok.com) GitHub: [https://github.com/lelinhtinh/de4js](https://github.com/lelinhtinh/de4js?referrer=grok.com)
    - 支持多种 packer（如 JSFuck、JJEncode、AAEncode）和常见混淆。

5.  **webcrack** GitHub: [https://github.com/j4k0xb/webcrack](https://github.com/j4k0xb/webcrack?referrer=grok.com)
    - 针对 obfuscator.io、打包工具（webpack/browserify），结合 AST 解包和美化。

6.  **其他基于 Babel 的自定义工具**
    - 许多教程使用  **@babel/parser**、 **@babel/traverse**、 **@babel/generator** 构建自定义反混淆脚本。
    - 推荐资源：AST Explorer（[https://astexplorer.net/](https://astexplorer.net/?referrer=grok.com)）用于可视化调试 AST。
    - 示例模板：读取 JS → 解析为 AST → 遍历修改（e.g. 常量替换、表达式求值） → 生成代码。

### 2.1.2 国内常用在线工具（部分支持 AST 处理）

- DeJs：[https://www.dejs.vip/](https://www.dejs.vip/?referrer=grok.com)（专业反混淆，支持 obfuscator、eval 等）。
- 其他如 JSNice（变量名预测，但非纯 AST）。

