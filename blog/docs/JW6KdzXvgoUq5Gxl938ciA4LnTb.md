---
title: vim学习笔记
tags:
  - develop
cover: /assets/FDpIbhSbsoYQLoxGRO2c2w0ZnFh.jpeg
create_time: 1676970303
edit_time: 1749479254
categories:
  - skill
---


参考文档:

https://github.com/wsdjeg/Learn-Vim_zh_cn

https://vimdoc.sourceforge.net/htmldoc

https://vim.nauxscript.com/

# 1. Ideavim

https://github.com/JetBrains/ideavim

ctrl+shift +/ 注释

# 2. Visual studio中的vim

使用插件https://github.com/VsVim

配置文件说明文档：

https://github.com/VsVim/VsVim/wiki/Settings-Reference

## 2.1 查看本地的配置文件：

```yaml
:set
```

<img src="/assets/AKbUbQkfloooOUxbCm5cp0iFnqS.png" src-width="578" class="markdown-img m-auto" src-height="203" align="center"/>

## 2.2 vim中的粘贴板和系统粘贴板共用：

```
:set clipboard=unnamed
```

## 2.3 切换选项卡

```yaml
上一个
Ctrl+Alt+PgUp  or  Ctrl+PgUp
下一个
Ctrl+Alt+PgDown  or  Ctrl+PgDown
```

## 2.4 快速格式化

ctrl+K ctrl+d

<img src="/assets/MRSKbulGSoCE0qxtTDHchHunnZo.png" src-width="391" class="markdown-img m-auto" src-height="56" align="center"/>

注释  ctrl+k  ctrl+/

## 2.5 快捷键

选中一个段落  vsp

上一个段落 shift+[

下一个段落 shift+]

