# Nginx 配置优化指南

## 基础优化（nginx.conf）

### 1. 隐藏版本号（安全性）

```nginx
http {
    server_tokens off;
}
```

### 2. 优化连接数

```nginx
worker_processes auto;          # 自动匹配 CPU 核数
worker_rlimit_nofile 65535;     # 提高文件描述符上限

events {
    worker_connections 1024;    # 每个 worker 最大连接数
    multi_accept on;            # 一次性接受所有新连接
    use epoll;                  # Linux 下使用 epoll 模型
}
```

### 3. 开启 KeepAlive（减少重复连接开销）

```nginx
http {
    keepalive_timeout 65;
    keepalive_requests 100;     # 单个长连接最大请求数
}
```

## 性能优化

### 4. 开启 Gzip 压缩（减少传输体积）

```nginx
gzip on;
gzip_min_length 1k;            # 小于 1KB 的不压缩
gzip_comp_level 4;             # 压缩级别 1-9，4 是性能与压缩率的平衡点
gzip_types text/plain text/css application/json application/javascript
           text/xml application/xml application/xml+rss text/javascript
           image/svg+xml;
gzip_vary on;                  # 在响应头加 Vary: Accept-Encoding
gzip_disable "msie6";          # 兼容 IE6
```

### 5. 静态资源缓存

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2|woff|ttf|eot)$ {
    expires 30d;
    access_log off;             # 静态资源不写日志，减少磁盘 IO
    add_header Cache-Control "public, immutable";
}
```

### 6. 关闭不必要的 access_log（降低磁盘 IO）

```nginx
server {
    access_log off;             # 完全关闭
    # 或者只记录错误
    # access_log /dev/null;
}
```

### 7. 客户端请求体限制

```nginx
http {
    client_max_body_size 10m;       # 上传文件大小限制
    client_body_buffer_size 128k;   # 请求体缓冲区大小
    client_header_buffer_size 1k;   # 请求头缓冲区大小
    large_client_header_buffers 4 8k;
}
```

## ThinkPHP 8 站点配置（完整示例）

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/mysite/public;
    index index.php index.html;

    # 关闭版本号
    server_tokens off;

    # 关闭 access log 减少磁盘 IO
    access_log off;
    error_log /var/log/nginx/mysite_error.log warn;

    # ThinkPHP URL 重写
    location / {
        if (!-e $request_filename) {
            rewrite ^(.*)$ /index.php?s=$1 last;
        }
    }

    # PHP-FPM
    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;

        # FastCGI 缓冲优化
        fastcgi_buffer_size 64k;
        fastcgi_buffers 4 64k;
        fastcgi_busy_buffers_size 128k;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2|woff|ttf|eot)$ {
        expires 30d;
        access_log off;
        add_header Cache-Control "public, immutable";
    }

    # 禁止访问敏感目录
    location ~* ^/(app|config|runtime|vendor)/ {
        deny all;
    }

    # 禁止访问隐藏文件（如 .env、.git）
    location ~ /\. {
        deny all;
    }
}
```

## HTTPS 配置（推荐）

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;

    # SSL 优化
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # 其余配置同上...
}

# HTTP 跳转 HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

## 优化效果对比

| 优化项 | 效果 |
|--------|------|
| Gzip 压缩 | 传输体积减少 60%-80% |
| 静态资源缓存 | 重复访问不再请求服务器 |
| 关闭 access_log | 磁盘写入大幅减少 |
| KeepAlive | 减少 TCP 握手开销 |
| FastCGI 缓冲优化 | 减少与 PHP-FPM 的通信次数 |
| SSL Session 缓存 | 减少重复 SSL 握手 |
