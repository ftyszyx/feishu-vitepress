---
create_time: 1750767667
edit_time: 1750951901
title: Winshark
categories:
  - skill
---


# 1. 资料

官网：

https://www.wireshark.org/

第三方介绍

https://www.youtube.com/watch?v=0uZfyduC0A0&t=541s

# 2. 数据层

<img src="/assets/JYrdbNvmhodf6KxT8rnck1zgnwb.png" src-width="939" class="markdown-img m-auto" src-height="281" align="center"/>

frame：物理层

ethernet:数据链路层

internetProtocol:网络层

Transmission control protocol:传输层，tcp协议

# 3. 过滤器

## 3.1 显示过滤

ip.addr == 192.0.2.1&&http&&tcp.port=80

<img src="/assets/YgLlbraBnoxLy3x0EvecBMdanFf.png" src-width="935" class="markdown-img m-auto" src-height="458" align="center"/>

## 3.2 捕获过滤

<img src="/assets/T5wlbQfwToIojexsKTicUxhPnff.png" src-width="700" class="markdown-img m-auto" src-height="326" align="center"/>

# 4. https抓包  

<img src="/assets/YJ1hbx1rWoQHL5xNGaUcnjQ1nAg.png" src-width="857" class="markdown-img m-auto" src-height="506" align="center"/>

<img src="/assets/UbNPbscFloxUpRxneGPc7pFtnGc.png" src-width="2918" class="markdown-img m-auto" src-height="1667" align="center"/>

新建环境变量

SSLKEYLOGFILE

<img src="/assets/WMySbHyEmo7xrmxvdWocmjW4n6d.png" src-width="782" class="markdown-img m-auto" src-height="186" align="center"/>

<img src="/assets/DTj3bhPuzoblSfxXeAwcGiR4nnc.png" src-width="507" class="markdown-img m-auto" src-height="939" align="center"/>

<img src="/assets/TRJlbvQq9ohB6xxPp2tcOQLAnQd.png" src-width="1019" class="markdown-img m-auto" src-height="872" align="center"/>

# 5. windows程序抓包

## 5.1 获取目标地址

先在任务管理器定位到pid:

<img src="/assets/B7rVbUhFEo4fYOx6dRrcEtA6nue.png" src-width="1253" class="markdown-img m-auto" src-height="193" align="center"/>

使用windows工具定位程序的通信地址

1. 按 Win + R 组合键，输入 resmon.exe 并回车，打开资源监视器。
2. 切换到 “网络” 选项卡。

<img src="/assets/BHJgbimyMo1riPxBGXPcJpUdnzd.png" src-width="690" class="markdown-img m-auto" src-height="262" align="center"/>

<img src="/assets/QekYbyUjFoqgECxLdYacWbRMnKd.png" src-width="754" class="markdown-img m-auto" src-height="452" align="center"/>

用winshark监听端口和ip

ip.src== 192.168.3.33&&http

```yaml
www.msftconnecttest.com/connecttest.txt
http://liushisi.com/peizhitongyongxiazaiqi.txt
http://www.liushisi.com/yzfwq.txt
http://www.liushisi.com/peizhitongyongxiazaiqi.txt
http://www.liushisi.com/dd.txt
```

