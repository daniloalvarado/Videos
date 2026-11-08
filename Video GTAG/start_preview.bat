@echo off
title Previsualizacion Video GTAG (Full HD)
cd /d "%~dp0"
echo ==========================================================
echo INICIANDO SERVIDOR LOCAL PARA VIDEO GTAG (9 ESCENAS: E1 - E9)
echo ==========================================================
echo Abriendo en http://localhost:8080/index.html ...
start "" "http://localhost:8080/index.html"
python -m http.server 8080
pause

