# Swoole反向代理配置

```nginx
server {
    listen       80;
    server_name  demo-swoole.ct.cn;

    charset utf-8;

    location / {
        proxy_pass http://php:9507;  # 代理到本地的 9507 端口
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```