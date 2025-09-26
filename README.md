# Chunk Blog

这是一个基于Hexo的个人博客，部署在GitHub Pages上。

## 如何发布文章

1. 在 `source/_posts/` 目录下创建或编辑 `.md` 文件
2. 提交并推送到GitHub：
   ```bash
   git add .
   git commit -m "添加新文章"
   git push origin main
   ```
3. GitHub Actions会自动构建并部署到 https://subingchunk-hue.github.io/chunk.github.io/

## 文章格式

在markdown文件开头添加Front Matter：

```yaml
---
title: 文章标题
date: 2024-01-01 12:00:00
categories: 分类名
tags:
  - 标签1
  - 标签2
---

这里是文章内容...
```

就这么简单！