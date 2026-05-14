# Git基本操作入门

Git初始化

git init

#配置git用户名及邮箱

--global参数是全局参数，也就是这些命令在这台电脑的所有Git仓库下都有用。

git config --global user.name ""

git config --global user.email ""

---


GIT 添加 及 提交

git add XXXX

git commit -m "备注信息"

1. 版本回退

查看 提交日志 git log

简略输出 git log --pretty=oneline

git reset --hard head^

Git必须知道当前版本是哪个版本，在Git中，用HEAD表示当前版本，也就是最新的提交3628164...882e1e0（注意我的提交ID和你的肯定不一样），上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。

---

Cat 为查看文件命令

cat XXXX

----

- HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id。
- 穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本。
- 要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本。

---

Git状态: git status

---

Git 创建SSH Key

ssh-keygen -t rsa -C "邮箱地址"

---

Head 指向分支

创建dev分支 -b参数表示创建并切换

git checkout -b dev

查看当前分支:

git branch

合并指定分支到当前分支

git merge

---

Git还提供了一个stash功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：

git stash

git stash list 查看储藏列表

git stash apply stash@{0} 恢复工作区

git branch -d feature-vulcan 删除还没有合并的分支

git branch -D feature-vulcan 强行删除

开发一个新feature，最好新建一个分支；

如果要丢弃一个没有被合并过的分支，可以通过git branch -D 强行删除。

- 查看远程库信息，使用git remote -v；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；
- 在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；
- 从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。

- 忽略某些文件时，需要编写.gitignore；
- .gitignore文件本身要放到版本库里，并且可以对.gitignore做版本管理！