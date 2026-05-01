# 个人博客系统 - 任务计划（纯 HTML 版本）

## 目标
搭建轻量级纯 HTML+JS+CSS 静态博客，采用 Mintlify 设计风格，支持 Markdown 内容、嵌套评论、工具收藏页。

---

## 技术方案

| 组件 | 选择 | 说明 |
|------|------|------|
| 架构 | 纯前端静态站 | 无需构建工具，直接双击 index.html 运行 |
| Markdown 解析 | Marked.js | 轻量级，CDN 引入 |
| 样式 | Mintlify 风格 | 参考 DESIGN-mintlify.md |
| 评论系统 | Giscus | 基于 GitHub Discussions，支持嵌套 |
| 图床 | GitHub Issues | 现有方案 |
| 收藏页 | 从 bookmarks 导入 | bookmarks_2026_5_1.html |

---

## 页面结构

```
/blog
├── index.html              # 首页 - 最新文章列表
├── blog.html               # 博客列表 - 分类筛选
├── article.html            # 文章详情 - Markdown 渲染 + 评论区
├── tools.html              # 工具收藏页 - 书签导入
├── css/
│   └── style.css           # Mintlify 风格样式
├── js/
│   ├── app.js              # 主逻辑
│   ├── markdown.js         # Markdown 渲染
│   └── comments.js         # 评论系统
├── posts/                  # Markdown 文章目录
│   ├── 2025/
│   │   └── 为什么我要写博客.md
│   └── ...
└── bookmarks/
    └── bookmarks_2026_5_1.html  # 书签导出文件
```

---

## 阶段一：基础框架搭建

| 任务 | 状态 | 验证 |
|------|------|------|
| 1.1 创建目录结构 | ⏳ | `ls -la` 验证 |
| 1.2 编写 CSS 样式（Mintlify 风格） | ⏳ | 视觉检查 |
| 1.3 编写 index.html（首页） | ⏳ | 页面可访问 |
| 1.4 编写 blog.html（列表页） | ⏳ | 分类切换正常 |
| 1.5 编写 article.html（详情页） | ⏳ | Markdown 渲染正常 |

---

## 阶段二：功能实现

| 任务 | 状态 | 验证 |
|------|------|------|
| 2.1 编写 markdown.js（Marked.js 封装） | ⏳ | 能渲染 Markdown |
| 2.2 编写 comments.js（Giscus 集成） | ⏳ | 评论能加载 |
| 2.3 编写 app.js（路由、数据加载） | ⏳ | 页面切换正常 |
| 2.4 文章列表页分类功能 | ⏳ | 分类筛选正常 |

---

## 阶段三：工具收藏页

| 任务 | 状态 | 验证 |
|------|------|------|
| 3.1 解析 bookmarks_2026_5_1.html | ⏳ | 提取所有书签 |
| 3.2 过滤保留开发相关书签 | ⏳ | 排除"阮一峰"等非技术分类 |
| 3.3 生成 tools.html 收藏页面 | ⏳ | 书签分类显示 |
| 3.4 分类整理（前端/后端/AI Coding/开发工具） | ⏳ | 分类清晰 |

---

## 阶段四：内容迁移

| 任务 | 状态 | 验证 |
|------|------|------|
| 4.1 迁移现有文章到 /posts | ⏳ | 文章可加载 |
| 4.2 创建 Demo 示例文章 | ⏳ | 页面完整 |
| 4.3 配置 Giscus 评论 | ⏳ | 评论功能正常 |

---

## 阶段五：部署验证

| 任务 | 状态 | 验证 |
|------|------|------|
| 5.1 GitHub 仓库初始化 | ⏳ | `git status` 正常 |
| 5.2 GitHub Pages 部署 | ⏳ | 线上可访问 |
| 5.3 移动端适配 | ⏳ | 手机浏览正常 |

---

## Mintlify 设计要点（参考 DESIGN-mintlify.md）

- **字体**：Inter（正文）+ Geist Mono（代码）
- **配色**：
  - Primary: `#0d0d0d`（深黑文字）
  - Background: `#ffffff`（纯白背景）
  - Brand Green: `#18E299`（强调色）
  - Border: `rgba(0,0,0,0.05)`（极淡边框）
- **圆角**：
  - 按钮/输入框：9999px（全圆角）
  - 卡片：16px
- **间距**：8px 基准

---

## 评论系统设计

Giscus 支持嵌套回复，满足"无限向下回复"需求：
- 使用 Giscus 的 `reactions-enabled` 和嵌套评论
- 评论框位置：文章底部
- 需要配置 GitHub Discussions

---

## 书签导入策略

bookmarks_2026_5_1.html 结构分析：
- 书签分类通过 `<H3>` 标签定义
- 每个书签是 `<A>` 标签
- 提取后按现有分类组织，或重新分类为：
  - 前端开发
  - 后端开发
  - AI Coding
  - 开发工具
  - 其他
