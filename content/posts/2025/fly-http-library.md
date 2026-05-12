---
title: "Fly.js：JavaScript HTTP 请求库"
date: 2025-05-12T00:00:00+08:00
draft: false
tags: ["JavaScript", "HTTP", "工具"]
---

[Fly.js](https://github.com/wendux/fly) 是一款功能强大的 JavaScript HTTP 请求库，支持请求拦截和并发控制。

## 特性

- **请求拦截**：支持请求和响应拦截器
- **并发控制**：内置请求限流功能
- **轻量级**：相比 Axios 更小巧
- **跨平台**：支持浏览器、Node.js 和小程序

## 安装

```bash
npm install fly
```

## 快速上手

```javascript
const fly = require('flyio')

// GET 请求
fly.get('/api/user', { id: 1 })
  .then(res => console.log(res))

// POST 请求
fly.post('/api/user', { name: 'test' })
  .then(res => console.log(res))
```

[View on GitHub →](https://github.com/wendux/fly)