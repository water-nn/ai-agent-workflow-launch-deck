# AI Agent 工作流发布会

一套网页式 PPT / HTML Presentation Deck，主题是：

**AI Agent 工作流发布会：从工具调用到自动化协作系统**

它使用 React + Vite + TypeScript 构建，支持键盘翻页、全屏、hover 目录、进度条、动态背景、图表组件、本地双击预览、浏览器打印 PDF，以及 GitHub Pages 部署。

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

默认主题是 `editorial`，默认色调是 `Obsidian Champagne / 黑曜香槟`。

默认风格是稳定推荐版：**Default Premium Dark Tech Baseline / 高级深色科技视觉基准**。它优先保证统一、克制、清晰和发布会质感。

`visual` 与 `aurora` 是实验增强版，用于探索更强的系统图、极光动效和技术感，不应影响默认主题。

可视化主题，实验增强版：

```text
https://water-nn.github.io/ai-agent-workflow-launch-deck/?theme=visual
```

石墨极光色调，实验增强版：

```text
https://water-nn.github.io/ai-agent-workflow-launch-deck/?tone=aurora
```

可视化主题 + 石墨极光，实验增强版：

```text
https://water-nn.github.io/ai-agent-workflow-launch-deck/?theme=visual&tone=aurora
```

当前项目已实现：

- `tone=champagne`：Obsidian Champagne / 黑曜香槟，当前默认稳定推荐版。
- `tone=aurora`：Graphite Aurora / 石墨极光，实验增强版，适合 AI Agent、系统图和技术架构。

规划中的 tone 名称还包括：Ink Cyan / 墨黑青蓝、Velvet Burgundy / 丝绒酒红、Porcelain Editorial / 象牙杂志、Sandstone Gallery / 沙岩展厅、Mono Museum / 黑白美术馆、Signal Lime / 信号青柠。

## 导航交互

左侧 Agenda 默认是窄导航栏。鼠标 hover 时，它会作为半透明浮层展开，不会推动主舞台，也不会让幻灯片跳动。

点击底部 `Pin` 控件后，Agenda 会固定展开。只有固定状态下，主舞台才会向右轻微缩进并在剩余空间内重新居中。再次点击 `Pinned` 可取消固定。

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

## 导出 PDF

打开本地预览或远程链接后，在浏览器里按 `Command + P` 或 `Ctrl + P`，选择“保存为 PDF”。建议横向打印，并关闭页眉页脚。

## 常见问题

如果远程页面空白，优先检查 `vite.config.ts` 的 `base`：

```ts
base: '/ai-agent-workflow-launch-deck/'
```

图表页不要堆太多组件。每页应服务一个数据结论，保留足够留白，避免 dashboard 拼贴感。左右布局要看视觉重量，而不是机械地一边文字一边卡片。装饰性英文标签必须放在 safe area，不能压住正文、图表或卡片。
