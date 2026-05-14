# 创建多个SSHKey

ssh-keygen -t rsa -C“邮箱”

ssh-keygen -t rsa -f "存放地址" -C"邮箱"
From my .ssh/config: 
1551

```bash
Host myshortname realname.example.com 
	HostName realname.example.com 
	IdentityFile ~/.ssh/realname_rsa # private key for realname 
	User remoteusername 

Host myother realname2.example.org 
	HostName realname2.example.org 
	IdentityFile ~/.ssh/realname2_rsa # different private key for realname2
	 User remoteusername 
	 
```
 Then you can use the following to connect: 
 
 - ssh myshortname
 - ssh myother 
 
 And so on.
 多个平台提交

git add remote origin 地址

git add remote other_origin 地址