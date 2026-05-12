---
title: "Everything Claude Code：Claude Code 插件集合"
date: 2025-05-12T00:00:00+08:00
draft: false
tags: ["AI", "Claude", "插件", "扩展"]
---

[everything-claude-code](https://github.com/affaan-m/everything-claude-code) 是 Claude Code 生态的插件集合，提供了丰富的功能扩展。

## 插件类别

- **代码质量**：格式化、Lint、类型检查
- **文档生成**：自动生成注释和 API 文档
- **测试辅助**：单元测试生成和优化
- **部署工具**：CI/CD 集成插件

## 安装方式

```bash
# 通过 npm 安装
npm install -g everything-claude-code

# 或手动安装单个插件
claude plugin install <plugin-name>
```

## 推荐插件

- `claude-auto-doc`：自动生成项目文档
- `claude-test-gen`：自动生成测试用例
- `claude-refactor`：代码重构建议

## 自定义插件开发

```javascript
// plugin.js
module.exports = {
  name: 'my-plugin',
  commands: {
    'my-cmd': (args) => {
      // 插件逻辑
    }
  }
}
```

[View on GitHub →](https://github.com/affaan-m/everything-claude-code)