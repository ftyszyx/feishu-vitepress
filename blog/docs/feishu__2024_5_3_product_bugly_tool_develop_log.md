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

在主css中加入tailwind宏定义，这边加到base.css
```

