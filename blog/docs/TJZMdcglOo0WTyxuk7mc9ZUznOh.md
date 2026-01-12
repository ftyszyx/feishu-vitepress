---
create_time: 1767536019
edit_time: 1768183585
title: 雪球记录
categories:
  - product
---


# 1. 如何替换解密后的代码

f5刷新页面，会触发debuger，说明页面一开始就加载了

<img src="/assets/PPNQbe8USoRaRixeRkYcdjIEnZd.png" src-width="3028" class="markdown-img m-auto" src-height="838" align="center"/>

从堆栈看是谁加载的。

```text
const p3 = XP();
p3[Os(uf.XY)] ? p3[Os(uf.Xp) + 're'](p0, p3[Os(uf.XY)]) : p3[Os(uf.Xm) + 'd'](p0);
```

p3是head

```text
p3[Os(uf.Xp) + 're'](p0, p3[Os(uf.XY)])  
p3["insertbefore"](p0,p3.firstchild)
```

p0就是要插入的节点

p0.text就是对应的脚本

<img src="/assets/T7X6bWEn0olywlxKTIIcZ5e5ngc.png" src-width="1043" class="markdown-img m-auto" src-height="683" align="center"/>

## 1.1 结论

f5加载时断到上面位置，再替换p0.text

<img src="/assets/W9yHbXWNzoULB9xhP2fcspmEnCg.png" src-width="2188" class="markdown-img m-auto" src-height="659" align="center"/>

# 2. 如何生成md5_1038

鉴于这个加密逻辑很复杂，不想研究了。

直接将代码修改后注入到puppter内，然后将暴露加密函数

<img src="/assets/V5ETbGbogogIVoxnmnbcSqO4nwh.png" src-width="512" class="markdown-img m-auto" src-height="217" align="center"/>

自己写一个对外接口，请求数据

```js
async function getComment(url){
    var host = "xueqiu.com";
    var md5 = window.mycode(url);
    var fullUrl = "https://" + host + url + "&md5__1038=" + md5;
    console.log("fullurl",fullUrl)
    var response = await fetch(fullUrl, { credentials: 'include' });
    var text = await response.text();
    return text;
}
window.getComment = getComment;
```

