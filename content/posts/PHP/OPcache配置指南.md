# PHP OPcache 配置指南

## OPcache 是什么

OPcache 是 PHP 的**字节码缓存引擎**，作用是避免 PHP 每次请求都重新编译源代码。

## 工作原理

**没有 OPcache 时的请求流程：**

```bash
用户请求 → 读取 .php 文件 → 编译成 opcode → 执行 opcode → 返回结果
```

每个用户的每次请求，都要重复"读文件 + 编译"这两步，白浪费 CPU。

**有 OPcache 后的请求流程：**

```bash
第一次请求：读取 .php 文件 → 编译成 opcode → 缓存到共享内存 → 执行
后续请求：直接从共享内存读取 opcode → 执行
```

编译结果缓存在内存里，后续请求直接用，CPU 消耗大幅降低。

## 实际效果

| 指标 | 无 OPcache | 有 OPcache |
|------|-----------|------------|
| 响应时间 | 较慢 | 快 2-5 倍 |
| CPU 占用 | 高 | 降低 50%-70% |
| 吞吐量 | 低 | 提升 2-3 倍 |
| 内存开销 | 无 | 多占 64-128MB |

## 对 ThinkPHP 8 的意义

ThinkPHP 框架本身有几十个文件，加上 vendor 里的依赖库可能有上千个文件。没有 OPcache 的话，每个请求都要编译这些文件，1 核低配服务器很容易卡。开了 OPcache 后，大部分编译工作只在第一次请求时做一次。

---

## 如何启用 OPcache

### 1. 检查是否已安装

```bash
php -m | grep -i opcache
```

- 有输出 → 已安装，直接配置
- 无输出 → 需要安装

### 2. 安装（如果未安装）

```bash
# Debian/Ubuntu
apt install php8.2-opcache

# CentOS/RHEL
yum install php82-php-opcache

# 安装后重启 PHP-FPM
systemctl restart php8.2-fpm
```

> 注意把 `8.2` 换成你实际的 PHP 版本（如 `8.1`、`8.3`）

### 3. 查找配置文件

```bash
php -i | grep "opcache.ini"
```

一般在以下路径之一：

```bash
/etc/php/8.2/fpm/conf.d/10-opcache.ini
/etc/php/8.2/mods-available/opcache.ini
```

### 4. 启用并配置

编辑配置文件：

```bash
nano /etc/php/8.2/fpm/conf.d/10-opcache.ini
```

确认或添加以下内容：

```ini
; 启用 OPcache
opcache.enable=1

; CLI 模式也启用（开发调试用，生产环境可不开）
opcache.enable_cli=1

; 分配内存（小站 64MB 够了）
opcache.memory_consumption=64

; 存储内部字符串的内存
opcache.interned_strings_buffer=8

; 最大缓存文件数
opcache.max_accelerated_files=4000

; 多少秒检查一次 PHP 文件是否更新
; 生产环境设大一些（如 300），开发阶段建议设 0 或 60
opcache.revalidate_freq=60

; 保存注释（ThinkPHP 依赖注解，必须开启）
opcache.save_comments=1

; 开启快速关闭
opcache.fast_shutdown=1

; 开启大文件支持
opcache.file_cache=1
opcache.file_cache_only=0
opcache.file_cache_consistency_checks=1
```

**ThinkPHP 8 特别注意：**

- `opcache.save_comments=1` 必须开，否则注解路由会失效
- `opcache.jit` PHP 8.0+ 支持 JIT 编译，但小站意义不大，不建议折腾

### 5. 重启生效

```bash
systemctl restart php8.2-fpm
```

### 6. 验证是否生效

**方法一：命令行查看**

```bash
php -i | grep -i opcache.enable
```

**方法二：phpinfo 页面查看**

写一个 `phpinfo.php` 放到网站目录：

```php
<?php
phpinfo();
```

在页面中搜索 `OPcache`，看到以下内容说明已生效：

```bash
Opcode Caching  ✓ Up and Running
Optimization    ✓ Enabled
```
