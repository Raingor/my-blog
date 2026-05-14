# iTerm2配置多服务器连接

在 macOS 上使用 iTerm2 配置 SSH 连接服务器的步骤如下，适合长期连接管理（比如绑定服务器别名、免密登录等）：

---

## ✅ 一、准备工作

### 1. 安装 iTerm2（如尚未安装）

官网下载：[https://iterm2.com](https://iterm2.com/)

---

## ✅ 二、生成 SSH 密钥对（可跳过，如果已有）

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

提示输入保存位置（默认是 `~/.ssh/id_rsa`）和密码，可以一路回车。

---

## ✅ 三、将公钥部署到远程服务器

假设你的服务器用户是 `root`，IP 是 `192.168.1.100`：

```bash
ssh-copy-id root@192.168.1.100
```

> 也可以手动复制 `~/.ssh/id_rsa.pub` 的内容添加到服务器的 `~/.ssh/authorized_keys` 文件中。

---

## ✅ 四、配置 SSH 配置文件（推荐）

编辑本地的 SSH 配置文件：

```bash
nano ~/.ssh/config
```

添加如下内容（按你实际服务器修改）：

```ssh
Host myserver
    HostName 192.168.1.100
    User root
    Port 22
    IdentityFile ~/.ssh/id_rsa
```

> 这样你以后就可以直接用：

```bash
ssh myserver
```

---

## ✅ 五、在 iTerm2 中使用

### 1. 打开 iTerm2

直接输入：

```bash
ssh myserver
```

### 2. 可设置快捷方式（可选）：

- `Profiles` → `Open Profiles` → `Edit Profiles` → `+`
    
- 填写名称，例如：`MyServer`
    
- 在 **Command** 中输入：`ssh myserver`
    
- 保存，方便以后一键连接
    

---

## ✅ 六、可选增强（建议）

### 🔒 安全建议

如果你担心私钥泄露，建议设置私钥密码，并使用 `ssh-agent` 管理。

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

---

需要我帮你一键生成配置文件，或者是为多台服务器批量配置，可以告诉我服务器信息（IP/用户名/端口等），我可以直接帮你写好。