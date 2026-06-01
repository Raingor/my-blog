// Main application logic
// Handles routing, data loading, and page initialization

(function() {
  'use strict';

  // Article registry - maps IDs to file paths
  // This can be generated dynamically or maintained manually
  window.ARTICLE_REGISTRY = window.ARTICLE_REGISTRY || [];

  // Categories
  const CATEGORIES = {
    all: { name: '全部', color: '' },
    ai: { name: 'AI', color: '#c37d0d' },
    frontend: { name: '前端', color: '#18E299' },
    backend: { name: '后端', color: '#3772cf' },
    devops: { name: '运维', color: '#6b5b95' },
    git: { name: 'Git', color: '#f05033' },
    other: { name: '其他', color: '#888888' }
  };

  // Initialize app
  function init() {
    const page = document.body.dataset.page;

    // Highlight current nav link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === page + '.html' || (page === 'home' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

    switch(page) {
      case 'home':
        loadHomePage();
        break;
      case 'blog':
        loadBlogPage();
        break;
      case 'article':
        loadArticlePage();
        break;
      case 'tools':
        loadToolsPage();
        break;
      case 'github':
        loadGithubPage();
        break;
      case 'ai':
        loadAiPage();
        break;
    }
  }

  // Load home page
  async function loadHomePage() {
    const container = document.getElementById('article-list');
    if (!container) return;

    try {
      // Load all articles and show latest 5
      const articles = await loadAllArticles();
      const latest = articles.slice(0, 5);

      if (latest.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <h3>暂无文章</h3>
            <p>敬请期待...</p>
          </div>
        `;
        return;
      }

      container.innerHTML = latest.map(article => createArticleCard(article)).join('');
    } catch (error) {
      console.error('Error loading home page:', error);
      container.innerHTML = '<p>加载失败</p>';
    }
  }

  // Load blog list page
  async function loadBlogPage() {
    const container = document.getElementById('article-list');
    const categoryContainer = document.getElementById('category-pills');
    if (!container) return;

    try {
      const articles = await loadAllArticles();
      const params = new URLSearchParams(window.location.search);
      let currentCategory = params.get('category') || 'all';

      // Render category pills
      if (categoryContainer) {
        categoryContainer.innerHTML = Object.entries(CATEGORIES).map(([key, value]) => `
          <button class="category-pill ${key === currentCategory ? 'active' : ''}"
                  onclick="filterByCategory('${key}')">
            ${value.name}
          </button>
        `).join('');
      }

      // Filter articles
      const filtered = currentCategory === 'all'
        ? articles
        : articles.filter(a => a.category === currentCategory);

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <h3>该分类下暂无文章</h3>
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(article => createArticleCard(article)).join('');
    } catch (error) {
      console.error('Error loading blog page:', error);
    }
  }

  // Load article detail page
  async function loadArticlePage() {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');
    const contentContainer = document.getElementById('article-content');
    const titleContainer = document.getElementById('article-title');
    const metaContainer = document.getElementById('article-meta');

    if (!contentContainer || !articleId) {
      if (contentContainer) contentContainer.innerHTML = '<p>文章不存在</p>';
      return;
    }

    // Find article path from registry or construct from id
    const article = window.ARTICLE_REGISTRY.find(a => a.id === articleId);
    if (!article) {
      contentContainer.innerHTML = '<p>文章不存在</p>';
      return;
    }

    try {
      const result = await window.loadMarkdownFile(article.path);

      if (titleContainer) {
        titleContainer.textContent = result.meta.title || articleId;
      }

      if (metaContainer && result.meta.date) {
        metaContainer.innerHTML = `
          <span>${result.meta.date}</span>
          ${result.meta.tags ? result.meta.tags.map(t => `<span class="tag">${t}</span>`).join('') : ''}
          <span id="busuanzi_container_page_pv">
            <span id="busuanzi_value_page_pv"></span> 次阅读
          </span>
        `;
      }

      contentContainer.innerHTML = result.html;

      // Initialize comments if Giscus is configured
      if (typeof window.initComments === 'function') {
        window.initComments();
      }
    } catch (error) {
      console.error('Error loading article:', error);
      contentContainer.innerHTML = '<p>加载失败</p>';
    }
  }

  // Load tools page
  async function loadToolsPage() {
    initCategoryFilter('tools-content', {
      all: '全部',
      'frontend': '前端开发',
      'backend': '后端开发',
      'ai': 'AI Coding',
      'devtools': '开发工具'
    });
  }

  // Load GitHub page
  async function loadGithubPage() {
    initCategoryFilter('github-content', {
      all: '全部',
      'ai-agent': 'AI / Agent',
      'php-backend': 'PHP / 后端',
      'frontend': '前端',
      'design': '设计 / 动画',
      'game': '游戏 / Unity',
      'other': '其他工具'
    });
  }

  // Load AI page
  async function loadAiPage() {
    initCategoryFilter('ai-content', {
      all: '全部',
      'international': '国际平台',
      'domestic': '国内平台',
      'proxy': '聚合代理',
      'community': '模型社区'
    });
  }

  // Initialize category filter for a page
  function initCategoryFilter(containerId, categories) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const pillContainer = document.getElementById('category-pills');
    if (!pillContainer) return;

    const params = new URLSearchParams(window.location.search);
    let current = params.get('cat') || 'all';

    pillContainer.innerHTML = Object.entries(categories).map(([key, label]) => `
      <button class="category-pill ${key === current ? 'active' : ''}"
              onclick="window.filterCategory('${key}')">
        ${label}
      </button>
    `).join('');

    filterSections(container, current);
  }

  function filterSections(container, category) {
    const sections = container.querySelectorAll('.tool-category');
    sections.forEach(section => {
      const cat = section.dataset.category;
      if (category === 'all' || cat === category) {
        section.style.display = '';
      } else {
        section.style.display = 'none';
      }
    });
  }

  window.filterCategory = function(category) {
    const url = new URL(window.location);
    if (category === 'all') {
      url.searchParams.delete('cat');
    } else {
      url.searchParams.set('cat', category);
    }
    window.location = url;
  };

  // Load all articles from registry
  async function loadAllArticles() {
    // For now, return registry items
    // In production, this could scan the posts directory
    return window.ARTICLE_REGISTRY.sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    );
  }

  // Create article card HTML
  function createArticleCard(article) {
    const category = CATEGORIES[article.category] || CATEGORIES.all;
    return `
      <a href="article.html?id=${article.id}" class="article-card">
        <h3>${article.title}</h3>
        <p>${article.description || ''}</p>
        <div class="article-meta">
          <span>${article.date}</span>
          <span class="tag" style="background: ${category.color}20; color: ${category.color}">${category.name}</span>
        </div>
      </a>
    `;
  }

  // Filter articles by category (called from onclick)
  window.filterByCategory = function(category) {
    const url = new URL(window.location);
    if (category === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', category);
    }
    window.location = url;
  };

  // Register article (called from HTML pages)
  window.registerArticle = function(id, path, title, description, date, category) {
    window.ARTICLE_REGISTRY.push({
      id, path, title, description, date, category
    });
  };

  // Expose functions globally
  window.APP = {
    loadAllArticles,
    createArticleCard,
    CATEGORIES
  };

  // Mobile menu toggle
  window.toggleMobileMenu = function() {
    const nav = document.querySelector('.nav');
    if (nav) {
      nav.classList.toggle('active');
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
