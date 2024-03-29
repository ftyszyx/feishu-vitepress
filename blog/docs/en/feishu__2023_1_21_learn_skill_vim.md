---
title: 2014 NetEase front-end development written test questions notes
categories:
  -code
tags:
  - develop
cover: /assets/BQmfb4IfnohBwJx9Y4Wcjeienhg.png
create_time: 1676970303
---


# vim

<img src="/assets/NgRJblUKCo3KLBx0Zw1c1nFRn0b.png" src-width="932" src-height="610" align="center"/>

https://github.com/wsdjeg/Learn-Vim_zh_cn

vim:

https://vimdoc.sourceforge.net/htmldoc

# vim in Vscode

https://www.bilibili.com/video/BV1z541177Jy?p=6&vd_source=1cfe4f7c9bf04285f79b848e60f55aea

After installing the plug-in, copy the default configuration

<img src="/assets/boxcnGyPNkuXNSnCFqm0OUw1pbe.png" src-width="723" src-height="635" align="center"/>

## model

<img src="/assets/boxcnv6H6dU64NajYaJUN6wQwed.png" src-width="254" src-height="370" align="center"/>

### normal to insert

<img src="/assets/boxcnomR6fqIMTj7S7FpsZQnA8c.png" src-width="845" src-height="385" align="center"/>

### Insert to normal

<img src="/assets/boxcniLTuzNGJlYpsuC2VmYricf.png" src-width="860" src-height="148" align="center"/>

jj is related to settings

<img src="/assets/boxcn1l7I6OQ7qH33PoycMoaXEf.png" src-width="323" src-height="106" align="center"/>

### Normal to visual

<img src="/assets/boxcnhtXkw3qVrrGfjJ6J1IIowb.png" src-width="838" src-height="83" align="center"/>

<img src="/assets/boxcnD3GdHqxOIsKTbqXUKiy3fb.png" src-width="839" src-height="123" align="center"/>

### normal to command mode

<img src="/assets/boxcnDBPQfQEphMbUvF9Qp6L1tb.png" src-width="822" src-height="122" align="center"/>

## Cursor movement

All are normal mode

### Normal movement

<img src="/assets/boxcn0ZPu2ibBaWuflEVJRvNMlb.png" src-width="883" src-height="328" align="center"/>

### Word movement

<img src="/assets/boxcnyBAboJwUobMNzHJBMqRIQc.png" src-width="909" src-height="291" align="center"/>

### Row movement

<img src="/assets/boxcnKzs5UUtizc1h28ADftaTj4.png" src-width="585" src-height="345" align="center"/>

- `|` moves to the first character at the beginning of the line.

### Other moves

<img src="/assets/boxcnoFTPRhDcGmQf4gfSl5jpJ5.png" src-width="845" src-height="252" align="center"/>

- `ctrl-e` scrolls the screen down one line.
- `ctrl-y` scrolls the screen up one line.

<img src="/assets/MQpsba1yFoC0CXxE2qzcgMQtnNd.png" src-width="346" src-height="230" align="center"/>

<img src="/assets/boxcn2h1UtsnGVIeoJmHOMgE6bc.png" src-width="798" src-height="275" align="center"/>

## Find and replace

https://harttle.land/2016/08/08/vim-search-in-file.html

<img src="/assets/boxcnqjClccIkv4pd0TZYpYYAyc.png" src-width="749" src-height="360" align="center"/>

  


People always ask me if they can search in Vim, of course they can! And it’s a super powerful search! This article will introduce in detail the settings and usage related to search in Vim. Including find and replace, search for the word under the cursor, highlight foreground/background color, switch highlight status, case-sensitive search, etc.

## Find

Press `/` in normal mode to enter search mode, enter the string you want to find and press Enter. Vim will jump to the first match. Press `n` to find next, `N` to find previous.

Vim search supports regular expressions, for example `/vim$` matches `"vim"` at the end of a line. Need to find special characters that need to be escaped, for example `/vim\$` matches `"vim$"`.

