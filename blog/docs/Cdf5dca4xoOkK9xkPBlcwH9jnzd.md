---
create_time: 1752200244
edit_time: 1752240612
title: 2025-7-11 opencut/MoneyPrinterV2/快手/https
categories:
  - other_platform
---


# 1. opencut

https://github.com/OpenCut-app/OpenCut

无意中在twitter上有人推荐说国外有人不满字节的videocut的会员加高级会员的恶心恶心套路，

于是模仿videocut做了一个类似视频编辑器，而且全开源。

于是我就看了下，还真有，二话不话，运行起来看下。

项目是一个web项目，使用next.js框架。打开是这样的。

<img src="/assets/T2SQbT18PolTAKxd1JUczS7snre.png" src-width="943" class="markdown-img m-auto" src-height="609" align="center"/>

上面有个waitlist按键，但是编辑器呢？没看到

我于是上github上看是啥情况

还真有人有同样的疑问

<img src="/assets/LZSVbaHdpoQDItxbUXtcPr42nsA.png" src-width="880" class="markdown-img m-auto" src-height="445" align="center"/>

哦，原来藏在这里了

<img src="/assets/YSRcbVKTQoCJ3Wx2FdzckURynJh.png" src-width="948" class="markdown-img m-auto" src-height="593" align="center"/>

打开看，的确好像功能是有的。页面做的很简洁美观，值的学习。有空再研究。

<img src="/assets/KDYhbmOCPormJ4x23dEcmh31njb.png" src-width="961" class="markdown-img m-auto" src-height="668" align="center"/>

老外的开源精神果然在线，很多好东西都是他们搞的。佩服。

# 2. [MoneyPrinterV2](https://github.com/FujiwaraChoki/MoneyPrinterV2)

https://github.com/FujiwaraChoki/MoneyPrinterV2

这是啥玩意？自动赚钱，还做到第二版了。

<img src="/assets/INU1bVoAPojXCvxVItTc0gH2nwh.png" src-width="535" class="markdown-img m-auto" src-height="160" align="center"/>

看了一下说明，大概懂了

赚钱的流程大概是：

你建一个twitter新号，脚本可以帮你自动发文章，给你twitter涨粉。

<img src="/assets/TD6nbZ2qAoa3Wyxix2lcqoa6nYd.png" src-width="959" class="markdown-img m-auto" src-height="109" align="center"/>

当你粉到达一定数量，他可以结合aws的商品生成商品推广文章，用户点商品链接购买的话，你就有佣金收入。

要运行看效果的话，还有点复杂 ，后面再试。

## 2.1 今天偿试了一下运行程序 

下好了，python写的

需要Python 3.9环境,我直接用conda做环境了

```yaml
conda create -n test39 python=3.9
```

安装依赖时报错，应该是某个库需要在本地编译，看不懂是少了什么 环境，

把错误直接扔给ai,看有啥建议

<img src="/assets/W0NublwVLoxk83xFos9cto7jncf.png" src-width="1087" class="markdown-img m-auto" src-height="179" align="center"/>

原来python的native库需要clang编译，安装clang。终于可以编译了

<img src="/assets/YtBZbLGDho7xy5xQZ91cNIWAnvf.png" src-width="919" class="markdown-img m-auto" src-height="152" align="center"/>

# 3. 快手的抓包

想研究一下手机端快手如何获取视频的地址

用木木模拟机安装了快手，用charles抓包。

发现什么 有用数据都抓不到，怀疑是不是charles设置有问题。

于是在模拟机上打开浏览器上baidu.

charles能正常catch到数据包。说明快手有点技术哦。

在网上查了一下，有人专门分析了这个事：

https://cloud.tencent.com/developer/article/2161442

作者比我专业，但感觉分析的不对，因为我这边的现象是有包，但是都无法解密。

说明快手走的不是https协议

找到一篇文章，http://www.lxspider.com/?p=442 作者使用frida和postern来抓包，看起来好方便。

 Frida是啥，好像很厉害。https://frida.re/有空得学学。

从作者的代码看，是通过frida把快手app的内部配置改了，enable_quic改成false，这样就走https

<img src="/assets/KeA8brKGcoi3TPxFal9c948vnWe.png" src-width="685" class="markdown-img m-auto" src-height="495" align="center"/>

