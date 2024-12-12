---
create_time: 1732004665
edit_time: 1733823745
title: 基础
categories:
  - skill
---


# 1. 文档

https://cn.vuejs.org/api/application.html

# 2.  模板语法

## 2.1 文本插入

```yaml
<span>Message: {{ msg }}</span>
```

## 2.2 html插入

```yaml
<span v-html="rawHtml"></span>
```

## 2.3 插入属性

```yaml
<div v-bind:id="dynamicId"></div>
简写：
<div :id="dynamicId"></div>
```

## 2.4 多属性绑定

```yaml
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper',
  style: 'background-color:green'
}

<div v-bind="objectOfAttrs"></div>
```

## 2.5 使用js

```yaml
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

## 2.6 其它的指令

`v-for`, `v-on` and `v-slot`

```yaml
<a v-on:click="doSomething"> ... </a>

<!-- shorthand -->
<a @click="doSomething"> ... </a>
```

# 3. 属性名也可以使用js

```yaml
<a v-bind:[attributeName]="url"> ... </a>

<!-- shorthand -->
<a :[attributeName]="url"> ... </a>
```

<img src="/assets/AlwXb74y0oWVfPxF7fdcujnSnDg.png" src-width="688" class="markdown-img m-auto" src-height="224" align="center"/>

# 4. class和style绑定

```ts
<div :class="{ active: isActive }"></div>
```

# 5. Watchers

监听属性是否变化 

```ts
const x = ref(0)
const y = ref(0)

// single ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// array of multiple sources
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

# 6. 响应式

Vue的主要就功能就是能将html中的数据和脚本中的变量绑定。

这样逻辑就只用关心数据变化，不用关心dom的修改了。

# 7. 
## 7.1 ref

接受一个内部值，返回一个响应式的、可更改的 ref 对象

```yaml
const count = ref(0)
console.log(count.value) // 0

count.value = 1
console.log(count.value) // 1
```

## 7.2 shallowRef

只判断第一层的修改

```yaml
const state = shallowRef({ count: 1 })

// 不会触发更改
state.value.count = 2

// 会触发更改
state.value = { count: 2 }
```

# 8. 计算属性

对数据二次加工后的属性

计算属性会缓存

computed properties are cached based on their reactive dependencies

```yaml
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
```

可修改

```ts
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

# 9. 组件生命周期

https://cn.vuejs.org/api/composition-api-lifecycle.html

<img src="/assets/RfoSblfZ6otu6KxT84FcX8GJnTf.png" src-width="193" class="markdown-img m-auto" src-height="331" align="center"/>

# 10. 依赖和注入

相当于组件之间的传参

## 10.1 provide()

## 10.2 inject()

