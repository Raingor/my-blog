# 个人博客系统建站规划

> 作者：叶荣（yerong）
> 建站时间：2025
> 背景：2016年技术从业者，历经 PHP → 前端 → Python/C# → Vibe Coding

---

## 一、规划原则

遵循 `.claude/claude.md` 编码指南中的规划原则：

- **不假设** — 多方案时先呈现，让用户选择后再推进
- **最小落地** — 每步只做必要内容，不堆砌功能
- **精准改动** — 精确操作，不碰无关代码
- **目标可验证** — 每步有明确的验证方式

---

## 二、项目目标

- 记录个人技术成长历程和实战经验
- 建立专业形象，方便同行交流
- 沉淀知识，形成个人技术品牌
- 基于 GitHub Pages 托管，无需自建服务器

---

## 二、域名方案

| 方案 | 地址 | 成本 |
|------|------|------|
| GitHub 默认 | `https://yerong.github.io` | 免费 |
| 自定义域名 | `https://blog.yerong.top`（需已有域名） | ~50元/年 |

**推荐先用默认域名上线，后续按需迁移到自定义域名。**

---

## 二、技术选型

### 框架
| 项目 | 选择 | 说明 |
|------|------|------|
| 静态网站框架 | **Hugo** | 构建速度快，主题丰富 |
| 主题 | **PaperMod** | 简洁、响应式、SEO 友好 |

### 周边工具
| 项目 | 选择 | 说明 |
|------|------|------|
| 图床 | **GitHub Issues** | 免费、稳定、国内访问尚可 |
| 评论系统 | **Giscus** | 基于 GitHub Discussions，无需数据库 |
| 部署方式 | **GitHub Actions** | push 后自动构建并发布 |

### 写作方式
- 文章以 **Markdown** 格式撰写
- 支持公式（MathJax）、代码高亮（highlight.js）、Mermaid 图表
- 支持标签（Tags）和系列（Series）

---

## 四、目录结构

```
blog/
├── .github/
│   └── workflows/
│       └── hugo.yml          # GitHub Actions 自动构建
├── assets/                   # 主题资源（子模块）
├── content/
│   ├── posts/                # 博客文章
│   │   └── _index.md
│   └── about.md              # 关于页面
├── layouts/                  # 自定义布局（覆盖主题）
├── static/
│   └── images/               # 静态图片目录
├── themes/
│   └── PaperMod/             # 主题（子模块）
├── hugo.toml                 # Hugo 配置文件
├── config.yaml               # 备用配置文件
├── README.md                  # 项目说明
├── PLAN.md                   # 本规划文档
└── .gitmodules               # Git 子模块配置
```

---

## 五、GitHub 建库步骤

### 5.1 创建仓库

1. 登录 GitHub，点击 **New repository**
2. Repository name 填写：`yerong.github.io`（将 `yerong` 替换为你的 GitHub 用户名）
3. 选择 **Public**
4. 点击 **Create repository**

### 5.2 本地初始化

```bash
# 1. 安装 Hugo（macOS）
brew install hugo

# 2. 验证版本
hugo version

# 3. 进入项目目录
cd ~/wwwroot/myproject/blog

# 4. 初始化 Hugo 站点
hugo new site . --force

# 5. 添加 PaperMod 主题
git init
git submodule add https://github.com/adityatelange/hugo-PaperMod themes/PaperMod

# 6. 复制主题配置示例
cp themes/PaperMod/exampleSite/hugo.yaml ./
mv hugo.yaml hugo.toml
```

### 5.3 首次部署

```bash
git add .
git commit -m "feat: 初始化博客项目"
git branch -M main
git remote add origin https://github.com/yerong/yerong.github.io.git
git push -u origin main
```

---

## 六、hugo.toml 基础配置

```toml
baseURL = 'https://yerong.github.io/'
languageCode = 'zh-cn'
languageName = "中文"
title = '叶荣的技术笔记'
theme = 'PaperMod'

# 作者信息
[params]
  author = "叶荣"
  description = "2016年起从业，前端开发/Vibe Coding/技术笔记"
  keywords = ["技术博客", "前端", "Python", "PHP"]
  images = ["images/avatar.jpg"]

# 菜单导航
[[menu.main]]
  identifier = "posts"
  name = "文章"
  url = "/posts/"
  weight = 1

[[menu.main]]
  identifier = "tags"
  name = "标签"
  url = "/tags/"
  weight = 2

[[menu.main]]
  identifier = "about"
  name = "关于"
  url = "/about/"
  weight = 3

# Giscus 评论配置（需在 Giscus 官网生成）
[params.giscus]
  repo = "yerong/yerong.github.io"
  repoId = "你的repoId"
  category = "Announcements"
  categoryId = "你的categoryId"
  mapping = "pathname"
  reactionsEnabled = "1"
  emitMetadata = "0"
  inputPosition = "top"

# 分页
[pagination]
  pagerSize = 10

# 输出格式
[outputs]
  home = ["HTML", "RSS", "JSON"]
```

