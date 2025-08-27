@echo off
chcp 65001 >nul
echo ========================================
echo           图片路径转换工具
echo ========================================
echo.
echo 正在转换为 Hexo 发布模式...
echo 转换后可以正常发布博客
echo.
node fix_image_paths.js hexo
echo.
echo ========================================
echo 转换完成！现在可以发布博客了
echo ========================================
echo.
echo 提示：现在可以运行 hexo generate 生成网站
echo.
pause