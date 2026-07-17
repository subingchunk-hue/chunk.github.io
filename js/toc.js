// 自动生成文章目录 - 左侧浮动、可折叠层级
(function() {
  'use strict';

  function generateTOC() {
    var article = document.querySelector('.article-entry');
    if (!article) return;

    var headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0) return;

    // 如果已存在则不重复生成
    if (document.querySelector('.toc-sidebar')) return;

    // 为每个标题添加 ID
    var headingData = [];
    headings.forEach(function(heading, index) {
      var id = 'toc-heading-' + index;
      heading.id = id;
      headingData.push({
        id: id,
        level: parseInt(heading.tagName.charAt(1), 10),
        text: heading.textContent.trim()
      });
    });

    // 找到最小层级作为根
    var minLevel = Math.min.apply(null, headingData.map(function(h) { return h.level; }));

    // 构建嵌套的树结构
    var root = { children: [], level: minLevel - 1 };
    var stack = [root];

    headingData.forEach(function(h) {
      var node = { id: h.id, level: h.level, text: h.text, children: [] };
      // 回退到合适的父级
      while (stack.length > 1 && stack[stack.length - 1].level >= h.level) {
        stack.pop();
      }
      stack[stack.length - 1].children.push(node);
      stack.push(node);
    });

    // 递归生成嵌套 HTML
    function buildList(nodes) {
      if (nodes.length === 0) return '';
      var html = '<ul class="toc-list">';
      nodes.forEach(function(node) {
        var hasChildren = node.children.length > 0;
        html += '<li class="toc-item">';
        if (hasChildren) {
          html += '<span class="toc-arrow toc-arrow-open" onclick="toggleTocItem(this)"><i class="fa fa-caret-down"></i></span>';
        } else {
          html += '<span class="toc-arrow-placeholder"></span>';
        }
        html += '<a href="#' + node.id + '" onclick="scrollToHeading(\'' + node.id + '\')">' + node.text + '</a>';
        if (hasChildren) {
          html += buildList(node.children);
        }
        html += '</li>';
      });
      html += '</ul>';
      return html;
    }

    // 创建左侧浮动目录
    var tocSidebar = document.createElement('aside');
    tocSidebar.className = 'toc-sidebar';
    tocSidebar.innerHTML =
      '<div class="toc-sidebar-inner">' +
        '<div class="toc-sidebar-header">' +
          '<span class="toc-sidebar-title"><i class="fa fa-list"></i> 目录</span>' +
          '<button class="toc-sidebar-toggle" onclick="toggleTocSidebar()" title="收起目录">' +
            '<i class="fa fa-chevron-left"></i>' +
          '</button>' +
        '</div>' +
        '<div class="toc-sidebar-content">' + buildList(root.children) + '</div>' +
      '</div>' +
      '<button class="toc-sidebar-show" onclick="showTocSidebar()" title="展开目录">' +
        '<i class="fa fa-list"></i>' +
      '</button>';

    document.body.appendChild(tocSidebar);
  }

  // 平滑滚动到标题
  window.scrollToHeading = function(id) {
    var el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 折叠/展开某个目录项的子级
  window.toggleTocItem = function(arrowEl) {
    var li = arrowEl.parentElement;
    var subList = li.querySelector(':scope > ul');
    if (!subList) return;
    var icon = arrowEl.querySelector('i');
    if (subList.classList.contains('toc-collapsed')) {
      subList.classList.remove('toc-collapsed');
      arrowEl.classList.remove('toc-arrow-closed');
      arrowEl.classList.add('toc-arrow-open');
      if (icon) icon.className = 'fa fa-caret-down';
    } else {
      subList.classList.add('toc-collapsed');
      arrowEl.classList.remove('toc-arrow-open');
      arrowEl.classList.add('toc-arrow-closed');
      if (icon) icon.className = 'fa fa-caret-right';
    }
  };

  // 收起整个目录侧边栏
  window.toggleTocSidebar = function() {
    var sidebar = document.querySelector('.toc-sidebar');
    if (sidebar) {
      sidebar.classList.add('toc-sidebar-hidden');
    }
  };

  // 显示整个目录侧边栏
  window.showTocSidebar = function() {
    var sidebar = document.querySelector('.toc-sidebar');
    if (sidebar) {
      sidebar.classList.remove('toc-sidebar-hidden');
    }
  };

  // 页面加载完成后生成目录
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateTOC);
  } else {
    generateTOC();
  }
})();
