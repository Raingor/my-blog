// Markdown renderer using Marked.js
// Load Marked.js from CDN if not already loaded

(function() {
  'use strict';

  // Ensure marked is available
  if (typeof marked === 'undefined') {
    console.error('Marked.js not loaded');
    return;
  }

  // Configure marked options
  marked.setOptions({
    gfm: true,
    breaks: true,
    headerIds: true,
    mangle: false
  });

  // Parse front matter from markdown content
  window.parseFrontMatter = function(content) {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);

    if (!match) {
      return {
        meta: {},
        content: content
      };
    }

    const meta = {};
    const metaContent = match[1];
    const bodyContent = match[2];

    // Simple YAML-like parsing
    metaContent.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();

        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }

        // Parse arrays
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(item => {
            item = item.trim();
            if ((item.startsWith('"') && item.endsWith('"')) ||
                (item.startsWith("'") && item.endsWith("'"))) {
              item = item.slice(1, -1);
            }
            return item;
          });
        }

        meta[key] = value;
      }
    });

    return {
      meta: meta,
      content: bodyContent
    };
  };

  // Render markdown to HTML
  window.renderMarkdown = function(markdown) {
    return marked.parse(markdown);
  };

  // Load and render a markdown file
  window.loadMarkdownFile = async function(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load: ${url}`);
      }
      const content = await response.text();
      const parsed = window.parseFrontMatter(content);
      const html = window.renderMarkdown(parsed.content);
      return { meta: parsed.meta, html: html };
    } catch (error) {
      console.error('Error loading markdown:', error);
      return { meta: {}, html: '<p>Error loading content</p>' };
    }
  };

})();
