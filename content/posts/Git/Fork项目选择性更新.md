# Fork项目选择性更新

非常好问题 👍 ——你不想同步整个项目，而是想**只更新某个文件或文件夹**（比如 `src/components/` 或 `README.md`），这种情况确实可以实现，有几种不同的方式，取决于你是否想用命令行操作，下面我详细讲讲几种方法👇

---

## 🧩 一、最推荐方式：用 Git 命令行从上游精确拷贝某个文件夹/文件

假设你已经添加好了上游仓库：

```bash
git remote add upstream https://github.com/original/project.git
```

### ✅ 方法 1：使用 `git checkout`（单文件或文件夹方式）

例如只想更新 `src/utils/` 文件夹：

```bash
git fetch upstream
git checkout upstream/main -- src/utils/
```

或者只想更新一个文件：

```bash
git fetch upstream
git checkout upstream/main -- README.md
```

然后查看差异，确认没问题后提交并推送：

```bash
git add .
git commit -m "update utils folder from upstream"
git push origin main
```

> 💡 原理：`git checkout` 这里并不是切换分支，而是“从另一个分支（upstream/main）提取指定路径的文件”替换到你当前分支。

---

### ✅ 方法 2：如果原仓库的主分支不是 `main`

比如是 `master`：

```bash
git checkout upstream/master -- src/utils/
```

---

## 🧠 二、网页操作方式（不想动命令行）

GitHub 网页目前**不支持直接同步某个文件夹**，但可以这样“曲线救国”：

1. 打开原项目的文件页面（例如 `original/project/src/utils/helper.js`）
    
2. 点右上角 “**Raw**” 按钮，复制内容。
    
3. 回到你 fork 的同一路径下。
    
4. 点 “Edit this file” ✏️。
    
5. 覆盖文件内容并提交。
    

👉 适用于**偶尔同步小文件**。

---

## 🧰 三、高级方式：用 `git restore` 或 `git show`

### 方式 1：`git restore`

```bash
git fetch upstream
git restore --source=upstream/main src/components/
```

### 方式 2：查看上游文件内容

```bash
git show upstream/main:src/utils/helper.js
```

然后你可以重定向输出到文件：

```bash
git show upstream/main:src/utils/helper.js > src/utils/helper.js
```

---

## ⚠️ 注意事项

- 这些命令会直接覆盖你本地的相同路径文件，请在操作前确保没有未提交的改动。
    
- 如果你不确定要不要覆盖，可以先用 `git diff` 看一下差异：
    
    ```bash
    git diff upstream/main -- src/utils/
    ```
    

---

## ✅ 小结

|目标|推荐命令|
|---|---|
|只更新一个文件|`git checkout upstream/main -- path/to/file`|
|只更新一个文件夹|`git checkout upstream/main -- path/to/folder/`|
|查看差异|`git diff upstream/main -- path/to/file`|
|确认没问题后提交|`git add . && git commit -m "update file from upstream"`|
|推送到远程|`git push origin main`|

---

是否方便告诉我你要更新的是「单个文件」还是「整个文件夹」？我可以帮你写出对应的完整命令。