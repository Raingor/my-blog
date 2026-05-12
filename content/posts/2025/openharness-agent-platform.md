---
title: "OpenHarness：开源 Agent 开发平台"
date: 2025-05-12T00:00:00+08:00
draft: false
tags: ["AI", "Agent", "平台", "开发框架"]
---

[OpenHarness](https://github.com/HKUDS/OpenHarness) 是一个开源的 Agent 开发和部署平台，支持构建复杂的 AI Agent 应用。

## 核心能力

- **Agent 编排**：支持多 Agent 协作编排
- **工具集成**：内置 50+ 常用工具插件
- **记忆管理**：Agent 记忆持久化存储
- **评估框架**：内置 Agent 性能评估

## 快速开始

```python
from openharness import Agent

agent = Agent(
    name="my-assistant",
    tools=["web_search", "calculator", "code_exec"],
    memory_db="sqlite:///memory.db"
)

response = agent.run("计算 2024 年的总收入")
```

## 典型应用

- 智能助手开发
- 自动化工作流
- 数据分析 Agent
- 客服机器人

[View on GitHub →](https://github.com/HKUDS/OpenHarness)