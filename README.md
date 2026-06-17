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
