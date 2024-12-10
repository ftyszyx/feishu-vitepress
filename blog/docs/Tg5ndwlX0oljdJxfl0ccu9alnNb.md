---
cover: /assets/YpwvbkISXoTjkwxjIL2cWztWn2Q.jpeg
create_time: 1733746706
edit_time: 1733749176
title: LOCKPASS密码管理器修改记录
categories:
  - product
---


# 1.  **2024/8月**

1. 程序更新机制(完成) <u>https://www.electron.build/auto-update</u> electron-builder的功能的确强大，做的很好，点赞
2. Linux 打包异常问题(完成) snap打包好像需要签名文件。 目前先把snap去掉。

```text
snapcraft internal error: NoKeyringError('No keyring found to store or retrieve credentials from.')
```

1. 覆盖安装不要把配置文件删除(完成) 之前为了开发方便，把程序生成的用户文件和配置放在应用程序当前目录。 但目前主流的做法是把这些配置文件放在系统划分的用户目录 windows下是%appdata% 这样的话，就不会有上面的问题了，因为配置和程序存储的位置分开了。 而且也不会有权限的问题。
2. 修改主密码(完成)
3. 切换语言(完成)
4. 跟随系统锁定(完成)
5. 开机自启动(完成)
6. 新加入的账号信息，快捷搜索不到
7. 快捷搜索的快捷键改成 ctrl+shift+q

# 2.  **2024/9/16**

1. 新增的一个密码后，页面要能选中该密码(完成)
2. 选中密码项时，选中项要居中(完成)
3. vault_item增加一个字段表示创建时间,兼容老版(完成)
4. 新增密码的弹窗，在点Outsize区域不要关掉(完成)
5. 锁定页面打开时应该定位到密码输入框(完成)
6. 增加软件窗口隐藏的快捷键ctrl+shift+down(完成)
7. 备份到阿里云盘时可以自定义名字(完成)
8. 可以删除阿里云盘的备份(完成)
9. 有修改没有备份时在窗口下方加个日志，或者项目右上角加个红点，表示有修改(完成)

<img src="/assets/W5RabHLzlo0ahuxeZzCcF03ZnMb.png" src-width="1030" class="markdown-img" src-height="626"/>

1. 密码库页面增加方向键控制和选中效果(完成)
2. 增加本地快捷键的映射ctrl+f ctrl+j(完成)
3. 自动输入时需要将输入法切成英文(完成)
4. 可以修改密码所属的保险库(完成)

<img src="/assets/VJh9bSVsYodBZbxR2Atcu4Qen8e.png" src-width="805" class="markdown-img" src-height="459"/>

1. 修改密码信息后，快捷搜索页没有更新(完成)
2. 增加密码时，选择密码类型也增加键盘方向控制(完成)

<img src="/assets/MpO8bMlLOoEFj9x2ACschVWxnyf.gif" src-width="896" class="markdown-img" src-height="506"/>

1. 优化软件更新逻辑(完成)

# 3.  **2024/9/18**

1. 解锁后软件的title不对(完成)
2. ctrl+f和ctrl+j优化（完成）

# 4.  **2024/9/19**

1. 第一次打开软件时，本地快捷键没有生效（终于重现了，原来是快捷键读取时没有转小写，已处理） 
2. 第一次启动默认语言读取系统语言(完成) 
3. ctrl+f和ctrl+J这种快捷键在ui中显示出来

# 5.  **2024/9/20**

1. 更新软件的描述显示优化

<img src="/assets/KPGQbwt6QowvmaxsYPdcbcmJnPg.png" src-width="380" class="markdown-img" src-height="255"/>

1. 参考mousetrap快捷键排除input输入，避免错误的快捷键检测 

<img src="/assets/YX7hbL59pozuBjxVOYgcr8LWn7e.png" src-width="746" class="markdown-img" src-height="268"/>

1. 新增一项后，显示的是空的(解决)

<img src="/assets/GYS1b4Whbo6EhzxfFhHcDz7ynqj.jpeg" src-width="724" class="markdown-img" src-height="533"/>

1. 快捷查看页面的快捷键失灵了(解决)

<img src="/assets/ILNRbMbM6o0sPWxubmWcBF1In3f.gif" src-width="1100" class="markdown-img" src-height="718"/>

1. 密码项显示创建时间，并按照时间排序(解决)

<img src="/assets/ZmGfblRN1oBxU3x1QHHceZ6pn5b.jpeg" src-width="649" class="markdown-img" src-height="541"/>

# 6.  **2024/9/24**

