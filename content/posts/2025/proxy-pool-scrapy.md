---
title: "Proxy Pool：Python 爬虫代理池"
date: 2025-05-12T00:00:00+08:00
draft: false
tags: ["Python", "爬虫", "代理"]
---

[proxy_pool](https://github.com/jhao104/proxy_pool) 是一个用于爬虫的代理池项目，自动抓取、验证和管理代理 IP。

## 核心功能

- **多源采集**：整合数十个免费代理网站
- **自动验证**：多线程验证代理可用性
- **有效性保证**：定时检测并剔除失效代理
- **易部署**：提供一键启动脚本

## 快速开始

```bash
git clone https://github.com/jhao104/proxy_pool.git
pip install -r requirements.txt
python proxyPool.py
```

## API 接口

```python
import requests

# 获取随机可用代理
proxy = requests.get("http://127.0.0.1:5010/get/").json()
print(proxy)  # {'proxy': '123.123.123.123:8080'}

# 检测代理是否可用
requests.get("http://127.0.0.1:5010/get_status/?proxy=123.123.123.123:8080")
```

## 在 Scrapy 中使用

```python
import requests

def get_proxy():
    return requests.get("http://127.0.0.1:5010/get/").json().get("proxy")

proxies = {
    'http': get_proxy(),
    'https': get_proxy(),
}
response = requests.get('http://example.com', proxies=proxies)
```

[View on GitHub →](https://github.com/jhao104/proxy_pool)