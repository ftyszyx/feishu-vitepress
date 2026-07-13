---
create_time: 1772159639
edit_time: 1783870393
title: Codex
categories:
  - skill
---


https://github.com/openai/codex

# 1. 安装

```yaml
npm i -g @openai/codex
```

# 2. 使用

codex

# 3. 查看使用量

## 3.1 安装

npx @ccusage/codex@latest  

## 3.2 查看

ccusage-codex daily

ccusage-codex monthly --json

# 4.  安全机制

Settings、`.codex/config.toml` 或 CLI 中进行精细化调整。 [[1](https://github.com/iOfficeAI/AionUi/issues/641), [2](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/main/docs/codex/CX-04-Codex%E9%A1%B9%E7%9B%AE%E6%8C%87%E4%BB%A4%E6%9D%83%E9%99%90%E9%85%8D%E7%BD%AE%E5%AE%8C%E6%95%B4%E6%8C%87%E5%8D%97.md), [3](https://blog.csdn.net/gitblog_00993/article/details/150624532)]

# 5. 1. 沙盒模式（限制文件与网络访问）

通过限制 Codex 的环境读写权限，保护系统安全： [[1](https://blog.csdn.net/gitblog_00993/article/details/150624532)]

-  **read-only** **（只读）：** 最高安全级别，仅允许读取，完全禁止写入和网络访问，适合安全审计或探索陌生代码库。
-  **workspace-write** **（工作区写入）：** 平衡模式，允许在当前工作区（如项目目录）内修改文件。
-  **danger-full-access** **（完全访问）：** 解除所有限制，拥有全系统读写及网络权限，仅在受控环境中使用。 [[1](https://blog.csdn.net/gitblog_00993/article/details/150624532)]

# 6. 2. 审批策略（控制人工确认频率）

决定 Codex 在执行命令时是否需要停下来等您确认： [[1](https://blog.csdn.net/gitblog_00993/article/details/150624532)]

-  **on-request** **（按需审批）：** 默认策略，AI会根据任务风险评估是否中断并请求您的批准。
-  **on-failure** **（失败时审批）：** 信任但验证，所有命令自动执行，只有失败时才弹窗询问。
-  **untrusted** **（严格审批）：** 保守策略，除非动作被确认为完全安全，否则频繁请求确认。
-  **never** **（从不审批）：** 关闭交互确认，适合自动化 CI/CD 流水线。 [[1](https://blog.csdn.net/gitblog_00993/article/details/150624532)]

# 7. 3. 如何配置和修改权限

-  **在 GUI/编辑器（如 VS Code）中：** 可直接在 AI 聊天界面输入 `/` 调出菜单，或在  **App Settings** 中一键切换权限模式。
-  **在配置文件中：** 可在 `~/.codex/config.toml` 文件顶部全局修改：
- toml

```text
sandbox_mode = " **danger-full-access**"
approval_policy = " **never**"
```

- 請謹慎使用程式碼。
-  **项目级约束：** 您可以在项目根目录编写 `AGENTS.md`，预设具体项目的安全边界、禁止操作和验证要求，让 Codex 自觉遵守。 [[1](https://www.reddit.com/r/codex/comments/1r27tro/codex_permission_options_feel_poorly_designed/?tl=zh-hans), [2](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/main/docs/codex/CX-04-Codex%E9%A1%B9%E7%9B%AE%E6%8C%87%E4%BB%A4%E6%9D%83%E9%99%90%E9%85%8D%E7%BD%AE%E5%AE%8C%E6%95%B4%E6%8C%87%E5%8D%97.md), [3](https://github.com/iOfficeAI/AionUi/issues/641)]

