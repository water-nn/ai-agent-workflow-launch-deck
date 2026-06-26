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
- deep navy / blue black 背景，接近 `#040711` / `#050812` / `#070b18` / `#03050c`
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
- topbar、Agenda、stage 和 progress 共用 `--app-safe-x`、`--app-safe-y`、`--topbar-height`、`--topbar-to-stage-gap`、`--stage-bottom-gap`、`--stage-left`、`--stage-right` 等 layout token
- 已收紧 topbar 到 stage 的垂直距离，让 `1366x768` / `1440x900` 的 16:9 内容显示区更高
- Pinned Agenda 是双栏 responsive reflow，不是整张 slide 缩放
- Design QA 页已加入 `ScrollableCard`，用于证明单个长内容卡片内部滚动，页面级仍无滚动
- Deck 能力页已加入 `MediaImage` / `MediaVideo` 示例，证明图片 lightbox、视频控制和媒体弹层能力
- 媒体弹层打开时方向键翻页会被阻止，`Esc` 优先关闭弹层，关闭后恢复 slide navigation
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
- 长内容卡片：`src/deck/layouts/SlideBlocks.tsx`
- 媒体组件：`src/deck/media/MediaPreview.tsx`
- 远程链接：`REMOTE_URL.txt`
- 部署说明：`部署说明.md`

## 当前状态

- 2026-06-25 公司 Windows 电脑已同步 GitHub 最新版 `html-presentation-deck` skill。
- 当前主 skill 是 `html-presentation-deck`，companion design skills 是 `ui-ux-pro-max` 和 `frontend-design`，均已在 Windows 本机检测到。
- 当前继续调试方向：外层背景继续保持 deep navy / blue black，内容显示区域保持更高，Pinned Agenda 坚持 responsive reflow，卡片 hover 保留，长内容卡片内部滚动，图片 / 视频媒体展示与 lightbox / modal。
- 已把页面内容回正为“AI Agent 工作流发布会”主题。
- 已把默认 tone 改为 `agent-lab`，无参数链接等价于 Original Agent Skill Lab Palette。
- 已读取并参考早期项目 `/Users/water/Documents/系统操作/agent-skill-html-deck`，提取其 deep navy、cyan、violet、mint 和 hover 语言作为默认色彩母版。
- 已保留 `?tone=champagne` 作为可选黑金版本，并隔离 `visual` / `aurora` 实验增强版，避免污染默认链接。
- 已补充 cyan、teal、electric blue、muted violet、indigo、mint、soft coral 的 token 化 palette，并让背景、Agenda、Progress、卡片和图表共享这套变量。
- 已保留 mesh / halo / ribbon / aurora 背景层，但默认色彩回到旧项目母版的左 cyan / 右 violet 深蓝黑空间感。
- 已把外层背景进一步压回更深的 blue-black，stage 和 card surface 保持略亮一级，避免默认页变成纯黑平面。
- 已把 topbar、Agenda、stage、progress 的 spacing 抽成 layout token，并缩短 topbar 到舞台的距离，优先服务 1366x768 / 1440x900 演示场景。
- 已新增 `ScrollableCard`，让单张过长卡片内部滚动，不破坏 16:9 stage。
- 已新增 `src/deck/media/MediaPreview.tsx`，提供图片 lightbox 与视频占位控制示例，并处理媒体弹层与键盘翻页的优先级。
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
4. 检查 topbar 到舞台的上方留白是否已减少，16:9 frame 是否更高，且没有使用整体 `scale()` / `zoom`。
5. 检查 Pinned Agenda 是否双栏回流，右侧内容是否仍可读，页面级是否无滚动。
6. 检查卡片、按钮、Agenda item、图表卡和系统节点 hover 是否有明显但克制的高级反馈，且不跳布局。
7. 检查长内容卡片是否只在卡片内部滚动，滚动条和 focus 状态是否精致。
8. 检查图片 lightbox 和视频放大弹层是否高于 Agenda / topbar / progress，且弹层打开时不会误触发方向键翻页。
9. 再检查 `?tone=champagne`、`?theme=visual`、`?tone=aurora`、`?theme=visual&tone=aurora` 是否仍可作为实验增强版打开。
10. 任何新功能先保护默认主题，再考虑实验增强版。

## 2026-06-25 Windows 设计增强落地

