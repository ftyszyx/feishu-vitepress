---
create_time: 1768362183
edit_time: 1768385179
title: bugly自动分析n8n工作流-设计思路
categories:
  - skill
---


# 1. 需求说明

根据提供的bugly链接从bugly获取闪退堆栈

使用android工作还原堆栈

将堆栈信息保存到飞书的多维表格，方面分析

全程全自动化。

# 2. 自定义结点

bugly_node:根据url获取堆栈详情

crash_parse_node:还原堆栈信息

# 3. 实现说明

## 3.1 bugly_node

### 3.1.1 实现逻辑

#### 3.1.1.1 分析url:

https://bugly.qq.com/v2/crash-reporting/crashes/{appid}/{issueid}?pid=1

 

#### 3.1.1.2  获取issue对应的闪退列表(curl信息如下)

curl 'https://bugly.qq.com/v4/api/old/get-last-crash?appId=673b9cc5e2&pid=1&issueId=196149&crashDataType=undefined&fsn=e9e02721-5eb3-4805-b7b1-4b2b2a5ab643' 

其中fsn是通过bugly_fn.js中的p函数获取p()；

cookies只可以通过playwright打开浏览器，让用户登录后，自动保存cookie

```js
const s = function (e) {
    return "string" == typeof e && i.test(e)
};
for (var c = [], l = 0; l < 256; ++l)
    c.push((l + 256).toString(16).substr(1));
const u = function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
        , n = (c[e[t + 0]] + c[e[t + 1]] + c[e[t + 2]] + c[e[t + 3]] + "-" + c[e[t + 4]] + c[e[t + 5]] + "-" + c[e[t + 6]] + c[e[t + 7]] + "-" + c[e[t + 8]] + c[e[t + 9]] + "-" + c[e[t + 10]] + c[e[t + 11]] + c[e[t + 12]] + c[e[t + 13]] + c[e[t + 14]] + c[e[t + 15]]).toLowerCase();
    return n
};

const p = function (e, t, n) {
    var r = (e = e || {}).random || (e.rng || o)();
    if (r[6] = 15 & r[6] | 64,
        r[8] = 63 & r[8] | 128,
        t) {
        n = n || 0;
        for (var a = 0; a < 16; ++a)
            t[n + a] = r[a];
        return t
    }
    return u(r)
}
```

#### 3.1.1.3 返回 信息为json，获取其中的获取其中的callStack信息即可。

### 3.1.2 结束展示

<img src="/assets/D2sAbxRpQoX2zwxKmqcc7e3qn9b.png" src-width="1021" class="markdown-img m-auto" src-height="654" align="center"/>

## 3.2 crashparse_node

### 3.2.1 实现逻辑

#### 3.2.1.1 配置

1.用户配置好addr2line.exe", "readelf.exe" 所在的本地目录 

2.用户配置好需要解析的so符号表目录，类似于下面这种结构

```json
so_name_map = {
    "libunity.so": {
        "arm32": "symbols/armeabi-v7a/libunity.so",
        "arm64": "symbols/arm64-v8a/libunity.so",
    },
    "libil2cpp.so": {
        "arm32": "symbols/armeabi-v7a/libil2cpp.so",
        "arm64": "symbols/arm64-v8a/libil2cpp.so",
    },
}
```

#### 3.2.1.2 读入闪退堆栈

#### 3.2.1.3 解析

1.首先通过readelf判断符号表和堆栈是否匹配

```text
readelf.exe, "-n", samplepath
```

2.还原堆栈

```py
"""%s -f -C -e  %s %s""" % (addr2line.exe, symbolpath, pcstr)
```

输出

内容

### 3.2.2 效果展示

<img src="/assets/XGn5b16DCoCM9jxKyMDcdVWcnQd.png" src-width="1702" class="markdown-img m-auto" src-height="652" align="center"/>

## 3.3 保存datatable

### 3.3.1 新建一个datatable

<img src="/assets/QNC9bRcCZorFZVxlS7mcOyvFnLc.png" src-width="1379" class="markdown-img m-auto" src-height="384" align="center"/>

### 3.3.2 定义好列

<img src="/assets/TPVfbxEKaoFGjExc1sackOzCncd.png" src-width="1730" class="markdown-img m-auto" src-height="138" align="center"/>

### 3.3.3 配置好节点

<img src="/assets/Cv0Pb34LYo0MeUxeeS4cKOc1nge.png" src-width="292" class="markdown-img m-auto" src-height="179" align="center"/>

<img src="/assets/AaqSbxW99oBZMXxwpoOcl0NEn23.png" src-width="1696" class="markdown-img m-auto" src-height="694" align="center"/>

搞定

<img src="/assets/IQWYbWzfdoY583xnAeHclr1OnRc.png" src-width="1328" class="markdown-img m-auto" src-height="258" align="center"/>

## 3.4 飞书动态表格

https://www.npmjs.com/package/n8n-nodes-feishu-lite

先要添加 一个应用，建一个多维表格，并给应用权限

<img src="/assets/RinWbAQHvoulWUxA9zLc2Mg8nnd.png" src-width="882" class="markdown-img m-auto" src-height="672" align="center"/>

填入表格token

