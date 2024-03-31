---
title: vim study notes
categories:
  - code
tags:
  - develop
cover: /assets/BQmfb4IfnohBwJx9Y4Wcjeienhg.png
create_time: 1676970303
---

# vim

<img src="/assets/NgRJblUKCo3KLBx0Zw1c1nFRn0b.png" src-width="932" src-height="610" align="center"/>
https://github.com/wsdjeg/Learn-Vim_zh_cn

Vim:

https://vimdoc.sourceforge.net/htmldoc

# Vscode vim

https://www.bilibili.com/video/BV1z541177Jy?p=6&vd_source=1cfe4f7c9bf04285f79b848e60f55aea

After installing the plug-in, copy the default configuration

<img src="/assets/boxcnGyPNkuXNSnCFqm0OUw1pbe.png" src-width="723" src-height="635" align="center"/>

## Patterns

<img src="/assets/boxcnv6H6dU64NajYaJUN6wQwed.png" src-width="254" src-height="370" align="center"/>

### normal to insert

<img src="/assets/boxcnomR6fqIMTj7S7FpsZQnA8c.png" src-width="845" src-height="385" align="center"/>

### Insert to normal

<img src="/assets/boxcniLTuzNGJlYpsuC2VmYricf.png" src-width="860" src-height="148" align="center"/>

jj has to do with the settings

<img src="/assets/boxcn1l7I6OQ7qH33PoycMoaXEf.png" src-width="323" src-height="106" align="center"/>

### Normal to visual

<img src="/assets/boxcnhtXkw3qVrrGfjJ6J1IIowb.png" src-width="838" src-height="83" align="center"/>

<img src="/assets/boxcnD3GdHqxOIsKTbqXUKiy3fb.png" src-width="839" src-height="123" align="center"/>

### normal to command mode

<img src="/assets/boxcnDBPQfQEphMbUvF9Qp6L1tb.png" src-width="822" src-height="122" align="center"/>

## Cursor movement

It's all normal mode

### Normal Move

<img src="/assets/boxcn0ZPu2ibBaWuflEVJRvNMlb.png" src-width="883" src-height="328" align="center"/>

### Word moves

<img src="/assets/boxcnyBAboJwUobMNzHJBMqRIQc.png" src-width="909" src-height="291" align="center"/>

### Row moves

<img src="/assets/boxcnKzs5UUtizc1h28ADftaTj4.png" src-width="585" src-height="345" align="center"/>

- '|' moves to the first character at the beginning of the line.

### Other moves

<img src="/assets/boxcnoFTPRhDcGmQf4gfSl5jpJ5.png" src-width="845" src-height="252" align="center"/>

- 'Ctrl-E' screen scrolls down one line.
- 'Ctrl-Y' screen scrolls up a line.

<img src="/assets/MQpsba1yFoC0CXxE2qzcgMQtnNd.png" src-width="346" src-height="230" align="center"/>

<img src="/assets/boxcn2h1UtsnGVIeoJmHOMgE6bc.png" src-width="798" src-height="275" align="center"/>

## Find and Replace

https://harttle.land/2016/08/08/vim-search-in-file.html

<img src="/assets/boxcnqjClccIkv4pd0TZYpYYAyc.png" src-width="749" src-height="360" align="center"/>
People always ask me if I can find it in Vim, and of course I can! And it's super strong! This article will take a closer look at the settings and usage methods of Vim. These include Find & Replace, Find Cursor Words, Highlight Foreground/Background Color, Toggle Highlight Status, Case Sensitive Lookup, and more.

## Find

Press '/' in normal mode to enter find mode, enter the string you want to find and press enter. Vim jumps to the first match. Press 'N' to find the next one and 'N' to find the previous one.

Vim lookup supports regular expressions, such as '/vim$' matching '''vim'' at the end of a line. You need to find special characters that need to be escaped, e.g. '/vim\$' matches ''vim$"'.

> Note that '\n' should be used to find carriage returns, and '\r' (equivalent to ''') should be used to replace carriage returns with carriage returns<CR>.

**Other Find Modes**

- '?' (Shift + '/') to look up.
- 'Q/' to view the search history, select one item and press enter to search again.
- 'q?' to view the lookup history.

### Case-sensitive lookups

Add '\c' to the lookup pattern for case-insensitive lookups and '\c' for case-sensitive lookups. For example:

```
/foo\c
```

