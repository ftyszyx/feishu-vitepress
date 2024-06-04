---
title: bugly分析工具-开发记录
tags:
  - develop
create_time: 1717379027
categories:
  - product
---


# 2024-6-3

选择**electron-vite做为脚手架**

```csharp
npm create @quick-start/electron@latest
```

加antd

```csharp
npm install antd -S
```

加tailwind

```csharp
npm install -D tailwindcss
npx tailwindcss init

修改tailwind.config.js
content: ['./src/renderer/src/**/*.{html,js,tsx,tx}'],

在主css中加入tailwind宏定义，这边加到tailwind.css
@tailwind base;
@tailwind components;
@tailwind utilities;

然后启动修改监听
npx tailwindcss -i ./src/renderer/src/assets/tailwind.css -o ./src/renderer/src/assets/tailwind_out.css --watch

这个监听可以加到package.json
```

# 待做

1、bugly登陆

2、高级搜索页

