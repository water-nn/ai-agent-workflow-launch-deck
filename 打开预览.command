#!/bin/zsh
cd "$(dirname "$0")"

echo "=============================================="
echo " AI Agent 工作流发布会 - 本地预览"
echo "=============================================="
echo ""
echo "请不要关闭这个黑色窗口。"
echo "它负责启动本地网页服务；关闭窗口后，浏览器预览也会停止。"
echo ""

if ! command -v npm >/dev/null 2>&1; then
  echo "没有检测到 npm。请先安装 Node.js，再重新双击本文件。"
  echo "下载地址：https://nodejs.org/"
  read -r "?按回车键退出..."
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "第一次打开需要安装项目依赖，请稍等..."
  npm install
  if [ $? -ne 0 ]; then
    echo "依赖安装失败。请检查网络后重新双击本文件。"
    read -r "?按回车键退出..."
    exit 1
  fi
fi

PORT=5173
while lsof -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; do
  PORT=$((PORT + 1))
done

URL="http://127.0.0.1:$PORT/ai-agent-workflow-launch-deck/"
echo "正在启动预览服务，端口：$PORT"
echo "浏览器即将自动打开：$URL"
echo ""
open "$URL"
npm run dev -- --port "$PORT"

echo ""
echo "预览服务已停止。"
read -r "?按回车键退出..."
