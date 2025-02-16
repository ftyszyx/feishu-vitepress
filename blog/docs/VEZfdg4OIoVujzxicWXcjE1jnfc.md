---
create_time: 1733061635
edit_time: 1739597494
title: 图片标注
categories:
  - skill
---


# 1. labelimg

## 1.1 下载

https://github.com/HumanSignal/labelImg/releases

解压后直接可用

## 1.2 定义label

修改imglabel\data\predefined_classes.txt

定义多个类型，一行是一个类型

<img src="/assets/HhNmbFoqnoGZspxFlYaczLjVnAc.png" src-width="139" class="markdown-img m-auto" src-height="65" align="center"/>

## 1.3 标注

选择图片目录

<img src="/assets/I9G9b93jxogFlWxa97ycvYNAnNg.png" src-width="471" class="markdown-img m-auto" src-height="279" align="center"/>

选择格式yolo

<img src="/assets/ZBUubCLhyo7GgExz5HMcPs88nie.png" src-width="164" class="markdown-img m-auto" src-height="474" align="center"/>

选一个图片，按w标记，选择类别

<img src="/assets/VrcAbYk7SobEFnxl70Lc7Cqinvc.png" src-width="799" class="markdown-img m-auto" src-height="401" align="center"/>

保存就ok了

## 1.4 快捷键

<img src="/assets/Tqjqb3QsOoCedOxhvv4cm0l9n1E.png" src-width="484" class="markdown-img m-auto" src-height="552" align="center"/>

# 2.  anyLabeling

https://github.com/CVHub520/X-AnyLabeling

如何加载自己的模型

新建一个yaml文件x-labeling.yaml

不会写的参考：D:\work\github\X-AnyLabeling\anylabeling\configs\auto_labeling下面的例子

model_path配置你导出的Onnx

```yaml
type: yolo11
name: yolo11s-r20240930
display_name: yolo_mydetect4
model_path: D:/work/github/yolo_learn/demo/runs/detect/crack_detection4/weights/best.onnx
nms_threshold: 0.45
confidence_threshold: 0.25
classes:
  - 纵向裂缝
  - 横向裂缝
  - 龟裂
  - 坑洞
```

  

## 2.1 Label-studio

https://github.com/ftyszyx/label_studio

