---
title: "vue-quill-editor：Vue 富文本编辑器"
date: 2025-05-12T00:00:00+08:00
draft: false
tags: ["Vue", "富文本", "编辑器"]
---

[vue-quill-editor](https://github.com/1c7/vue-quill-editor) 是基于 Quill.js 的 Vue 富文本编辑器组件，提供了所见即所得的编辑体验。

## 核心特性

- **所见即所得**：实时预览编辑内容
- **模块化设计**：可按需加载编辑器模块
- **自定义格式**：支持自定义字体、颜色、大小
- **图片上传**：集成图片上传功能
- **多语言支持**：支持国际化配置

## 安装

```bash
npm install vue-quill-editor quill
```

## 基础使用

```vue
<template>
  <quill-editor 
    v-model="content"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)">
  </quill-editor>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'

export default {
  components: { quillEditor },
  data() {
    return {
      content: '',
      editorOption: {
        theme: 'snow',
        placeholder: '请输入内容...'
      }
    }
  }
}
</script>
```

## 高级配置

支持自定义 toolbar、语法高亮（code-block）、表情符号等扩展模块。

[View on GitHub →](https://github.com/1c7/vue-quill-editor)