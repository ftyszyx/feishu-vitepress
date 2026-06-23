---
create_time: 1782183460
edit_time: 1782185040
title: ai训练平台
categories:
  - product
---


# 1. 目前商用

腾讯云：

https://console.cloud.tencent.com/tione/v2/aimarket/list?regionId=1&workspaceId=0

百度

https://ai.baidu.com/easydl/

# 2. 开源的

腾讯的： https://github.com/data-infra/cube-studio

https://github.com/yangjianxin1/Firefly

### 2.1.1 LLaMA Factory（最主流中文友好）

- GitHub 星标 32k+，支持 100 + 主流 LLM/VLM：Qwen、ChatGLM、Llama、Mistral、Baichuan、LLaVA 多模态
- 训练方式：全参数微调、LoRA/QLoRA、DPO/ORPO/PPO 人类偏好训练、增量预训练
- 优势：内置 Gradio 可视化 WebUI，一键启动训练、数据集导入、模型合并、推理；支持 4/8bit 量化，单卡 7B 模型即可微调
- 开源协议：Apache 2.0，商用免费
- 适用：本地单机微调垂直行业大模型

### 2.1.2 MS-Swift（阿里魔搭开源，国内生态最强）

- 支持 500 + 大模型、200 + 多模态模型，适配 Qwen、Yi、ChatGLM 全系国产模型
- 内置完整数据集处理、训练、推理、量化、部署链路，提供 Web 可视化界面
- 优化：显存占用极低，支持分布式多机多卡，适配国产 NPU
- 配套 ModelScope 本地镜像，离线跑全流程

### 2.1.3 XTuner（书生・浦语团队开源）

- 轻量化微调框架，主打低显存消耗，单卡 3090 可微调 7B 模型
- 大量预设配置文件，命令行极简，支持 DPO/RLHF 完整人类对齐流程
- 适配 InternLM、Qwen、Llama 全系，分布式训练成熟

### 2.1.4 Unsloth（极致速度优化）

- 训练速度提升 2~5 倍，显存节省 80%，专为消费显卡优化
- 兼容 LLaMA Factory、Axolotl，适合快速迭代微调小模型

## 2.1 二、企业级云原生一站式 AI 训练平台（私有化集群、多租户、分布式调度）

完整平台：Notebook 开发、数据集管理、分布式训练任务调度、超参搜索、模型仓库、推理部署全链路

### 2.1.1 Cube Studio（国产全开源，推荐私有化部署）

- 云原生 K8s 架构，多租户权限管理，支持单机 / 多机多卡分布式训练
- 功能：在线 Jupyter、可视化任务流水线、大模型一键微调、VGPU 虚拟化、数据集标注、模型推理服务
- 兼容：PyTorch/TensorFlow/Paddle/DeepSpeed/ColossalAI，支持 NVIDIA / 国产昇腾 NPU
- 开源协议：完全开源，无商用限制，Docker 一键部署

# 3. 选型快速建议

1. 个人单机微调垂直大模型 → LLaMA Factory / MS-Swift（带 WebUI，零代码）
2. 公司私有 GPU 集群，全流程 AI 平台 → Cube Studio
3. 从头预训练 70B + 超大基础模型 → Megatron-LM + DeepSpeed
4. 仅需要训练日志、实验跟踪 → SwanLab 私有化部署
5. 中文行业图像 / NLP 快速开发 → 飞桨 PaddlePaddle

