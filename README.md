# AI Agent 工作流发布会

一套网页式 PPT / HTML Presentation Deck，正式主题是：

**AI Agent 工作流发布会：从工具调用到自动化协作系统**

它使用 React + Vite + TypeScript 构建，支持键盘翻页、全屏、hover 目录、进度条、动态背景、图表组件、本地双击预览、浏览器打印 PDF，以及 GitHub Pages 部署。

默认版本必须服务一场高级科技产品发布会：讲清楚 Agent Skill 如何扩展 Codex，把一次性任务变成可复用工作流，并通过 GitHub、`PROJECT_STATUS.md` 和 GitHub Pages 支持跨设备接续。

## 本地预览

macOS：双击 `打开预览.command`。

Windows：双击 `打开预览.cmd`。

黑色命令窗口不要关闭，它负责启动本地预览服务。浏览器会自动打开。

## 修改内容

主要修改：

```text
src/slides.tsx
```

新手建议先只改这个文件。详细说明见 `如何修改内容.md`。

长内容卡片和媒体示例相关文件：

```text
src/deck/layouts/SlideBlocks.tsx
src/deck/media/MediaPreview.tsx
```

`ScrollableCard` 用于单张卡片内部滚动，保持页面级无滚动。`MediaImage` / `MediaVideo` 用于图片放大、视频控制和媒体弹层示例。

## 远程访问链接

```text
https://water-nn.github.io/ai-agent-workflow-launch-deck/
```

## 主题和色调

默认推荐版是：

```text
Original Agent Skill Lab Palette / agent-lab
```

默认主题是 `editorial`，默认色调是 `agent-lab`。这套配色从早期本地项目 `/Users/water/Documents/系统操作/agent-skill-html-deck` 提炼而来，只参考旧项目的色彩、光感、Agenda 和 hover 质感，不复制旧项目排版。

默认视觉必须像成熟 AI 产品发布会，而不是普通 dashboard、随机 neon 模板、黑金金融路演或冷灰网页模板。`agent-lab` 使用 deep navy / blue black 大背景，左上 cyan / teal 光感，右侧 muted violet / indigo 空间光，深蓝黑玻璃主舞台，cyan / teal Agenda active state，以及 cyan / mint / violet 进度条和卡片 hover。`visual` / `aurora` 只作为实验增强版，不能反向影响默认主题。

可选黑金色调：

```text
https://water-nn.github.io/ai-agent-workflow-launch-deck/?tone=champagne
```

实验增强版可视化主题：

```text
https://water-nn.github.io/ai-agent-workflow-launch-deck/?theme=visual
```

实验增强版石墨极光色调：

```text
https://water-nn.github.io/ai-agent-workflow-launch-deck/?tone=aurora
```

实验增强版可视化主题 + 石墨极光：

```text
https://water-nn.github.io/ai-agent-workflow-launch-deck/?theme=visual&tone=aurora
```

当前项目已实现：

- `tone=agent-lab`：Original Agent Skill Lab Palette / 早期 `agent-skill-html-deck` 色彩母版，正式推荐版，也是无参数默认链接。
- `tone=champagne`：Obsidian Champagne / 黑曜香槟，只作为可选黑金实验版。
- `tone=aurora`：Graphite Aurora / 石墨极光，只作为实验增强版。

`?tone=champagne`、`?theme=visual` 与 `?tone=aurora` 不能反向影响默认链接。默认链接永远优先保证接近旧项目母版的 cyan / teal / violet 深色科技感，不是黑金主导，不是沉闷冷灰，也不是被 token 规则限制住的模板感。

规划中的 tone 名称还包括：Ink Cyan / 墨黑青蓝、Velvet Burgundy / 丝绒酒红、Porcelain Editorial / 象牙杂志、Sandstone Gallery / 沙岩展厅、Mono Museum / 黑白美术馆、Signal Lime / 信号青柠。

## 导航交互

左侧 Agenda 默认是窄导航栏。鼠标 hover 时，它会作为半透明浮层展开，不会推动主舞台，也不会让幻灯片跳动。

