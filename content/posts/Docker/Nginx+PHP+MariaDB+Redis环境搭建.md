# Nginx+PHP+MariaDB+Redis环境搭建

如果你希望在 Docker 中使用 Nginx 1.12.0 和 PHP 8.2，可以按照以下步骤修改 `docker-compose.yml` 和相关配置。

### 1. 修改 `docker-compose.yml`

你需要将 `nginx` 和 `php` 服务中的镜像指定为你需要的版本。具体来说：

- Nginx 版本为 1.12.0
- PHP 版本为 8.2-fpm

以下是修改后的 `docker-compose.yml` 文件：

```yaml
services:
  nginx:
    image: nginx:1.12.0
    container_name: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./www:/var/www/html
    depends_on:
      - php
    networks:
      - app-network

  php:
    image: php:8.2-fpm
    container_name: php
    volumes:
      - ./www:/var/www/html
    networks:
      - app-network

  mariadb:
    image: mariadb:latest
    container_name: mariadb
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: mydatabase
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    volumes:
      - mariadb-data:/var/lib/mysql
    networks:
      - app-network

  redis:
    image: redis:latest
    container_name: redis
    networks:
      - app-network

volumes:
  mariadb-data:

networks:
  app-network:
    driver: bridge
```

### 2. 修改 Nginx 配置

确保你的 `nginx.conf` 配置文件与之前的设置兼容，并且能正确处理 PHP 8.2。对于 PHP 8.2 的处理逻辑与较早版本的 PHP 并无太大变化，主要是确保 `fastcgi_pass` 指向 PHP 容器。

```nginx
server {
    listen 80;
    server_name localhost;

    root /var/www/html;
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass php:9000;
        fastcgi_param SCRIPT_FILENAME /var/www/html$document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    error_log  /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
}
```

### 3. 配置 PHP 8.2 应用代码

PHP 8.2 和之前版本一样，放置在 `www` 文件夹中的 PHP 文件会通过 Nginx 和 PHP-FPM 处理。你可以像之前一样创建一个简单的 `index.php` 文件：

```php
<?php
phpinfo();
?>
```

### 4. 启动容器

使用 `docker-compose` 启动容器：

```bash
docker-compose up -d
```

### 5. 测试服务

- **Nginx**: 访问 `http://localhost`，查看 PHP 8.2 配置。
- **PHP**: 使用 PHP 8.2 提供的功能和配置。
- **MariaDB**: 与之前相同，可以通过 `docker exec` 进入 MariaDB 容器进行操作。
- **Redis**: 使用 `docker exec` 进入 Redis 容器，运行 Redis 命令。

### 6. 停止和清理

如果需要停止并清理容器，可以使用：

```bash
docker-compose down
```

这样就完成了在 Docker 中使用 Nginx 1.12.0 和 PHP 8.2 的配置。