@echo off
chcp 65001 >nul
title Centros Diurnos SENAMA
cd /d "%~dp0"
npx electron .
