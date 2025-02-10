---
create_time: 1731567289
edit_time: 1739112713
title: Python 的多版本环境
categories:
  - skill
---


目前最靠谱的方案还是conda

之前用过一段时间的pipenv,但有个问题，vscode中如果切pipenv后，不能记住之前输过的命令

# 1. 安装

https://conda.io/projects/conda/en/latest/user-guide/getting-started.html#managing-python

我使用miniconda3

https://docs.conda.io/projects/miniconda/en/latest/

```yaml
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

# 2. 使用

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

# 3. window中怎么一键激活

写个bat脚本

```yaml
call conda activate build_apk
python fix.py 
pause
```

# 4. conda加速

```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --set show_channel_urls yes
```

除了使用conda的config命名，还可以通过直接修改配置文件.condarc的方式来完成下载源的修改。

Linux系统中.condarc文件的位置在/home/用户名/下。

Windows系统中.condarc文件的位置在C:\users\用户名下。

找到.condarc文件并将其内容修改为如下所示即可。

```bash
channels:
 
defaults
ssl_verify: true
show_channel_urls: true
```

### 4.1.1 查看修改是否成功

上面的两种修改方式均可将conda的下载源修改为国内镜像，可以通过如下命令查看一下是否修改成功。

```text
conda config --show channels
```

## 4.1 Conda vpn代理 

conda install pytorch torchvision torchaudio pytorch-cuda=12.4 -c pytorch -c nvidia -n yolo

修改.condarc

```bash
proxy_servers:
  http: http://127.0.0.1:8001
  https: https://127.0.0.1:8001
ssl_verify: false
```

 

# 5. uv包管理

https://github.com/astral-sh/uv

