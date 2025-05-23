---
create_time: 1743060921
edit_time: 1743060976
title: 一些感悟
categories:
  - skill
---


# 1. reactive中新加字段也会触发模板更新

```
<script setup>
import { reactive } from 'vue';
import { ref } from 'vue'

const count = ref(0)
const dockinfo=reactive({})

function increment() {
  dockinfo["tt"]||={}
  if(dockinfo["tt"].count!=undefined)
  {
   dockinfo["tt"].count++
  }
  else{
       dockinfo["tt"].count=0
  }

}
</script>

<template>
  <button @click="increment">
    {{ "test_"+dockinfo["tt"]?.count}}
  </button>
</template>
```

