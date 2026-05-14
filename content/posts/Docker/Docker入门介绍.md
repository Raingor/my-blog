# Docker入门介绍

**Docker 属于 Linux 容器的一种封装，提供简单易用的容器使用接口。**它是目前最流行的 Linux 容器解决方案。

Docker 将应用程序与该程序的依赖，打包在一个文件里面。运行这个文件，就会生成一个虚拟容器。程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样。有了 Docker，就不用担心环境问题。

总体来说，Docker 的接口相当简单，用户可以方便地创建和使用容器，把自己的应用放入容器。容器还可以进行版本管理、复制、分享、修改，就像管理普通的代码一样。


>[!NOTE] 安装地址
>[Window](https://docs.docker.com/docker-for-windows/install/)
>[Centos](https://docs.docker.com/install/linux/docker-ce/centos/)
>[Debian](https://docs.docker.com/install/linux/docker-ce/debian/)

#### 验证是否安装完成
```bash
 - docker version
 - or
 - docker info
```