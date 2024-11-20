---
create_time: 1732004665
edit_time: 1732005091
title: 基础
categories:
  - skill
---


# 文档

https://cn.vuejs.org/api/application.html

# 响应式

Vue的主要就功能就是能将html中的数据和脚本中的变量绑定。

这样逻辑就只用关心数据变化，不用关心dom的修改了。

## ref

接受一个内部值，返回一个响应式的、可更改的 ref 对象

```yaml
const count = ref(0)
console.log(count.value) // 0

count.value = 1
console.log(count.value) // 1
```

## shallowRef

只判断第一层的修改

```yaml
const state = shallowRef({ count: 1 })

// 不会触发更改
state.value.count = 2

// 会触发更改
state.value = { count: 2 }
```

# 组件生命周期

https://cn.vuejs.org/api/composition-api-lifecycle.html

<img src="/assets/RfoSblfZ6otu6KxT84FcX8GJnTf.png" src-width="193" class="markdown-img m-auto" src-height="331" align="center"/>

# 依赖和注入

相当于组件之间的传参

## provide()

## inject()

