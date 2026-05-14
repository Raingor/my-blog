# 1Panel+Cloudflare企業官網HTTPS證書配置實戰指南

這是一份為您整理的 **《1Panel + Cloudflare 企業官網 HTTPS 證書配置實戰文檔》**。

這份文檔完整記錄了從申請、排錯到最終啟用的全流程，特別包含了針對 **Cloudflare 403 錯誤** 的解決方案。您可以將此文檔保存為團隊內部知識庫或運維手冊，方便未來重複使用或交接。

---

# 📄 1Panel + Cloudflare 企業官網 HTTPS 證書配置實戰指南

## 1. 概述
本文檔旨在指導運維人員在 **1Panel 面板** 環境下，配合 **Cloudflare CDN**，為企業域名（如 `slir1.top`）申請並部署 **Let's Encrypt** 免費 SSL 證書，實現全站 HTTPS 加密及自動續期。

- **適用場景**：企業品牌官網、博客、展示型網站
- **核心工具**：1Panel (服務器管理)、Cloudflare (DNS/CDN)、Let's Encrypt (證書頒發)
- **驗證方式**：HTTP-01 (文件驗證)
- **安全等級**：Cloudflare Full (Strict) + HSTS

---

## 2. 前置準備

### 2.1 環境檢查
- [ ] 服務器已安裝 1Panel 面板並運行正常。
- [ ] 域名 (`slir1.top`) 已在 1Panel「網站」模塊中創建，且能通過 HTTP 正常訪問。
- [ ] 域名 DNS 已解析至 Cloudflare，且狀態為「已代理」（橙色雲朵 ☁️）。
- [ ] 服務器防火牆（及安全組）已放行 **80 端口** (HTTP) 和 **443 端口** (HTTPS)。

### 2.2 關鍵設置（防止失敗）
在申請證書前，必須在 Cloudflare 後台進行以下設置，否則極易報 `403 Forbidden` 錯誤：

1.  登入 **Cloudflare 控制台**。
2.  進入 **Rules (規則)** → **Page Rules (頁面規則)**。
3.  點擊 **Create Page Rule**，添加以下規則：
    -   **URL**: `http://你的域名/.well-known/acme-challenge/*`
        *(例如：`http://slir1.top/.well-known/acme-challenge/*`)*
    -   **Settings (設置)**:
        1.  **Security Level (安全級別)** → 選擇 **Essentially Off (基本關閉)**
        2.  **Cache Level (緩存級別)** → 選擇 **Bypass (繞過緩存)**
    -   點擊 **Save and Deploy (保存並部署)**。

> **💡 原理說明**：Let's Encrypt 的驗證機器人會被 Cloudflare 的高級防護攔截。此規則專門放行了驗證路徑，確保驗證文件能被公開訪問。

---

## 3. 證書申請流程 (1Panel)

### 3.1 進入證書管理
1.  登入 1Panel 面板。
2.  左側菜單點擊 **「網站」** → **「證書」**。
3.  點擊右上角 **「申請」** 按鈕。

### 3.2 填寫申請信息
在彈出的表單中嚴格按以下配置填寫：

| 配置項 | 建議設置 | 說明 |
| :--- | :--- | :--- |
| **主域名** | `slir1.top` | 根域名 |
| **其他域名** | `www.slir1.top` | 如有需要可添加 www 子域名 |
| **Acme 賬戶** | 默認 / 自動創建 | 首次使用會自動生成 |
| **密鑰算法** | `EC 256` | 推薦，兼容性與安全性平衡 |
| **驗證方式** | **`HTTP`** | **關鍵！不要選 DNS** |
| **自動續簽** | ✅ **勾選** | 確保證書過期前自動更新 |
| **推送证书到本地目錄** | ☐ **不勾選** | 1Panel 自動管理，無需手動指定 |
| **申请证书之后执行脚本** | ☐ **不勾選** | 除非有特殊運維需求，否則保持空白 |

### 3.3 執行申請
1.  確認無誤後，點擊 **「申請」**。
2.  觀察日誌輸出：
    -   若看到 `The server validated our request` 和 `Server responded with a certificate`，表示 **成功**。
    -   若看到 `403 :: Unauthorized`，請回頭檢查 **2.2 章節** 的 Cloudflare 規則是否生效，或暫時降低 Cloudflare 安全級別。

