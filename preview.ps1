$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "=============================================="
Write-Host " AI Agent 工作流发布会 - 本地预览"
Write-Host "=============================================="
Write-Host ""
Write-Host "请不要关闭这个黑色窗口。关闭后浏览器预览会停止。"
Write-Host ""

$port = 5173
while ($true) {
  $used = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
  if (-not $used) { break }
  $port += 1
}

$url = "http://127.0.0.1:$port/ai-agent-workflow-launch-deck/"
Write-Host "正在启动预览服务，端口：$port"
Write-Host "浏览器即将自动打开：$url"
Start-Process $url
npm run dev -- --port $port
