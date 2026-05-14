# Cloudflare负载均衡配置实战文档（解决Critical报错）

## Cloudflare 负载均衡配置实战文档（解决 Critical 报错）

### 核心故障分析

在配置 Cloudflare 负载均衡时，最容易出现 `Critical` 状态。根据实战排查，最常见的报错原因如下：

#### Response code mismatch error（响应代码不匹配）

- **现象**：健康检查（Monitor）显示红色 Critical。
- **原因**：服务器开启了“强制 HTTPS”或自动跳转功能。当 Cloudflare 用 HTTP 协议探测时，服务器返回了 `301` 或 `302` 跳转指令，而不是预期的 `200` 成功代码。
- **解决**：必须在健康检查的“预期代码”中手动添加 `301` 和 `302`。

#### Connection timed out（连接超时）

- **原因**：服务器防火墙（安全组/宝塔等）拦截了 Cloudflare 的 IP，或者未开放 80 端口。
- **解决**：确保服务器 80 端口开放，或者使用 HTTP 协议进行内部探测。

---

### 标准配置流程

请严格按照以下步骤配置，可直接解决上述报错。

#### 第一步：配置健康检查

这是最关键的一步，决定了负载均衡能否识别服务器状态。

1. 进入 Cloudflare 控制台 -> **负载均衡** -> **Monitor** -> **Create**。
2. 按以下参数填写（直接复制）：

|配置项|填写内容|说明|
|:--|:--|:--|
|**Name**|`HTTP-Check-80`|自定义名称|
|**Type**|**HTTP**|**必须选 HTTP**，避免 SSL 证书验证问题|
|**Port**|**80**|标准 HTTP 端口|
|**Path**|`/`|检查根目录，最稳妥|
|**Method**|`GET`|默认即可|
|**Expected Codes**|**`200, 301, 302, 403, 404`**|**核心重点**：包含跳转代码|
|**Timeout**|`5 seconds`|默认|
|**Interval**|`60 seconds`|检查频率|
|**Retries**|`2`|失败重试次数|

3. 展开 **Advanced Settings**（高级设置）：

|配置项|填写内容|说明|
|:--|:--|:--|
|**Host Header**|**`你的域名.com`**|**必须填写**：告诉服务器你在访问哪个站点|
|**Follow Redirects**|不勾选|先不勾选，避免死循环|

4. 点击 **Save** 保存。

#### 第二步：配置服务器池

1. 进入 **Pools** -> **Create**。
2. **Name**：`My-Server-Pool`。
3. **Origin Addresses**：
    - 输入你的服务器 IP（如 `45.148.120.234`）。
    - 点击 **Add**。
4. **Load Shedding**：保持默认（0, 0）。
5. **Health Check**：
    - 在下拉菜单中，选择第一步创建的 `HTTP-Check-80`。
6. **Enabled**：保持勾选。
7. 点击 **Save**。

#### 第三步：创建负载均衡器

1. 进入 **Load Balancers** -> **Create**。
2. **Hostname**：输入你要做负载均衡的域名（如 `www.你的域名.com`）。
3. **Default Pool**：选择第二步创建的 `My-Server-Pool`。
4. **TTL**：`Auto`。
5. **Session Affinity**：`None`（除非你需要保持用户会话）。
6. 点击 **Save**。

---

### 验证与排查

配置完成后，请观察状态灯：

- **绿色（Healthy）**：配置成功，流量正常转发。
- **红色（Critical）**：
    1. 检查 **Expected Codes** 是否包含了 `301, 302`。
    2. 检查 **Host Header** 是否填写了正确的域名。
    3. 检查服务器防火墙是否放行了 **80 端口**。

### 附录：SSL/TLS 设置建议

为了确保用户访问也是 HTTPS，请检查：

1. 进入 **SSL/TLS** 选项卡。
2. 将加密模式设置为 **Full**。
    - 这样用户到 Cloudflare 是加密的。
    - Cloudflare 到源站（内部健康检查）使用 HTTP 也是允许的，且最稳定。