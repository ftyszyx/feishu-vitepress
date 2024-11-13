---
cover: /assets/C6tIbYqwYofC4CxdYECcYseAnFb.jpeg
create_time: 1731390096
edit_time: 1731395532
title: docker存储位置修改
categories:
  - skill
---


docker默认存储位置在/var/lib

位置/挂接点，这个挂接点空间一般较小

<img src="/assets/S5ZlbeTkOomwerx5E00ccZ3inic.png" src-width="1195" class="markdown-img m-auto" src-height="523" align="center"/>

你看安装了几个docker后，根挂接点基本已经满了。

可以通过下面命令查看存储位置 

```yaml
docker info
```

<img src="/assets/WhmFbWD8qomvKexe7QGctFn0nSe.png" src-width="372" class="markdown-img m-auto" src-height="60" align="center"/>

怎么做？

先停掉docker容器

```yaml
docker ps -q | xargs docker container stop
```

这个命令首先通过`docker ps -q`获取所有正在运行容器的 ID，然后使用`xargs`将这些 ID 作为参数传递给`docker container stop`命令，从而强制停止所有容器。

之后再尝试执行`systemctl stop docker`命令

```yaml
sudo systemctl stop docker
sudo systemctl stop docker.socket
```

#### 创建新的docker目录，执行命令df -h,找一个大的磁盘。 我在/home目录下面建了 /home/docker目录，执行的命令是：

```shell
mkdir -p /home/docker
```

#### 迁移/var/lib/docker目录下面的文件到 /home/docker

```shell
rsync -avz /var/lib/docker /home/docker
```

### 编辑/etc/docker/daemon.json文件

```yaml
vi /etc/docker/daemon.json
```

增加配置

```yaml
"data-root": "/home/docker"
```

重启docker

```yaml
sudo systemctl restart docker.service
```

### 启动成功后，再确认之前的镜像还在

```shell
docker ps -a
docker images
```

### 确定容器、镜像没问题后删除/var/lib/docker/目录中的文件。

```shell
rm -rf /var/lib/docker/*
```

