@echo off
chcp 65001 >nul
echo ========================================
echo           图片路径转换工具
echo ========================================
echo.
echo 正在转换为 Typora 兼容模式...
echo 转换后您可以在 Typora 中看到图片
echo.
node fix_image_paths.js typora
echo.
echo ========================================
echo 转换完成！现在可以在 Typora 中编辑了
echo ========================================
echo.
echo 提示：编辑完成后请运行"切换到Hexo模式.bat"
echo 然后再发布博客
echo.
pause