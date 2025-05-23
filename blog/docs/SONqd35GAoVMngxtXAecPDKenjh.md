---
create_time: 1741011584
edit_time: 1741051628
title: Nginx
categories:
  - skill
---


# 1. 安装

```text
sudo apt-get update
sudo apt install nginx
```

# 2. 启动 

```md
sudo systemctl start nginx
 **设置 Nginx 开机自启动:**
sudo systemctl enable nginx
 停止
 sudo systemctl stop nginx
```

# 3. 检查状态

```text
sudo systemctl status nginx
```

# 4. 常用命令

```md
nginx -t 测试配置是否正确
nginx -s signal     : send signal to a master process: stop, quit, reopen, reload
```

# 5. 配置

## 5.1 文件路径

 **Nginx 配置文件:**

- Ubuntu/Debian: `/etc/nginx/nginx.conf` (主配置文件) 和 /etc/nginx/conf.d/(虚拟主机配置文件)

比如增加一个site的配置，`/etc/nginx/conf.d/` 目录下创建一个新的配置文件，例如 `mywebsite.conf`

```yaml
server {
    listen 80;
    server_name  grok.bytefuse.cn;  # 修改为你的域名
    access_log /var/log/nginx/grok.bytefuse.cn.access.log;
    error_log /var/log/nginx/grok.bytefuse.cn.error.log;

    location / {
        proxy_pass http://127.0.0.1:8090;  # 将请求代理到本地 8090 端口
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

