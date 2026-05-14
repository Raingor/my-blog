# 清除CSS缓存

#### Cloudflare 局部清除缓存教程（仅清除 CSS 样式文件）

**适用场景**：修改了网站样式（CSS），需要刷新缓存，但不想清除全站缓存。

---

#### 操作步骤

1. 登录 Cloudflare 后台，进入你的域名管理页面。
2. 在左侧菜单中，点击 **Caching** → **Configuration**。
3. 在右侧页面中，找到并点击 **Purge Cache** 按钮。
4. 在弹出的 “Custom Purge” 窗口中，选择 **Prefix** 选项。
5. 在输入框中，输入你要清除缓存的文件夹路径。例如，如果你的 CSS 文件存放在 `static/less/` 目录下，输入：
    
    ```bash
    https://www.special-fun.com/static/less/
    ```
    
6. 点击右下角的蓝色 **Purge** 按钮，完成清除。

---

#### 注意事项

- **路径要准确**：确保输入的路径包含所有需要刷新的 CSS 文件。
- **刷新后验证**：清除后，按 `Ctrl + F5`（Windows）或 `Cmd + Shift + R`（Mac）强制刷新网页，查看样式是否更新。
- **不影响其他缓存**：此方法只清除指定目录下的文件，不会影响其他页面或资源的缓存。

---

#### 为什么选 Prefix？

因为 Cloudflare 现在没有“按文件类型清除”的选项，所以用 **Prefix** 是最精准、最高效的方法，既能清除所有相关 CSS，又不会误删其他缓存。

`php artisan asset:update && php artisan cache:clear && php artisan config:clear`