> Note that `\n` should be used to find a carriage return, and `\r` should be used to replace a carriage return (equivalent to `<CR>`).

**Other search modes**

- `?` (Shift + `/`) to search up.
- `q/` View search history, select an item and press Enter to search again.
- `q?` View upward search history.

### Case sensitive search

Adding `\c` to the search mode means case-insensitive search, and `\C` means case-sensitive search. For example:

```
/foo\c
```

Will find all `"foo"`, `"FOO"`, `"Foo"` and other strings.

### Case sensitive configuration

Vim uses case-sensitive search by default. For convenience, we often configure it to be case-insensitive:

```
"Set the default case-insensitive search set ignorecase" If there is an uppercase letter, switch to case-sensitive search set smartcase
```

> Paste the above settings into your `~/.vimrc` and reopen Vim to take effect.

### Find the current word

In normal mode, press `*` to search for the word where the cursor is located. Each occurrence is required to be preceded and followed by blank characters or punctuation marks. For example, currently `foo` can match `foo` in `foo bar`, but cannot match `foo` in `foobar`. This is very useful when looking up function names and variable names.

Press `g*` to find the character sequence of the word where the cursor is located. There is no requirement for the characters before and after each occurrence. That is, both `foo bar` and `foo` in `foobar` can be matched.

### other settings

`:set incsearch` allows you to search while typing. Press Enter to move the cursor to the matching word; press Esc to cancel the search.

`:set wrapscan` is used to set whether to restart the search from the beginning of the file after reaching the end of the file.

## Find and replace

The `:s` (substitute) command is used to find and replace strings. The syntax is as follows:

```
:{scope}s/{target}/{replacement}/{replacement flag}
```

For example `:%s/foo/bar/g` will look for `foo` in the global scope (`%`) and replace it with `bar`, all occurrences of which will be replaced with `g`.

### Scope

The scope of effect is divided into current line, full text, selection, etc.

Current line:

```
:s/foo/bar/g
```

full text:

```
:%s/foo/bar/g
```

To select a selection, enter `:` after selecting the area in Visual mode, and Vim will automatically complete it as `:'<,'>`.

```
:'<,'>s/foo/bar/g
```

Lines 2-11:

```
:5,12s/foo/bar/g
```

The current line `.` and the next two lines `+2`:

```
:.,+2s/foo/bar/g
```

## Select (visual mode)

V:

ctrl+v block selection,

shift+v row selection

Press Shift + < again to move the code to the left; Shift + > to move the code to the right.

### Multi-line editing (ctrl+v) block selection

https://www.jianshu.com/p/50d5b6cfd73b

 

## Operator

The first letter is the action: c (modify) d (delete) y (copy) v select

The second is the range i (inside) a (including the boundary) t (from where to where)

