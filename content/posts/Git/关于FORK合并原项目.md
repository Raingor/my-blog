# 关于FORK合并原项目

1. 添加原项目作为上游仓库
# 进入你的项目目录
cd /Users/raingor00/wwwroot/K-凯森/凯森-英文

# 查看当前远程仓库
git remote -v

# 添加原项目作为上游仓库
git remote add upstream 原项目的Git地址

# 获取上游仓库的最新代码
git fetch upstream

# 合并上游仓库的更改
git merge upstream/main