打开文档大纲：ctrl+alt+t  (视图-》其它窗口-》文档大纲 ）

# 3. Vscode&Unity

## 3.1 只显示cs

```json
"files.exclude":{
 "**/*.meta": true,
}
```

## 3.2 中文乱码

```json
"files.encoding": "gb2312",
```

## 3.3 代码自动格式化

```json
"[csharp]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "ms-dotnettools.csharp", 
  }
```

# 4. Vscode 中vim

https://www.bilibili.com/video/BV1z541177Jy?p=6&vd_source=1cfe4f7c9bf04285f79b848e60f55aea

安装好插件后，拷贝默认配置

<img src="/assets/boxcnGyPNkuXNSnCFqm0OUw1pbe.png" src-width="723" class="markdown-img m-auto" src-height="635" align="center"/>

## 4.1 模式

<img src="/assets/boxcnv6H6dU64NajYaJUN6wQwed.png" src-width="254" class="markdown-img m-auto" src-height="370" align="center"/>

### 4.1.1 normal转insert

<img src="/assets/boxcnomR6fqIMTj7S7FpsZQnA8c.png" src-width="845" class="markdown-img m-auto" src-height="385" align="center"/>

### 4.1.2 Insert to normal

<img src="/assets/boxcniLTuzNGJlYpsuC2VmYricf.png" src-width="860" class="markdown-img m-auto" src-height="148" align="center"/>

jj和设置有关

<img src="/assets/boxcn1l7I6OQ7qH33PoycMoaXEf.png" src-width="323" class="markdown-img m-auto" src-height="106" align="center"/>

### 4.1.3 Normal 转visual

<img src="/assets/boxcnhtXkw3qVrrGfjJ6J1IIowb.png" src-width="838" class="markdown-img m-auto" src-height="83" align="center"/>

<img src="/assets/boxcnD3GdHqxOIsKTbqXUKiy3fb.png" src-width="839" class="markdown-img m-auto" src-height="123" align="center"/>

### 4.1.4 normal转命令模式

<img src="/assets/boxcnDBPQfQEphMbUvF9Qp6L1tb.png" src-width="822" class="markdown-img m-auto" src-height="122" align="center"/>

## 4.2 光标移动

都是normal模式

### 4.2.1 普通移动

<img src="/assets/boxcn0ZPu2ibBaWuflEVJRvNMlb.png" src-width="883" class="markdown-img m-auto" src-height="328" align="center"/>

### 4.2.2 单词移动

<img src="/assets/boxcnyBAboJwUobMNzHJBMqRIQc.png" src-width="909" class="markdown-img m-auto" src-height="291" align="center"/>

### 4.2.3 行移动

<img src="/assets/boxcnKzs5UUtizc1h28ADftaTj4.png" src-width="585" class="markdown-img m-auto" src-height="345" align="center"/>

- `|` 移动到行首第一个字符。

### 4.2.4 其它移动

<img src="/assets/Bd8yb2E7Roodgxx8F3mcwi5znLg.png" src-width="760" class="markdown-img m-auto" src-height="704" align="center"/>

<img src="/assets/MQpsba1yFoC0CXxE2qzcgMQtnNd.png" src-width="346" class="markdown-img m-auto" src-height="230" align="center"/>

<img src="/assets/boxcn2h1UtsnGVIeoJmHOMgE6bc.png" src-width="798" class="markdown-img m-auto" src-height="275" align="center"/>

## 4.3 查找替换

https://harttle.land/2016/08/08/vim-search-in-file.html

<img src="/assets/boxcnqjClccIkv4pd0TZYpYYAyc.png" src-width="749" class="markdown-img m-auto" src-height="360" align="center"/>

  


总有人问我 Vim 中能不能查找，当然能！而且是超级强的查找！ 这篇文章来详细介绍 Vim 中查找相关的设置和使用方法。 包括查找与替换、查找光标所在词、高亮前景/背景色、切换高亮状态、大小写敏感查找等。

## 4.4 查找

```yaml
在 normal 模式下按下 / 即可进入查找模式，输入要查找的字符串并按下回车。 Vim 会跳转到第一个匹配。按下 n 查找下一个，按下 N 查找上一个。
Vim 查找支持正则表达式，例如 /vim$ 匹配行尾的 "vim"。 需要查找特殊字符需要转义，例如 /vim\$ 匹配 "vim$"。
```

 **其他查找模式**

- `?`（按住 Shift + `/`）往上查找。
- `q/` 查看查找历史，选中一项后回车可以重新查找。
- `q?` 查看向上查找历史。

### 4.4.1 大小写敏感查找

在查找模式中加入 `\c` 表示大小写不敏感查找，`\C` 表示大小写敏感查找。例如：

```
/foo\c
```

将会查找所有的 `"foo"`, `"FOO"`, `"Foo"` 等字符串。

### 4.4.2 大小写敏感配置

Vim 默认采用大小写敏感的查找，为了方便我们常常将其配置为大小写不敏感：

```
" 设置默认进行大小写不敏感查找set ignorecase" 如果有一个大写字母，则切换到大小写敏感查找set smartcase
```

> 将上述设置粘贴到你的 `~/.vimrc`，重新打开 Vim 即可生效。

### 4.4.3 查找当前单词

在 normal 模式下按下 `*` 即可查找光标所在单词（word）， 要求每次出现的前后为空白字符或标点符号。例如当前为 `foo`， 可以匹配 `foo bar` 中的 `foo`，但不可匹配 `foobar` 中的 `foo`。 这在查找函数名、变量名时非常有用。

按下 `g*` 即可查找光标所在单词的字符序列，每次出现前后字符无要求。 即 `foo bar` 和 `foobar` 中的 `foo` 均可被匹配到。

### 4.4.4 其他设置

`:set incsearch` 可以在敲键的同时搜索，按下回车把移动光标移动到匹配的词； 按下 Esc 取消搜索。

`:set wrapscan` 用来设置到文件尾部后是否重新从文件头开始搜索。

## 4.5 查找与替换

`:s`（substitute）命令用来查找和替换字符串。语法如下：

```
:{作用范围}s/{目标}/{替换}/{替换标志}
```

例如 `:%s/foo/bar/g` 会在全局范围(`%`)查找 `foo` 并替换为 `bar`，所有出现都会被替换（`g`）。

### 4.5.1 作用范围

作用范围分为当前行、全文、选区等等。

当前行：

```
:s/foo/bar/g
```

全文：

```
:%s/foo/bar/g
```

选区，在 Visual 模式下选择区域后输入 `:`，Vim 即可自动补全为 `:'<,'>`。

```
:'<,'>s/foo/bar/g
```

2-11 行：

```
:5,12s/foo/bar/g
```

当前行 `.` 与接下来两行 `+2`：

```
:.,+2s/foo/bar/g
```

## 4.6 选中（visual模式）

V:

ctrl+v块选择  ，

shift+v 行选择

再按 Shift + &lt; ，这是将代码往左移动的；Shift + &gt; 是将代码往右边移动的

### 4.6.1 多行编辑（ctrl+v)块选择

https://www.jianshu.com/p/50d5b6cfd73b

 

## 4.7 操作符

第一个字母是动作：c(修改） d（删除） y（复制）v选中

第二个是范围 i (里面） a(包含边界） t(从哪到哪）

后面是边界的标识符 （ [

然后就会进入插入

normal模式

按d配合光标的移动来删除

dd删除一行

cc剪切一行

yy复制一行

U是撤销，

P粘贴

ctrl+r redo

<img src="/assets/boxcnsP0Kq9WZNzdBgKgiQJ9yZc.png" src-width="766" class="markdown-img m-auto" src-height="261" align="center"/>

<img src="/assets/boxcn6Oi7kiyYdzhf18wmWLeiEc.png" src-width="644" class="markdown-img m-auto" src-height="118" align="center"/>

```yaml
di[ 删除一对 [] 中的所有字符
di( 删除一对 () 中的所有字符
di< 删除一对 <> 中的所有字符
di{ 删除一对 {} 中的所有字符
dit 删除一对 HTML/XML 的标签内部的所有字符
di"  di'  di 删除一对引号字符 (" 或 ' 或 ) 中所有字符
```

## 4.8 替换模式

http://yyq123.github.io/learn-vim/learn-vi-44-ReplaceMode.html

<img src="/assets/boxcn0egYf7Ygiot4USMQMrfagc.png" src-width="855" class="markdown-img m-auto" src-height="57" align="center"/>

## 4.9 环绕模式

[VIM学习笔记 环绕字符编辑(surround)](http://yyq123.github.io/learn-vim/learn-vim-plugin-surround.html)

<img src="/assets/boxcnQrvlULFMs64ptAEI29EOHe.png" src-width="980" class="markdown-img m-auto" src-height="253" align="center"/>

<img src="/assets/boxcnqFrJzzUO2BKTouAuaxYH0b.png" src-width="879" class="markdown-img m-auto" src-height="598" align="center"/>

<img src="/assets/boxcnaSLseOeyWVPrUX0P3cO6Pe.png" src-width="393" class="markdown-img m-auto" src-height="261" align="center"/>

## 4.10 大小写转换

<img src="/assets/boxcnkGIxNPA9ZqZPARepVO4zgf.png" src-width="592" class="markdown-img m-auto" src-height="431" align="center"/>

## 4.11 easymode

leader配的是空格

<img src="/assets/boxcnmQqrUDxH4PKVb9TDF3bvJe.png" src-width="208" class="markdown-img m-auto" src-height="27" align="center"/>

<img src="/assets/boxcnlfGyJuQFfUmoWnjlbYu4qc.png" src-width="640" class="markdown-img m-auto" src-height="551" align="center"/>

## 4.12 Change sourround

<img src="/assets/boxcnpr7hcgItfgamg8AoI5vGrb.png" src-width="625" class="markdown-img m-auto" src-height="314" align="center"/>

`cst<p>` replaces whole tag, while `cst<p` (without closing bracket) keeps attributes.

## 4.13 多光标

ctrl+d

## 4.14 命令行模式 【：进入]

n   跳转到第几行

## 4.15 查找模式

https://harttle.land/2016/08/08/vim-search-in-file.html

当前行：  

```json
:s/foo/bar/g
```

全文

```
:%s/foo/bar/g
```

选区，在 Visual 模式下选择区域后输入 `:`，Vim 即可自动补全为 `:'<,'>`。

```
:'<,'>s/foo/bar/g
```

2-11 行：

```
:5,12s/foo/bar/g
```

当前行 `.` 与接下来两行 `+2`：

```
:.,+2s/foo/bar/g
```

### 4.15.1 替换标志符

上文中命令结尾的 `g` 即是替换标志之一，表示全局 `global` 替换（即替换目标的所有出现）。 还有很多其他有用的替换标志：

空替换标志表示只替换从光标位置开始，目标的第一次出现：

```
:%s/foo/bar
```

`i` 表示大小写不敏感查找，`I` 表示大小写敏感：

```
:%s/foo/bar/i
# 等效于模式中的\c（不敏感）或\C（敏感）
:%s/foo\c/bar
```

`c` 表示需要确认，例如全局查找 `"foo"` 替换为 `"bar"` 并且需要确认：

```
:%s/foo/bar/gc
```

 

## 4.16 宏

1.把光标定位在第一行；

2.在normal模式下输入qa(当然也可以输入qb, qc, etc，这里的a, b, c是指寄存器名称，vim会把录制好的宏放在这个寄存器中) 

3.正常情况下，vim的命令行会显示“开始录制”的字样，这时候，把光标定位到第一个字符（按0或者|），再按x删除，按j跳到下一行；

4.normal模式下输入q，结束宏录制。

然后99@a 使用宏99次

## 4.17 寄存器

查看所有寄存器： 

```json
:reg 命令
```

使用某个寄存器  ：

```json
<ctrl>r 加寄存器的名字
```

 

特殊寄存器：

<table>
<colgroup>
<col width="100"/>
<col width="253"/>
</colgroup>
<tbody>
<tr><td><p>.</p></td><td><p>最后执行的命令</p></td></tr>
<tr><td><p><code>%</code></p></td><td><p>当前文件的路径</p></td></tr>
<tr><td><p><code>:</code></p></td><td><p>最近一次执行的命令</p></td></tr>
<tr><td><p><code>#</code></p></td><td><p>替换文件的名字，你可以把它想象成最近一次编辑的文件</p></td></tr>
</tbody>
</table>

# 5. 其它

## 5.1 相对行号

显示对应 的行号

数字加j,k可以对应跳转

  "editor.lineNumbers": "relative",

## 5.2 Tab切换

使用 `gt` 切换至下一个 Tab，`gT` 切换至上一个 Tab，使用 `n+gt` 切换至第 `n` 个 Tab。当然，你可以使用 VS Code 的快捷键 `Alt+n` 切换至第 `n` 个 Tab。

## 5.3 跳转定义 

跳转定义 ctrl+[

(回退和跳回）

跳出ctrl+o

跳入ctrl+i

跳转定义  **gd**

显示定义tip  **gh**

切换标签  gt  第几个标签页 g2ts

```json
" 跳转相关
gd          " 跳转到定义
Ctrl+o      " 返回上一个位置  
Ctrl+i      " 前进到下一个位置

" 搜索相关
*           " 搜索光标下的单词
#           " 反向搜索光标下的单词
n           " 下一个搜索结果
N           " 上一个搜索结果

" Python函数导航
[m          " 上一个方法
]m          " 下一个方法
[{          " 当前代码块开始
]}          " 当前代码块结束
```

" 搜索相关

-           " 搜索光标下的单词

# 6. " 反向搜索光标下的单词

n           " 下一个搜索结果

N           " 上一个搜索结果

" Python函数导航

[m          " 上一个方法

]m          " 下一个方法

[{          " 当前代码块开始

]}          " 当前代码块结束

## 6.1 面板切换

切到侧边栏 cmd+0

ctrl+~ 打开终端

ctrl+P打开命令行面板 

ctrl+r查看函数列表 

## 6.2 光标移动

将光标移到屏幕中间 zz

将光标移到屏幕上边 zt

将光标移到屏幕下边 zb

## 6.3 其它跳转

https://www.jianshu.com/p/cbfa86c8d8a5

https://vim.fandom.com/wiki/Moving_to_matching_braces

https://vimdoc.sourceforge.net/htmldoc/motion.html#%

选中一整个函数

ctrl+v，在函数开始地方，输入%

复制并粘贴一段函数

```json
V%y
%pe
```

 [[ :模块的开头

]]：模块的结尾

[{:上一个{开头 

]}：下一个}结尾

[m:上一个函数

]m:下一个函数

<img src="/assets/Lvc6bqClQoUpIRxJByUcGrBMnId.png" src-width="700" class="markdown-img m-auto" src-height="248" align="center"/>

## 6.4 代码注释

代码注释vsc使用了类似vim-commentary的操作。
 使用方法:

- `gc` - 打开或关闭注释.  输入 `gcc` 打开或关闭某一行代码注释，   `gc2j`  打开或关闭两行代码注释。
- `gC` - 块代码注释.输入 `gCi)` 注释 括号()中的代码。
 

## 6.5 其它快捷键

shift+j 连接两行

## 6.6 输入法切换

https://github.com/daipeihust/im-select

https://www.zhihu.com/question/303850876 

### 6.6.1 Window

下载imselect.exe

查看当前输入法编码，要用gitbash

<img src="/assets/boxcnUNjLdKEOSd4HohcapJMVT7.png" src-width="856" class="markdown-img m-auto" src-height="469" align="center"/>

获取英语的输入法编码

<img src="/assets/boxcnAxwbJDlhWWH1pnfOvgnvtd.png" src-width="332" class="markdown-img m-auto" src-height="50" align="center"/>

切换英语

<img src="/assets/boxcnbB5NBNKsJuE9fZnY32lG7g.png" src-width="314" class="markdown-img m-auto" src-height="34" align="center"/>

## 6.7 键盘映射

<img src="/assets/boxcnQpXYSmcqWMWqqE8sJM0j6c.png" src-width="787" class="markdown-img m-auto" src-height="459" align="center"/>

粘贴

<img src="/assets/boxcn2W6A9WMuHsXgruMk5um6pb.png" src-width="561" class="markdown-img m-auto" src-height="106" align="center"/>

<img src="/assets/boxcnEgFj19gJlfLLWGJXzsSg3b.png" src-width="290" class="markdown-img m-auto" src-height="171" align="center"/>

## 6.8 代码提示的选择

<img src="/assets/boxcnxGXQxkbIYIPBrr9pSEto5e.png" src-width="996" class="markdown-img m-auto" src-height="747" align="center"/>

我选择了alt+j和alt+k

# 7. Linux vim

set nu!                                    "显示行号

# 8. 一些实际用法

## 8.1 复制一个单词

```json
yiw复制这个单词
viw选中要被替换的单词
```

## 8.2 复制并粘贴一段函数

```json
V%y
%pe
```

## 8.3 切换到normal模式

```json
ctrl+[
```

## 8.4 光标移动

<img src="/assets/FLifbvrqCofZdAx1y38c8IiFnoc.png" src-width="615" class="markdown-img m-auto" src-height="248" align="center"/>

## 8.5 插入：

<img src="/assets/JJ3VbMaVloGSBXxKfL8cf49hnOg.png" src-width="453" class="markdown-img m-auto" src-height="256" align="center"/>

## 8.6 操作符加命令

<img src="/assets/DUJPbQXDsoEPHZxNydJcJxpDnBd.png" src-width="707" class="markdown-img m-auto" src-height="464" align="center"/>

大写的E,B,W对应字串的开头和结尾  字串以空格分开

## 8.7 代码折叠

 **za: 折叠当前行**
 **zM: 折叠所有代码**
 **zR: 展开所有代码**
 **zc: 折叠当前选中的代码块**

zo: **展开当前折叠的代码块（只展开一层）**
 **zO: 展开当前折叠的代码块(全部）**

折叠后上下移动不自动打开折叠

```text
"vim.foldfix": true
```

## 8.8 代码缩进

 **每次缩进一层**

v，然后方向键 ←→↑↓ 选择要缩进的行（这儿选中第 2、3 行），最后摁下 Shift + &gt; （或者 Shift + &lt; ）进行左右缩进

 **快速对齐**

者 v，然后方向键 ←→↑↓ 选择要缩进的行（这儿选中第 2、3 行），最后摁下 = 与第一行对齐缩进

  **注意：所有选中行与选择区域的上一行进行对齐缩进（各个行的实际缩进长度并不一致）。**

## 8.9 Linux ctrl+q退出vim锁住的模式

# 9. neovim

https://github.com/neovim

## 9.1 源码安装

```bash
https://hub.gitmirror.com/https://github.com/neovim/neovim/archive/refs/tags/nightly.tar.gz
https://ghproxy.com/https://github.com/neovim/neovim/archive/refs/tags/nightly.tar.gz
```

```bash
make CMAKE_BUILD_TYPE=RelWithDebInfo
sudo make install
```

## 9.2 brew安装

```bash
brew install neovim
```

启动

```bash
nvim
```

## 9.3 安装lazyvim

https://www.lazyvim.org/

```bash
git clone https://github.com/LazyVim/starter ~/.config/nvim
rm -rf ~/.config/nvim/.git
nvim
```

国内的话，安装过程最好设置Github 代理

https://ghfast.top/

```bash
git config --global url."https://mirror.ghproxy.com/https://github.com/".insteadof "[https://ghfast.top](https://ghfast.top/)"
```

取消

```bash
git config --list
git config --global --unset url.https://mirror.ghproxy.com/https://github.com/.insteadof
```

## 9.4 打开工程

```bash
nvim .
```

## 9.5 处理乱码

安装字体

www.nerdfonts.com下载

安装这个吧

<img src="/assets/F4fOb0KjFoCA9cxTdZqc6oGXn8b.png" src-width="625" class="markdown-img m-auto" src-height="350" align="center"/>

Wget https://github.com/ryanoasis/nerd-fonts/releases/download/v3.3.0/0xProto.zip

### 9.5.1 linux:

```bash
sudo mkdir /usr/share/fonts/MyFonts
sudo cp ~/Downloads/MyFont.ttf /usr/share/fonts/MyFonts/
sudo fc-cache -f -v
```

只给自己安装

```bash
mkdir ~/.fonts
cp ~/Downloads/MyFont.ttf ~/.fonts/
fc-cache -f -v
```

### 9.5.2 设置终端字体

<img src="/assets/JHYIbkThaoKtvSxRikxcPsfpnJf.png" src-width="280" class="markdown-img m-auto" src-height="60" align="center"/>

<img src="/assets/OCrLbY1RyoGTtDx3n28cMR6snIc.png" src-width="1607" class="markdown-img m-auto" src-height="708" align="center"/>

## 9.6 一些快捷键

<table>
<colgroup>
<col width="285"/>
<col width="573"/>
</colgroup>
<tbody>
<tr><td><p>ctrl+/ </p></td><td><p>打开命令行</p></td></tr>
<tr><td><p>ctrl+ hljk</p></td><td><p>窗口移动</p></td></tr>
<tr><td><p>shift+h</p></td><td><p>显示（隐藏文件）</p></td></tr>
<tr><td><p>shift+hl</p></td><td><p>左右切换tap</p></td></tr>
<tr><td><p>空格</p></td><td><p>会弹出提示窗口</p></td></tr>
<tr><td><p>空格 b d</p></td><td><p>关闭tab</p></td></tr>
<tr><td><p>Qa </p></td><td><p>退出</p></td></tr>
<tr><td><p>:lazyExtras</p></td><td><p>打开扩展页面（选择要安装的扩展，重新启动才会安装）</p></td></tr>
<tr><td></td><td></td></tr>
</tbody>
</table>

 

 

 

 

 

