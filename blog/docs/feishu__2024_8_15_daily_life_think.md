---
title: 随感
create_time: 1726390303
categories:
  - daily_life
---


# 2024/9/15

1. 
<img src="/assets/MsHOb10iyoN8yXxQf8DcdPuNnjh.png" src-width="980" class="markdown-img" src-height="378"/>

目前的ai大模型功能越来越强大，能画画、写作、生成语音、生成视频。

但唯独在生成代码上还有所欠缺，这是因为软件是一个系统工程。一个大型的软件项目代码量巨大，并且代码之间都是互相关联的。而ai目前的上下文容量是有限制的，所以目前ai只能用来生成代码片段，辅助程序员。

目前代码理解能力最强的AI大模型就是claude。

目前程序员最喜欢使用的代码编辑工具就是vscode。

所以在cursor之前，一般人的工作流是这样的：

在claude中问代码问题，然后把结果复制到vscode中。ctrl+c，ctrl+v成常态。

怎样提高效率？cursor给出了解决方案。

把vscode和claude整合成一个工具。

试用过cursor后。我的体会就是真的很智能，真的很方便甩开了GitHub Copilot一条街。

在cursor的使用中，你只需要记住三个快捷键即可

   **ctrl+L：和ai聊天，让ai给出代码片段。**

（我怀疑，开发者是不是一个中国人啊，L不是聊天的首字母吗？）

<img src="/assets/X9vvb4jB7oJGfFx6tzicgnYwnAg.jpeg" src-width="496" class="markdown-img" src-height="419"/>

1.  **TAB:智能补全代码**
2.  **ctrl+i：**compose，这是上面两者的集合。
3. 你可以使用这个窗口从0开始让cursor帮你创建项目，快捷完成demo。简直是一个大杀器，以后写软件不是程序员的专利了。

<img src="/assets/OGsIbcXB6o1Tjcx1cX4cpVAWnhh.png" src-width="497" class="markdown-img" src-height="603"/>

cursor真的是程序员的福音，他优秀的交互设计真的能大幅提高写代码的效率。从这也看出，这个工具的作者应该同时也是这个工具的深度使用者。正因为作者在写代码的过程中体会到了痛点，才会设计出这么好用的工具。

所以这也给了我一个启发：一个好的工具，往往第一需求者和深度使用者肯定是自己。

如果自己都不愿意使用工具，你怎么能说服别人使用呢？

# 2024/9/23

<img src="/assets/Evttb1MNaoRkp5xnFjWc63HMnhd.jpeg" src-width="1280" class="markdown-img m-auto" src-height="801" align="center"/>

公众号是个好平台。偶尔写点文章，记录一下自己的所思所想，还能被人关注，这感觉挺好。

但公众号的编辑文章的后台，的确有点原始，在里面敲字总感觉不舒服。

你看下图，所有的格式化工具都在顶部。也没啥快捷键。

<img src="/assets/OOswbmeCGoR3VLxgY1SczlRCnrc.png" src-width="943" class="markdown-img m-auto" src-height="50" align="center"/>

最关键的是，文档最重要的标题1~到标题5这种格式都没有。我只能用加黑加大字段来控制。这在其它文档工具里只是一个快捷键。

目前市面上我感觉最好用的文字编辑工具应该是notion和飞书文档了。

为了获得好的写文章体验，我一般是在飞书文档中写文章，然后再复制到公众号里。

但是这也是有问题的，公众号会把文章格式搞丢。所以还需要人工编辑一下，修正一下格式。

如果想要把文章发到其它平台上，同样要做这样的操作，有点蛋疼。

作为程序员，怎么能容忍这种低效的工作流程呢？

所以我想写个工具，能一键把飞书或者notion的文章发布到公众号或者其它平台。

不知道大家有什么建议。.

# 2024/9/24

<img src="/assets/IjrPbK0qPo1ULBx6xqOc4bUtnFc.png" src-width="660" class="markdown-img m-auto" src-height="357" align="center"/>

最近写代码用上cursor后，感觉的确能提高不少效率。但我用的是试用版本，有2000次的自动提示限制。

我也不知道怎么用的，才两天时间，这额度就用光了。没有自动提示，的确有点难受。上cursor官网查了一下会员的价格，需要20美金，相当于140一个月。这价格有点高啊。

于是我打开万能的淘宝，果然，上面卖cursor会员的一大堆。其中有一个价格有点吸引我，cursor会员半年才70。

相当于一个月10多块。我毫不犹豫就下单了，马上客服就发来一个微信号让我加，加完微信后，对方就发来账号密码。我本以为这回占到便宜了，结果发现，原来这个账号也是一个试用账号，并非会员账号。然后问客服才知道，他的意思是，你用试用账号就可以享受7天的会员服务，如果到期了，他会帮你注册一个新账号。我晕，这不是薅cursor的羊毛吗。

