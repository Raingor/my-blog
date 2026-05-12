---
title: "vue-lazyload：Vue 图片懒加载插件"
date: 2025-05-12T00:00:00+08:00
draft: false
tags: ["Vue", "性能优化", "图片"]
---

[vue-lazyload](https://github.com/hilongjw/vue-lazyload) 是 Vue.js 的图片懒加载插件，能有效提升页面性能。

## 特性

- **按需加载**：只加载可视区域内的图片
- **占位图**：支持加载中和加载失败占位图
- **预加载**：可配置预加载范围
- **轻量级**：核心代码仅几 KB

## 安装

```bash
npm install vue-lazyload
```

## 使用

```javascript
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: 'loading.gif',
  attempt: 1
})
```

```html
<img v-lazy="/image.png">
```

[View on GitHub →](https://github.com/hilongjw/vue-lazyload)