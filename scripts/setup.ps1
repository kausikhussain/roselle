# ROSELLE — Environment Setup Script (Windows PowerShell)
Write-Host "=========================================" -ForegroundColor Magenta
Write-Host "  ROSELLE — Haute Digital Atelier Setup" -ForegroundColor White
Write-Host "=========================================" -ForegroundColor Magenta

# Check Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
}

Write-Host "[1/3] Node runtime: $(node -v)" -ForegroundColor Green
Write-Host "[2/3] Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host "[3/3] Setting up local environment..." -ForegroundColor Yellow
if (-not (Test-Path ".env.local")) {
    Copy-Item ".env.example" ".env.local"
    Write-Host "Created .env.local from .env.example" -ForegroundColor Green
} else {
    Write-Host ".env.local already exists" -ForegroundColor Gray
}

Write-Host "`nSetup complete! Run .\scripts\start.ps1 to launch development server." -ForegroundColor Magenta