1. 窗口的大小缩放后可以记住(已完成)

<img src="/assets/HMM5bwzMToLqypxPCt1c05IJnRh.gif" src-width="978" class="markdown-img" src-height="658"/>

1. 快捷窗口每次打开要清除之前输入的内容(完成)
2. qq密码无法输入问题（完成） 原因是: 之前输入密码是使用unicode的方式，qq密码框有限制。 现在改成虚拟键盘的方式，改了一点robotjs的代码，只支持windows

<img src="/assets/KGYMbqLkSoJ9WRxTnvPcif1Anyf.gif" src-width="1588" class="markdown-img" src-height="782"/>

# 7.  **2024/9/29**

 **google drive 接入奇葩经历**

 **加了google api库后，脚本增加0.5M-&gt;17M，打包时间由1s-&gt;19s**

找到了官方的库：<u>https://github.com/googleapis/google-api-nodejs-client</u> 按照要求安装

```text
npm install googelapis
```

然后写了点代码，准备测试下，发现npm run dev变慢好多。 我还以为我电脑出问题了，把进程清了，再试，还是好慢，看了下输出 好家伙

```text
✓ 2845 modules transformed.
out/main/index.js 18,416.85 kB │ map: 32,444.83 kB
✓ built in 19.16s
```

vite 编译花了19s，这个main脚本有18M，好吓人。 我回看了一下修改记录，觉得除了加了一个google api的库，没有其它的。 我把google api这个库删除

```text
npm uninstall goolgeapi
```

再运行一下，果然，编译只用时1s,大小只有700k

```text
✓ 444 modules transformed.
out/main/index.js 741.03 kB │ map: 1,421.00 kB
✓ built in 1.16s
```

google你就不能把代码分几个模块啊，真是服了。

# 8.  **2024/9/30**

1. 窗口显示当前拉取的备份信息(完成)

<img src="/assets/AW2kbK9wDooqE7xyGQCcrtdDns8.png" src-width="760" class="markdown-img" src-height="130"/>

1. 云盘第一次登陆后，自动恢复请求(之前第一次操作网盘，会登录验证，然后需要再操作一次，现在不需要了)
2. 云盘操作时加加载圈效果(完成)
3. 软件内链接需要使用系统浏览器打开，现在是在软件内打开(完成)
4. 百度和goolge网盘备份功能(放弃)
5. 百度网盘创建应用需要企业，放弃
6. google api库太大了，不搞了,另外redirect url不支持deeplink

# 9.  **2024/10/7**

1. ctrl+f 后就不能ctrl+j了 原因：ctrl+f后焦点在input,导致快捷键不生效 处理：增加esc键的处理，当焦点在input时，esc可以取消input的foucus
2. 通过ctrl+1和ctrl+2来控制子窗口间切换
3. 然后可以通过键盘的上下来控制菜单 的移动

# 10.  **2024/10/11**

1. 快捷搜索窗口点esc关闭
2. 因为没有mac测试环境，程序正确性无法验证,打包只打windows包

# 11.  **2024/10/22**

1. 设置页面增加打开调试窗口功能

<img src="/assets/DBv2bWpwro4kOixDj1GcMoz0nEg.gif" src-width="968" class="markdown-img" src-height="766"/>

1. 设置页面增加开启日志功能

<img src="/assets/FoMQb2Jueo7jeIxjMdRcv5DBnIb.gif" src-width="982" class="markdown-img" src-height="744"/>

1. 备份网盘后，自动将还原点信息改成备份的信息

# 12.  **2024/10/25**

1. 处理window setsize异常报错的问题。会导致quick search窗口无法正常缩放

# 13.  **2024/11/2**

1. 多窗口时，自动输入时有问题。因为获取的坐标是错的。

# 14.  **2024/11/7**

1. 增加图片上传和加密功能(完成) 比如备份自己的身份证啊，或者银行卡图片之类的。

##　2024/11/21

1. 保险库太多了增加滚动区
2. 滚动条样式修改

<img src="/assets/YhtSbpsChoxFOMxqn1hccbd2nff.png" src-width="228" class="markdown-img" src-height="150"/>

1. 处理密码项的排序

# 15.  **2024/12/4**

1. 自动输入项目可配置 默认是账号密码全自动输入
2. 可以配置是否自动输入时，程序帮输入回车

<img src="/assets/SEiXb4s8xoiOkvxWea3cZ0Jinod.png" src-width="1260" class="markdown-img m-auto" src-height="631" align="center"/>

# 16.  **需要处理**

1. 支持头像图标的自定义上传

