---
create_time: 1788253174
edit_time: 1788256150
title: pdf工具
categories:
  - skill
---


https://github.com/opendatalab/mineru

# 1. 安装

```yaml
git clone https://github.com/opendatalab/MinerU.git
cd MinerU
uv pip install -e .[all]
```

加环境变量

C:\Python313\Scripts

使用cpu

```yaml
mineru -p <input_path> -o <output_path>  -b pipeline
```

 

```yaml
mineru -p ".\test.pdf" -o ".\test" -b pipeline
```