All strings such as '''foo'', ''FOO'', ''Foo'' will be found.

### Case-sensitive configuration

Vim defaults to case-sensitive lookups, which we often configure to be case-insensitive:

```
Set IgnoreCase by default for case-insensitive lookup If there is an uppercase letter, switch to a case-sensitive lookup Set Smartcase
```

> Paste the above settings into your '~/.vimrc' and reopen Vim to take effect.

### Find the current word

Press '*' in normal mode to find the word where the cursor is located, and require white space characters or punctuation marks before and after each occurrence. For example, if it is currently 'foo', it can match the 'foo' in 'foo bar', but not the 'foo' in 'foobar'. This is useful when looking up function names, variable names.

Press 'g*' to find the character sequence of the word where the cursor is located, and there is no requirement for characters before and after each occurrence. That is, both 'foo bar' and 'foo' in 'foobar' can be matched.

### Other settings

':set incsearch' can search while pressing the key, press enter to move the cursor to the matching word; Press Esc to cancel the search.

':set wrapscan' is used to set whether to start the search again from the header of the file after reaching the end of the file.

## Find & Replace

The ':s' (substitute) command is used to find and replace strings. The syntax is as follows:

```
:{Scope}s/{target}/{Replace}/{Replace}/{Replace}
```

For example, ':%s/foo/bar/g' will look for 'foo' in the global scope ('%') and replace it with 'bar', and all occurrences will be replaced with ('g').

### Scope

The scope of action is divided into current line, full text, selection, and so on.

Current line:

```
:s/foo/bar/g
```

Full text:

```
:%s/foo/bar/g
```

Select the area, enter ':' after selecting the area in Visual mode, Vim will autocomplete to ':'<, '>'.

```
:'<,'>s/foo/bar/g
```

Lines 2-11:

```
:5,12s/foo/bar/g
```

The current line '.' and the next two lines '+2':

```
:.,+2s/foo/bar/g
```

## Checked (visual mode)

V:

Ctrl+V block selection,

Shift+V row selection

Press Shift + &lt; again to move the code to the left, and Shift + &gt; to move the code to the right

### Multi-line editing (Ctrl+V) block selection

https://www.jianshu.com/p/50d5b6cfd73b

## operator

The first letter is the action: C (Modify) D (Delete) Y (Copy) V is checked

The second is the range i (inside) a (contains the boundary) t (from where to where)

This is followed by the identifier of the boundary ( [

Then you will enter the insertion

normal mode

Press d to move the cursor to delete

dd to delete one line

cc cut a row

yy copy oneYes

U is undone,

P paste

ctrl+r redo

<img src="/assets/boxcnsP0Kq9WZNzdBgKgiQJ9yZc.png" src-width="766" src-height="261" align="center"/>

<img src="/assets/boxcn6Oi7kiyYdzhf18wmWLeiEc.png" src-width="644" src-height="118" align="center"/>
di[ removes all characters from a pair of [].
di( removes all characters in a pair ().
di&lt; removes all characters from a pair of &lt;&gt;
di{ removes all characters in a pair of {}
dit removes all characters inside a pair of HTML/XML tags
di" di' di' removes all characters in a pair of quotation mark characters (" or ' or ').

## Replace mode

http://yyq123.github.io/learn-vim/learn-vi-44-ReplaceMode.html

<img src="/assets/boxcn0egYf7Ygiot4USMQMrfagc.png" src-width="855" src-height="57" align="center"/>

## Surround mode

[VIM Study Notes: Surround] (http://yyq123.github.io/learn-vim/learn-vim-plugin-surround.html)

<img src="/assets/boxcnQrvlULFMs64ptAEI29EOHe.png" src-width="980" src-height="253" align="center"/>

<img src="/assets/boxcnqFrJzzUO2BKTouAuaxYH0b.png" src-width="879" src-height="598" align="center"/>

<img src="/assets/boxcnaSLseOeyWVPrUX0P3cO6Pe.png" src-width="393" src-height="261" align="center"/>

## Case conversion

<img src="/assets/boxcnkGIxNPA9ZqZPARepVO4zgf.png" src-width="592" src-height="431" align="center"/>

## easymode

The leader is equipped with a space

<img src="/assets/boxcnmQqrUDxH4PKVb9TDF3bvJe.png" src-width="208" src-height="27" align="center"/>

<img src="/assets/boxcnlfGyJuQFfUmoWnjlbYu4qc.png" src-width="640" src-height="551" align="center"/>

## Change sourround

<img src="/assets/boxcnpr7hcgItfgamg8AoI5vGrb.png" src-width="625" src-height="314" align="center"/>
## Multiple cursors

ctrl+d

## Command Line Mode [:Enter]

n Skip to the first row

## Find Patterns

https://harttle.land/2016/08/08/vim-search-in-file.html

Current line:  

```json
:s/foo/bar/g
```

full text

```
:%s/foo/bar/g
```

Select the area, enter ':' after selecting the area in Visual mode, Vim will autocomplete to ':'<, '>'.

```
:'<,'>s/foo/bar/g
```

Lines 2-11:

```
:5,12s/foo/bar/g
```

The current line '.' and the next two lines '+2':

```
:.,+2s/foo/bar/g
```

### Replace the marker

The 'g' at the end of the command above is one of the substitution flags, representing the global 'global' substitution (i.e., all occurrences of the substitution target). There are a lot of other useful replacement flags:

The empty replacement flag indicates that only the first occurrence of the target is replaced from the cursor position:

```
:%s/foo/bar
```

'i' for case-insensitive lookups, and 'i' for case-sensitive:

```
:%s/foo/bar/i
# Equivalent to \c (insensitive) or \c (sensitive) in the pattern
:%s/foo\c/bar
```

'c' indicates that confirmation is required, e.g. global lookup '''foo'' is replaced with '''bar'' and confirmation:

```
:%s/foo/bar/gc
```

## Macros

1. Position the cursor on the first line;

2. Enter qa in normal mode (of course, you can also enter qb, qc, etc, where a, b, c refers to the register name, vim will put the recorded macro in this register) 

3. Under normal circumstances, the command line of vim will display the words "start recording", at this time, position the cursor to the first character (press 0 or |), then press x to delete, press j to jump to the next line;

4.Enter Q in normal mode to end macro recording.

Then 99@a use the macro 99 times

## Registers

View all registers: 

```json
:reg command
```

Use a register:

```json
<ctrl>r plus the name of the register
```

Special Registers:

<table>
<colgroup>
<col width="100"/>
<col width="253"/>
</colgroup>
<tbody>
<tr><td><p>.</p></td><td><p>The last executed command</p></td></tr>
<tr><td><p><code>%</code></p></td><td><p>The path to the current file</p></td></tr>
<tr><td><p><code>: The</code></p></td> <td><p>most recent command executed</p></td></tr>
<tr><td><p><code>#</code></p></td> <td><p>Replace the name of the file, you can think of it as the most recently edited file</p></td></tr>
</tbody>
</table>

# Miscellaneous

## Relative line number

Displays the corresponding line number for The number plus J and K can correspond to jumps

"editor.lineNumbers": "relative",

## Tab toggle

Use 'gt' to switch to the next tab, 'gT' to switch to the previous tab, and 'n+gt' to go to the n' tab. Of course, you can use the VS Code shortcut 'Alt+n' to switch to the 'n' tab.

## Jump definition 

Jump definition ctrl+[

(Fallback & Jump)

Jump out of Ctrl+O

Jump into Ctrl+I

Jump Definition **gd**

Show Definition tip **gh**

Toggle tab gt tab g2ts

## Panel toggle

Switch to the sidebar cmd+0

Ctrl+~ to open the terminal

ctrl+P to open the command line panel 

Ctrl+r to view the list of functions 

## Cursor movement

Move the cursor to zz in the middle of the screen

Move the cursor to zt at the top of the screen

Move the cursor to the bottom of the screen, zb

## Other redirects

https://www.jianshu.com/p/cbfa86c8d8a5

https://vim.fandom.com/wiki/Moving_to_matching_braces

https://vimdoc.sourceforge.net/htmldoc/motion.html#%

Select an entire function

Ctrl+V, at the beginning of the function, enter %

Copy and paste a piece of function

```json
V%y
%pe
```

[[ : The beginning of the module.]

]]: The end of the module

[{:Previous { prefix.] 

]}: Next} end

[m: Previous function.]

m: the next function

<img src="/assets/Lvc6bqClQoUpIRxJByUcGrBMnId.png" src-width="700" src-height="248" align="center"/>
## Code comments

Code Comment VSC uses something like vim-commentary.
 How to Use:

- 'gc' - turns annotations on or off.  Enter 'gcc' to turn on or off a line of comments, and 'gc2j' to turn on or off two lines of comments.
- 'gC' - Block code comment.Enter 'gCi)' comment code in parentheses ().
 
## Other shortcuts

Shift+J joins the two lines

## Input method switching

https://github.com/daipeihust/im-select

https://www.zhihu.com/question/303850876 

### Window

Download imselect.exe

To view the current input method encoding, you need to use gitbash

<img src="/assets/boxcnUNjLdKEOSd4HohcapJMVT7.png" src-width="856" src-height="469" align="center"/>

Get the input method encoding in English

<img src="/assets/boxcnAxwbJDlhWWH1pnfOvgnvtd.png" src-width="332" src-height="50" align="center"/>

Toggle English

<img src="/assets/boxcnbB5NBNKsJuE9fZnY32lG7g.png" src-width="314" src-height="34" align="center"/>

## Keymapping

<img src="/assets/boxcnQpXYSmcqWMWqqE8sJM0j6c.png" src-width="787" src-height="459" align="center"/>

stickup

<img src="/assets/boxcn2W6A9WMuHsXgruMk5um6pb.png" src-width="561" src-height="106" align="center"/>

<img src="/assets/boxcnEgFj19gJlfLLWGJXzsSg3b.png" src-width="290" src-height="171" align="center"/>

## Selection of code hints

<img src="/assets/boxcnxGXQxkbIYIPBrr9pSEto5e.png" src-width="996" src-height="747" align="center"/>
I chose alt+j and alt+k

# Linux vim

set nu!                                    displays the line number

# Some practical usage

## Copy a word

```json
yiw copy the word
viw to select the word to be replaced
```

## Copy and paste a piece of function

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
Uppercase E, B, and W correspond to the beginning and end of the string, and the string is separated by a space

## Code folding

**za: Collapse current row**
**zM: Collapse All Code**
**zR: Expand all code**
**zc: Collapse the currently selected code block**

zo: **Expand the currently collapsed block of code (expand only one layer)**
zO: Expand the currently collapsed block of code (all)

Moving up and down after folding does not automatically open the fold

```text
"vim.foldfix": true
```