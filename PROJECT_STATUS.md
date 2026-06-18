# PROJECT_STATUS

## 当前项目目标

把 `ai-agent-workflow-launch-deck` 维护成一套可远程访问、可本地双击预览、可持续迭代的网页式 PPT，用于展示“AI Agent 工作流发布会：从工具调用到自动化协作系统”。

## 当前远程链接

默认主题：

`https://water-nn.github.io/ai-agent-workflow-launch-deck/`

visual 实验主题：

`https://water-nn.github.io/ai-agent-workflow-launch-deck/?theme=visual`

aurora 实验色调：

`https://water-nn.github.io/ai-agent-workflow-launch-deck/?tone=aurora`

visual + aurora：

`https://water-nn.github.io/ai-agent-workflow-launch-deck/?theme=visual&tone=aurora`

## 当前默认主题状态

默认主题已回正为 `Default Premium Dark Tech Baseline`：

- 深黑 / 石墨黑背景
- 暖灰正文
- 香槟金作为唯一主强调色
- 低饱和青灰作为辅助色
- 背景、卡片、按钮、导航、图表、进度条共享同一套 token
- 动态背景克制可见，不抢正文
- 默认主题不应被 visual / aurora 污染

## 当前 theme / tone 状态

- 默认：`theme=editorial` + `tone=champagne`
- `?theme=visual`：实验增强主题，保留但不作为默认视觉基准
- `?tone=aurora`：实验增强色调，保留但不污染默认主题
- `?theme=visual&tone=aurora`：实验组合，允许更强技术视觉

## 已完成功能

- React + Vite + TypeScript
- 本地双击预览：`打开预览.cmd` / `打开预览.command`
- GitHub Pages 部署
- Agenda / hover 导航
- Pin 导航
- 键盘上下左右翻页
- 全屏按钮
- 进度条
- 打印 PDF
- 图表入场动效
- theme / tone query 参数
- README / 如何修改内容 / 部署说明

## 当前主要问题

本轮之前的问题是：功能持续增加后，默认色调出现混乱，视觉不如初版“高级深色科技演示页”统一。

本轮已将默认主题收敛回稳定基准。后续如果继续增加功能、tone、图表、导航或动效，必须先检查默认链接是否仍然统一、高级、克制。

## 本轮修改摘要

- 安装 / 更新 `html-presentation-deck` skill。
- 同步 Windows 本地项目仓库。
- 建立 `Default Premium Dark Tech Baseline` 默认视觉基准。
- 将默认主题的背景、卡片、按钮、导航、图表、进度条统一到同一套 token。
- 将 donut chart 示例颜色改为 `--chart-*` token。
- 更新 README 中默认稳定版与实验增强版的说明。
- 新增本文件作为 Mac / Windows 两台电脑交接状态。

## 下一步建议

1. 人工打开默认远程链接，做审美复查。
2. 对比 `?theme=visual` 和 `?tone=aurora`，确认它们没有污染默认主题。
3. 如果默认仍显得花，继续降低 `src/styles.css` 中默认 baseline 的背景动效透明度。
4. 后续新增功能前，先确认不会破坏默认视觉基准。

## 不要重复踩的坑

- 不要为了展示很多 tone，把默认页面变成多色拼贴。
- 不要让蓝、绿、紫、金同时抢主色。
- 不要让图表、背景、导航、卡片各用一套颜色。
- 不要把 build 通过当成视觉合格。
- 不要新增功能后忘记回看默认远程链接。

## 本机宠物说明

右下角金毛是用户本机桌面宠物，不属于网页项目，也不应被当作网页视觉问题处理。
