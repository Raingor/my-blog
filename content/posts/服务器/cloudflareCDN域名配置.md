# cloudflareCDN域名配置

由于我无法直接访问 md5host 的实时后台界面（工具未返回具体页面内容），我将基于**通用的域名解析配置逻辑**以及我们刚才在 **Cloudflare 的具体操作步骤**，为你整合一份从“购买域名”到“防火墙配置完成”的**全流程操作文档**。

这份文档涵盖了：
1.  **MD5Host 端**：添加域名与获取 Nameserver。
2.  **Cloudflare 端**：接入域名与 DNS 解析。
3.  **Cloudflare 端**：WAF 防火墙规则配置（核心部分）。

---

# 📘 全流程操作指南：MD5Host 域名接入与 Cloudflare 防火墙配置

## 📌 项目目标
将托管在 **MD5Host** 的域名接入 **Cloudflare**，并配置安全策略：
- ✅ **允许**：Google Bot 等已知搜索引擎爬虫。
- ✅ **允许**：来自 **台湾 (TW)** 和 **香港 (HK)** 的用户访问。
- ❌ **拦截**：其他所有国家和地区的直接访问。

---

## 第一阶段：MD5Host 域名管理配置

> **前提**：你已在 MD5Host 购买了域名或托管服务。

### 1. 登录 MD5Host 控制面板
- 访问 [https://www.md5host.com/](https://www.md5host.com/) 并登录用户中心。
- 进入 **Domains (域名管理)** 或 **My Services (我的服务)** 页面。

### 2. 添加/管理域名
- 点击 **Add Domain (添加域名)** 或选择已购买的域名点击 **Manage (管理)**。
- 找到 **Nameservers (名称服务器)** 设置选项。
  - *注：不同面板可能显示为 "Custom Nameservers" 或 "DNS Management"。*

### 3. 修改 Nameserver 指向 Cloudflare
- 选择 **Custom Nameservers (自定义名称服务器)** 模式。
- 填入 Cloudflare 提供的两个地址（如果你还没注册 Cloudflare，请先去 cloudflare.com 注册并添加站点，获取专属地址）：
  - `ns1.your-cloudflare-ns.com`
  - `ns2.your-cloudflare-ns.com`
  - *(具体地址以 Cloudflare 后台显示的为准，通常是 `lara.ns.cloudflare.com` 这种格式)*
- 点击 **Save Changes (保存更改)**。

> ⏳ **等待生效**：Nameserver 修改通常需要 15 分钟到 24 小时全球生效，但通常几分钟内即可在 Cloudflare 检测到。

---

## 第二阶段：Cloudflare 站点接入与 DNS 解析

### 1. 添加站点到 Cloudflare
- 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)。
- 点击 **+ Add a Site (添加站点)**。
- 输入你的域名（例如 `example.com`），点击 **Add Site**。
- 选择套餐（免费选 **Free**），点击 **Continue**。

### 2. 检查 DNS 记录
- Cloudflare 会自动扫描你原有的 DNS 记录。
- **关键步骤**：确保你的网站主记录存在且状态正确。
  - **Type**: `A`
  - **Name**: `@` (或你的域名)
  - **Content**: 填写你 **MD5Host 服务器的 IP 地址**。
  - **Proxy Status**: 确保云朵图标是 **🟠 Orange (Proxied)**。
    - *只有开启橙色云朵，流量才会经过 Cloudflare，防火墙规则才会生效。*
- 如果有 `www` 记录，也请确保它是 `CNAME` 指向主域名，且云朵为橙色。
- 点击 **Continue** 完成接入。

### 3. 确认状态
- 回到 Cloudflare 首页，确认域名状态显示为 **Active**。
- 此时，你的域名流量已开始经过 Cloudflare。

---

## 第三阶段：配置 WAF 自定义规则 (核心安全策略)

> **路径**：Dashboard → 选择域名 → **Security (安全性)** → **WAF** → **Custom rules (自定义规则)**

我们将创建两条规则，**顺序不可颠倒**。

### 🔹 规则一：放行 Google Bot (优先级：高)

此规则确保搜索引擎爬虫不被地区限制误伤。