followed by the boundary identifier ([

Then it will enter the insertion

normal mode

Press d and move the cursor to delete

dd deletes a line

cc cut a line

yyCopy a line

U means undo,

Ppaste

ctrl+r redo

<img src="/assets/boxcnsP0Kq9WZNzdBgKgiQJ9yZc.png" src-width="766" src-height="261" align="center"/>

<img src="/assets/boxcn6Oi7kiyYdzhf18wmWLeiEc.png" src-width="644" src-height="118" align="center"/>

di[ deletes all characters in a pair of []
di( deletes all characters in a pair of ()
di< deletes all characters in a pair of <>
di{ deletes all characters in a pair of {}
dit removes all characters inside a pair of HTML/XML tags
di" di' di` deletes all characters within a pair of quote characters (" or ' or `)

## Replacement pattern

http://yyq123.github.io/learn-vim/learn-vi-44-ReplaceMode.html

<img src="/assets/boxcn0egYf7Ygiot4USMQMrfagc.png" src-width="855" src-height="57" align="center"/>

## Surround mode

[VIM study notes Surround character editing (surround)](http://yyq123.github.io/learn-vim/learn-vim-plugin-surround.html)

<img src="/assets/boxcnQrvlULFMs64ptAEI29EOHe.png" src-width="980" src-height="253" align="center"/>

<img src="/assets/boxcnqFrJzzUO2BKTouAuaxYH0b.png" src-width="879" src-height="598" align="center"/>

<img src="/assets/boxcnaSLseOeyWVPrUX0P3cO6Pe.png" src-width="393" src-height="261" align="center"/>

## Case conversion

<img src="/assets/boxcnkGIxNPA9ZqZPARepVO4zgf.png" src-width="592" src-height="431" align="center"/>

## easymode

The leader is allocated with spaces

<img src="/assets/boxcnmQqrUDxH4PKVb9TDF3bvJe.png" src-width="208" src-height="27" align="center"/>

<img src="/assets/boxcnlfGyJuQFfUmoWnjlbYu4qc.png" src-width="640" src-height="551" align="center"/>

## Change sourround

<img src="/assets/boxcnpr7hcgItfgamg8AoI5vGrb.png" src-width="625" src-height="314" align="center"/>

## Multiple cursors

ctrl+d

## Command line mode [: enter]

n jump to which line

## Search pattern

https://harttle.land/2016/08/08/vim-search-in-file.html

Current line:

```json
:s/foo/bar/g
```

full text

```
:%s/foo/bar/g
```

To select a selection, enter `:` after selecting the area in Visual mode, and Vim will automatically complete it as `:'<,'>`.

```
:'<,'>s/foo/bar/g
```

Lines 2-11:

```
:5,12s/foo/bar/g
```

The current line `.` and the next two lines `+2`:

```
:.,+2s/foo/bar/g
```

### Replacement identifier

The `g` at the end of the command above is one of the replacement flags, indicating global `global` replacement (that is, replacing all occurrences of the target). There are many other useful replacement flags:

An empty replacement flag means that only the first occurrence of the target, starting at the cursor position, will be replaced:

```
:%s/foo/bar
```

`i` means case-insensitive search, `I` means case-sensitive search:

```
:%s/foo/bar/i
# Equivalent to \c (insensitive) or \C (sensitive) in pattern
:%s/foo\c/bar
```

`c` means confirmation is required, for example, the global search `"foo"` is replaced by `"bar"` and confirmation is required:

```
:%s/foo/bar/gc
```

 

## Macro

1. Position the cursor on the first line;

2. Enter qa in normal mode (of course you can also enter qb, qc, etc. Here a, b, c refer to the register name, vim will put the recorded macro in this register)

3. Under normal circumstances, the vim command line will display the words "Start recording". At this time, position the cursor on the first character (press 0 or |), then press x to delete, and press j to jump to the next line;

4. Enter q in normal mode to end macro recording.

Then 99@a uses macro 99 times

## Register

View all registers:

```json
:reg command
```

Use a register:

```json
<ctrl>r Add register name
```

 

Special register:

<table>
<colgroup>
<col width="100"/>
<col width="253"/>
</colgroup>
<tbody>
<tr><td><p>.</p></td><td><p>The last command executed</p></td></tr>
<tr><td><p><code>%</code></p></td><td><p>The path of the current file</p></td></tr>
<tr><td><p><code>:</code></p></td><td><p>The most recently executed command</p></td></tr>
<tr><td><p><code>#</code></p></td><td><p>Replace the name of the file, you can think of it as the most recently edited file</p ></td></tr>
</tbody>
</table>

#·Others

## Relative line number

Display the corresponding line number

Adding j and k to the number can correspond to the jump

  "editor.lineNumbers": "relative",

## Tab switch

Use `gt` to switch to the next Tab, `gT` to switch to the previous Tab, and `n+gt` to switch to the `n`th Tab. Of course, you can use the VS Code shortcut key `Alt+n` to switch to the `n`th Tab.

## Jump definition

Jump to definition ctrl+[

(Rewind and jump back)

Jump out ctrl+o

Jump into ctrl+i

Jump definition **gd**

Show definition tip **gh**

Switch tabs gt Which tab page g2ts

## Panel switching

Switch to the sidebar cmd+0

ctrl+~ open terminal

ctrl+P opens the command line panel

ctrl+r to view function list

## Cursor movement

Move the cursor to the middle of the screen zz

Move the cursor to the top of the screen zt

Move the cursor to the bottom of the screen zb

## Other jumps

https://www.jianshu.com/p/cbfa86c8d8a5

https://vim.fandom.com/wiki/Moving_to_matching_braces

https://vimdoc.sourceforge.net/htmldoc/motion.html#%

Select an entire function

ctrl+v, enter % at the beginning of the function

Copy and paste a function

```json
V%y
%pe
```

 [[ :beginning of module

]]: end of module

[{:Previous{Starts with

]}: next} end

[m:Previous function

]m: next function

<img src="/assets/Lvc6bqClQoUpIRxJByUcGrBMnId.png" src-width="700" src-height="248" align="center"/>

## Code comments

Code comment vsc uses operations similar to vim-commentary.
 Instructions:

- `gc` - Turn on or off comments. Enter `gcc` to turn on or off comments for a line of code, `gc2j` to turn on or off comments for two lines of code.
- `gC` - Block code comment. Enter `gCi)` to comment the code in brackets ().
 

## Other shortcut keys

shift+j connects two lines

## Input method switching

https://github.com/daipeihust/im-select

https://www.zhihu.com/question/303850876

### Window

Download imselect.exe

To view the current input method encoding, use gitbash

<img src="/assets/boxcnUNjLdKEOSd4HohcapJMVT7.png" src-width="856" src-height="469" align="center"/>

Get the input method encoding of English

<img src="/assets/boxcnAxwbJDlhWWH1pnfOvgnvtd.png" src-width="332" src-height="50" align="center"/>

switch english

<img src="/assets/boxcnbB5NBNKsJuE9fZnY32lG7g.png" src-width="314" src-height="34" align="center"/>

## Keymap

<img src="/assets/boxcnQpXYSmcqWMWqqE8sJM0j6c.png" src-width="787" src-height="459" align="center"/>

Paste

<img src="/assets/boxcn2W6A9WMuHsXgruMk5um6pb.png" src-width="561" src-height="106" align="center"/>

<img src="/assets/boxcnEgFj19gJlfLLWGJXzsSg3b.png" src-width="290" src-height="171" align="center"/>

## Code prompt selection

<img src="/assets/boxcnxGXQxkbIYIPBrr9pSEto5e.png" src-width="996" src-height="747" align="center"/>

I chose alt+j and alt+k

# Linux vim

set nu! "Display line number

# Some practical uses

## Copy a word

```json
yiwCopy this word
viw selects the word to be replaced
```

## Copy and paste a function

```json
V%y
%pe
```

## Switch to normal mode

```json
ctrl+[
```

## Cursor movement

<img src="/assets/FLifbvrqCofZdAx1y38c8IiFnoc.png" src-width="615" src-height="248" align="center"/>

## Insert:

<img src="/assets/JJ3VbMaVloGSBXxKfL8cf49hnOg.png" src-width="453" src-height="256" align="center"/>

## Operator plus command

<img src="/assets/DUJPbQXDsoEPHZxNydJcJxpDnBd.png" src-width="707" src-height="464" align="center"/>

Capital E, B, and W correspond to the beginning and end of the string. The string is separated by spaces.

## Code folding

**za: fold the current line**
**zM: Collapse all code**
**zR: Expand all codes**
**zc: Collapse the currently selected code block**

zo:**Expand the currently collapsed code block (only expand one level)**
**zO: Expand the currently collapsed code block (all)**

After folding, moving up and down does not automatically open the fold.

```text
"vim.foldfix": true
```