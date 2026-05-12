---
title: "Gemini CLI：Google Gemini 命令行工具"
date: 2025-05-12T00:00:00+08:00
draft: false
tags: ["AI", "CLI", "Google", "Gemini"]
---

[gemini-cli](https://github.com/google-gemini/gemini-cli) 是 Google 推出的 Gemini 模型命令行工具，支持直接在终端与 AI 模型交互。

## 核心功能

- **多模态支持**：文本、代码、图像理解
- **终端集成**：VS Code、Neovim 等编辑器支持
- **项目级理解**：能分析整个代码库
- **长上下文**：支持 1M token 上下文窗口

## 安装

```bash
npm install -g @google/gemini-cli
# 或
brew install gemini-cli
```

## 快速开始

```bash
# 在项目目录下运行
gemini

# 提问示例
> 解释这段代码的作用
> 帮我优化这个函数
> 写一个 React 组件
```

## 高级功能

- **代码库问答**：问关于整个项目的问题
- **自动补全**：基于注释和上下文生成代码
- **文档生成**：自动生成注释和 README

[View on GitHub →](https://github.com/google-gemini/gemini-cli)