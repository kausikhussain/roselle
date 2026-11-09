# ROSELLE — Quality & Production Verification Script (Windows PowerShell)
Write-Host "=========================================" -ForegroundColor Magenta
Write-Host "  ROSELLE — Verification & Integrity Check" -ForegroundColor White
Write-Host "=========================================" -ForegroundColor Magenta

Write-Host "`n[1/3] Type-checking TypeScript..." -ForegroundColor Yellow
npm run check
if ($LASTEXITCODE -ne 0) {
    Write-Error "TypeScript check failed!"
    exit 1
}
Write-Host "✓ TypeScript check passed." -ForegroundColor Green

Write-Host "`n[2/3] Building production bundle..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Production build failed!"
    exit 1
}
Write-Host "✓ Production build passed." -ForegroundColor Green

Write-Host "`n[3/3] All checks passed successfully!" -ForegroundColor Magenta