点击底部 `PIN` 控件后，Agenda 会固定展开。只有固定状态下，主舞台才会向右轻微缩进并在剩余空间内重新居中。固定后按钮显示 `ON`，再次点击可取消固定。

Pinned Agenda 是双栏布局模式，不是整张幻灯片缩小模式。固定目录后，右侧舞台会在剩余空间里重新回流：网格、图表和卡片通过 responsive layout 适配，不能使用整体 `scale()` / `zoom` 把 16:9 画布压小。

## 视觉和动效

动态背景强度在 `src/styles.css` 顶部变量中调整：

```css
--surface-0
--surface-1
--surface-2
--surface-3
--surface-border
--surface-glow
--hover-surface
--hover-border
--hover-glow
--hover-lift
--color-accent-primary
--color-accent-secondary
--color-accent-tertiary
--color-accent-warm
--color-accent-success
--color-accent-risk
--chart-color-1 ... --chart-color-6
--bg-motion-opacity
--bg-glow-opacity
--bg-sweep-opacity
--bg-particle-opacity
```

布局空间也通过 `src/styles.css` 顶部 token 管理：

```css
--app-safe-x
--app-safe-y
--topbar-height
--topbar-to-stage-gap
--stage-bottom-gap
--progress-height
--stage-radius
--agenda-width
--stage-left
--stage-right
--stage-top
--stage-bottom
```

当前默认版已把外层背景压回更深的 blue-black，并缩短 topbar 到 16:9 舞台的距离，让 `1366x768` 和 `1440x900` 下的内容显示区更高。不要用整体 `scale()` / `zoom` 解决舞台空间问题；优先调整这些 layout token。

默认背景使用多层 radial / conic / linear gradients、超大 halo、斜向 ribbon、低透明网格和柔和 aurora 建立旧项目式深色空间感。顶部、底部和左右边缘不能出现黑色硬边。卡片、按钮、Agenda item、图表卡和架构节点共享同一套 hover 语言：轻微上浮、约 1.008 微放大、surface 提亮、边框变细腻、低透明 cyan / violet glow 增强，并支持 `prefers-reduced-motion: reduce`。

本轮视觉重设计参考了 `ui-ux-pro-max` 和 `frontend-design`：优先以真实观感判断是否像高级 AI 产品发布会，而不是机械检查 token 是否存在。

图表入场动效在 `src/deck/charts/` 和 `src/deck/controls/Progress.tsx` 中实现。进入图表页时，柱状图、横向条、折线、环形图、数字指标和进度条会播放入场动效。系统开启 reduced motion 时，动效会降低或直接显示最终值。

## 长内容卡片和媒体

当前项目在 Design QA 页加入了 `ScrollableCard` 示例：页面、stage 和 slide frame 不滚动，只有过长卡片内部滚动。滚动区域使用细滚动条和底部 fade，适合较长检查清单、代码摘录或资料说明。

Deck 能力页加入了媒体能力示例：图片 / 截图预览可点击放大，视频占位支持播放、暂停、进度、音量和放大。弹层打开时会高于 Agenda、topbar 和进度条，并暂时阻止方向键翻页；`Esc` 会先关闭弹层，关闭后恢复正常 slide navigation。

## 更新远程页面

```bash
npm run build
git add .
git commit -m "Update presentation content"
git push
```

push 后 GitHub Actions 会自动更新 GitHub Pages。

## 多设备交接

跨设备继续项目时，先读：

```text
PROJECT_STATUS.md
```

它记录当前主题、稳定链接、默认视觉基线、六幕叙事结构和下一次接手建议。

## 导出 PDF

打开本地预览或远程链接后，在浏览器里按 `Command + P` 或 `Ctrl + P`，选择“保存为 PDF”。建议横向打印，并关闭页眉页脚。

## 常见问题

如果远程页面空白，优先检查 `vite.config.ts` 的 `base`：

```ts
base: '/ai-agent-workflow-launch-deck/'
```

图表页不要堆太多组件。每页应服务一个数据结论，保留足够留白，避免 dashboard 拼贴感。左右布局要看视觉重量，而不是机械地一边文字一边卡片。装饰性英文标签必须放在 safe area，不能压住正文、图表或卡片。
