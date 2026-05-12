---
title: "Medoo：轻量级 PHP 数据库框架"
date: 2025-05-12T00:00:00+08:00
draft: false
tags: ["PHP", "数据库", "ORM"]
---

[Medoo](https://github.com/catfan/Medoo) 是一个轻量级 PHP 数据库框架，支持 MySQL、PostgreSQL、SQLite 等多种数据库。

## 核心特性

- **轻量级**：单文件仅 100KB 左右
- **安全**：内置 SQL 注入防护
- **易用**：简单直观的 API
- **多数据库支持**：MySQL、PostgreSQL、SQLite、 MSSQL

## 安装

```bash
composer require catfan/medoo
```

## 快速上手

```php
use Medoo\Medoo;

$database = new Medoo([
    'type' => 'mysql',
    'host' => 'localhost',
    'database' => 'test',
    'username' => 'root',
    'password' => '123456'
]);
```

## 常用操作

### 查询

```php
// 查询单条
$user = $database->get('users', '*', ['id' => 1]);

// 查询多条
$users = $database->select('users', '*', ['age[>]' => 18]);

// 聚合查询
$count = $database->count('users', '*');
```

### 插入

```php
$database->insert('users', [
    'name' => '叶荣',
    'email' => 'test@example.com'
]);
```

### 更新

```php
$database->update('users', [
    'email' => 'new@example.com'
], ['id' => 1]);
```

[View on GitHub →](https://github.com/catfan/Medoo)