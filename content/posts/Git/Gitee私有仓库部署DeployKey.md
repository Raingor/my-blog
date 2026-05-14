# Gitee私有仓库部署DeployKey

下面教你 **最安全、最快速、最标准** 的做法，让客户服务器能够拉取你 **Gitee 私有仓库** —— 使用 **部署专用 SSH Key（Deploy Key）**。

---

# ✅ 场景说明

你仓库是私有的，但客户服务器需要 `git pull`。  
你不想把你的 **个人 SSH Key** 给客户服务器（非常危险）。

最正确方式：  
**给客户服务器生成一个新的 SSH key，然后把 public key 加入 Gitee 仓库的 Deploy Key。**

这样做的好处：

- ✔ 不暴露你自己的 SSH key
    
- ✔ Key 只能访问你指定的单个仓库
    
- ✔ 可随时删除（客户服务器权限立刻失效）
    

---

# ✅ 第一步：在客户服务器生成一个专用 SSH Key

登录客户服务器（Linux / macOS / Windows Git Bash：

```bash
ssh-keygen -t ed25519 -C "deploy@customer"
```

一路回车即可，文件默认生成在：

```bash
~/.ssh/id_ed25519
~/.ssh/id_ed25519.pub
```

---

# ✅ 第二步：把公钥上传到你的 Gitee 仓库 Deploy Key

1. 打开 Gitee 仓库
    
2. 左侧菜单：**仓库设置**
    
3. 找：**部署公钥（Deploy Keys）**
    
4. 点击：**添加部署公钥**
    
5. 名称随意，例如：`customer-server`
    
6. 把客户服务器的公钥内容复制进去：
    

查看公钥：

```bash
cat ~/.ssh/id_ed25519.pub
```

复制整行粘贴。

确认保存。

---

# ✅ 第三步：在客户服务器配置 SSH 信任 gitee.com

编辑：

```bash
nano ~/.ssh/config
```

增加：

```bash
Host gitee.com
    HostName gitee.com
    User git
    IdentityFile ~/.ssh/id_ed25519
```

保存。

---

# ✅ 第四步：测试连接

```bash
ssh -T git@gitee.com
```

看到类似：

```bash
Hi xxx! You've successfully authenticated...
```

说明成功。

---

# ✅ 第五步：克隆或拉取

首次克隆：

```bash
git clone git@gitee.com:你的账号/仓库名.git
```

如果仓库已存在：

```bash
git pull
```

---

# ❗ 常见错误说明（避免踩坑）

### ❌ 不能用你的个人 SSH key 复制到客户服务器

那样客户服务器获得了你所有仓库权限！

### ❌ 不能用账户的 SSH Key

Deploy Key 才是单仓库权限。

### ❌ Deploy Key 默认只读

如需 **git push**，在添加 Deploy Key 时勾选 **Allow write（允许写）**。

---

# 👍 如果你愿意，我可以：

- 帮你检查客户服务器上的 SSH 配置
    
- 帮你生成配置脚本，一键安装 SSH Key
    
- 帮你设置多个客户服务器访问私有仓库的最佳安全方案
    

你需要我帮你做哪一个？