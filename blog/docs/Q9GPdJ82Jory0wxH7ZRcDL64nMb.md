---
create_time: 1712148492
edit_time: 1751879415
title: Innosetup
categories:
  - skill
---


介绍了使用 Inno Setup 制作安装程序的方法,  安装程序的界面 支持多语言

# 1. 下载 Inno Setup

官网: https://jrsoftware.org/isinfo.php

本文以最新版本 6.2.2 为例

# 2. 新建安装程序脚本

<img src="/assets/H3uwbxptMojUkXxNGvLcOY8VnNv.png" src-width="243" class="markdown-img m-auto" src-height="91" align="center"/>

<img src="/assets/JQM8bYlKAoeVm6xEp6gcm84Qn3Q.png" src-width="559" class="markdown-img m-auto" src-height="435" align="center"/>

选择要打包的程序文件

<img src="/assets/C1yOb68zjontcOxNfl1cwJqcnwf.png" src-width="578" class="markdown-img m-auto" src-height="389" align="center"/>

<img src="/assets/A4Yxb0xtQoXiX9xv2pOcwBBVnwg.png" src-width="843" class="markdown-img m-auto" src-height="431" align="center"/>

最终生成了编译脚本

<img src="/assets/V34jbjfBaopMv0x7r35cHhGrnge.png" src-width="716" class="markdown-img m-auto" src-height="622" align="center"/>

# 3. 编译为安装程序

# 4. 加入 其它语言支持 

去https://jrsoftware.org/files/istrans/ 下载

<img src="/assets/Lvqlb2rxzo5lkIxgV5zc0pKqnmf.png" src-width="1280" class="markdown-img m-auto" src-height="499" align="center"/>

<img src="/assets/C25GbQqXKoJ14UxWD29cg80EntK.png" src-width="1280" class="markdown-img m-auto" src-height="448" align="center"/>

<img src="/assets/RxoPbHZ1FoQ5TpxNhiDc50gQnjc.png" src-width="1280" class="markdown-img m-auto" src-height="890" align="center"/>

# 5. 通过命令行生成 安装程序

```csharp
set inno="C:\Program Files (x86)\Inno Setup 6\ISCC.exe"
%inno%  setup.iss
```

# 6. 卸载应用

# 7. 游戏中 实现 静默安装 自动升级

```csharp
setup.exe /silent /nocancel /closeapplications /dir=./
```

# 8. 脚本配置注意事项

- PrivilegesRequired  需要给lowest，否则程序安装时会提示需要admin权限。
- UsePreviousAppDir=no    这个安装时不会有上一次目录，每次都可以让用户选择
- 安装程序和卸载程序图标（注意windows对图标有缓存，如果想测试不同图标，需要修改图标名字和程序名）

SetupIconFile ={#APP_SRC_PATH}icon.ico

效果如下：

## 8.1 开启uninstall日志

增加配置

UninstallLogMode=append

日志目录在c/user/{username}/appdata/local/temp

如下

## 8.2 删除文件：

```csharp
[UninstallDelete]
Type: files; Name: "{app}\prefs.ini"
Type: filesandordirs; Name: "{app}\files"
```

或者

```csharp
[Code]
procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
  begin
    if CurUninstallStep=usDone then
      Log('The uninstall my is:' + ExpandConstant('{app}\files'));
      DelTree(ExpandConstant('{app}\files'),True,True,True);
  end;
```

