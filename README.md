# 叶荣的技术笔记

基于 Hugo + PaperMod 主题的个人技术博客，托管于 GitHub Pages。

## 技术栈

- **框架**：Hugo
- **主题**：PaperMod
- **托管**：GitHub Pages
- **评论**：Giscus
- **图床**：GitHub Issues

## 本地开发

```bash
# 安装依赖
brew install hugo

# 预览博客
hugo server -D

# 构建静态文件
hugo
```

## 文章目录

- `/content/posts/` — 博客文章
- `/content/about.md` — 关于页面

## 部署

推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

## 参考资料

- [Hugo 文档](https://gohugo.io/documentation/)
- [PaperMod 主题](https://github.com/adityatelange/hugo-PaperMod)