1.  点击 **+ Create rule**。
2.  **Rule name**: 输入 `Allow-Google-Bot`。
3.  **If incoming requests match... (匹配条件)**:
    - Field: `Known Bots`
    - Operator: `equals`
    - Value: `True` (开关变绿)
4.  **Then take action... (执行动作)**:
    - Choose action: 选择 **`Skip`**。
    - **WAF components to skip**: 勾选 **`All remaining custom rules`**。
      - *含义：如果是机器人，跳过后面所有的自定义检查（包括地区限制）。*
5.  **Place at (执行顺序)**: 保持默认 (First) 或手动设为 `1`。
6.  点击 **Deploy** 保存。

### 🔹 规则二：仅允许港台访问 (优先级：低)

此规则拦截非目标地区的普通用户。

1.  再次点击 **+ Create rule**。
2.  **Rule name**: 输入 `Block-Non-TW-HK`。
3.  **If incoming requests match... (匹配条件)**:
    - **第一行**:
      - Field: `Country` (或 `ip.src.country`)
      - Operator: `does not equal` (`ne`)
      - Value: `TW`
    - **逻辑连接符**: 点击 **`And`** (⚠️ **严禁**使用 Or)。
    - **第二行**:
      - Field: `Country`
      - Operator: `does not equal` (`ne`)
      - Value: `HK`
    
    > ✅ **逻辑解释**：只有当 IP **既不是** 台湾 **且** **也不是** 香港时，才触发拦截。
    
4.  **Then take action... (执行动作)**:
    - Choose action: 选择 **`Block`**。
    - (可选) 勾选 `Log matching requests` 以便查看拦截日志。
5.  **Place at (执行顺序)**:
    - Select order: 选择 **`Last`**。
    - *含义：确保这条规则在“放行机器人”规则之后执行。*
6.  点击 **Deploy** 保存。

---

## 📋 最终配置清单检查

请在 **Custom rules** 列表中确认以下顺序和内容：

| 顺序 | 规则名称 | 条件表达式 | 动作 | 状态 |
| :--- | :--- | :--- | :--- | :--- |
| **1** | `Allow-Google-Bot` | `Known Bots equals True` | **Skip** (剩余规则) | 🟢 Active |
| **2** | `Block-Non-TW-HK` | `Country ne TW` **AND** `Country ne HK` | **Block** | 🟢 Active |

---

## 🧪 验证测试流程

### 1. 验证 DNS 生效
- 在终端运行：`dig yourdomain.com`
- 确认返回的 IP 是 Cloudflare 的 IP，而不是 MD5Host 的源站 IP。

### 2. 验证地区限制
- **测试 A (正常访问)**:
  - 使用台湾或香港的 IP (手机切换 4G/5G 或代理节点)。
  - 访问网站 -> **应正常打开**。
- **测试 B (拦截测试)**:
  - 使用美国、日本、中国大陆等其他地区 IP。
  - 访问网站 -> **应显示 Cloudflare 拦截页面 (Error 1020)**。

### 3. 验证爬虫放行
- 使用 [Google Search Console](https://search.google.com/search-console) 的 "URL 检查" 工具。
- 输入你的网址进行测试。
- 结果应显示 **"URL is available to Google"** (URL 可供 Google 抓取)，且无拦截错误。

---

## ⚠️ 常见问题与注意事项

1.  **关于 MD5Host 的源站 IP 泄露**：
    - 一旦接入 Cloudflare，请确保不要在网站代码、邮件头或历史 DNS 记录中泄露真实的源站 IP。如果泄露，攻击者可能绕过 Cloudflare 直接攻击源站。
    - 建议在 MD5Host 后台或服务器防火墙（如 iptables/ufw）设置：**只允许 Cloudflare 的 IP 段访问**，拒绝其他所有直接连接。

2.  **规则生效时间**：
    - Cloudflare 规则通常在 **秒级** 生效。如果测试不通过，请尝试清除浏览器缓存或使用无痕模式。

3.  **如果误锁了自己**：
    - 如果你当前 IP 不在港台，配置完规则后自己也会无法访问。
    - **解决方法**：使用手机切换回港台节点访问后台，或者暂时在 Cloudflare 后台暂停 (Pause) 该规则进行修改。

---

*文档版本：v1.0*
*适用场景：MD5Host 域名 + Cloudflare 免费套餐*
*最后更新：2023-10*