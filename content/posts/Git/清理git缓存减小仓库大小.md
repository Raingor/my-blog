# 清理git缓存减小仓库大小

根据 `.gitignore` 清除 `.git` 的大小及缓存，清理那些已被 `.gitignore` 忽略但仍然被 Git 跟踪的文件，从而减小 `.git` 目录的大小并清除不必要的缓存。

具体操作步骤如下：

### 1. 清理已忽略但被跟踪的文件

这些文件虽然在`.gitignore`中被忽略，但由于之前已被提交过，Git仍在跟踪它们。我们需要停止跟踪并从仓库中删除它们。

```bash
# 查看哪些被忽略的文件当前仍被Git跟踪
git status

# 从Git缓存中移除所有被.gitignore忽略的文件（但保留本地文件）
git rm -r --cached .
# 或者，如果你想一次性清理所有被忽略的文件，可以使用：
# git ls-files -z --ignored --exclude-standard | xargs -0 git rm -r --cached

# 重新添加所有文件到缓存（此时.gitignore生效，被忽略的文件不会被添加）
git add .

# 提交更改
git commit -m "清理被 .gitignore 忽略但被跟踪的文件"
```

> **注意**：`git rm -r --cached .` 会移除当前目录及其子目录下所有文件的缓存，但不会删除本地文件。之后 `git add .` 会重新添加文件，但遵循 `.gitignore` 规则。

### 2. 清理Git对象缓存（可选，用于减小.git大小）

如果仓库历史中包含过大的文件或历史记录过多，可以使用以下命令进行深度清理：

```bash
# 清理未被引用的对象（垃圾回收）
git gc --prune=now

# 更激进的垃圾回收（会删除所有未被引用的对象）
git gc --aggressive --prune=now

# 如果需要，可以重写历史以彻底删除大文件（谨慎使用！）
# 例如，使用 BFG Repo-Cleaner 或 git filter-branch/git filter-repo
```

### 3. 检查结果

```bash
# 查看 .git 目录大小是否减小
du -sh .git

# 查看是否有不需要的大型文件被跟踪
git rev-list --objects --all | sort -k 2 > allfileshas.txt
git gc && git verify-pack -v .git/objects/pack/pack-*.idx | sort -k 3 -n | tail -5
# 上面的命令可以帮助你找到仓库中最大的几个文件
```

### 重要提示

* **备份**：在执行这些操作前，请确保你有仓库的备份，尤其是使用 `git filter-branch` 或 `BFG` 时，它们会重写历史。
* **团队协作**：如果这是一个团队项目，清理历史后，其他协作者需要重新克隆仓库，因为历史已被更改。
* **`.gitignore` 文件本身**：确保你的 `.gitignore` 文件是最新且正确的，包含了所有不需要跟踪的文件类型（如 `node_modules/`, `*.log`, `.env`, `dist/`, `*.pyc` 等）。

通过以上步骤，你应该能有效减小 `.git` 目录的大小并清除不必要的缓存。