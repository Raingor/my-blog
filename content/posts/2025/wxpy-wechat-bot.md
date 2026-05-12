---
title: "wxpy：微信机器人 SDK"
date: 2025-05-12T00:00:00+08:00
draft: false
tags: ["Python", "微信", "机器人"]
---

[wxpy](https://github.com/youfou/wxpy) 是一个基于 itchat 的微信机器人框架，支持自动化消息处理和群聊管理。

## 核心特性

- **消息自动化**：自动回复好友消息
- **群聊管理**：群消息监控与响应
- **消息类型支持**：文本、图片、语音、视频、文件等
- **简单 API**：链式调用方式简洁易用

## 安装与初始化

```bash
pip install wxpy
```

```python
from wxpy import *

bot = Bot()  # 扫码登录
```

## 常用功能示例

### 自动回复

```python
@bot.register(msg_types=TEXT)
def auto_reply(msg):
    return '收到消息: {}'.format(msg.text)
```

### 群聊消息监听

```python
my_group = ensure_one(bot.search('我的群聊'))

@bot.register(my_group)
def group_monitor(msg):
    print(f'{msg.member.name}: {msg.text}')
```

### 发送图片

```python
bot.file_helper.send_image('test.png')
```

[View on GitHub →](https://github.com/youfou/wxpy)