@echo off

setlocal

cd /D "%~dp0" 

echo Initializing test

echo Delete node_modules 
rd /S /Q node_modules

echo Install node modules 
call npm install

echo Create package link
call npm link local-bower
