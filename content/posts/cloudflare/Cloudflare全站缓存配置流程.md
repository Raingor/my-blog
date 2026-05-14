# Cloudflare全站缓存配置流程

这份 Cloudflare 全站缓存的完整配置流程，我都帮你整理好了，可以直接复制保存：

---

### ☁️ Cloudflare 全站缓存配置流程

#### 第一步：前提检查

- 确保你的域名在 Cloudflare **DNS** 页面中，状态为 **橙色云朵**（已代理）。

#### 第二步：设置缓存绕过规则

1. 进入 Cloudflare 后台，选择 **Rules** -> **Configuration Rules**。
2. 点击 **Create rule**。
3. **Rule name**：`Bypass Cache for Admin`。
4. **Field** 选择 `Host`，**Operator** 选择 `matches`，**Value** 输入你的域名（例如 `special-fun.com`）。
5. 点击 **And** 添加条件，**Field** 选择 `URI Path`，**Operator** 选择 `matches`，**Value** 输入正则表达式：
    - 正则内容：`^/(wp-admin|wp-login|xmlrpc|wp-.*.php|feed|comments|trackback).*$`
6. **Choose action**：选择 **Cache Level** -> **Bypass**。
7. 点击 **Deploy**。

#### 第三步：设置全站缓存规则

1. 在 **Configuration Rules** 页面，再次点击 **Create rule**。
2. **Rule name**：`Cache Everything`。
3. **Field** 选择 `Host`，**Operator** 选择 `matches`，**Value** 输入你的域名。
4. **Choose action**：
    - 第一行：选择 **Cache Level** -> **Cache Everything**。
    - 点击 **Add setting**，第二行选择 **Edge Cache TTL** -> **1 month**。
5. 点击 **Deploy**。

#### 第四步：验证测试

1. 打开浏览器无痕模式，访问你的网站首页。
2. 按 `F12` 打开开发者工具，刷新页面。
3. 查看 **Network** -> **Headers** -> **Response Headers**。
4. 确认 `cf-cache-status` 为 **HIT**。

---