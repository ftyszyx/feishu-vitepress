---
create_time: 1731567289
edit_time: 1731902058
title: Python 的多版本环境
categories:
  - skill
---


目前最靠谱的方案还是conda

之前用过一段时间的pipenv,但有个问题，vscode中如果切pipenv后，不能记住之前输过的命令

# 安装

https://conda.io/projects/conda/en/latest/user-guide/getting-started.html#managing-python

我使用miniconda3

https://docs.conda.io/projects/miniconda/en/latest/

# 使用

创建一个环境

conda create -n &lt;env-name&gt;

指定python版本

```shell
conda create -n myenv python=3.9
```

列出所有环境

```sql
conda info --envs
```

激活一个环境

```sql
conda activate myenvironment
```

退出

```sql
conda deactivate
```

删除一个环境

```sql
conda remove -n ENV_NAME --all
```

# window中怎么一键激活

写个bat脚本

```yaml
call "C:\ProgramData\miniconda3\condabin\activate.bat" build_apk
python fix.py 
pause
```

