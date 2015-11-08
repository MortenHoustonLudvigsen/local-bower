@echo off

setlocal

cd /D "%~dp0" 

echo Initializing project

echo Delete node_modules 
rd /S /Q node_modules

echo Install node modules 
call npm install

call local-bower/init.cmd
call test/init.cmd
