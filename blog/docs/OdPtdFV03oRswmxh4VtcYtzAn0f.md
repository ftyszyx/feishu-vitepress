---
create_time: 1763344036
edit_time: 1765984549
title: Coze
categories:
  - skill
---


# 1. coze_studio

https://github.com/coze-dev/coze-studio

启动

```yaml
docker compose -f ./docker/docker-compose.yml up
```

 

### 1.1.1 步骤三：注册账号

访问 `http://localhost:8888/sign` 输入用户名、密码点击注册按钮。

### 1.1.2 步骤三：配置模型

配置模型，`http://localhost:8888/admin/#model-management` 新增模型。

# 2. coze_loop

  protocol_config:

```yaml
base_url: ""         # 默认为https://ark.cn-beijing.volces.com/api/v3/，若使用Byteplus ModelArk，请指定为https://ark.ap-southeast.bytepluses.com/api/v3/api_key: "*727e****" # 方舟模型 API Key，中国境内用户参考火山方舟文档 https://www.volcengine.com/docs/82379/1541594；非中国境内的用户可参考 BytePlus ModelArk 文档 https://docs.byteplus.com/en/docs/ModelArk/1361424?
utm_source=github&utm_medium=readme&utm_campaign=coze_open_sourcemodel: "ep-****"     # 方舟模型Endpoint ID，中国境内用户参考火山方舟文档 https://www.volcengine.com/docs/82379/1099522；非中国境内的用户可参考 BytePlus ModelArk 文档 https://docs.byteplus.com/en/docs/ModelArk/model_id?utm_source=github&utm_medium=readme&utm_campaign=coze_open_sourceparam_config:
```

# 3. coze剪视频

剪映小助手https://jy.0x0.chat/docs/getting-started/plugin-config

https://www.cozeos.com/

参考这个教程：

https://www.cnblogs.com/lucky_hu/p/18954862

https://zhuanlan.zhihu.com/p/1934746452837528680

https://gitee.com/cozeworkflow/free

https://zhuanlan.zhihu.com/p/1912552068251629122

https://www.coze.cn/store/agent/7481998481742479360?bot_id=true&bid=6ib8hv3gg9g00

一些工作流

https://www.yuque.com/codel-hg8x5/wkykdm/qhziqzhb6cvmv9gv

# 4. 儿童古诗词

输入：诗名

## 4.1 给大模型生成文案

```md
# 角色
你是一位资深的古诗词专家，对各类古诗词有着深入的研究和理解。能够根据用户提供的{{input}}，精准分析理解后，检索出与之对应的古诗词，并清晰准确地将诗词名称、朝代作者、完整诗句输出，不输出注释、标识、符号等多余内容。

## 技能
### 技能 1: 检索并输出古诗词
1. 仔细分析用户提供的{{input}}，从中提取关键信息。
2. 根据关键信息，在自己丰富的知识储备中检索与之匹配的古诗词。
3. 将检索到的古诗词的名称、朝代作者、完整诗句准确输出。
4.以数组的形式将诗词名称、朝代作者、完整诗句（每句诗都单独输出）输出到fenjing
5.将诗词名称、朝代作者以数组的形式输出到yuyin。
6.将诗词名称单独输出到mingcheng
7.输出朝代作者时严格按照以下示例的格式输出：[唐]·杜甫

## 限制:
- 只回答与古诗词相关的内容，拒绝回答与古诗词无关的话题。
- 输出内容必须包含诗词名称、朝代作者、完整诗句，且不能有注释、标识等多余内容。
- 每一组中如果有分句用中文逗号隔开。
- 输出内容应基于可靠的知识来源，确保信息准确。
```

输出

<img src="/assets/FcQVbojAhoxo9dxTF5rc8aISn2g.png" src-width="328" class="markdown-img m-auto" src-height="188" align="center"/>

<img src="/assets/GL8SbKuL0oo6XwxaOYqcYiQonTc.png" src-width="251" class="markdown-img m-auto" src-height="92" align="center"/>

## 4.2 生成分镜图片提示词

<img src="/assets/EbGxbmcUlo4EVRx0srdc5L4anAg.png" src-width="481" class="markdown-img m-auto" src-height="88" align="center"/>

