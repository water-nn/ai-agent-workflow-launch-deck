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

## 远程访问链接

```text
https://water-nn.github.io/ai-agent-workflow-launch-deck/
```

## 主题和色调

默认推荐版是：

```text
Original Dark Tech Baseline
```

默认主题是 `editorial`，默认色调是 `Deep Slate Tech / 深石墨科技`。它使用深石墨 / 深蓝黑背景、冷灰正文和低饱和青蓝主强调色。

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

- `tone=slate`：Deep Slate Tech / 深石墨科技，正式推荐版，也是无参数默认链接。
- `tone=champagne`：Obsidian Champagne / 黑曜香槟，只作为可选黑金实验版。
- `tone=aurora`：Graphite Aurora / 石墨极光，只作为实验增强版。

`?tone=champagne`、`?theme=visual` 与 `?tone=aurora` 不能反向影响默认链接。默认链接永远优先保证冷静、统一、可演讲。

规划中的 tone 名称还包括：Ink Cyan / 墨黑青蓝、Velvet Burgundy / 丝绒酒红、Porcelain Editorial / 象牙杂志、Sandstone Gallery / 沙岩展厅、Mono Museum / 黑白美术馆、Signal Lime / 信号青柠。

## 导航交互

左侧 Agenda 默认是窄导航栏。鼠标 hover 时，它会作为半透明浮层展开，不会推动主舞台，也不会让幻灯片跳动。

点击底部 `PIN` 控件后，Agenda 会固定展开。只有固定状态下，主舞台才会向右轻微缩进并在剩余空间内重新居中。固定后按钮显示 `ON`，再次点击可取消固定。

## 视觉和动效

动态背景强度在 `src/styles.css` 顶部变量中调整：

```css
--bg-motion-opacity
--bg-glow-opacity
--bg-sweep-opacity
--bg-particle-opacity
```

图表入场动效在 `src/deck/charts/` 和 `src/deck/controls/Progress.tsx` 中实现。进入图表页时，柱状图、横向条、折线、环形图、数字指标和进度条会播放入场动效。系统开启 reduced motion 时，动效会降低或直接显示最终值。

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
