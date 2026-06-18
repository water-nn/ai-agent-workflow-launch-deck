# PROJECT_STATUS

## 当前正式主题

AI Agent 工作流发布会：从工具调用到自动化协作系统。

这套 deck 不是普通技术说明文档，也不是 UI 模板测试。默认版本必须像一场高级科技产品发布会，讲清楚 Agent Skill 如何让 Codex 从一次性任务执行走向可复用、可协作、可审美迭代的自动化工作系统。

## 稳定推荐链接

https://water-nn.github.io/ai-agent-workflow-launch-deck/

默认链接必须保持为稳定推荐版：`Original Dark Tech Baseline`。

## 当前默认视觉基线

- 深石墨 / 深蓝黑背景
- 冷灰正文
- 低饱和青蓝作为主强调色
- 少量暖光点缀可以存在，但不能成为主色
- 克制动态背景
- 统一 Agenda、卡片、按钮、图表和进度条
- 16:9 演示舞台
- 所有页面服务六幕叙事

`?tone=champagne`、`?theme=visual` 与 `?tone=aurora` 只作为实验增强版，不能反向影响默认主题。

## 六幕叙事结构

1. 问题：重复解释规则、背景、部署和视觉标准导致上下文损耗。
2. 转折：Agent Skill 把经验沉淀成可安装、可同步、可迭代的能力包。
3. 案例：`html-presentation-deck` 把 HTML 网页式 PPT 生产固化成 skill。
4. 系统化：GitHub、GitHub Pages 与 `PROJECT_STATUS.md` 支持跨设备接续。
5. 升级：`ui-ux-pro-max` 与 `frontend-design` 作为 companion design skills 做 Design QA。
6. 结论：Agent Skill 的价值是让 Codex 走向自动化协作系统。

## 主要编辑入口

- 内容：`src/slides.tsx`
- 视觉：`src/styles.css`
- 演示壳：`src/deck/`
- 远程链接：`REMOTE_URL.txt`
- 部署说明：`部署说明.md`

## 当前状态

- 已把页面内容回正为“AI Agent 工作流发布会”主题。
- 已把默认视觉修正为 Original Dark Tech / Deep Slate Tech baseline。
- 已保留 `?tone=champagne` 作为可选黑金版本，并隔离 `visual` / `aurora` 实验增强版，避免污染默认链接。
- 已修复 Agenda pin 控件、Agenda panel spacing、pinned stage 对齐、标题宽度和 split layout 视觉重量。
- 已补充本状态文件，用于 Mac / Windows / 多线程 Codex 交接。

## 下一次接手建议

1. 先运行 `npm run build`。
2. 本地预览默认链接，优先检查封面、Agenda、问题页、跨设备页、Design QA 页和结尾页。
3. 再检查 `?tone=champagne`、`?theme=visual`、`?tone=aurora`、`?theme=visual&tone=aurora` 是否仍可作为实验增强版打开。
4. 任何新功能先保护默认主题，再考虑实验增强版。
