# 进度日志

## 2025-05-01 - 需求变更，重新规划

### 背景
用户决定放弃 Hugo 方案，转向纯 HTML+JS+CSS 的轻量级方案。

**变更原因**：用户希望更轻量化，不想做成系统

### 新需求清单
1. ✅ 首页 - 最新文章列表
2. ✅ 工具收藏页 - 从 bookmarks_2026_5_1.html 导入
3. ✅ 博客列表页 - 分类筛选（前端/后端/AI Coding）
4. ✅ 文章详情页 - Markdown 渲染 + 嵌套评论
5. ✅ 评论功能 - Giscus（支持无限回复）
6. ✅ 轻量化 - 纯 HTML+JS+CSS，无构建工具

---

## 2025-05-01 - 完成搭建

### 已完成项目

| 类别 | 文件 | 说明 |
|------|------|------|
| 样式 | css/style.css | Mintlify 风格样式系统 |
| JS 模块 | js/markdown.js | Marked.js 封装，解析 Front Matter |
| JS 模块 | js/comments.js | Giscus 评论系统集成 |
| JS 模块 | js/app.js | 主应用逻辑、路由、分类 |
| 页面 | index.html | 首页 - 最新文章列表 |
| 页面 | blog.html | 博客列表页 - 分类筛选 |
| 页面 | article.html | 文章详情页 - Markdown + 评论 |
| 页面 | tools.html | 工具收藏页 |
| 页面 | about.html | 关于页 |
| 文章 | posts/2025/demo-article.md | 示例 Demo 文章 |

### 待完成

| 任务 | 状态 | 说明 |
|------|------|------|
| Git 仓库初始化 | ⏳ | 尚未执行 |
| GitHub Pages 部署 | ⏳ | 尚未执行 |
| 书签解析导入 | ⏳ | bookmarks_2026_5_1.html 约 303KB，需过滤开发相关 |
| Giscus 配置 | ⏳ | 需要用户去 giscus.app 生成 repoId/categoryId |
| 迁移现有文章 | ⏳ | content/posts/2025/为什么我要写博客.md |

---

## 项目文件结构

```
/blog
├── index.html              # 首页
├── blog.html              # 博客列表
├── article.html           # 文章详情
├── tools.html            # 工具收藏
├── about.html            # 关于
├── css/
│   └── style.css        # Mintlify 风格样式
├── js/
│   ├── app.js           # 主逻辑
│   ├── markdown.js      # Markdown 渲染
│   └── comments.js       # 评论系统
└── posts/
    └── 2025/
        └── demo-article.md
```
