---
create_time: 1731579909
edit_time: 1732077442
title: 编程环境
categories:
  - skill
---


# 1. 官方文档

https://go.dev/learn/

# 2. 安装：

https://go.dev/doc/install

# 3. 配置环境

 

# 4. 写hello world

建一个目录

```yaml
mkdir hello
cd hello
```

初始化工程

```yaml
go mod init example/hello
```

写代码hello.go

```yaml
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

运行

```yaml
go run .
```

# 5. 使用外部库

直接 在代码中import

<img src="/assets/HbsZb6glZoZIbkxsmAucUgjMn6f.png" src-width="259" class="markdown-img m-auto" src-height="68" align="center"/>

通过go mod tidy来导入

```yaml
go mod tidy
```

或者可以手动加

```yaml
go get github.com/lestrrat-go/file-rotatelogs
```

# 6. 加速

## 6.1 设置代理

 

```sql
官方全球代理https://proxy.golang.com.cn
七牛云 **https://goproxy.cn**
阿里云https://mirrors.aliyun.com/goproxy/
GoCenterhttps://gocenter.io
百度https://goproxy.bj.bcebos.com/
```

确认

```sql
$ go env | grep GOPROXY
GOPROXY="https://goproxy.cn"
```

## 6.2 取消代理

```text
go env -w GOPROXY=direct
```

“direct” 为特殊指示符，用于指示 Go 回源到模块版本的源地址去抓取(比如 GitHub 等)，当值列表中上一个 Go module proxy 返回 404 或 410 错误时，Go 自动尝试列表中的下一个，遇见 “direct” 时回源，遇见 EOF 时终止并抛出类似 “invalid version: unknown revision…” 的错误。

## 6.3 设置不走 proxy 的私有仓库或组，多个用逗号相隔（可选）

```text
go env -w GOPRIVATE=git.mycompany.com,github.com/my/private
```

### 6.3.1 官方全球代理

```text
go env -w GOPROXY=https://proxy.golang.com.cn,direct
go env -w GOSUMDB=sum.golang.google.cn
```

推荐

```yaml
**go env -w GOPROXY=https://goproxy.cn,direct**
```

## 6.4 取消校验

```text
go env -w GOSUMDB=off
```

# 7. 调试

vscode中安装go的插件即可

<img src="/assets/A8qkbSn1CoEtwQxGk4IcNlV4nDc.png" src-width="987" class="markdown-img m-auto" src-height="221" align="center"/>

需要安装dlv

```bash
go install -v github.com/go-delve/delve/cmd/dlv@latest
```

