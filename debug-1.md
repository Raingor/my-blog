# 博客项目 Debug 报告 #1

> 生成时间：2026-05-01
> 检查范围：首页、文章页、关于页、工具页

---

## 问题清单

### P0 - 必须修复

#### 1. 文章加载失败 (Failed to fetch)

**现象**：打开文章详情页（如 `article.html?id=why-blog`）时，控制台报错：

```
Error loading markdown: Failed to fetch
  at window.loadMarkdownFile
```

**原因**：注册了 3 篇文章，但磁盘上只有 1 篇存在。

**磁盘文件 vs 注册状态**：

| 文章 ID | 注册路径 | 状态 |
|---------|----------|------|
| `demo-article` | `posts/2025/demo-article.md` | ✅ 存在 |
| `why-blog` | `posts/2025/为什么我要写博客.md` | ❌ 缺失 |
| `backend-demo` | `posts/2025/backend-demo.md` | ❌ 缺失 |

**修复方案**：

```bash
# 方案A：补全缺失的文章
touch posts/2025/为什么我要写博客.md
touch posts/2025/backend-demo.md

# 方案B：从 HTML 注册中移除（如果暂时不写这些文章）
# 修改 index.html、blog.html、article.html 中的 registerArticle 调用
```

---

#### 2. fetch() 本地文件跨域限制

**现象**：即使文章文件存在，直接以 `file://` 协议打开 HTML 文件时，fetch 仍会失败。

```
TypeError: Failed to fetch
```

**原因**：浏览器安全策略不允许 `file://` 协议下的跨域 fetch 请求。

**影响页面**：
- 所有需要加载 Markdown 的页面（首页、文章详情页）

**修复方案**：

```bash
# 使用静态服务器启动项目
npx serve .

# 或使用 Python
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`

---

### P1 - 建议修复

#### 3. 导航栏没有当前页面高亮

**现象**：顶部导航 "首页/文章/工具/关于" 没有 active 状态，用户无法判断当前所在页面。

**修复方案**：在 `css/style.css` 中添加：

```css
.nav a[href*="当前页面名"] {
  color: var(--color-brand);
  background: var(--color-brand-light);
}
```

或通过 JS 在 `app.js` 的 `init()` 中动态添加 active class。

---

#### 4. Giscus 评论配置占位符

**文件**：`js/comments.js`

```javascript
const DEFAULT_CONFIG = {
  repo: 'yerong/yerong.github.io',
  repoId: 'YOUR_REPO_ID',        // ← 需要替换
  category: 'Announcements',
  categoryId: 'YOUR_CATEGORY_ID' // ← 需要替换
```

**修复方案**：
1. 访问 https://giscus.app 获取配置
2. 替换 `YOUR_REPO_ID` 和 `YOUR_CATEGORY_ID`

---

### P2 - 优化项

#### 5. 文章管理方式落后

**现状**：每篇文章都在 HTML 中手动调用 `registerArticle()`：

```html
<script>
  window.registerArticle(
    'why-blog',
    'posts/2025/为什么我要写博客.md',
    '为什么我要写博客',
    '博客开篇，聊聊为什么要做这个博客',
    '2025-01-01',
    'ai-coding'
  );
</script>
```

**问题**：
- 新增文章需要修改多个 HTML 文件
- 容易遗漏注册
- 不方便批量管理

**建议改进**：创建 `articles.json` 集中管理：

```json
[
  {
    "id": "why-blog",
    "path": "posts/2025/为什么我要写博客.md",
    "title": "为什么我要写博客",
    "description": "博客开篇，聊聊为什么要做这个博客",
    "date": "2025-01-01",
    "category": "ai-coding"
  }
]
```

然后在 `app.js` 中通过 fetch 加载。

---

#### 6. 书签文件残留

**文件**：`bookmarks_2026_5_1.html` (303KB)

**问题**：浏览器导出的书签 HTML 文件不应出现在项目中。

**修复**：

```bash
rm bookmarks_2026_5_1.html
```

---

## 验证清单

- [ ] 所有注册的文章 md 文件都存在于 `posts/` 目录
- [ ] 通过 HTTP 服务器访问项目，文章可以正常加载
- [ ] 导航栏当前页面有高亮显示
- [ ] Giscus 配置已替换为真实 ID
- [ ] 书签文件已删除

---

## 快速修复命令

```bash
cd ~/wwwroot/M-MyProject/my-blog

# 1. 补全缺失的文章文件
touch posts/2025/为什么我要写博客.md
touch posts/2025/backend-demo.md

# 2. 删除书签残留
rm bookmarks_2026_5_1.html

# 3. 启动本地服务器测试
npx serve .
```

访问 `http://localhost:3000` 验证修复效果。
