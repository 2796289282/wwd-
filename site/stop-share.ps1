$workspace = Split-Path -Parent $MyInvocation.MyCommand.Path

foreach ($name in @(".server.pid", ".tunnel.pid")) {
  $pidFile = Join-Path $workspace $name
  if (Test-Path $pidFile) {
    $savedPid = Get-Content $pidFile -ErrorAction SilentlyContinue
    if ($savedPid) {
      Stop-Process -Id ([int]$savedPid) -Force -ErrorAction SilentlyContinue
    }
    Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
  }
}

Write-Host ""
Write-Host "Website sharing has stopped." -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to close this window"
