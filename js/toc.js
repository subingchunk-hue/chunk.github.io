// 自动生成文章目录
(function() {
  'use strict';

  function generateTOC() {
    const article = document.querySelector('.article-entry');
    if (!article) return;

    const headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0) return;

    // 创建目录容器
    const tocContainer = document.createElement('div');
    tocContainer.className = 'toc-container';
    tocContainer.innerHTML = `
      <div class="toc-header">
        <i class="fa fa-list"></i>
        <span>目录</span>
        <button class="toc-toggle" onclick="toggleTOC()">
          <i class="fa fa-angle-up"></i>
        </button>
      </div>
      <div class="toc-content">
        <ul class="toc-list"></ul>
      </div>
    `;

    const tocList = tocContainer.querySelector('.toc-list');
    
    // 为每个标题添加ID并生成目录项
    headings.forEach((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      
      const level = parseInt(heading.tagName.charAt(1));
      const listItem = document.createElement('li');
      listItem.className = `toc-item toc-level-${level}`;
      
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = heading.textContent;
      link.onclick = function(e) {
        e.preventDefault();
        document.getElementById(id).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      };
      
      listItem.appendChild(link);
      tocList.appendChild(listItem);
    });

    // 将目录插入到文章开头
    article.insertBefore(tocContainer, article.firstChild);
  }

  // 切换目录显示/隐藏
  window.toggleTOC = function() {
    const tocContent = document.querySelector('.toc-content');
    const toggleBtn = document.querySelector('.toc-toggle i');
    
    if (tocContent.style.display === 'none') {
      tocContent.style.display = 'block';
      toggleBtn.className = 'fa fa-angle-up';
    } else {
      tocContent.style.display = 'none';
      toggleBtn.className = 'fa fa-angle-down';
    }
  };

  // 页面加载完成后生成目录
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateTOC);
  } else {
    generateTOC();
  }
})();