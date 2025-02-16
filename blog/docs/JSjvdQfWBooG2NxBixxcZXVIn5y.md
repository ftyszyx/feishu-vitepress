---
create_time: 1739617780
edit_time: 1739633581
title: rknn(瑞芯微集成）
categories:
  - skill
---


# 1. 官方文档

https://github.com/airockchip/rknn-toolkit2/tree/master/doc

# 2. 部署环境

安装miniconda

安装tolkit

```yaml
pip install rknn-toolkit2 -i https://mirrors.aliyun.com/pypi/simple/
```

验证

```yaml
from rknn.api import RKNN
```

测试

把图片放在model目录下即可

```yaml
python yolo11.py --model_path ../model/yolo11n.rknn --target rk3588 --img_save
```

# 3. yolo11导出rknn（有问题，自己训练的模型用不了）

需要Linux,并安装好rknn-toolkit2

https://github.com/airockchip/rknn-toolkit2

## 3.1 转特殊的onnx

首先是需要yolov11转成onx

这个onx格式需要特殊处理：

参考：https://github.com/airockchip/ultralytics_yolo11

   

/mnt/d/opensource/ai/airockchip_yolo11

修改ultralytics\cfg\default.yaml 中model

model: best.pt # (str, optional) path to model file, i.e. yolo11n.pt, yolo11n.yaml

执行下面命令

```yaml
# 调整 ./ultralytics/cfg/default.yaml 中 model 文件路径，默认为 yolo11n.pt，若自己训练模型，请调接至对应的路径。支持检测、分割、姿态、旋转框检测模型。
# 如填入 yolo11n.pt 导出检测模型
# 如填入 yolo11n-seg.pt 导出分割模型
# 如填入 yolo11n-pose.pt 导出姿态模型
# 如填入 yolo11n-obb.pt 导出OBB模型

export PYTHONPATH=./
python ./ultralytics/engine/exporter.py

# 执行完毕后，会生成 ONNX 模型. 假如原始模型为 yolo11n.pt，则生成 yolo11n.onnx 模型。
```

生成 了best.onnx

## 3.2 onnx转rknn

https://github.com/airockchip/rknn_model_zoo/tree/main/examples/yolo11

<img src="/assets/MfmHbhTX1ocVFaxKtGscXGhznHh.png" src-width="1182" class="markdown-img m-auto" src-height="42" align="center"/>

生成的文件是model/yolo11n.rknn

```yaml
python convert.py /mnt/d/opensource/ai/rknn_model_zoo/best.onnx rk3588 i8 /mnt/d/opensource/ai/rknn_model_zoo/best.rknn
```

测试

# 4. wsl中使用

https://github.com/airockchip/rknn-toolkit2/blob/master/doc/WSL%E4%B8%AD%E4%BD%BF%E7%94%A8RKNN_ToolKit2.md

