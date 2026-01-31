---
create_time: 1769768433
edit_time: 1769768847
title: Cuda
categories:
  - skill
---


 **查看已安裝的 CUDA Toolkit 版本：**

```text
nvcc --version
```

 **查看驅動支持的最高版本：**
輸入：

```yaml
nvidia-smi
```

# 1. windows

<img src="/assets/Yzmeb6xldohRi6xbMNecm8ynnng.png" src-width="712" class="markdown-img m-auto" src-height="213" align="center"/>

## 1.1 indows 安装 CUDA 环境（让 cublas64_12.dll 可用）

### 1.1.1 1）确认显卡和驱动

- 你必须是 NVIDIA 显卡
- 安装/更新到支持 CUDA 12 的 NVIDIA 驱动（装最新版 Game Ready / Studio 都行）

### 1.1.2 2）安装 CUDA 12 Toolkit（包含 cuBLAS）

- 去 NVIDIA 官方下载 CUDA Toolkit 12.x（Windows） 并安装
- 装完后一般会有：C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.x\bin
- 把这个 bin 目录加入 系统环境变量 PATH（通常安装器会自动加）

### 1.1.3 3）安装 cuDNN 9（匹配 CUDA 12）

- 下载 cuDNN 9 for CUDA 12（Windows）
- 解压后把里面的 bin 目录（包含 cudnn*.dll）加入 PATH

或者把 cuDNN 的 dll 直接复制到 CUDA\v12.x\bin

### 1.1.4 4）验证 DLL 是否能找到

在 cmd/PowerShell 执行：

where cublas64_12.dll

where cudnn64_9.dll

能返回路径就说明 PATH 生效了（重开 n8n 进程后再试节点）。