```text
角色
你是一位资深且专业的AI古诗词视频生成领域文生图提示词创作专家。擅长精准剖析用户输入的诗词{{input}}，深度挖掘每句话的细微信息，创作出高质量、高度适配的文生图提示词。

技能
技能 1: 拆解镜头并生成提示词
从多个维度对用户输入的{{input}}进行全面、深入的解析，充分理解脚本内容。
对脚本中的每个镜头细致拆解，完整涵盖场景、氛围、动作、表情等关键元素，杜绝信息遗漏。
针对每个拆解后的镜头，生成精准、生动且契合AI古诗词视频独特风格的文生图提示词。提示词要保证能同时充分彰显古诗词的韵味与意境和适合儿童观看的可爱、萌动风格。
生成图片统一设定为3D动漫卡通风格，主角人物统一塑造为古代{{jiaose}}形象，详细描述人物服饰（包括款式、颜色、材质等）、发型（如发髻样式、配饰等）、神态（如眼神、表情等），保证生成图片中每幅含有人物、画像等与人物相关的形象完全一致。
5.全部使用全景的景别，描述出人物与环境的位置关系，保证人物能全身出镜。
6.生成的每段提示词的人物衣着、发型、人物形象的文字描述要完全一致。
7.先分析确认{{input}}共有多少键，保证{{input}}中每个键都能生成对应提示词，输入的键值等于输出的键值。
提示词模板：3D动漫卡通风格，全景，【场景描述】，【人物衣着描述】，【人物发型描述】，【人物表情描述】，【人物形象描述】，【人物与场景位置关系描述】
........


限制:
-
仅围绕用户输入的脚本开展镜头拆解和提示词生成工作，不涉及无关内容。
生成的文生图提示词需清晰准确，完全符合AI古诗词视频生成要求。
输出内容应简洁精炼，突出镜头核心信息。
确保每幅生成的含有人物的图片中人物形象基本一致 。
```

输出

<img src="/assets/NOQtb7dhIoG454xmN2Qcytk6ngh.png" src-width="529" class="markdown-img m-auto" src-height="284" align="center"/>

## 4.3 图片生成

<img src="/assets/JDP0bnoXfoCniDxuOoIcw7AXn4c.png" src-width="546" class="markdown-img m-auto" src-height="251" align="center"/>

是一个批处理

<img src="/assets/X5Usb0I9hoWsS7xW1P0caGy6n9d.png" src-width="1199" class="markdown-img m-auto" src-height="377" align="center"/>

## 4.4 生成语音

<img src="/assets/KUGtbG6ekohtLExl3tAcq11Knff.png" src-width="344" class="markdown-img m-auto" src-height="321" align="center"/>

## 4.5 生成剪映草稿

<img src="/assets/Hi9hbqOFpo2u66xLbVGc77uKnle.png" src-width="1123" class="markdown-img m-auto" src-height="513" align="center"/>

<img src="/assets/QFTXbg4p8oyaXAxUEwecMN19nmf.png" src-width="328" class="markdown-img m-auto" src-height="151" align="center"/>

<img src="/assets/YuIDbxCsDoBF06x7FwHc3HoXnYg.png" src-width="539" class="markdown-img m-auto" src-height="262" align="center"/>

## 4.6 字mu时间线

<img src="/assets/AQA8b80jyo0uQfxVFb4cvgdsnQf.png" src-width="975" class="markdown-img m-auto" src-height="428" align="center"/>

<img src="/assets/DOWSbiL2OovxXSxBNCTcMPwhnBd.png" src-width="585" class="markdown-img m-auto" src-height="506" align="center"/>

## 4.7 bgm

选bgm

```text
你是一名音乐专家，能根据用户提供的诗词{{input}},从下方的歌曲列表中挑选合适的歌曲，输出时要完整输出歌曲名称（包括空格、符号）。只挑选一首输出。
歌曲列表：
1.可爱温馨 中国风Beat
2.古风唯美浪漫
3.古风唯美华丽
4.月满荷塘
5.望归去
6.古风 唯美 舒缓
7.世外竹林
8.中国民族喜悦俏皮
9.花开盛宴
10.预约国风电子 花灯同乐
11.中秋佳节 国潮时尚
12.长相思

不要输出多余内容。
```

## 4.8 找背景音乐

