---
title: "Chrome DevTools MCP：AI Agent 的 Chrome 调试工具"
date: 2025-05-12T00:00:00+08:00
draft: false
tags: ["Chrome", "DevTools", "AI", "MCP"]
---

[chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) 是 Google 官方的 Chrome DevTools 协议实现，专为 AI agent 设计。

## 核心能力

- **网络监控**：捕获和分析 HTTP 请求
- **DOM 操作**：获取和修改页面元素
- **控制台访问**：执行 JavaScript 代码
- **性能分析**：获取页面性能指标

## MCP 协议集成

```javascript
// 通过 MCP 连接 Chrome DevTools
import { ChromeDevToolsMCP } from 'chrome-devtools-mcp'

const devtools = new ChromeDevToolsMCP()
await devtools.connect()
```

## AI 应用场景

```python
# AI agent 可以：
# 1. 分析网页结构
# 2. 调试前端问题
# 3. 提取页面数据
# 4. 自动化测试
```

## 典型用例

- AI 辅助调试
- 自动化网页测试
- 数据抓取与分析

[View on GitHub →](https://github.com/ChromeDevTools/chrome-devtools-mcp)