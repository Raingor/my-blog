# Homebrew安装与配置

看起来你在尝试查看 `homebrew/core` 仓库的远程地址时遇到了问题，提示找不到对应的目录。这可能是因为你的 Homebrew 安装路径或配置与默认情况有所不同，或者你还没有克隆 `homebrew/core` 仓库。

### 解决方法

#### 1. 确认 Homebrew 的安装路径
首先确认一下 Homebrew 是否正确安装，并且 `homebrew/core` 是否已经克隆到本地：

```bash
brew --prefix
```

这个命令会输出 Homebrew 的安装路径，默认情况下是 `/usr/local` 或 `/opt/homebrew`（对于 Apple Silicon M1/M2 芯片）。

然后检查 `homebrew/core` 是否存在：

```bash
ls -l $(brew --repo homebrew/core)
```

如果显示“没有那个文件或目录”，说明 `homebrew/core` 还未克隆到本地。

---

#### 2. 克隆 `homebrew/core` 仓库
如果你发现 `homebrew/core` 不存在，可以手动克隆它：

```bash
git clone https://github.com/Homebrew/homebrew-core $(brew --repo)/Library/Taps/homebrew/homebrew-core
```

或者使用国内镜像站：

```bash
git clone https://mirrors.ustc.edu.cn/homebrew-core.git $(brew --repo)/Library/Taps/homebrew/homebrew-core
```

---

#### 3. 更新和验证
克隆完成后，再次运行以下命令来更新并验证是否成功：

```bash
# 更新 Homebrew
brew update

# 查看 homebrew/core 的远程地址
git -C $(brew --repo homebrew/core) remote -v
```

---

#### 4. 设置镜像源（可选）
如果你想设置国内镜像源以加速下载，可以参考之前的步骤：

```bash
# 设置 brew 仓库镜像
cd "$(brew --repo)"
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git

# 设置 homebrew-core 镜像
cd "$(brew --repo homebrew/core)"
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git

# 设置 bottle 下载镜像
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.zshrc
source ~/.zshrc
```

---

#### 5. 再次尝试安装
完成上述步骤后，再次尝试安装 `mariadb@10.11`：

```bash
brew install mariadb@10.11
```

这样应该可以解决你遇到的问题，并且在安装过程中尽量减少对 GitHub 的依赖，提高下载速度。