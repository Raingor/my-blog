# 千问cli安装

安装 Qwen Code 非常简单，它本质上是一个基于 Node.js 的命令行工具（CLI）。

根据最新的官方文档（2026年3月），推荐使用 **npm** 进行安装，这是最稳定且易于更新的方式。以下是保姆级的安装和配置步骤：

### 🛠️ 第一步：检查环境（前置条件）
Qwen Code 依赖 Node.js 环境，且版本要求较高。

1.  打开你的终端（Terminal、PowerShell 或 CMD）。
2.  输入 `node -v` 检查版本。
3.  **要求**：版本号必须 **≥ 20**。
    *   如果你的版本低于 20（例如 v18 或 v16），请先去 [Node.js 官网](https://nodejs.org/) 下载并安装最新的 LTS 版本。

### 📥 第二步：安装 Qwen Code
环境准备好后，在终端执行以下命令进行全局安装：

```bash
npm install -g @qwen-code/qwen-code@latest
```

*   **安装完成后验证**：
    输入以下命令，如果显示版本号（如 `0.11.1` 或更高），说明安装成功：
    ```bash
    qwen --version
    ```

### ⚙️ 第三步：配置 API Key（二选一）
安装好后，你需要配置阿里云百炼的 API Key 才能使用。你可以选择**交互式登录**（推荐，有免费额度）或**配置文件登录**。

#### 方法 A：交互式登录（推荐新手/个人）
这是最简单的方法，通常可以获得每天 2000 次的免费调用额度。

1.  在终端输入 `qwen` 并回车。
2.  界面会提示你进行认证，选择 **Qwen OAuth** 模式。
3.  按回车确认后，它会自动打开浏览器让你登录阿里云账号。
4.  登录并授权后，回到终端，即可直接开始使用。

#### 方法 B：手动配置 API Key（适合开发者/企业）
如果你已经有阿里云百炼的 API Key（按量付费或 Coding Plan），可以通过配置文件接入。

1.  **获取 Key**：去 [阿里云百炼控制台](https://bailian.console.aliyun.com/) 创建 API Key。
2.  **创建配置文件**：
    *   **macOS / Linux**: 路径为 `~/.qwen/settings.json`
    *   **Windows**: 路径为 `C:\Users\你的用户名\.qwen\settings.json`
3.  **写入配置**：
    新建或编辑 `settings.json`，填入以下内容（注意替换 `YOUR_API_KEY`）：

```json
{
  "env": {
    "BAILIAN_API_KEY": "YOUR_API_KEY"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "qwen3.6-plus",
        "name": "[Bailian] qwen3.6-plus",
        "baseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1",
        "envKey": "BAILIAN_API_KEY"
      }
    ]
  },
  "security": {
    "auth": {
      "selectedType": "openai"
    }
  },
  "model": {
    "name": "qwen3.6-plus"
  },
  "$version": 3
}
```

### 🚀 第四步：开始使用
配置完成后，再次在终端输入：

```bash
qwen
```

你现在就进入了 Qwen Code 的交互界面！你可以直接输入需求，例如：
*   “帮我用 Python 写一个贪吃蛇游戏”
*   “解释一下当前目录下的 main.py 文件”
*   “把 src 文件夹里的所有 JS 文件重命名为 TS 文件”

### 💡 常用命令速查
*   `/model`：切换模型（例如切换到 `qwen3-coder-plus`）。
*   `/quit`：退出程序。
*   `qwen --checkpointing`：带检查点启动（支持回滚代码修改）。

快去试试吧！如果遇到 `command not found` 错误，通常是因为 npm 的全局路径没配好，重启一下终端通常能解决。
