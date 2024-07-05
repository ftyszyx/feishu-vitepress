---
title: Crawler
tags:
  - develop
keywords:
  - spider
  - python
  -crawler
create_time: 1717503814
categories:
  - skill
---

# The bugly request was denied

## Problem Phenomenon

The company needs to get some data from Bugly.

When you find a request with python:

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
requests.exceptions.ConnectionError: ('Connection aborted.', ConnectionResetError(10054, 'The remote host forcibly closed an existing connection. ', None, 10054, None))
```

Tip_The remote host forcibly closes an existing connection_

But I used a browser to access it, and I was able to access it normally. It's weird how the bugly server determines that my request isn't a browser.

Because the connection is disconnected before it is established, it means that it is not a cookie or header problem.

## Analysis

### Problem 1: TLS Fingerprint:

I looked up some information on the Internet

Found that there is now a signature technology that can prevent crawlers (previously via useragent)It can now be identified by TLS fingerprint, refer to the following article [link](https://blog.skyju.cc/post/tls-fingerprint-bypass-cloudflare/)

The article is about using the Go library to generate a browser fingerprint.

Python is natively not supported, you need to use the library, this article has an introduction [curl_cffi] (https://www.cnblogs.com/ospider/p/python-curl-cffi-tls-fingerprint.html)

I tried it, but it still got an error after changing. However, this point may be used in the future. Spare.

### Problem 2: IP pools

#### Open Source Projects:

[proxy_pool] (https://github.com/jhao104/proxy_pool)

After trying it, there are a lot of http proxies, but there are basically no https proxies

[scylla] (https://github.com/imWildCat/scylla)

Didn't find a free one

<img src="/assets/Q1CBboSJXoVy34xX4vocBB1Hnqm.png" src-width="627" class="m-auto" src-height="312" align="center"/>
Currently I use a VPN as a proxy

https://zu1k.com/posts/tutorials/http-proxy-ipv6-pool/

# Use a real browser

Currently, there is

Selenium

Puppeteer: A Node library developed by the Google Chrome team for headless browser operations. It is mainly used to automate operations in Chrome or Chromium browsers, such as generating page screenshots, PDFs, automating form submissions, etc. Puppeteer is often considered a modern alternative to Selenium, especially when it comes to operating headless browsers.

Playwright: A library developed by Microsoft that supports cross-browser (Chrome, Firefox, Safari, etc.) automation. Playwright can be seen as a further evolution of Puppeteer, offering more features and wider browser support, as well as more granular control over network requests.