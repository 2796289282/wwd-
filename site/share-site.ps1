$ErrorActionPreference = "Stop"

$workspace = Split-Path -Parent $MyInvocation.MyCommand.Path
$python = "C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
$ssh = "C:\Windows\System32\OpenSSH\ssh.exe"
$port = 8765

$serverPidFile = Join-Path $workspace ".server.pid"
$tunnelPidFile = Join-Path $workspace ".tunnel.pid"
$tunnelOut = Join-Path $workspace ".tunnel.out.log"
$tunnelErr = Join-Path $workspace ".tunnel.err.log"

function Stop-SavedProcess($pidFile) {
  if (-not (Test-Path $pidFile)) {
    return
  }

  $savedPid = Get-Content $pidFile -ErrorAction SilentlyContinue
  if ($savedPid) {
    Stop-Process -Id ([int]$savedPid) -Force -ErrorAction SilentlyContinue
  }
}

Write-Host ""
Write-Host "Starting the website..." -ForegroundColor Cyan

Stop-SavedProcess $serverPidFile
Stop-SavedProcess $tunnelPidFile
Remove-Item $tunnelOut, $tunnelErr -Force -ErrorAction SilentlyContinue

$server = Start-Process `
  -FilePath $python `
  -ArgumentList @("-m", "http.server", "$port", "--bind", "127.0.0.1") `
  -WorkingDirectory $workspace `
  -WindowStyle Hidden `
  -PassThru
Set-Content -LiteralPath $serverPidFile -Value $server.Id

Start-Sleep -Seconds 1
$localStatus = curl.exe -sS -o NUL -w "%{http_code}" "http://127.0.0.1:$port/"
if ($localStatus -ne "200") {
  throw "The local website failed to start."
}

$sshArguments = @(
  "-o", "StrictHostKeyChecking=accept-new",
  "-o", "ExitOnForwardFailure=yes",
  "-o", "ServerAliveInterval=20",
  "-o", "ServerAliveCountMax=6",
  "-R", "80:127.0.0.1:$port",
  "nokey@localhost.run"
)

$tunnel = Start-Process `
  -FilePath $ssh `
  -ArgumentList $sshArguments `
  -WindowStyle Hidden `
  -RedirectStandardOutput $tunnelOut `
  -RedirectStandardError $tunnelErr `
  -PassThru
Set-Content -LiteralPath $tunnelPidFile -Value $tunnel.Id

$publicUrl = $null
for ($attempt = 0; $attempt -lt 20; $attempt++) {
  Start-Sleep -Seconds 1
  $logs =
    (Get-Content -Raw $tunnelOut -ErrorAction SilentlyContinue) +
    (Get-Content -Raw $tunnelErr -ErrorAction SilentlyContinue)
  $publicUrl = [regex]::Match($logs, "https://[a-z0-9]+\.lhr\.life").Value
  if ($publicUrl) {
    break
  }
}

if (-not $publicUrl) {
  throw "No public URL was received. Please run this file again."
}

$publicStatus = $null
for ($attempt = 0; $attempt -lt 5; $attempt++) {
  $publicStatus = curl.exe -L --max-time 15 -sS -o NUL -w "%{http_code}" $publicUrl
  if ($publicStatus -eq "200") {
    break
  }
  Start-Sleep -Seconds 2
}

if ($publicStatus -ne "200") {
  throw "The URL was created but is not ready. Please run this file again."
}

Set-Clipboard -Value $publicUrl

Write-Host ""
Write-Host "The share URL is ready and copied to your clipboard:" -ForegroundColor Green
Write-Host ""
Write-Host $publicUrl -ForegroundColor Yellow
Write-Host ""
Write-Host "Paste it directly into WeChat." -ForegroundColor Green
Write-Host "Keep this computer powered on and connected to the internet." -ForegroundColor DarkYellow
Write-Host ""
Read-Host "Press Enter to close this window (sharing will keep running)"
