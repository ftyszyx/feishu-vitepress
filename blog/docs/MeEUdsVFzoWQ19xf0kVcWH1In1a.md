---
create_time: 1762759395
edit_time: 1762766390
title: uv
categories:
  - skill
---


https://github.com/astral-sh/uv

# 1. install

## 1.1 On Windows.

powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

<img src="/assets/VPwTbykuKoR1csxMHrbcmObAnjc.png" src-width="326" class="markdown-img m-auto" src-height="51" align="center"/>

# 2. 使用

https://www.runoob.com/python3/uv-tutorial.html

https://docs.astral.sh/uv/guides/projects/

查看python 版本

```yaml
uv python list
```

安装特定版本

```yaml
uv python install 3.12
```

创建虚拟环境

```yaml
uv venv

# 激活环境（macOS/Linux）
source .venv/bin/activate

# 激活环境（Windows）
.venv\Scripts\activate
```

指定虚拟环境版本

```yaml
uv python pin 3.11
```

安装包

```yaml
uv add requests

# Specify a version constraint
uv add 'requests==2.31.0'

# Add a git dependency
uv add git+https://github.com/psf/requests
```

```yaml
# 从 requirements.txt 安装
uv pip install -r requirements.txt
```

升级包

```yaml
uv pip upgrade requests
```

卸载包：

```yaml
uv remove requests
```

导出依赖：

```yaml
导出当前环境的依赖
uv pip freeze > requirements.txt

# 导出生产环境依赖（排除开发依赖）
uv pip freeze --production > requirements.txt
```

# 3. 项目管理

uv 支持 pyproject.toml 格式的项目管理，这是现代 Python 项目的标准配置文件。

```yaml
uv init my_project
cd my_project
```

安装依赖

```yaml
uv sync
```

_uv sync 如果安装太慢，可以设置国内镜像源https://pypi.tuna.tsinghua.edu.cn/simple：_

_在项目根目录的 pyproject.toml 文件 [tool.uv] 处设置 index-url：_

[tool.uv]

index-url = "https://pypi.tuna.tsinghua.edu.cn/simple"

