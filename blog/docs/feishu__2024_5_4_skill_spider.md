---
title: 爬虫
tags:
  - develop
keywords:
  - spider
  - python
  - 爬虫
create_time: 1717503814
categories:
  - skill
---


# bugly请求被拒绝

## 问题现象

公司有需要从bugly上取一些数据。

发现用python请求时：

```ts
Traceback (most recent call last):
  File "D:\build2\tools\bugly_warn2.0.0\test.py", line 29, in <module>
    res = session.get(url, headers=headers, params={"fsn": get_fsn()})
  File "C:\Users\zyx\.conda\envs\bugly\lib\site-packages\requests\sessions.py", line 542, in get
    return self.request('GET', url, **kwargs)
  File "C:\Users\zyx\.conda\envs\bugly\lib\site-packages\requests\sessions.py", line 529, in request
    resp = self.send(prep, **send_kwargs)
  File "C:\Users\zyx\.conda\envs\bugly\lib\site-packages\requests\sessions.py", line 645, in send
    r = adapter.send(request, **kwargs)
  File "C:\Users\zyx\.conda\envs\bugly\lib\site-packages\requests\adapters.py", line 501, in send
    raise ConnectionError(err, request=request)
requests.exceptions.ConnectionError: ('Connection aborted.', ConnectionResetError(10054, '远程主机强迫关闭了一个现有的连接。', None, 10054, None))
```

提示_远程主机强迫关闭了一个现有的连接_

但我用浏览器去访问，能正常访问 。很奇怪，bugly服务器是怎么判断我的请求不是浏览器呢，

因为连接还没建立就被断开了，说明不是cookie或者是header的问题。

## 分析

### tls指纹：

在网上找了一下资料

发现，现在有一个签名的技术可以防爬虫（之前是通过useragent)

现在可以通过 TLS 指纹来识别，参考下面文章[链接](https://blog.skyju.cc/post/tls-fingerprint-bypass-cloudflare/)

文章讲的是用go的库来生成浏览器的指纹。

python的话原生是不支持的，需要用到库，这个文章有介绍[curl_cffi](https://www.cnblogs.com/ospider/p/python-curl-cffi-tls-fingerprint.html)

## ip池

https://github.com/jhao104/proxy_pool

https://zu1k.com/posts/tutorials/http-proxy-ipv6-pool/

