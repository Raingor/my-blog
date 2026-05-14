# python虚拟环境

在 Python 项目中创建虚拟环境是一个好习惯，可以确保项目依赖的独立性。以下是使用 `venv` 创建虚拟环境的步骤，以及如何在另一台电脑上运行该环境：

### 创建虚拟环境

1. **安装 Python**（确保 Python 3.3 及以上版本已安装）。
2. **在项目目录中创建虚拟环境**：
   ```bash
   python -m venv venv
   ```
   这里 `venv` 是虚拟环境的目录名，你可以自定义。

3. **激活虚拟环境**：
   - 在 Windows：
     ```bash
     venv\Scripts\activate
     ```
   - 在 macOS/Linux：
     ```bash
     source venv/bin/activate
     ```

4. **安装依赖**（在虚拟环境中）：
   ```bash
   pip install package_name
   ```

### 导出依赖

在项目中维护一个 `requirements.txt` 文件，以便在另一台电脑上轻松安装依赖：

```bash
pip freeze > requirements.txt
```

### 在另一台电脑上运行虚拟环境

1. **复制项目文件**到另一台电脑，包括 `venv` 目录和 `requirements.txt` 文件。

2. **在另一台电脑上创建并激活虚拟环境**（如果没有复制 `venv`）：
   ```bash
   python -m venv venv
   # 激活虚拟环境
   ```

3. **安装依赖**：
   ```bash
   pip install -r requirements.txt
   ```

4. **运行项目**：
   在虚拟环境中运行你的 Python 项目代码。

### 注意事项

- 虚拟环境通常不需要在不同机器之间直接复制，因为它可能包含特定于系统的路径和文件。最好的做法是复制项目代码和 `requirements.txt`，然后在目标机器上重新创建虚拟环境。
- 确保目标机器上安装了相同版本的 Python，以避免兼容性问题。