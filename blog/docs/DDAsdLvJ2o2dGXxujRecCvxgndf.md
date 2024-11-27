---
create_time: 1731743800
edit_time: 1732159849
title: golang语法
categories:
  - skill
---


参考 ：

https://tour.go-zh.org/welcome/1

https://www.topgoer.com/

# 1. go的并发

## 1.1 明确概念

并发不是并行。并行是真正的同时执行。 

并行：

多个cpu同时执行多个任务

<img src="/assets/Ne1SbgWqMoPjFJxdm8jczeANn3f.png" src-width="401" class="markdown-img m-auto" src-height="214" align="center"/>

并发：

同一个cpu，同时执行多个任务，每 个任务占用小块时间片

<img src="/assets/U69pbbbeiol1JtxhJ5BcTCRhncg.png" src-width="365" class="markdown-img m-auto" src-height="213" align="center"/>

## 1.2 go的优势

在其它语言，要实现多并发，需要使用多线程。

多线程就涉及到锁，数据同步，线程切换，等等问题。很麻烦。

Golang在语言层面封装了并发的操作，让他更简单理解。

## 1.3 启动一个协程

让一个函数在新的协程中执行

```go
go f(x, y, z)
```

## 1.4 数据传递：信道

```go
ch := make(chan int)//信道在使用前必须创建
ch <- v    // 将 v 发送至信道 ch。
v := <-ch  // 从 ch 接收值并赋予 v。
```

发送和接收操作在另一端准备好之前都会阻塞。这使得 Go 程可以在没有显式的锁或竞态变量的情况下进行同步

### 1.4.1 带缓冲的信道

信道可以是  **带缓冲的**。将缓冲长度作为第二个参数提供给 `make` 来初始化一个带缓冲的信道：

```go
ch := make(chan int, 100)
```

仅当信道的缓冲区填满后，向其发送数据时才会阻塞。当缓冲区为空时，接受方会阻塞。

### 1.4.2 发送者可以关闭信道

```go
close(c)
```

 **还要注意**： 信道与文件不同，通常情况下无需关闭它们。只有在必须告诉接收者不再有需要发送的值时才有必要关闭，例如终止一个 `range` 循环。

### 1.4.3 可以通过返回值判断信道有没有关闭

```go
v, ok := <-ch
此时 ok 会被设置为 false。
```

### 1.4.4 也可以for循环来判断

```go
for i := range c {
                fmt.Println(i)
        }
```

循环 `for i := range c` 会不断从信道接收值，直到它被关闭。

### 1.4.5 select等待多个信道

```go
c := make(chan int)
quit := make(chan int)
func fibonacci(c, quit chan int) {
        x, y := 0, 1
        for {
                select {
                case c <- x:
                        x, y = y, x+y
                case <-quit:
                        fmt.Println("quit")
                        return
                default: 
                        fmt.Println("    .")
                        time.Sleep(50 * time.Millisecond)
                }
        }
}
```

 `select` 中的其它分支都没有准备好时，`default` 分支就会执行。

## 1.5 锁

Go 标准库中提供了 `sync.Mutex` 互斥锁类型及其两个方法：

- `Lock`
- `Unlock`

## 1.6  **简单吧？**

