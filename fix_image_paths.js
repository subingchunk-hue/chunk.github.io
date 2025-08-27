// 图片路径修复脚本 - 兼容 Hexo 和 Typora
const fs = require('fs');
const path = require('path');

// 配置
const config = {
  postsDir: './source/_posts',
  imagesDir: './source/images',
  hexoRoot: '/chunk.github.io',
  backupSuffix: '.backup'
};

// 获取所有 Markdown 文件
function getAllMarkdownFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath));
    } else if (path.extname(item) === '.md') {
      files.push(fullPath);
    }
  }
  
  return files;
}

// 创建备份
function createBackup(filePath) {
  const backupPath = filePath + config.backupSuffix;
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log(`✓ 已备份: ${path.basename(filePath)}`);
  }
}

// 恢复备份
function restoreFromBackup(filePath) {
  const backupPath = filePath + config.backupSuffix;
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, filePath);
    console.log(`✓ 已恢复: ${path.basename(filePath)}`);
  }
}

// 转换为相对路径（Typora 兼容）
function convertToRelativePaths(content, filePath) {
  const postsDir = path.resolve(config.postsDir);
  const imagesDir = path.resolve(config.imagesDir);
  const fileDir = path.dirname(path.resolve(filePath));
  
  // 计算从文章目录到图片目录的相对路径
  const relativePath = path.relative(fileDir, imagesDir).replace(/\\/g, '/');
  
  // 替换绝对路径为相对路径
  const hexoImageRegex = new RegExp(`${config.hexoRoot}/images/`, 'g');
  return content.replace(hexoImageRegex, `${relativePath}/`);
}

// 转换为 Hexo 绝对路径
function convertToHexoPaths(content) {
  // 匹配相对路径图片引用
  const relativeImageRegex = /!\[([^\]]*)\]\((\.\.\/)*images\/([^)]+)\)/g;
  return content.replace(relativeImageRegex, `![${1}](${config.hexoRoot}/images/${3})`);
}

// 主要处理函数
function processFiles(mode = 'typora') {
  console.log(`\n开始处理图片路径 (${mode} 模式)...\n`);
  
  const markdownFiles = getAllMarkdownFiles(config.postsDir);
  let processedCount = 0;
  
  for (const filePath of markdownFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let newContent;
      
      if (mode === 'typora') {
        // 转换为 Typora 兼容的相对路径
        createBackup(filePath);
        newContent = convertToRelativePaths(content, filePath);
      } else if (mode === 'hexo') {
        // 转换为 Hexo 绝对路径
        newContent = convertToHexoPaths(content);
      } else if (mode === 'restore') {
        // 从备份恢复
        restoreFromBackup(filePath);
        continue;
      }
      
      if (newContent && newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        processedCount++;
        console.log(`✓ 已处理: ${path.basename(filePath)}`);
      }
    } catch (error) {
      console.error(`✗ 处理失败: ${path.basename(filePath)} - ${error.message}`);
    }
  }
  
  console.log(`\n处理完成！共处理 ${processedCount} 个文件。\n`);
}

// 命令行参数处理
const args = process.argv.slice(2);
const mode = args[0] || 'typora';

if (!['typora', 'hexo', 'restore'].includes(mode)) {
  console.log('使用方法:');
  console.log('  node fix_image_paths.js typora   # 转换为 Typora 兼容路径');
  console.log('  node fix_image_paths.js hexo     # 转换为 Hexo 绝对路径');
  console.log('  node fix_image_paths.js restore  # 从备份恢复原始文件');
  process.exit(1);
}

processFiles(mode);