---

## 七、GitHub Actions 自动部署

创建文件：`.github/workflows/hugo.yml`

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: true
          fetch-depth: 0

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: 'latest'
          extended: true

      - name: Build
        run: hugo --minify

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

> **注意**：在 GitHub 仓库的 **Settings → Pages → Source** 中，将 Source 改为 **GitHub Actions**。

---

## 八、写作流程

### 8.1 创建新文章

```bash
hugo new posts/2025/我的第一篇文章.md
```

编辑 `content/posts/2025/我的第一篇文章.md`：

```markdown
---
title: "我的第一篇文章"
date: 2025-01-01
draft: false
tags: ["随笔", "开篇"]
series: ["编程之路"]
description: "博客开篇，聊聊为什么要做这个博客"
---

正文内容在这里...
```

### 8.2 本地预览

```bash
hugo server -D
# 访问 http://localhost:1313 预览
```

### 8.3 发布

```bash
# 本地构建
hugo

# 提交推送
git add .
git commit -m "feat: 添加第一篇文章"
git push
```

---

## 九、内容规划

### 9.1 系列文章

| 系列 | 描述 | 预计篇数 |
|------|------|----------|
| **编程之路** | 2016 PHP → 前端 → Python/C# → Vibe Coding 的演进 | 5-8篇 |
| **踩坑笔记** | 实际项目中遇到的问题与解决思路 | 持续更新 |
| **效率工具** | 开发环境、AI助手、命令行工具的使用心得 | 3-5篇 |
| **项目复盘** | love-project 等项目的设计与实现复盘 | 2-3篇 |

### 9.2 推荐首批文章

1. **《我的技术之路（2016-2025）》** — 职业经历和技术栈演变
2. **《为什么我要写博客》** — 开篇动机
3. **《从 PHP 到 Vibe Coding：我的编程进化史》** — 个人技术演进史
4. **《我的开发环境配置》** — 工具链、IDE、AI助手使用
5. **《love-project 设计与实现》** — 情侣纪念网页的项目复盘

---

## 十、图床方案（GitHub Issues）

### 使用方式

1. 在 GitHub 上新建一个 **Private** 仓库（如 `blog-images`）
2. 将图片上传到 Issues 中（拖拽上传即可）
3. GitHub 会自动生成图片 URL
4. 将 URL 嵌入 Markdown

> **注意**：Issues 图片 URL 格式为 `https://user-images.githubusercontent.com/...`，无需额外图床服务。

### 备用图床

如后续需要更稳定的图床，可考虑：
- **PicGo** + GitHub 图床
- **Cloudinary**（免费额度）
- **SM.MS**（免费图床）

---

## 十一、自定义域名（可选）

### 11.1 购买域名

在阿里云、腾讯云等平台购买域名（如 `yerong.top`）。

### 11.2 配置 DNS

在域名服务商处添加 CNAME 记录：

| 记录类型 | 主机记录 | 记录值 |
|----------|----------|--------|
| CNAME | blog | yerong.github.io |

### 11.3 GitHub Pages 设置

1. 进入仓库 **Settings → Pages**
2. 在 **Custom domain** 中填入你的域名
3. 勾选 **Enforce HTTPS**
4. 等待 DNS 生效（约几分钟到24小时）

---

## 十二、后续扩展功能

- [ ] 添加 **搜索功能**（PageFind，无需第三方依赖）
- [ ] 添加 **访问统计**（不蒜子/Umami）
- [ ] 添加 **RSS 订阅**（Hugo 内置支持）
- [ ] 添加 **sitemap.xml**（Hugo 内置支持）
- [ ] 添加 **SEO 优化**（Open Graph、Twitter Cards）
- [ ] **PWA 支持**（离线访问）
- [ ] **多语言**（中英文双语博客）

---

## 十三、参考资源

- Hugo 官方文档：https://gohugo.io/documentation/
- PaperMod 主题：https://github.com/adityatelange/hugo-PaperMod
- Giscus 配置：https://giscus.app/
- GitHub Pages 文档：https://docs.github.com/en/pages

---

## 十四、进度追踪

- [x] 规划文档编写
- [ ] 创建 GitHub 仓库
- [ ] 本地安装 Hugo
- [ ] 初始化站点并配置主题
- [ ] 配置 GitHub Actions 自动部署
- [ ] 撰写第一篇文章
- [ ] 首次发布上线
- [ ] （可选）绑定自定义域名
