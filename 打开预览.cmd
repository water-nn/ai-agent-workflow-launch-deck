@echo off
chcp 65001 >nul
cd /d "%~dp0"
title AI Agent 工作流发布会 - 本地预览

echo ==============================================
echo  AI Agent 工作流发布会 - 本地预览
echo ==============================================
echo.
echo 请不要关闭这个黑色窗口。
echo 它负责启动本地网页服务；关闭窗口后，浏览器预览也会停止。
echo.

where npm >nul 2>nul
if errorlevel 1 (
  echo 没有检测到 npm。请先安装 Node.js，再重新双击本文件。
  echo 下载地址：https://nodejs.org/
  pause
  exit /b 1
)

if not exist node_modules (
  echo 第一次打开需要安装项目依赖，请稍等...
  call npm install
  if errorlevel 1 (
    echo 依赖安装失败。请检查网络后重新双击本文件。
    pause
    exit /b 1
  )
)

powershell -ExecutionPolicy Bypass -File "%~dp0preview.ps1"
pause
