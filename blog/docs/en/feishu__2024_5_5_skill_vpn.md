---
title: vpn
tags:
  - develop
keywords:
  - vpn
  - clash_windows
create_time: 1717592186
categories:
  - skill
---

# clash_windows

https://docs.gtk.pw/

## Custom configurations

Let's say I want to add bugly.qq.com to the agent

Because the configuration in the profiles is given by the service provider, it will be updated regularly, and if it is modified in it, it will be overwritten

So turn on the mixin

<img src="/assets/S5BIbtMHqoqBikx3qbEcjo6XnSJ.png" src-width="780" class="m-auto" src-height="464" align="center"/>

Then add the configuration in the mixin in the settings

<img src="/assets/DHgAbIMSFo3jM8xbqgKch2cQnub.png" src-width="899" class="m-auto" src-height="472" align="center"/>

```ts
mixin: # Note the indentation below
  rules:
    - "DOMAIN-SUFFIX, bugly.qq.com, Node Selection"
```

##