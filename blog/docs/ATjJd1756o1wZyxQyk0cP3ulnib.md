---
create_time: 1762911658
edit_time: 1763994127
title: 2025-11-12 AI炒股：不设技术指标，只给原始数据，让大模型“凭直觉”交易？
categories:
  - other_platform
---


## 1.1  **正文**

最近我一直在想一个问题： **既然AI在数据分析和知识总结上这么强，为什么不能让它直接帮我们找股票机会？**

市面上大多数量化平台，说白了还是人在指挥机器——你设定好MACD金叉买入、RSI超卖反弹之类的规则，AI只是个执行者。但股市哪有那么听话？过去有效的公式，明天可能就失效了。

直到我看到这个GitHub项目：[https://github.com/NoFxAiOS/nofx/tree/dev](https://github.com/NoFxAiOS/nofx/tree/dev)

它的思路让我眼前一亮—— **干脆别教AI怎么判断，直接把原始行情数据打包成上下文，扔给大模型，让它自己“猜”下一步该买还是卖！**

这不就是人类高手的思维方式吗？老股民看盘，未必会算布林带宽度，但他们能从价格波动、成交量变化、市场情绪中“感觉”到机会。AI或许也能做到类似的事。

我搭了一下这个项目，界面意外地简洁：

先配置AI模型，目前支持 DeepSeek 和 Qwen（通义千问）👇

<img src="/assets/AqqubjQH6oFczIxX3fSctEcDnEg.png" src-width="1550" class="markdown-img m-auto" src-height="270" align="center"/>

<img src="/assets/AbW1b1ripomN4ox6vQics7conec.png" src-width="506" class="markdown-img m-auto" src-height="229" align="center"/>

然后连上交易所（目前只支持虚拟币）👇

<img src="/assets/MwQ6bwvMbo5AyXxhDtZc7RSAnDb.png" src-width="789" class="markdown-img m-auto" src-height="204" align="center"/>

最后添加“AI交易员”，它就会开始自主分析并下单👇

<img src="/assets/T11jbjXKXoLYkjxPPoNcOUybnwc.png" src-width="607" class="markdown-img m-auto" src-height="374" align="center"/>

整个过程没有一行技术指标代码，纯粹靠大模型对时序数据的理解力做决策。

 **但问题也很明显：它没有模拟盘功能！**

一上来就是实盘交易。如果模型理解错了上下文，或者API调用有bug，钱可能瞬间就没了。这对普通用户来说风险太高了。

不过， **这个思路绝对值得借鉴**。

打算接下来花点时间研究它：

- 能不能接入A股
- 能不能加一个模拟交易功能，测一下胜率？  

