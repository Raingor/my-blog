# Phinx的8088端口配置

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  dbs.ct.cn;

    charset utf-8;
    access_log  /var/log/nginx/dbs.ct.cn.access.log  main;

    location / {
        proxy_pass http://php:8088;  # 代理到本地的 9507 端口
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

```

##### php 下运行
```bash
php -S 0.0.0.0:8088 vendor/robmorgan/phinx/app/web.php
```