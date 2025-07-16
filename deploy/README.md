crontab

```
46 21 * * * cd /root/work/feishu-vitepress/down_blog&&python3 -u get_dist_from_github.py>tmp.get_blog.log 2>&1
15 2 * */2 * certbot renew >/tmp.cerbot.log 2>&1
```