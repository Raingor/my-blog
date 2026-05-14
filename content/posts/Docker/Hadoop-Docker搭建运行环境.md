# Hadoop-Docker搭建运行环境

- 安装 Docker [[what is Docker]]
### 配置java 与 ssh 环境
- 现在创建一个容器，名为 java_ssh_proto，用于配置一个包含 Java 和 SSH 的环境：
```bash
docker run -d --name=java_ssh_proto --privileged centos:8 /usr/sbin/init
```
- 进入容器
```bash
docker exec -it java_ssh_proto bash
```

>[!安装jdk 和SSH]
>```bash
yum install -y java-1.8.0-openjdk-devel openssh-clients openssh-server
>```
> ###### 启用ssh服务
>```bash
 systemctl enable sshd && systemctl start sshd
>````

### 一定要下载hadoop的 binary版本进行部署
