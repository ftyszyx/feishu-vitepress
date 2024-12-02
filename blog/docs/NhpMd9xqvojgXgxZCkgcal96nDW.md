---
create_time: 1733028438
edit_time: 1733032509
title: pytorch安装
categories:
  - skill
---


https://pytorch.org/get-started/locally/

## 1.1 Get cuda version

<img src="/assets/WiBmbVOi5o1ldPxX6tUcjB6ln4e.png" src-width="571" class="markdown-img m-auto" src-height="134" align="center"/>

## 1.2 Install Cuda or upgrade

<img src="/assets/VM6nb4g8ooEHCMxIZCtcgRshnMd.png" src-width="788" class="markdown-img m-auto" src-height="319" align="center"/>

Need cuda 12.4

So i want to upgrade cuda 

Go to https://developer.nvidia.com/cuda-downloads

https://developer.nvidia.com/cuda-12-4-0-download-archive

## 1.3 Install pytorch

```bash
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124
```