<img src="/assets/UA6kbQHJxoMrsOxsSEocz9oNnbh.png" src-width="1089" class="markdown-img m-auto" src-height="512" align="center"/>

总结：

流程好麻烦，完全没有写代码灵活可控。模型选择没有自由度

1. 大模型选deepseek
2. 图片生成选择即梦
3. 背景音乐，让大模型在网上找匹配的
4. 通过调用即梦api自动合成

剪映草稿如何生成

https://gitee.com/jvluo/JianYingDraft

https://github.com/GuanYixuan/pyJianYingDraft

<img src="/assets/NryMbEzHooQ4nCxtWKmc41QnnCg.png" src-width="918" class="markdown-img m-auto" src-height="181" align="center"/>

<img src="/assets/B905b1g7YoICdcxgbTtcLp0mnbb.png" src-width="358" class="markdown-img m-auto" src-height="245" align="center"/>

C:\Users\zhangyuxin\AppData\Local\JianyingPro\User Data\Projects\com.lveditor.draft

图片生成模型：https://grsai.com/zh/dashboard/models

-  **Pixabay**: 提供大量可免费下载和用于商业用途的背景音乐，特别适合用于YouTube视频。
-  **CapCut**: 平台提供了免版税的背景音乐库，也支持使用Pixabay上的音乐

text生成背景音乐

-  **Suno AI / Udio:** 目前最强的两个音乐生成模型。
    - _操作：_ 打开“Custom Mode”（自定义模式），输入提示词（如“Cinematic, emotional, piano, slow build-up”），并勾选  **Instrumental（纯器乐）**。
    - _优点：_ 质量极高，能听懂复杂的风格描述。

-  **Stable Audio (Stability AI):**
    - _操作：_ 输入文本，设置时长。
    - _优点：_ 擅长生成环境音（Ambient）和特定时长的 BGM，结构更像传统的背景音乐而非流行歌。

-  **MusicGen (Meta / HuggingFace):**
    - _操作：_ 开源模型，可以在 HuggingFace 上免费试用。适合短片段生成。

-  **Soundraw:**
    - _操作：_ 选择情绪、时长、节奏，AI 会生成多首曲子，你还可以手动调整曲子的结构（高潮在哪里、哪里要静音）。
    - _优点：_  **版权清晰**（付费后可商用），非常适合视频创作者。
    让ai搜索合适的背景音乐

-  **Epidemic Sound / Artlist:**
    - 这两大顶级素材库现在都支持“语义搜索”。你可以直接输入“Video about a lonely robot in rain”（关于孤独机器人在雨中的视频），AI 会理解语境并推荐合适的 BGM，而不需要你手动去搜“Sad, Electronic”。

-  **Cyanite.ai:**
    - 这主要是给音乐行业用的，但也支持强大的文本搜歌功能。

1.  **生成式 AI（Text-to-Music）：** AI 根据你的文本描述，从零开始创作一段全新的音乐。
2.  **AI 搜索匹配（AI-Powered Search）：** AI 理解你的文本，然后在现有的庞大版权音乐库中检索最匹配的曲目。
3.  **AI 辅助提示词（LLM + Search）：** 先用 ChatGPT 等大模型分析文本，提取音乐关键词，再用于传统搜索。

# 5. 剪映草稿

[draft_content.json](/assets/GWbGbDLKvoqLgVxj6CzcAnaAnjg.json)

[draft_meta_info.json](/assets/TB7tbK8WQoRZlOxFyYEc2ptWnDf.json)

# 6. Coze的使用体验

1. 如果失败，不能从失败点继续执行，只能从头开始

<img src="/assets/WmOfb6CZVoeWhzxo3wxc9EAMnN8.png" src-width="2297" class="markdown-img m-auto" src-height="1923" align="center"/>

1. Code 执行错误，没有错误行号

<img src="/assets/KQHJbIbbEoEDOFxq3i8cXUSVnxh.png" src-width="805" class="markdown-img m-auto" src-height="1085" align="center"/>

3.自制插件，如果是用字节的服务器，无法使用数据库。

数据不能持久化

1. 调用大模型经常的异常，不可靠

<img src="/assets/FvYbbgCevoxGnOxbv5DcBs8ZnMb.png" src-width="485" class="markdown-img m-auto" src-height="596" align="center"/>

