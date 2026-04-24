@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion
cd /d "%~dp0"

title Centros Diurnos SENAMA — Construyendo instalador...

echo.
echo  ╔══════════════════════════════════════════════════╗
echo  ║   Centros Diurnos SENAMA — Generador de Setup   ║
echo  ╚══════════════════════════════════════════════════╝
echo.

:: ── 1. Verificar Node.js ──────────────────────────────────
echo  [1/6] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Node.js no esta instalado.
    echo  Descargalo desde: https://nodejs.org/es/download
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%v in ('node --version') do set NODE_VER=%%v
echo         Node.js %NODE_VER% detectado. OK

:: ── 2. Generar icono ──────────────────────────────────────
echo.
echo  [2/6] Generando icono de la aplicacion...
if not exist "assets" mkdir assets
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\generar-icono.ps1"
if %errorlevel% neq 0 (
    echo  [AVISO] Icono no generado, se usara el icono por defecto.
)

:: ── 3. Instalar dependencias ──────────────────────────────
echo.
echo  [3/6] Instalando dependencias npm...
echo        (Puede tardar varios minutos la primera vez)
call npm install 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] Fallo npm install.
    pause & exit /b 1
)

:: ── 4. Empaquetar aplicacion ──────────────────────────────
echo.
echo  [4/6] Empaquetando aplicacion para Windows x64...
echo        (La primera vez descarga Electron ~115MB)
echo.
set CSC_IDENTITY_AUTO_DISCOVERY=false
set SIGNTOOL_PATH=signtool.exe
call npx electron-builder --win --dir --x64 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Fallo el empaquetado.
    echo.
    pause & exit /b 1
)

:: ── 5. Crear instalador NSIS ──────────────────────────────
echo.
echo  [5/6] Creando instalador .exe...
set CSC_IDENTITY_AUTO_DISCOVERY=false
set SIGNTOOL_PATH=signtool.exe
call npx electron-builder --win nsis --prepackaged dist\win-unpacked --x64 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Fallo la creacion del instalador.
    echo.
    pause & exit /b 1
)

:: ── 6. Resultado ──────────────────────────────────────────
set INSTALLER=
for %%f in ("%~dp0dist\*.exe") do (
    echo %%f | find /i "Setup" >nul && set INSTALLER=%%~nxf
)

echo.
echo  ╔══════════════════════════════════════════════════╗
echo  ║              INSTALADOR CREADO                   ║
echo  ╠══════════════════════════════════════════════════╣
echo  ║  Archivo: dist\!INSTALLER!
echo  ╚══════════════════════════════════════════════════╝
echo.
echo  Ejecuta ese .exe en cualquier PC con Windows
echo  para instalar Centros Diurnos SENAMA.
echo.
explorer "%~dp0dist"
pause
