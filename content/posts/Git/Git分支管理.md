# Git分支管理

Git鼓励大量使用分支：

查看分支：`git branch`

创建分支：`git branch`

切换分支：`git checkout`

创建+切换分支：`git checkout -b`

合并某分支到当前分支：`git merge`

删除分支：`git branch -d`

拉取远程分支：`git fetch --all`

当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。

用`git log --graph`命令可以看到分支合并图。

Git分支十分强大，在团队开发中应该充分应用。合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。

合并某个分支的某个文件夹 `git checkout <源分支名称> -- <文件夹路径>`
