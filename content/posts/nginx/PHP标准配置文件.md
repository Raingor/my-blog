# PHP标准配置文件

要在 Nginx 配置中启用 Gzip 压缩，可以通过设置 `gzip` 模块来优化静态资源的传输。以下是在之前的配置基础上，添加 Gzip 压缩的示例。

### 修改后的 Nginx 配置示例（包括 Gzip）

```nginx
server {

listen 80;

server_name en.purewaterone.com;

return 301 https://en.purewaterone.com/$1;

}

server {

listen 443 ssl http2;

listen [::]:443 ssl http2;

server_name en.purewaterone.com;

  
charset utf-8;

  
root /mnt/wwwroot/ocms/csyh-en/public;

index index.php index.html index.htm;

  
ssl_certificate "/etc/nginx/ssl/en.purewaterone.com/en.purewaterone.com.pem";

ssl_certificate_key "/etc/nginx/ssl/en.purewaterone.com/en.purewaterone.com.key";

ssl_session_cache shared:SSL:1m;

ssl_session_timeout 10m;

ssl_ciphers HIGH:!aNULL:!MD5;

ssl_prefer_server_ciphers on;

access_log /var/log/nginx/en.purewaterone.com.access.log main;

# 添加 X-Powered-By 头

add_header X-Powered-By "CTMON";

location / {

if (!-e $request_filename) {

rewrite ^(.*)$ /index.php?s=$1 last;

break;

}

}

  
location ~* ^/Upload/(.*)$ {

rewrite ^/Upload/(.*)$ /upload/$1 break;

}

  
location ~ \.php$ {

include fastcgi_params;

fastcgi_pass unix:/etc/php-fpm.d/php-fpm.socket;

fastcgi_index index.php;

fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;

}

error_page 404 /404.html;

location = /40x.html {

}

  
error_page 500 502 503 504 /50x.html;

location = /50x.html {

}

  
gzip on;

gzip_comp_level 6;

gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/rss+xml text/javascript;

gzip_min_length 1k;

gzip_buffers 4 16k;

  
location ~* \.(jpg|jpeg|png|gif|webp|ico|svg|css|js)$ {

expires 30d;

add_header Cache-Control "public, max-age=2592000";

}

location ~* \.(eot|ttf|woff|woff2)$ {

expires 1M;

add_header Cache-Control "public, max-age=2592000";

}

  
}
```

### 解释 Gzip 配置项

- `gzip on;`：启用 Gzip 压缩。
- `gzip_comp_level 6;`：设置压缩级别，数字越大，压缩越强，但会占用更多 CPU 资源。一般 6 是一个平衡的选择。
- `gzip_min_length 1024;`：只有文件大小大于 1KB 时才进行压缩。
- `gzip_types`：指定哪些 MIME 类型的响应会进行 Gzip 压缩。通常包括文本文件、CSS、JavaScript 和 JSON 等文件类型。
- `gzip_vary on;`：启用后，响应头中会加上 `Vary: Accept-Encoding`，这样代理服务器和缓存系统能够正确处理压缩内容。
- `gzip_disable "msie6";`：为了避免一些老旧浏览器（如 IE6）在处理 Gzip 内容时出错，禁用对这些浏览器的 Gzip 支持。

### 其他建议

- 如果你有大量的静态资源（如图片、视频、字体文件等），可以考虑为这些资源设置缓存，提升网站性能。
- Gzip 压缩对文本内容（如 HTML、CSS、JS 等）最为有效，但对已经压缩过的文件（如图像或音频）不会起太大作用。

配置完成后，重新加载 Nginx 配置和重启 PHP-FPM：

```bash
# 重新加载 Nginx 配置
sudo systemctl reload nginx

# 重新启动 PHP-FPM
sudo systemctl restart php8.2-fpm
```

这样，你的 Nginx 服务器就启用了 Gzip 压缩，能够显著减少传输的数据量，提升页面加载速度。如果你有其他问题，欢迎继续提问！