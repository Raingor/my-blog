# 约束claudecode

使用这个“工具”其实非常简单，它本质上不是一个需要编译安装的软件，而是一个**配置文件**或者**插件**。

根据你的使用场景，主要有两种安装方式：

### 方式一：通用法（最推荐，适用 Cursor/Claude Code 等）

这是最核心的用法，适用于绝大多数 AI 编程工具（如 Cursor、Windsurf、VS Code + Copilot 等）。原理是让 AI 在读取项目时，自动看到这份“行为准则”。

1. **下载文件**：  
    获取 `CLAUDE.md` 文件的内容。你可以直接去 GitHub 项目 `andrej-karpathy-skills` 复制文件内容，或者在终端运行：
    
    ```bash
    curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
    ```
    
2. **放置文件**：  
    将下载好的 `CLAUDE.md` 文件放到你的**项目根目录**下。
3. **针对不同工具的微调**：
    - **Claude Code 用户**：直接放进去即可，它会自动读取。
    - **Cursor 用户**：建议将文件内容复制粘贴到项目根目录的 `.cursorrules` 文件中（如果没有就新建一个），这样 Cursor 就会在每次对话时遵守这些规则。

### 方式二：插件法（仅限 Claude Code 终端用户）

如果你使用的是 Anthropic 官方的命令行工具 **Claude Code**，可以直接通过插件市场安装，更方便管理。

在 Claude Code 的终端界面中，依次执行以下两条命令：

1. **添加市场源**：
    
    ```bash
    /plugin marketplace add forrestchang/andrej-karpathy-skills
    ```
    
2. **安装插件**：
    
    ```bash
    /plugin install andrej-karpathy-skills@karpathy-skills
    ```
    

安装完成后，这个技能包会自动激活，名字通常显示为 `andrej-karpathy-skills:karpathy-guidelines`。

### 💡 使用后的效果

安装完成后，当你开启一个新的对话或任务时，AI 会自动“背负”上这四条原则。你会发现：

- 它不再一上来就写代码，而是先分析需求。
- 生成的代码量变少了，但更精准了。
- 它不再随意修改你代码库里的其他文件。

**一句话总结：** 最省事的办法就是直接把 `CLAUDE.md` 的内容“喂”给你的 AI 助手（作为系统提示词或规则文件），让它时刻记着这四条“紧箍咒”。