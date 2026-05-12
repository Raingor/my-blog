---
title: "OpenRelay：免费 AI 模型配额"
date: 2025-05-12T00:00:00+08:00
draft: false
tags: ["AI", "免费", "API", "配额"]
---

[openrelay](https://github.com/romgX/openrelay) 提供免费的 AI 模型 API 配额，支持多种主流模型。

## 支持模型

- OpenAI (GPT-3.5, GPT-4)
- Google Gemini
- Anthropic Claude
- Llama 系列

## 使用方法

```bash
# 获取 API 密钥
curl https://openrelay.dev/api/key

# 调用示例
curl https://openrelay.dev/v1/chat/completions \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-3.5-turbo", "messages": [...]}'
```

## 限制说明

- 每日调用次数限制
- 速率限制（每分钟）
- 仅供开发测试使用

[View on GitHub →](https://github.com/romgX/openrelay)