---

## 4. 網站綁定與啟用

證書申請成功後，需將其綁定到具體網站才能生效。

### 4.1 綁定證書
1.  在 1Panel 左側菜單點擊 **「網站」**。
2.  找到目標網站 (`slir1.top`)，點擊右側 **「設置」** (齒輪圖標)。
3.  在彈窗左側選擇 **「HTTPS」** (或 SSL)。
4.  進行如下操作：
    -   **啟用 HTTPS**：打開開關 (變藍)。
    -   **SSL 選項**：在下拉列表中選擇剛才申請的證書 (顯示為 `slir1.top [Let's Encrypt]`)。
    -   **HTTP 選項**：選擇 **「訪問 HTTP 自動跳轉到 HTTPS」**。
    -   **HSTS**：✅ **勾選啟用** (增強安全性，強制瀏覽器只連 HTTPS)。
    -   **TLS 版本**：勾選 `TLS 1.3` 和 `TLS 1.2`，取消勾選舊版本。
5.  點擊底部 **「保存」**。
    > 系統將自動重啟 Nginx/OpenResty 服務。

### 4.2 調整 Cloudflare SSL 模式
回到 **Cloudflare 控制台**：
1.  進入 **SSL/TLS** 頁面。
2.  將加密模式修改為 **`Full (Strict)` (完全-嚴格)**。
    -   *解釋*：因為源站現在已有有效的可信證書，Strict 模式可提供端到端的最高級別加密驗證。

---

## 5. 驗證與測試

### 5.1 瀏覽器測試
使用瀏覽器的 **無痕模式/隱私模式** 訪問：
-   `https://slir1.top`
    -   ✅ 應顯示綠色鎖頭 🔒。
    -   ✅ 點擊鎖頭查看證書，頒發者應為 **Let's Encrypt**，有效期約 3 個月。
-   `http://slir1.top`
    -   ✅ 應自動 301 跳轉到 `https://` 地址。

### 5.2 在線工具檢測 (可選)
-   使用 [SSL Labs](https://www.ssllabs.com/ssltest/) 進行深度掃描，目標評分應為 **A+**。
-   使用 [crt.sh](https://crt.sh/) 查詢證書鏈是否完整。

---

## 6. 常見問題排查 (FAQ)

| 問題現象 | 可能原因 | 解決方案 |
| :--- | :--- | :--- |
| **申請失敗：403 Forbidden** | Cloudflare WAF 攔截了驗證請求 | 檢查是否添加了 `.well-known/acme-challenge/*` 的 Page Rule；或臨時將 Cloudflare 安全級別調低。 |
| **申請失敗：Connection Refused** | 80 端口未開放 | 檢查服務器安全組/防火牆是否放行 TCP 80 端口。 |
| **瀏覽器提示「證書不受信任」** | Cloudflare 模式錯誤 | 確保 Cloudflare SSL/TLS 模式已改為 **Full (Strict)**，而非 Flexible。 |
| **網站打不開 / 502 Bad Gateway** | Nginx 配置錯誤 | 檢查網站「配置文件」中是否有衝突；確認網站運行目錄正確。 |
| **HSTS 導致無法訪問 HTTP** | 瀏覽器緩存了 HSTS 策略 | 使用無痕模式測試，或在 Chrome 地址欄輸入 `chrome://net-internals/#hsts` 清除域名記錄。 |

---

## 7. 後續維護

-   **自動續期**：由於勾選了「自動續簽」，1Panel 會在證書到期前 30 天自動嘗試續期，無需人工干預。
-   **日誌監控**：定期查看 1Panel 「日誌審計」或證書頁面日誌，確保自動續期任務執行成功。
-   **規則清理**：證書申請成功並穩定運行後，Cloudflare 的 Page Rule **建議保留**，以備未來續期時再次使用（續期機制相同）。

---

> **文檔版本**：v1.0
> **最後更新**：2026-03-24
> **適用環境**：1Panel + Cloudflare + Let's Encrypt