# Nginx正式上线配置模板

```nginx
server {

listen 80;

server_name longwillmachinery.com;

return 301 https://longwillmachinery.com/$1;

}

server {

listen 80;

server_name www.longwillmachinery.com;

return 301 https://www.longwillmachinery.com/$1;

}

server {

listen 443 ssl http2;

listen [::]:443 ssl http2;

server_name longwillmachinery.com www.longwillmachinery.com;

  
charset utf-8;

  
root /mnt/wwwroot/backend/rongyi-en/public;

index index.php index.html index.htm;

  
if ($server_port !~ 443){

rewrite ^(/.*)$ https://$host$1 permanent;

}

ssl_certificate "/etc/nginx/ssl/www.longwillmachinery.com/www.longwillmachinery.com.pem";

ssl_certificate_key "/etc/nginx/ssl/www.longwillmachinery.com/www.longwillmachinery.com.key";

ssl_session_cache shared:SSL:1m;

ssl_session_timeout 10m;

ssl_ciphers HIGH:!aNULL:!MD5;

ssl_prefer_server_ciphers on;

access_log /var/log/nginx/www.longwillmachinery.com.access.log main;

  
location / {

if (!-e $request_filename) {

rewrite ^(.*)$ /index.php?s=$1 last;

break;

}

}

  
location ~ \.php$ {

include fastcgi_params;

fastcgi_pass unix:/etc/php-fpm.d/php-fpm.socket;

fastcgi_index index.php;

fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;

}

  
location ~ /\.git {

deny all;

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

  
}
```