因为cursor官方没有账号注册限制，有一个邮箱就可以注册 ，这帮人竟然拿这个做起了生意，来在淘宝公开卖？

成交量还不小，卖了4000多份

<img src="/assets/I98MbDRu3o8kSMxsu7McT0F4nUf.png" src-width="413" class="markdown-img m-auto" src-height="174" align="center"/>

我就算他最低的套餐17。相当于赚了68000。还有比这更暴利的吗？

商家要做的就是写个脚本，疯狂的注册新账号。

羡慕啊，我都想参与了。

# 2024/9/25

## 人要会推广自己

前段时间写了个密码管理器Lockpass:https://github.com/ftyszyx/lockpass。主要是自己用，因为平时要记录的敏感信息太多了，一直有这种需求。

想到也许其它人也有同样需求，于是把软件开源了，但是过了几周也没啥人关注。

前天，在一个程序员社区里简单发了一篇文章介绍了一下。

今天一看，项目已经有40个关注了，效果相当明显。

<img src="/assets/GR6PbZwYuoa4yfx7vZ7cwjn8n8b.png" src-width="840" class="markdown-img m-auto" src-height="168" align="center"/>

我只是一名程序员，不擅长UI的设计，软件做的很简陋，但我想力争把软件的交互做好，毕竟 软件是给自己用的，好的交互也让自己用着舒心。

但是毕竟个人的力量有限，一个产品要想完美，需要吸收大家的意见。

我不求别人帮改代码（项目小,一个人也能搞定），只求提出好的优化想法，能让双方受益。

毕竟这是一个密码管理器，能使用它已经是对开发者的足够信任了。

人生本孤独，平时干着普通的工作，为公司做着无意义的产品，我没有丝毫成就感。

但当我依着自己的心意，做出自己想要的产品，并且能得到别人的认可，就感觉很不一样。

同时也要敢于宣传自己，让自己与这个社会产生关联，不要隔着公司这个中间商。我一直觉得AI这个未来趋势，最受益的应该就是程序员，因为程序员可以利用AI创造一却。

# 2024/9/28

## 一个能打的都没有

<img src="/assets/FVOFbBdZboFARWxiexGc1V2Xn1g.png" src-width="400" class="markdown-img m-auto" src-height="198" align="center"/>

我想要一个工具，实现在飞书写文章然后一键发布到各个平台。

市面上有商用的软件做这种事，他们大部分是用electron做一个桌面客户端，用户可以在软件里写文章，然后发布到各平台。

我试用了一下，感觉不是我想要的，这些工具把写文章集成在软件内部，然后体验上又和飞书差好远。很难用。

于是我又在网上搜索一下免费开源的。还真找到一个开源项目wchatsync，有不少人关注。

作者的方案是直接写一个浏览器插件，在你的微信文章后台页面上显示一个按键 ，

<img src="/assets/FVz4bcSzjoSyjkxQ4d2cFcmBn5b.png" src-width="873" class="markdown-img m-auto" src-height="310" align="center"/>

在点这个按键 后，插件会将网页里的内容一键发送到其它平台。

<img src="/assets/LXubbn33Ko4munxmVJVcUDaVnJh.png" src-width="488" class="markdown-img m-auto" src-height="402" align="center"/>

这个方案有点巧妙，文章编辑是平台原有的，工具只做文章的发布。而且很轻量，用户不用去下载一个近100M的安装包，可以在微信公众号内就完成所有工作。

但也有不足：

1、同一个平台只支持一个账号

2、只能把公众号的文章同步到其它平台（我是想用飞书）

还有就是这个项目是四年前的，作者已经好久没人维护了，看项目的讨论区，好多人说现在很多渠道同步失效。需要自己改。

另外一个有趣的事是，因为项目没人维护了，但热度还在，于是项目的讨论区成了广告集散地。一些做类似功能的商用软件在里面打广告。比如下面这个

<img src="/assets/Wmf3b5viOosSJ0xtyRPcWXxOneg.png" src-width="614" class="markdown-img m-auto" src-height="364" align="center"/>

他也是一个浏览器插件，看界面挺不错，而且功能也的确很清晰。

这个插件上有个链接：

<img src="/assets/Jy0lbeBxOoEdKSxrxL5cBbwDnxe.png" src-width="325" class="markdown-img m-auto" src-height="39" align="center"/>

提示你升级会员，会跳转到他们的网站充会员。

<img src="/assets/CcXCb00hOoQBUuxMsscc4nZynNg.png" src-width="982" class="markdown-img m-auto" src-height="372" align="center"/>

价格不是很贵。于是我试了下用他的插件给微博发了三次信息，只有一次成功。

晕，就会收钱，一个能打的都没有。

