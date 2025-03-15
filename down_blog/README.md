# 用来从github下载编译好的blog dist文件

## 环境

需要python3
```
install.sh

```

## 运行
先将.env.example改成.env并填好对应的配置
```
python3 get_dist_from_github.py
```


## 配置nginx
在/etc/nginx/conf.d/新建一个blog.conf


```
server {
    listen 80;
    server_name  ${NGINX_WEB_URL};  # 修改为你的域名
    access_log /var/log/nginx/blog.access.log;
    error_log /var/log/nginx/blog.error.log;

    # 开启 gzip 压缩
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_vary on;

    location / {
        root /var/www/blog/web;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}

```
restart nginx

```
nginx -s reload
```
## 也可以加定时任务

crontab -e
每天晚上21:30执行
```
30 21 * * * cd /root/work/feishu-vitepress/down_blog/&&python3 get_dist_from_github.py>>/tmp/get_blog.log
```

