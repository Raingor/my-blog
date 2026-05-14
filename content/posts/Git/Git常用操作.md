# Git常用操作

#### 添加文件
```bash
git add [.|指定的文件]
```

#### 提交
```bash
git commit -m"说明"
```

#### 撤销修改
```bash
git reset --hard HEAD[^]
```

#### 推送
```bash
git push -u origin [分支名称]
```

#### 远程配置
```bash
git remote add origin [远程地址]
```


#### 克隆指定的分支
```bash
git clone -b <branch_name> <repository_url>
```

#### 同步其他分支的内容
```bash
git merge [其他分支]
```

#### 允许合并两个仓库历史不一样的远程
```bash
// Pull the changes (if you're merging a remote branch into your local branch):
git pull origin <branch-name> --allow-unrelated-histories

//Merge another branch (if you're merging one local branch into another):
git merge <branch-name> --allow-unrelated-histories
```

#### 添加ignore文件后，移除已提交的
```bash
 git rm -r --cached <folder_name>
```

#### 创建密钥
##### 生成新的 SSH 密钥对（默认使用 Ed25519 算法，推荐） 
```bash
ssh-keygen -t ed25519 -C "your_email@example.com" 
```
##### 如果系统不支持 Ed25519，可使用 RSA（至少 4096 位） 
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```