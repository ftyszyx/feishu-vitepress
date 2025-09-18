---
create_time: 1758076227
edit_time: 1758077187
title: 2025-9-17 1panel和宝塔
categories:
  - other_platform
---


互联网的技术现在的确是发展越来越快了。

之前折腾一个博客，最繁琐的就是https证书和nginx的配置。最近发现原来，已经有很多现成的免费的工具帮解决了这个问题，而且还处理的很好。

 第一个是宝塔：https://www.bt.cn/new/index.html

php写的，这个工具把linux服务器的运维全部集成了，日常的linux操作基本一个按键就可以搞定。

你要做的就是建一个网站，把域名填好，宝塔就可以帮你申请好ssl证书，相当简便。

<img src="/assets/AnOLbAJP4odI2ixetvJc35HCnNb.png" src-width="874" class="markdown-img m-auto" src-height="417" align="center"/>

连nginx的配置都帮你写好了

<img src="/assets/XJqMbXZiFoZm7nxh51ZcfNgnnMh.png" src-width="792" class="markdown-img m-auto" src-height="487" align="center"/>

除了宝塔，最近又发现另一个1panel:https://github.com/1panel-dev/1panel/

这个项目基本模仿了宝塔的所有功能，而且还开源。界面也是相当美观

<img src="/assets/XeJvbcMTboL9eLxMdT0cIThOnAb.png" src-width="1486" class="markdown-img m-auto" src-height="328" align="center"/>

而且1panel的所有应用都是以docker去安装的，有更好的隔离性和可插拔性。这一点比宝塔好

<img src="/assets/JDUSbjysCoFuA6xQQhwcaBjMn4Q.png" src-width="1908" class="markdown-img m-auto" src-height="231" align="center"/>

有了这种工具，以前手动折腾的什么https证书，感觉没啥意义了。

