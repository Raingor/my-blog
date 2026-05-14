# mac本地ThinkPHPFileNotFound修复

1.  首先查看项目的 用户权限
2. 调整用户权限 chmod -R 755 [项目目录]
3.  ls -l  查看目录用户是哪一个
4. 修改 php-fpm.d/www.conf 的user 和group
5. user = 当前电脑的用户
 6. group = 当前电脑的用户组
 7. 重启nginx
 8. 重启php-fpm

	