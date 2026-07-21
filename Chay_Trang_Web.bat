@echo off
title Khoi dong Sau Tim Tro - Localhost (HTML 100%)
echo ======================================================
echo   DANG KHOI DONG BAN HTML (Xem_Trang_Web.html)
echo ======================================================
echo.

cd /d "%~dp0"

echo [1/3] Chuan bi public/index.html tu Xem_Trang_Web.html...
call node scripts/prepare-static.mjs
if %errorlevel% neq 0 (
    echo [LOI] Can Node.js de chuan bi site.
    echo Tai Node.js: https://nodejs.org
    pause
    exit /b 1
)

echo [2/3] Mo trinh duyet...
timeout /t 2 /nobreak > nul
start "" "http://localhost:3000"

echo [3/3] Dang chay static server (public/)...
echo.
echo Nhan Ctrl + C de tat server.
echo ------------------------------------------------------
echo.

call npx --yes serve public -l 3000
if %errorlevel% neq 0 (
    echo.
    echo ======================================================
    echo [LOI] Khong the khoi dong server!
    echo Thu: npm run dev
    echo ======================================================
)
pause
