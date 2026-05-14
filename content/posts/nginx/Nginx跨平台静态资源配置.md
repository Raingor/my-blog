# Nginx跨平台静态资源配置

我看出来了 👍  
你这一堆 `rewrite + proxy_pass` 其实是 **多余的**，正是导致不起效的原因。

---

### 🔍 原因

- `rewrite ^/xxx/(.*)$ /xxx/$1 break;`  
    这个规则本身啥都没干，相当于重写成自己 → 白写。
    
- `proxy_pass https://www.szjiuzhou.com.cn/xxx/;`  
    写成这样会导致 **路径被拼接两次**，Nginx 会访问错误的路径。
    

比如请求：

```bash
https://admin-zh.szjiuzhou.com.cn/static/css/style.css
```

你配置的逻辑 =

```bash
proxy_pass https://www.szjiuzhou.com.cn/static/;
```

最后实际请求：

```bash
https://www.szjiuzhou.com.cn/static/static/css/style.css
```

👉 肯定 404。

---

### ✅ 正确写法（去掉 rewrite、去掉 proxy_pass 后缀）

直接写成下面这样就够了：

```nginx
location /upload/image/ {
    proxy_pass https://www.szjiuzhou.com.cn;
    proxy_set_header Host www.szjiuzhou.com.cn;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /storage/images/ {
    proxy_pass https://www.szjiuzhou.com.cn;
    proxy_set_header Host www.szjiuzhou.com.cn;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /static/ {
    proxy_pass https://www.szjiuzhou.com.cn;
    proxy_set_header Host www.szjiuzhou.com.cn;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /include/ {
    proxy_pass https://www.szjiuzhou.com.cn;
    proxy_set_header Host www.szjiuzhou.com.cn;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /v1/UeFile {
    proxy_pass https://www.szjiuzhou.com.cn;
}
```

---

### 🎯 简化写法（推荐）

其实你这些目录都是静态资源，可以合并成一个正则匹配，配置更干净：

```nginx
location ~ ^/(upload/image|storage/images|static|include)/ {
    proxy_pass https://www.szjiuzhou.com.cn;
    proxy_set_header Host www.szjiuzhou.com.cn;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

这样一条规则就能涵盖所有静态目录。

---

要不要我帮你直接整理成一个完整的 **`admin-zh.szjiuzhou.com.cn.conf` 模板**，你可以直接贴到宝塔？