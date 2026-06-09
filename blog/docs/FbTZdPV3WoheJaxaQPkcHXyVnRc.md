---
create_time: 1780976970
edit_time: 1780977713
title: 2026-6-8 更新
categories:
  - product
---


# 1. 微博备份能力更新总结（2026-06-09）

提交范围：fe4216c45d61c6e1d454c9b67283cb8ff4595c88（包含）至 efd1065334540dabd7b051f82b51662a875dff8c。

提交数量：4 个。变更规模：23 个文件，约 4527 行新增、772 行删除。

## 1.1 一、核心成果

- 支持单条微博备份：可直接输入 weibo.com 或 m.weibo.cn/detail 形式的单条微博地址，解析账号 ID 与微博 ID 后执行定向备份。
- 支持评论与转发备份：Weibo 新版与 Weibo M 均增加评论、子评论、转发采集与 HTML 展示。
- 增加断点续采能力：评论、子评论、转发、微博列表采集都可保存断点；暂停或异常后可以从上次位置继续。
- 支持强制保存：运行中或任务已结束时，可将 checkpoint 中已采集的数据强制重建为 HTML，不必从 0 重新采集。
- 优化大数据量 HTML 展示：评论和转发列表接入 virtual scroll，避免几万条数据一次性渲染导致页面卡顿。

## 1.2 二、功能与实现细节

### 1.2.1 任务配置与单条微博

- 任务模型增加备份模式枚举，区分单条微博和全部微博。
- 单条微博模式下隐藏时间范围与数量限制，同时保留随机等待设置。
- 新增微博 URL 解析工具与测试，支持 weibo.com、m.weibo.cn/detail、短 ID 等形式。

### 1.2.2 Weibo 新版处理器

- 增加 repostTimeline 转发采集。
- 评论和转发采集完成后输出总数与退出原因，便于判断是末页、空页、限流还是游标问题。
- 增加随机延时、分页异常保护、cursor loop 保护，降低接口异常导致的重复或误判。

### 1.2.3 Weibo M 处理器

- 支持单条微博、评论时间流采集、转发采集、子评论层级保存、断点续采。
- 评论从移动端热评流切换到时间流，避免只抓到几百条就停止。
- 转发接口遇到临时 ok=0 时保存当前页断点、延长退避、刷新详情页后重试。

### 1.2.4 Checkpoint 与恢复

- 新增 weibo_backup_checkpoint.dart，保存列表、评论、转发、分页 scope、节点子评论完成状态。
- 当本地数量明显小于官方计数时，不再把评论或转发直接标记 completed，避免恢复时全跳过。
- 节点子评论完成后记录 childrenCompleted，恢复时可以跳过已完成子树。

### 1.2.5 HTML 输出与页面性能

- 评论与转发改为 Tab 展示，支持独立展开和收起。
- 大列表使用 virtual scroll，只渲染可视区域，改善几万条评论页面卡顿。
- 修复展开回复时递归展开、HTML 标签裸露、文件名过长等问题。
- 强制保存重建 HTML 时统一使用安全短文件名，避免 Windows 路径非法。

## 1.3 三、关键问题修复

- 评论数量差距过大：发现 Weibo M 默认 hotflow max_id_type=0 是热评流，几百条后会停止；改用 max_id_type=1 时间流后可继续向旧评论翻页。
- 转发接口假空页：Weibo M 的 repostTimeline 偶发在未到末页时返回 ok=0 或“还没有人转发过”；现在会保存当前页断点并重试。
- 断点误判完成：本地数量小于官方计数时，不再把任务直接标完成。
- 子评论层级丢失：保留评论树结构，支持子节点完成状态记录。
- 页面卡顿：下载 virtual-scroller-dom 并随 HTML 资源复制，评论和转发过多时只渲染可视区域。
- 强制保存异常：修复微博正文被用作文件名导致路径非法的问题。
- HTML 标签裸露：移动端正文里的转义 HTML 会先反转义再安全过滤，避免页面显示 a href、br 等标签文本。

## 1.4 四、验证结果

- Weibo M 评论采集已验证可达到 3 万+ 评论量，测试截图显示评论数 37360。
- 转发页可展示虚拟滚动列表，测试截图显示转发数 3307。
- 评论与转发 Tab 可切换，评论列表和转发列表都支持单独展开或收起。
- 相关修改已执行 dart format 与 dart analyze，未发现静态分析问题。

## 1.5 五、涉及文件概览

- lib/services/processors/weibo_new_processor.dart：Weibo 新版评论、转发、分页、断点、日志增强。
- lib/services/processors/weibo_m_processor.dart：Weibo M 单条微博、评论时间流、转发重试、HTML 内容清理。
- lib/services/processors/weibo_backup_checkpoint.dart：新增微博备份断点存储。
- lib/services/web_clone_service.dart：强制保存、checkpoint 重建 HTML、安全文件名、资源复制。
- lib/utils/html_help.dart：评论与转发 Tab、virtual scroll、安全 HTML 过滤与转义处理。
- lib/utils/weibo_url_parser.dart 与 test/weibo_url_parser_test.dart：微博 URL 解析与测试。
- 任务页和任务表单相关文件：任务配置 UI 与强制保存入口。

## 1.6 六、建议继续观察

- 微博官方计数与接口可采集数量不一定完全一致，建议日志继续保留本地数量、官方数量和退出原因。
- 转发接口偶发假空页，当前策略是保存断点并重试；如果后续仍频繁触发，可考虑增加 Web 端 AJAX fallback。
- 超大 HTML 已通过虚拟滚动改善，但仍建议继续关注图片、头像和评论树展开时的内存占用。

## 1.7 七、测试截图

下面三张截图来自：D:/work/github/weibocloner_web/public/images/weibo/20260609。

截图 1：评论与转发 Tab 展示，评论 4748、转发 3307。

<img src="/assets/Wq1MbvDXXoEXI4xQXuHcscYLnNh.png" src-width="699" class="markdown-img m-auto" src-height="829" align="center"/>

截图 2：转发 Tab 和虚拟滚动展示，转发 3307。

<img src="/assets/LbkgbrK5Ro82I1x4kh0c97osniM.png" src-width="712" class="markdown-img m-auto" src-height="726" align="center"/>

截图 3：3 万+ 评论采集验证，评论 37360。

<img src="/assets/DULRbpxbkoYMXrx2SDncsZRankg.png" src-width="778" class="markdown-img m-auto" src-height="843" align="center"/>

