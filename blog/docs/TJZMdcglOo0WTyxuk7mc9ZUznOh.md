---
create_time: 1767536019
edit_time: 1768055652
title: 雪球
categories:
  - skill
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

断进来

<img src="/assets/RoN0b9vxeo9Mtsxs0gFcMj9dngh.png" src-width="2502" class="markdown-img m-auto" src-height="1570" align="center"/>

<img src="/assets/B0cIbIxwJowdidxb0Fzcsj7Pn9X.png" src-width="2682" class="markdown-img m-auto" src-height="1225" align="center"/>

```js
function getRenderData() {
                var dataTag = document.getElementById('renderData');
                var renderData = dataTag.innerHTML;
                return renderData
            }
            ;var renderData = JSON.parse(getRenderData());
            window._waf_bd8ce2ce37 = renderData._waf_bd8ce2ce37;
            window._waf_a86dfdc5f2 = new Date().getTime()
```

New:

[input.js](/assets/FpcGbRUAKoTVABxV9qXcoiJkntf.false)

[ast.js](/assets/ESWSbHRE0osH1OxuijscyRFpn7x.false)

