---
title: "SSH MCP Server：基于 SSH 的 MCP 服务"
date: 2025-05-12T00:00:00+08:00
draft: false
tags: ["SSH", "MCP", "远程", "AI"]
---

[ssh-mcp-server](https://github.com/classfang/ssh-mcp-server) 是基于 SSH 协议的 MCP（Model Context Protocol）服务实现，让 AI 助手可以安全地远程操作服务器。

## 核心功能

- **远程命令执行**：通过 MCP 协议执行远程命令
- **文件传输**：支持上传下载文件
- **交互式 Shell**：提供持久的远程会话
- **安全认证**：基于 SSH 密钥认证

## MCP 协议集成

```python
from mcp import Client

client = Client('ssh-mcp-server')
result = client.call('execute', {
    'host': 'example.com',
    'command': 'ls -la'
})
```

## 配置示例

```json
{
  "host": "your-server.com",
  "port": 22,
  "username": "deploy",
  "auth_method": "key",
  "private_key": "/path/to/id_rsa"
}
```

## AI 应用场景

- 远程部署助手
- 日志分析与监控
- 服务器状态查询

[View on GitHub →](https://github.com/classfang/ssh-mcp-server)