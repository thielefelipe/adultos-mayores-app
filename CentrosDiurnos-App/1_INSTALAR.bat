@echo off
chcp 65001 >nul
title Centros Diurnos SENAMA — Instalando dependencias...
cd /d "%~dp0"

echo.
echo  ╔══════════════════════════════════════════════════╗
echo  ║   Centros Diurnos SENAMA — Instalacion          ║
echo  ╚══════════════════════════════════════════════════╝
echo.

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] Node.js no esta instalado.
    echo  Descargalo desde: https://nodejs.org/es/download
    pause
    exit /b 1
)

echo  Instalando dependencias npm...
call npm install
if %errorlevel% neq 0 (
    echo  [ERROR] Fallo la instalacion.
    pause
    exit /b 1
)

echo.
echo  ╔══════════════════════════════════════════════════╗
echo  ║  Instalacion completada.                        ║
echo  ║  Ejecuta 2_INICIAR.bat para abrir la app.       ║
echo  ╚══════════════════════════════════════════════════╝
echo.
pause
