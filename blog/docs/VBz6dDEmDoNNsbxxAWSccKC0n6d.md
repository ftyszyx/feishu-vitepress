---
cover: /assets/UIQvbp2CEoTUq4xC3jVcqBFqnGe.jpeg
create_time: 1729303591
edit_time: 1729315828
title: 2024-10-19 优化了一下飞书转博客的系统
categories:
  - other_platform
---


闲来无事优化了一下飞书写博客的系统。

之前飞书没有设置封面的功能，为了给文章配个封面图，需要在文章的第一行配一个不显示在正文的图片。

最近在飞书上写文档时发现，现在可以直接设封面了。而且官方还提供很多图片可选。

<img src="/assets/Dj0AbiyAOoGLIyx9QBfchOTPnRf.png" src-width="1166" class="markdown-img m-auto" src-height="385" align="center"/>

于是我就改了一下代码，直接把飞书的封面图片提取出来，生成的博客效果如下：

<img src="/assets/VzBkbgHRbo6TSjxASjSc9hcmnA9.png" src-width="398" class="markdown-img m-auto" src-height="290" align="center"/>

另外之前的文章标题是从文章的第一个yaml配置中获取，经过这么久的体验，感觉也不太方便 ，直接取文章标题了。现在可以不用在文章首页配个yaml了。

最后还优化了一个地方，就是文章的地址，直接直接是取文章的标题做地址，好处是可以从文件名字看出来这个文章是写啥的。但是坏处就是不能任意改标题了，因为真要一改标题，文章的地址就变了。之前做的seo就全丢了。

所以这回直接改成使用飞书文档的id做为文章地址。

这样一改以后，之前的文章如果被google收录了就全丢了，有点可惜。

哈哈，感觉是自己想多了吧。

