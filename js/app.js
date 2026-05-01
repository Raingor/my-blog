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
    frontend: { name: '前端', color: '#18E299' },
    backend: { name: '后端', color: '#3772cf' },
    'ai-coding': { name: 'AI Coding', color: '#c37d0d' }
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
    const container = document.getElementById('tools-content');
    if (!container) return;

    // Tools are loaded from static data for now
    // Can be extended to parse bookmarks file
    container.innerHTML = '<p>工具收藏页面开发中...</p>';
  }

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

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
