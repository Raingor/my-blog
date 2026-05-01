# 研究发现

## 用户需求变更

**原始需求**：Hugo 静态博客 + GitHub Pages
**新需求**：纯 HTML+JS+CSS 轻量博客 + Mintlify 风格

---

## Mintlify 设计风格要点（从 DESIGN-mintlify.md 提取）

### 色彩系统
| 用途 | 色值 |
|------|------|
| 主文字/标题 | `#0d0d0d` |
| 背景 | `#ffffff` |
| 品牌绿（强调） | `#18E299` |
| 边框 | `rgba(0,0,0,0.05)` |
| 次要文字 | `#666666` |

### 字体
- **正文**：Inter
- **代码**：Geist Mono

### 圆角
- 按钮/输入框：`9999px`（全圆角）
- 卡片：`16px`
- 小元素：`4px`

### 间距
- 基础单位：`8px`
- 卡片内边距：`24px`

---

## 技术方案分析

### 方案对比

| 方案 | 优点 | 缺点 |
|------|------|------|
| Hugo | SEO 好、构建快 | 需要安装、需要构建 |
| 纯 HTML | 零门槛、直接运行 | 需要手动处理 Markdown |
| Hexo | 插件丰富 | 需要 Node.js |

**选择**：纯 HTML + Marked.js

### Marked.js
- CDN 引入，无需构建
- 支持 GFM（GitHub Flavored Markdown）
- 体积小（约 40KB）

### 评论系统
- Giscus：基于 GitHub Discussions
- 支持嵌套回复（无限层级）
- 配置项：
  - `repo`: yerong/yerong.github.io
  - `mapping`: pathname
  - `category`: Announcements

---

## 书签文件分析

### bookmarks_2026_5_1.html 结构
```html
<DL><p>
    <DT><H3>书签栏</H3>
    <DL><p>
        <DT><H3>分类名</H3>
        <DL><p>
            <DT><A HREF="...">书签标题</A>
            ...
```

### 现有分类（从文件前 100 行提取）
- 阮一峰
- 其他
- 开发工具
- Mine
- 开发
  - 前端
    - ui
    - css
    - iview
    - vueUI组件
    - 小程序组件

---

## 文章 Markdown Front Matter 设计

```markdown
---
title: "文章标题"
date: "2025-01-01"
tags: ["前端", "Vue"]
category: "frontend"  # frontend | backend | ai-coding
description: "文章描述"
---

正文内容...
```

---

## 页面路由设计

| 页面 | 文件 | 参数 |
|------|------|------|
| 首页 | index.html | - |
| 博客列表 | blog.html | ?category=frontend |
| 文章详情 | article.html | ?id=2025/为什么我要写博客 |
| 工具收藏 | tools.html | - |

---

## 目录结构

```
/blog
├── index.html              # 首页
├── blog.html               # 博客列表
├── article.html            # 文章详情
├── tools.html              # 工具收藏
├── css/
│   └── style.css           # Mintlify 风格
├── js/
│   ├── app.js             # 路由、数据加载
│   ├── markdown.js         # Marked.js 封装
│   └── comments.js        # Giscus 评论
├── posts/                  # Markdown 文章
│   └── 2025/
│       └── 为什么我要写博客.md
└── bookmarks/
    └── bookmarks_2026_5_1.html
```

---

## 参考资源

- Mintlify 设计系统：DESIGN-mintlify.md
- Marked.js 文档：https://marked.js.org/
- Giscus 配置：https://giscus.app/
