# Fork项目同步上游更新

这是一个非常常见的情况 👍——你 fork 了一个 GitHub 项目，但原仓库（上游，_upstream_）后来更新了，你希望把这些更新同步到你自己的 fork。

下面是详细、实用的解决步骤👇

---

## 🧭 一、前提条件

你已经：

- fork 了一个项目，例如：
    
    ```bash
    原项目：github.com/original/project
    你的fork：github.com/yourname/project
    ```
    
- 并且已把你的 fork 仓库 clone 到本地：
    
    ```bash
    git clone https://github.com/yourname/project.git
    cd project
    ```
    

---

## 🪜 二、添加原仓库为上游（upstream）

先告诉 Git 原仓库的地址：

```bash
git remote add upstream https://github.com/original/project.git
```

查看是否添加成功：

```bash
git remote -v
```

输出示例：

```bash
origin    https://github.com/yourname/project.git (fetch)
origin    https://github.com/yourname/project.git (push)
upstream  https://github.com/original/project.git (fetch)
upstream  https://github.com/original/project.git (push)
```

---

## 🧩 三、从上游获取最新更新

拉取原仓库的最新改动：

```bash
git fetch upstream
```

此时不会改动你的分支，只是把上游的内容取回来了。

---

## 🧱 四、合并更新到你的分支

通常你想把原项目的 `main` 或 `master` 分支更新到你的本地：

```bash
git checkout main
git merge upstream/main
```

> ⚠️ 如果上游主分支是 `master`，则改为：
> 
> ```bash
> git merge upstream/master
> ```

如果没有冲突，直接成功。  
如果有冲突，Git 会提示你解决冲突，解决完之后执行：

```bash
git add .
git commit
```

---

## 🚀 五、把更新推送到你自己的 GitHub fork

```bash
git push origin main
```

这样，你自己的 fork 仓库也同步了原仓库的最新内容。

---

## 🌈 六、可选：使用 rebase（更干净的历史）

如果你希望历史更简洁（推荐高级用户）：

```bash
git fetch upstream
git rebase upstream/main
git push origin main --force
```

---

## ✅ 总结命令汇总

```bash
# 进入项目目录
cd project

# 添加上游仓库
git remote add upstream https://github.com/original/project.git

# 获取上游最新代码
git fetch upstream

# 合并到本地分支
git merge upstream/main

# 推送到自己的 fork
git push origin main
```

---
