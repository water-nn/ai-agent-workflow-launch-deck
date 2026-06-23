# PROJECT_STATUS

## 当前正式主题

AI Agent 工作流发布会：从工具调用到自动化协作系统。

这套 deck 不是普通技术说明文档，也不是 UI 模板测试。默认版本必须像一场高级科技产品发布会，讲清楚 Agent Skill 如何让 Codex 从一次性任务执行走向可复用、可协作、可审美迭代的自动化工作系统。

## 稳定推荐链接

https://water-nn.github.io/ai-agent-workflow-launch-deck/

默认链接必须保持为稳定推荐版：`Original Agent Skill Lab Palette / agent-lab`。

## 当前默认视觉基线

- 色彩母版来自早期本地项目 `/Users/water/Documents/系统操作/agent-skill-html-deck`
- 本轮只参考旧项目的色彩、光感、Agenda 和 hover 质感，不复制旧项目排版
- deep navy / blue black 背景，接近 `#050812` / `#0b1024` / `#04060d`
- 多层 radial / conic / linear gradients 建立空间深度，不能是平面黑灰底
- 超大 halo、斜向 ribbon、低透明网格和 aurora glow 必须覆盖到 viewport 外
- `--surface-0` 到 `--surface-3` 区分 body、stage、card、navigation、chart panel 和 hover / active 状态
- 冷灰正文
- subtitle / eyebrow / section label 使用统一 quiet token，caption / chart note / legend 使用弱 caption token
- cyan / teal 作为主强调色，electric blue 作为辅助强调
- muted violet / indigo 作为空间光
- mint 用于质量 / 成功层级，soft coral 用于风险层级
- amber / champagne 不进入默认主色，只作为 `?tone=champagne` 可选版
- 克制但有层次的动态背景
- 背景顶部、底部和左右不能有黑色硬边、mask 硬线或 blur 接缝
- 顶部 controls 区域不能形成横向黑色硬边或黑色轮廓
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
- 已把默认 tone 改为 `agent-lab`，无参数链接等价于 Original Agent Skill Lab Palette。
- 已读取并参考早期项目 `/Users/water/Documents/系统操作/agent-skill-html-deck`，提取其 deep navy、cyan、violet、mint 和 hover 语言作为默认色彩母版。
- 已保留 `?tone=champagne` 作为可选黑金版本，并隔离 `visual` / `aurora` 实验增强版，避免污染默认链接。
- 已补充 cyan、teal、electric blue、muted violet、indigo、mint、soft coral 的 token 化 palette，并让背景、Agenda、Progress、卡片和图表共享这套变量。
- 已保留 mesh / halo / ribbon / aurora 背景层，但默认色彩回到旧项目母版的左 cyan / 右 violet 深蓝黑空间感。
- 已统一 subtitle、eyebrow、caption、chart note、legend 的 foreground 角色，避免普通说明文字随机使用 cyan / blue / violet / amber / coral。
- 已修复顶部动态背景黑色硬边：取消 app 顶部硬线性压暗，让 DynamicBackground 的 blur / glow / halo 层向 viewport 外延展。
- 已把 Pinned Agenda 改为右侧舞台 responsive reflow，而不是整体缩小 16:9 画布。
- 已增强普通卡片、图表卡、Agenda item、按钮、流程节点和架构节点 hover 反馈，并补充 reduced motion 降级。
- 已参考 `ui-ux-pro-max` 和 `frontend-design` 做 Design QA：这轮不只检查 token，而是以“是否像高级 AI 产品发布会”的实际观感为准。
- 已修复 Agenda pin 控件、Agenda panel spacing、pinned stage 对齐、标题宽度和 split layout 视觉重量。
- 已补充本状态文件，用于 Mac / Windows / 多线程 Codex 交接。

## 下一次接手建议

1. 先运行 `npm run build`。
2. 本地预览默认链接，优先检查封面、Agenda、问题页、跨设备页、Design QA 页和结尾页。
3. 检查默认背景是否更有空间光、渐变是否自然、顶部是否无黑色硬边。
4. 检查 Pinned Agenda 是否双栏回流，右侧内容是否仍可读，页面级是否无滚动。
5. 检查卡片、按钮、Agenda item、图表卡和系统节点 hover 是否有明显但克制的高级反馈，且不跳布局。
6. 再检查 `?tone=champagne`、`?theme=visual`、`?tone=aurora`、`?theme=visual&tone=aurora` 是否仍可作为实验增强版打开。
7. 任何新功能先保护默认主题，再考虑实验增强版。
