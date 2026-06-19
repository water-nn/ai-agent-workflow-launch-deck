# PROJECT_STATUS

## 当前正式主题

AI Agent 工作流发布会：从工具调用到自动化协作系统。

这套 deck 不是普通技术说明文档，也不是 UI 模板测试。默认版本必须像一场高级科技产品发布会，讲清楚 Agent Skill 如何让 Codex 从一次性任务执行走向可复用、可协作、可审美迭代的自动化工作系统。

## 稳定推荐链接

https://water-nn.github.io/ai-agent-workflow-launch-deck/

默认链接必须保持为稳定推荐版：`Default Premium Dark Tech Baseline`。

## 当前默认视觉基线

- 深石墨 / 深蓝黑背景
- 多层 radial / conic / linear gradients 建立空间深度，不能是平面黑灰底
- `--surface-0` 到 `--surface-3` 区分 body、stage、card、navigation、chart panel 和 hover / active 状态
- 冷灰正文
- subtitle / eyebrow / section label 使用统一 quiet token，caption / chart note / legend 使用弱 caption token
- 青蓝作为主强调色，电蓝作为辅助强调
- 低饱和紫蓝作为少量空间光
- teal 用于质量 / 成功层级，soft coral 用于风险层级
- 少量 amber 暖光点缀可以存在，但不能超过重点提示角色
- 克制但有层次的动态背景
- 背景顶部、底部和左右不能有黑色硬边、mask 硬线或 blur 接缝
- 统一 Agenda、卡片、按钮、图表和进度条
- 卡片、按钮、Agenda item、图表卡、流程节点和架构节点共享高级 hover 语言：轻微上浮、surface 提亮、边框增强、低透明 glow、accent 轻微增强
- hover 必须支持 reduced motion，且不能影响布局或降低可读性
- 图表使用 4-6 个受控协调色，而不是单一 cyan 或随机 dashboard palette
- 16:9 演示舞台
- Pinned Agenda 是双栏 responsive reflow，不是整张 slide 缩放
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
- 已把默认视觉从冷灰单调升级为 Default Premium Dark Tech Baseline。
- 已保留 `?tone=champagne` 作为可选黑金版本，并隔离 `visual` / `aurora` 实验增强版，避免污染默认链接。
- 已补充 cyan、electric blue、muted violet、teal、amber、soft coral 的 token 化 palette，并让背景、Agenda、Progress、卡片和图表共享这套变量。
- 已将默认主题继续回正到 `Default Premium Dark Tech Baseline`，新增 surface token、hover token、文字层级 token 和更细腻的多层动态背景。
- 已统一 subtitle、eyebrow、caption、chart note、legend 的 foreground 角色，避免普通说明文字随机使用 cyan / blue / violet / amber / coral。
- 已优化 DynamicBackground 顶部覆盖和光晕尺寸，避免顶部黑色硬边。
- 已把 Pinned Agenda 改为右侧舞台 responsive reflow，而不是整体缩小 16:9 画布。
- 已增强普通卡片、图表卡、Agenda item、按钮、流程节点和架构节点 hover 反馈，并补充 reduced motion 降级。
- 已修复 Agenda pin 控件、Agenda panel spacing、pinned stage 对齐、标题宽度和 split layout 视觉重量。
- 已补充本状态文件，用于 Mac / Windows / 多线程 Codex 交接。

## 下一次接手建议

1. 先运行 `npm run build`。
2. 本地预览默认链接，优先检查封面、Agenda、问题页、跨设备页、Design QA 页和结尾页。
3. 检查默认背景是否不平、渐变是否细腻、顶部是否无黑色硬边。
4. 检查 Pinned Agenda 是否双栏回流，右侧内容是否仍可读，页面级是否无滚动。
5. 检查卡片、按钮、Agenda item、图表卡和系统节点 hover 是否有明显但克制的高级反馈，且不跳布局。
6. 再检查 `?tone=champagne`、`?theme=visual`、`?tone=aurora`、`?theme=visual&tone=aurora` 是否仍可作为实验增强版打开。
7. 任何新功能先保护默认主题，再考虑实验增强版。
