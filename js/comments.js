// Giscus Comments Integration
// Giscus supports nested replies natively

(function() {
  'use strict';

  // Giscus configuration - user needs to customize these
  const DEFAULT_CONFIG = {
    repo: 'yerong/yerong.github.io',
    repoId: 'YOUR_REPO_ID',
    category: 'Announcements',
    categoryId: 'YOUR_CATEGORY_ID',
    mapping: 'pathname',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'top',
    lang: 'zh-CN'
  };

  // Load Giscus script
  window.loadGiscus = function(config = {}) {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };

    // Create Giscus container
    const container = document.getElementById('giscus-container');
    if (!container) {
      console.error('Giscus container not found');
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', finalConfig.repo);
    script.setAttribute('data-repo-id', finalConfig.repoId);
    script.setAttribute('data-category', finalConfig.category);
    script.setAttribute('data-category-id', finalConfig.categoryId);
    script.setAttribute('data-mapping', finalConfig.mapping);
    script.setAttribute('data-reactions-enabled', finalConfig.reactionsEnabled);
    script.setAttribute('data-emit-metadata', finalConfig.emitMetadata);
    script.setAttribute('data-input-position', finalConfig.inputPosition);
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', finalConfig.lang);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    container.appendChild(script);
  };

  // Initialize comments on page load
  window.initComments = function(config) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => window.loadGiscus(config));
    } else {
      window.loadGiscus(config);
    }
  };

})();
