param(
  [Parameter(Mandatory = $true)]
  [string]$TargetPath,
  [Parameter(Mandatory = $true)]
  [string]$Prompt
)

$raw = gemini -m gemini-2.5-flash --approval-mode plan -p $Prompt -o text 2>&1 | Out-String

$htmlMatch = [regex]::Match($raw, '(?s)<!DOCTYPE html.*?</html>')
if (-not $htmlMatch.Success) {
  $htmlMatch = [regex]::Match($raw, '(?s)<html.*?</html>')
}

if (-not $htmlMatch.Success) {
  throw "No HTML found in Gemini output."
}

$dir = Split-Path -Parent $TargetPath
if (-not (Test-Path $dir)) {
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

Set-Content -Path $TargetPath -Value $htmlMatch.Value -Encoding UTF8
Write-Output "Saved $TargetPath"