- 已参考 `html-presentation-deck`、`ui-ux-pro-max` 和 `frontend-design` 做本轮 Design QA。
- 已同步并推送 `html-presentation-deck` skill 到 `https://github.com/water-nn/html-presentation-deck-skill`，新增 `Equal Height Agenda Stage Rule`、`Media Lightbox Implementation Rule`、`Long Content Scrollable Card Example Rule`、`Outer Background Depth Rule`。
- 已把 Agenda / stage / slide-frame 的垂直布局统一到 `--panel-gap`、`--deck-panel-top`、`--deck-panel-bottom`、`--deck-panel-height` 等共享 token。
- 已确认 normal / pinned / simulated fullscreen viewport 下，`slide-frame` computed transform 为 `none`，不使用整体 `scale()` / `zoom` 作为主适配方案。
- 已把第 9 页改成真实媒体展示页：图片使用真实 `img` 资源并支持 lightbox；视频使用本地 `public/media/agent-workflow-demo.webm`，支持播放、暂停、进度、音量和 modal 放大。
- 已把第 12 页改成 4 张等高滚动卡片示例，第 2 张完整放入长文本，只在卡片内部滚动，页面级无滚动。
- 已把外层背景进一步压深为 deep navy / blue-black，同时保留 cyan / violet / mint 光效和动态背景层。
- 已运行 `npm run build` 并通过。
- 已用本地 Vite + headless Chrome 验证：1366x768、1440x900、1920x1080 normal/pinned 均无页面级滚动；Agenda、stage、slide-frame 高度对齐；第 9 页图片/视频弹层阻止误翻页；第 12 页长卡片内部滚动；`?tone=champagne` 和 `?tone=aurora` 可打开且无 console error。

## 2026-06-25 Windows responsive media modal and video controls fix

- 已使用 `html-presentation-deck` 作为主 skill，并参考 `ui-ux-pro-max`、`frontend-design` 做 Design QA。
- 已访问参考站点 `https://blac-t.github.io/Demo/`，只参考媒体页、图片放大、内部滚动和视频交互逻辑，不复制主题、内容或品牌。
- 已修复固定 Agenda 后右侧舞台宽度适配：`.deck-stage` / `.slide-frame` 使用剩余空间 `width: 100%`、`height: 100%`，computed transform 为 `none`。
- 已修复 Agenda 横向滚动：`agenda-panel` / `agenda-items` / `agenda-item` 使用 `min-width: 0`、ellipsis、`overflow-x` final guard；长标题通过 body-level tooltip 展示完整文案。
- 已建立卡片安全内边距 token：`--card-padding-sm`、`--card-padding-md`、`--card-padding-lg`、`--card-content-gap`。
- 已重构 `MediaPreview.tsx`：图片 lightbox 和视频 modal 均渲染到 `.deck-app` 内的 `#deck-modal-root`，`position: fixed`，`z-index: 99999`，居中显示，支持 overlay / close icon / Esc 关闭，并阻止方向键误翻页。
- 已增强视频控件：播放/暂停、当前/总时长、进度条、音量悬浮竖向滑杆、放大 modal、More 菜单、下载、0.5x / 1x / 1.5x / 2x / 3x 倍速、PiP fallback。倍速会真实更新 `playbackRate`。
- 已用本地 Vite + Chrome DevTools Protocol 验证：1440x900 与 1920x1080 下舞台宽度填满、无整体缩放、Agenda 无横向滚动、tooltip 存在且 z-index 10000、媒体卡片等高、图片/视频 contain、image modal / video modal 位于 `#deck-modal-root`、2x 倍速生效、PiP 被浏览器拦截时显示 fallback。
- 已运行 `npm run build` 并通过。
- 后续仍建议人工打开远程链接做最终视觉 QA，尤其检查现场演讲距离下标题大小、媒体页信息密度和视频 More 菜单位置。

## 2026-06-26 Fullscreen media modal, icon video controls, chart tooltip fix

- 本轮继续使用 `html-presentation-deck` 作为主 skill，并参考本机 `ui-ux-pro-max` 与 `frontend-design` 做 Design QA。
- 已把 `html-presentation-deck` skill 同步新增规则：`Fullscreen Media Modal Rule`、`Video Controls Popover Rule`、`Video Controls Icon Rule`、`Single Agenda Tooltip Rule`、`Scroll Fade Mask Quality Rule`、`Slide Header Width Rule`、`Chart Tooltip Interaction Rule`、`Deeper Page Background Rule`。
- 第 9 页图片 lightbox 现在渲染到 `.deck-app` 内的 `#deck-modal-root`，普通窗口与全屏上下文都应保持居中，层级高于 Agenda / topbar / progress。
- 视频控制栏已 icon 化并中文化：不再显示 `Play / Pause / Vol / Max / More / Close / Download / Speed / PiP` 等英文按钮文字；icon 按钮保留 `aria-label` 和 `title`。
- More 菜单 hover / focus 向上浮出，中文显示下载、播放速度、倍速和画中画。
- 音量控件 hover / focus 时显示一体化竖向 slider popover。
- 图片 / 视频 modal 关闭按钮改为 icon close，`aria-label="关闭"`，`title="关闭"`。
- Agenda item 已移除原生 `title`，避免与自定义 tooltip 叠加成双 tooltip。
- 第 12 页滚动卡片 fade mask 改为克制主题色渐变，避免黑色硬矩形。
- slide header 与结尾大标题放宽到内容宽度，避免过窄换行。
- 图表组件新增轻量 hover tooltip：bar、horizontal bar、line point、donut segment 都可显示标签、系列和值。
- 外层 HTML / body / root 背景继续加深为 deep navy / blue-black。
- 本轮本地 Chrome 验证结果：第 9 页英文按钮文字为空、视频按钮均有中文 aria/title、图片 modal 居中且图片在 panel 内、视频 modal 居中且关闭后暂停、More 菜单中文、Agenda tooltip 只有一个、图表 tooltip 存在、页面无 console error。
