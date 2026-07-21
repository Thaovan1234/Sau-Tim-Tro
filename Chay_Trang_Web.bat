@echo off
title Khoi dong Sau Tim Tro - Localhost
echo ======================================================
echo       DANG KHOI DONG SERVER SAU TIM TRO...
echo ======================================================
echo.

cd /d "%~dp0"

echo [1/2] Dang mo trinh duyet web...
timeout /t 2 /nobreak > nul
start "" "http://localhost:3000"

echo [2/2] Dang chay server...
echo.
echo Nhan Ctrl + C de tat server.
echo ------------------------------------------------------
echo.

call npm run dev
if %errorlevel% neq 0 (
    echo [Luu y] Dang thu chay bang Bun...
    call bun dev
)

if %errorlevel% neq 0 (
    echo.
    echo ======================================================
    echo [LOI] Khong the khoi dong server!
    echo Vui long dam bao ban da cai dat Node.js hoac Bun tren may.
    echo Tai Node.js tai: https://nodejs.org
    echo ======================================================
)
pause
