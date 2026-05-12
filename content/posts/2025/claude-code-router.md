---
title: "Claude Code Router：Claude Code 路由基础设施"
date: 2025-05-12T00:00:00+08:00
draft: false
tags: ["AI", "Claude", "路由", "代理"]
---

[claude-code-router](https://github.com/musistudio/claude-code-router) 是 Claude Code 的路由中间件，支持多模型切换和负载均衡。

## 核心功能

- **多模型支持**：Claude、OpenAI、Gemini 等模型统一路由
- **负载均衡**：多 API 密钥自动切换
- **流量统计**：监控各模型使用情况
- **故障转移**：自动切换到可用模型

## 快速配置

```bash
npm install -g @musistudio/claude-code-router
```

```json
// config.json
{
  "providers": [
    {
      "name": "claude",
      "api_base": "https://api.anthropic.com",
      "api_key": "your-key"
    },
    {
      "name": "openai",
      "api_base": "https://api.openai.com",
      "api_key": "your-key"
    }
  ]
}
```

## 路由策略

- **成本优化**：根据价格路由到不同模型
- **性能优先**：路由到响应最快的模型
- **容错处理**：自动重试失败的请求

[View on GitHub →](https://github.com/musistudio/claude-code-router)