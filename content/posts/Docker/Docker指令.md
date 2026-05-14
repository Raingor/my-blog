# Docker指令

- docker image ls  列出本机所有的image 文件
- docker image rm [imageName] 删除image 文件
- docker image pull [库/镜像名]  获取镜像到本地
- docker ps 查看正在运行的容器
	- --all 查看包含停止运行的容器
- docker run -d 运行到后台 
	- --name 容器名称
	- --privileged使用roo权限
- docker exec -it 容器名称 bash  进入容器
- docker stop 容器名称  停止容器
- docker commit [!容器名称] [!自定义名称]    保存成新的一个镜像


##### 制作Docker 容器
- 在项目的根目录下，新建一个文本文件`.dockerignore`，写入下面的
```bash
	.git
	node_modules
	npm-debug.log
```
- 然后，在项目的根目录下，新建一个文本文件 Dockerfile，写入下面的
```bash
	FROM node:8.4
	COPY . /app
	WORKDIR /app
	RUN npm install --registry=https://registry.npm.taobao.org
	EXPOSE 3000
```
- `FROM node:8.4`：该 image 文件继承官方的 node image，冒号表示标签，这里标签是`8.4`，即8.4版本的 node。
- `COPY . /app`：将当前目录下的所有文件（除了`.dockerignore`排除的路径），都拷贝进入 image 文件的`/app`目录。
- `WORKDIR /app`：指定接下来的工作路径为`/app`。
- `RUN npm install`：在`/app`目录下，运行`npm install`命令安装依赖。注意，安装后所有的依赖，都将打包进入 image 文件。
- `EXPOSE 3000`：将容器 3000 端口暴露出来， 允许外部连接这个端口。
- ![[Pasted image 20240104135244.png]]
- ## 一个 Dockerfile 可以包含多个`RUN`命令，但是只能有一个`CMD`命令。
- docker build -f /path/to/a/Dockerfile .


创建docker网络
docker network create --subnet=196.168.64.1/24 ctmon

docker-compose
进入容器
```bash
docker-compose exec [容器service] bash 

example:
	docker-compose exec php bash
```