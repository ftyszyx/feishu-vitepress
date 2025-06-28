---
create_time: 1677551024
edit_time: 1751032461
title: Rust
categories:
  - skill
---


官方教程

https://doc.rust-lang.org/book/

https://kaisery.github.io/trpl-zh-cn

https://course.rs/

语法 

https://course.rs/basic/intro.html

100练

https://rust-exercises.com/01_intro/00_welcome

教程：

https://rust-guide.niqin.com/en-us/4-cargo

# 1. 使用

## 1.1 安装：

### 1.1.1 先设置 环境变量 (用于安装加速）

Windows:

```csharp
set RUSTUP_DIST_SERVER=https://mirrors.sjtug.sjtu.edu.cn/rust-static
set RUSTUP_UPDATE_ROOT=https://mirrors.sjtug.sjtu.edu.cn/rust-static/rustup
```

### 1.1.2 下载安装工具：

https://www.rust-lang.org/

<img src="/assets/EZKDbLOBvo70JWxVNp9cU1g3nob.png" src-width="1269" class="markdown-img m-auto" src-height="354" align="center"/>

### 1.1.3 安装

选1

<img src="/assets/BhlCbE1n9ocPBwxFJ0Yc3gYHnYb.png" src-width="702" class="markdown-img m-auto" src-height="210" align="center"/>

### 1.1.4 查看当前的rust版本

```csharp
rustc --version
```

## 1.2 Cargo 国内加速

打开或新建 ~/.cargo/config 文件

vim ~/.cargo/config

 修改为 中国科学技术大学镜像服务器

```csharp
[source.crates-io]
replace-with = 'aliyun' # 指定使用下面哪个源，修改为source.后面的内容即可
#阿里云
[source.aliyun]
registry = "sparse+https://mirrors.aliyun.com/crates.io-index/"
# 中国科学技术大学
[source.ustc]
registry = "https://mirrors.ustc.edu.cn/crates.io-index"
# 上海交通大学
[source.sjtu]
registry = "https://mirrors.sjtug.sjtu.edu.cn/git/crates.io-index/"
# 清华大学
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
# rustcc社区
[source.rustcc]
registry = "https://code.aliyun.com/rustcc/crates.io-index.git"
```

需要替换镜像可以修改, 替换成自己想要的镜像名称

```csharp
replace-with = 'tuna'
```

## 1.3 carge 命令

### 1.3.1  新建项目

```csharp
cargo new hello_world --bin
```

传递参数 `--bin` 是为了创建一个二进制程序，`--bin` 也是未指定情况下的默认传递参数。如果希望创建一个库（lib），就需要传递参数 `--lib`。

默认情况下，新创建项目目录会初始化为一个 `git` 仓库，如果你不希望初始化为 `git` 仓库，需要传递参数 `--vcs none`。

`Cargo.toml` 文件是   **manifest** 元清单，它包含了 Cargo 编译项目所需的所有元数据

### 1.3.2 编译

```csharp
cargo build
```

### 1.3.3 运行

可以直接运行目标程序

```csharp
./target/debug/hello_world
```

也可以

```csharp
cargo run
```

### 1.3.4 发布

```csharp
cargo build --release
```

### 1.3.5 添加组件

先要安装cargo-edit

```csharp
cargo install cargo-edit
```

添加组件crate

```csharp
cargo add rand
```

### 1.3.6 添加自己的库

```ts
cargo new mylib --lib
```

## 1.4 cargobin命令

有些库已经提前编译了，可以直接安装

https://github.com/cargo-bins/cargo-binstall

# 2. 语法

### 2.1.1 所有权

1. Rust 中每一个值（堆中分配的内存地址）都被一个变量所拥有，该变量被称为值的所有者
2. 每个变量都有作用域。当所有者(变量)离开作用域范围时，这个值将被丢弃(drop)
3. 一个值同时只能被一个变量所拥有，或者说一个值只能拥有一个所有者 
4. rust中的默认的赋值操作都是浅拷贝。 

### 2.1.2  引用（借用）

 **获取变量的引用，称之为借用(borrowing)**

`&` 符号即是引用

`*`解出引用所指向的值（也就是 **解引用**）

`Mut &`可变引用

 **可变引用的限制：**

1.   同一作用域，特定数据只能有一个可变引用：
2.  **可变引用与不可变引用不能同时存在**

### 2.1.3 切片和字符串

字符串而言，切片就是对 `String` 类型中某一部分的引用，它看起来像这样

```ts
let s = String::from("hello world");

let hello = &s[0..5];
let world = &s[6..11];
```

使用方括号包括的一个序列： **[开始索引..终止索引]**，

 **字符串字面量是切片**

 **Rust 中的字符是 Unicode 类型，因此每个字符占据 4 个字节内存空间，但是在字符串中不一样，字符串是 UTF-8 编码，也就是字符串中的字符所占的字节数是变化的(1 - 4)**

### 2.1.4 string和&str的转换

Rust 在语言级别，只有一种字符串类型： `str`，它通常是以引用类型出现 `&str`

`&str` 类型生成 `String` 类型的操作：

- `String::from("hello,world")`
- `"hello,world".to_string()`

如何将 `String` 类型转为 `&str` 类型呢答案很简单，取引用即可

```ts
let s = String::from("hello,world!");
    say_hello(&s);
```

灵活用法是因为 `deref` 隐式强制转换，具体我们会在 `Deref`[特征](https://course.rs/advance/smart-pointer/deref.html)进行详细讲解

### 2.1.5 结构体

#### 2.1.5.1 元组结构体

结构体必须要有名称，但是结构体的字段可以没有名称，这种结构体长得很像元组，因此被称为元组结构体，例如：

```rs
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);
let black = Color(0, 0, 0);
let origin = Point(0, 0, 0);
```

元组结构体在你希望有一个整体名称，但是又不关心里面字段的名称时将非常有用。例如上面的 `Point` 元组结构体，众所周知 3D 点是 `(x, y, z)` 形式的坐标点，因此我们无需再为内部的字段逐一命名为：`x`, `y`, `z`。

#### 2.1.5.2 单元结构体

没有任何字段和属性

```ts
struct AlwaysEqual;

let subject = AlwaysEqual;

// 我们不关心 AlwaysEqual 的字段数据，只关心它的行为，因此将它声明为单元结构体，然后再为它实现某个特征
impl SomeTrait for AlwaysEqual {

}
```

#### 2.1.5.3 打印结构体信息

`#[derive(Debug)]` 对结构体进行了标记，

这样才能使用 `println!("{:?}", s);` 

可以使用 `{:#?}` 来替代 `{:?}` 输出格式更好

 `dbg!`[宏](https://doc.rust-lang.org/std/macro.dbg.html) 也可以输出

### 2.1.6 枚举

成员可以是任何不同的类型

`Option` 枚举用来处理空值

`Option` 枚举包含两个成员，一个成员表示含有值：`Some(T)`, 另一个表示没有值：`None`，定义如下：

```ts
enum Option<T> {
    Some(T),
    None,
}
```

`Option<T>` 枚举是如此有用以至于它被包含在了 `prelude`（prelude 属于 Rust 标准库，Rust 会将最常用的类型、函数等提前引入其中，省得我们再手动引入）

### 2.1.7 数组

第一种是速度很快但是长度固定的 `array`，

第二种是可动态增长的但是有性能损耗的 `Vector`

### 2.1.8 模式匹配

#### 2.1.8.1 `match`  

```ts
match dire {
        Direction::East => println!("East"),
        Direction::North | Direction::South => {
            println!("South or North");
        },
        _ => println!("West"),
    };
```

- `match` 的匹配必须要穷举出所有可能，因此这里用 `_` 来代表未列出的所有可能性
- `match` 的每一个分支都必须是一个表达式，且所有分支的表达式最终返回值的类型必须相同
-  **X | Y**，类似逻辑运算符 `或`，代表该分支可以匹配 `X` 也可以匹配 `Y`，只要满足一个即可

其实 `match` 跟其他语言中的 `switch` 非常像，`_` 类似于 `switch` 中的 `default`。

```ts
match target {
    模式1 => 表达式1,
    模式2 => {
        语句1;
        语句2;
        表达式2
    },
    _ => 表达式3
}
```

#### 2.1.8.2  **if let匹配**

```ts
if let Some(3) = v {
    println!("three");
}
```

 **当你只要匹配一个条件，且忽略其他条件时就用** **if let** **，否则都用** **match**。

#### 2.1.8.3 matches!宏

Rust 标准库中提供了一个非常实用的宏：`matches!`，它可以将一个表达式跟模式进行匹配，然后返回匹配的结果 `true` or `false`。

```ts
enum MyEnum {
    Foo,
    Bar
}

fn main() {
    let v = vec![MyEnum::Foo,MyEnum::Bar,MyEnum::Foo];
}
```

现在如果想对 `v` 进行过滤，只保留类型是 `MyEnum::Foo` 的元素，你可能想这么写：

```rs
v.iter().filter(|x| x == MyEnum::Foo);
```

但是，实际上这行代码会报错，因为你无法将 `x` 直接跟一个枚举成员进行比较。好在，你可以使用 `match` 来完成，但是会导致代码更为啰嗦，是否有更简洁的方式？答案是使用 `matches!`：

```rs
v.iter().filter(|x| matches!(x, MyEnum::Foo));
```

### 2.1.9 While let条件循环

一个与 `if let` 类似的结构是 `while let` 条件循环，它允许只要模式匹配就一直进行 `while` 循环。下面展示了一个使用 `while let` 的例子：

### 2.1.10 泛型

```ts
fn display_array<T: std::fmt::Debug, const N: usize>(arr: [T; N]) {
    println!("{:?}", arr);
}
fn main() {
    let arr: [i32; 3] = [1, 2, 3];
    display_array(arr);

    let arr: [i32; 2] = [1, 2];
    display_array(arr);
}
```

### 2.1.11 特征trait

#### 2.1.11.1 实现和定义

```ts
pub trait Summary {
    fn summarize(&self) -> String;
}
pub struct Post {
    pub title: String, // 标题
    pub author: String, // 作者
    pub content: String, // 内容
}

impl Summary for Post {
    fn summarize(&self) -> String {
        format!("文章{}, 作者是{}", self.title, self.author)
    }
}
```

#### 2.1.11.2 默认实现

```ts
pub trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}
```

#### 2.1.11.3 作为 函数参数

```ts
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
```

#### 2.1.11.4 特征约束

```ts
pub fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}
```

#### 2.1.11.5 多重约束

```ts
pub fn notify(item: &(impl Summary + Display)) {}
```

#### 2.1.11.6 where约束

当特征约束变得很多时，函数的签名将变得很复杂：

```rs
fn some_function<T: Display + Clone, U: Clone + Debug>(t: &T, u: &U) -> i32
```

通过where改进

```ts
fn some_function<T, U>(t: &T, u: &U) -> i32
    where T: Display + Clone,
          U: Clone + Debug
{}
```

#### 2.1.11.7 derive派生特征

在本书中，形如 `#[derive(Debug)]` 的代码已经出现了很多次，这种是一种特征派生语法，被 `derive` 标记的对象会自动实现对应的默认特征代码，继承相应的功能。

#### 2.1.11.8 特征对象

 **特征对象**指向实现了 `Draw` 特征的类型的实例，

可以通过 `&` 引用或者 `Box<T>` 智能指针的方式来创建特征对象。

```ts
trait Draw {
    fn draw(&self) -> String;
}

impl Draw for u8 {
    fn draw(&self) -> String {
        format!("u8: {}", *self)
    }
}

impl Draw for f64 {
    fn draw(&self) -> String {
        format!("f64: {}", *self)
    }
}

// 若 T 实现了 Draw 特征， 则调用该函数时传入的 Box<T> 可以被隐式转换成函数参数签名中的 Box<dyn Draw>
fn draw1(x: Box<dyn Draw>) {
    // 由于实现了 Deref 特征，Box 智能指针会自动解引用为它所包裹的值，然后调用该值对应的类型上定义的 `draw` 方法
    x.draw();
}

fn draw2(x: &dyn Draw) {
    x.draw();
}

fn main() {
    let x = 1.1f64;
    // do_something(&x);
    let y = 8u8;

    // x 和 y 的类型 T 都实现了 `Draw` 特征，因为 Box<T> 可以在函数调用时隐式地被转换为特征对象 Box<dyn Draw> 
    // 基于 x 的值创建一个 Box<f64> 类型的智能指针，指针指向的数据被放置在了堆上
    draw1(Box::new(x));
    // 基于 y 的值创建一个 Box<u8> 类型的智能指针
    draw1(Box::new(y));
    draw2(&x);
    draw2(&y);
}
```

- `draw1` 函数的参数是 `Box<dyn Draw>` 形式的特征对象，该特征对象是通过 `Box::new(x)` 的方式创建的
- `draw2` 函数的参数是 `&dyn Draw` 形式的特征对象，该特征对象是通过 `&x` 的方式创建的
- `dyn` 关键字只用在特征对象的类型声明上，在创建时无需使用 `dyn`

#### 2.1.11.9 特征对象的限制

不是所有特征都能拥有特征对象，只有对象安全的特征才行。当一个特征的所有方法都有如下属性时，它的对象才是安全的：

- 方法的返回类型不能是 `Self`
- 方法没有任何泛型参数

### 2.1.12 self和Self

在 Rust 中，有两个`self`，一个指代当前的实例对象，一个指代特征或者方法类型的别名：

### 2.1.13 集合类型

#### 2.1.13.1 动态数组：

vec::new

还可以使用宏 `vec!` 来创建数组，与 `Vec::new` 有所不同，前者能在创建同时给予初始化值

```ts
let v = vec![1, 2, 3];
let mut v = Vec::new();
v.push(1);
```

#### 2.1.13.2 hashmap

```ts
let mut my_gems = HashMap::new();
```

方法 2：

先将 `Vec` 转为迭代器，接着通过 `collect` 方法，将迭代器中的元素收集后，转成 `HashMap`：

```ts
fn main() {
    use std::collections::HashMap;

    let teams_list = vec![
        ("中国队".to_string(), 100),
        ("美国队".to_string(), 10),
        ("日本队".to_string(), 50),
    ];

    let teams_map: HashMap<_,_> = teams_list.into_iter().collect();
    
    println!("{:?}",teams_map)
}
```

### 2.1.14 生命周期

生命周期的语法也颇为与众不同，以 `'` 开头，名称往往是一个单独的小写字母，大多数人都用 `'a` 来作为生命周期的名称。 如果是引用类型的参数，那么生命周期会位于引用符号 `&` 之后，并用一个空格来将生命周期和引用参数分隔开:

```ts
&i32        // 一个引用
&'a i32     // 具有显式生命周期的引用
&'a mut i32 // 具有显式生命周期的可变引用
```

从两个字符串切片中返回较长的那个：

```ts
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let string1 = String::from("long string is long");

    {
        let string2 = String::from("xyz");
        let result = longest(string1.as_str(), string2.as_str());
        println!("The longest string is {}", result);
    }
}
```

需要注意的点如下：

- 和泛型一样，使用生命周期参数，需要先声明 `<'a>`
- `x`、`y` 和返回值至少活得和 `'a` 一样久(因为返回值要么是 `x`，要么是 `y`)

在上例中，`string1` 的作用域直到 `main` 函数的结束，而 `string2` 的作用域到内部花括号的结束 `}`，那么根据之前的理论，`'a` 是两者中作用域较小的那个，也就是 `'a` 的生命周期等于 `string2` 的生命周期，同理，由于函数返回的生命周期也是 '`a`，可以得出函数返回的生命周期也等于 `string2` 的生命周期。

现在来验证下上面的结论：`result` 的生命周期等于参数中生命周期最小的，因此要等于 `string2` 的生命周期，也就是说，`result` 要活得和 `string2` 一样久，观察下代码的实现，可以发现这个结论是正确的！

#### 2.1.14.1 静态生命周期

在 Rust 中有一个非常特殊的生命周期，那就是 `'static`，拥有该生命周期的引用可以和整个程序活得一样久。

### 2.1.15 错误处理

Rust 中的错误主要分为两类：

-  **可恢复错误**，通常用于从系统全局角度来看可以接受的错误，例如处理用户的访问、操作等错误，这些错误只会影响某个用户自身的操作进程，而不会对系统的全局稳定性产生影响
-  **不可恢复错误**，刚好相反，该错误通常是全局性或者系统性的错误，例如数组越界访问，系统启动时发生了影响启动流程的错误等等，这些错误的影响往往对于系统来说是致命的

`Result<T, E>` 用于可恢复错误，`panic!` 用于不可恢复错误。

#### 2.1.15.1 `panic!`

```ts
fn main() {
    panic!("crash and burn");
}
```

- 在使用时加上一个环境变量可以获取更详细的栈展开信息：
    - Linux/macOS 等 UNIX 系统： `RUST_BACKTRACE=1 cargo run`
    - Windows 系统（PowerShell）： `$env:RUST_BACKTRACE=1 ; cargo run`

两种方式：

 **栈展开**和 **直接终止**。

```ts
[profile.release]
panic = 'abort'
```

#### 2.1.15.2 Eesult

`Result<T, E>` 是一个枚举类型，定义如下：

```ts
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

```ts
use std::fs::File;

fn main() {
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => {
            panic!("Problem opening the file: {:?}", error)
        },
    };
}
```

以上 `File::open` 返回一个 `Result` 类型， 

#### 2.1.15.3 unwrap和excpet

```ts
use std::fs::File;

fn main() {
    let f = File::open("hello.txt").unwrap();
}
```

返回成功，就将 `Ok(T)` 中的值取出来，如果失败，就直接 `panic`

`expect` 跟 `unwrap` 很像，也是遇到错误直接 `panic`, 但是会带上自定义的错误提示信息，相当于重载了错误打印的函数：

#### 2.1.15.4 错误传播？

```ts
use std::fs::File;
use std::io;
use std::io::Read;

fn read_username_from_file() -> Result<String, io::Error> {
    let mut f = File::open("hello.txt")?;
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}
```

`?` 就是一个宏，它的作用跟下面的 `match` 几乎一模一样：

```ts
let mut f = match f {
    // 打开文件成功，将file句柄赋值给f
    Ok(file) => file,
    // 打开文件失败，将错误返回(向上传播)
    Err(e) => return Err(e),
};
```

### 2.1.16 包和模块

-  **项目(Package)**：可以用来构建、测试和分享包
-  **工作空间(WorkSpace)**：对于大型项目，可以进一步将多个包联合在一起，组织成工作空间
-  **包(Crate)**：一个由多个模块组成的树形结构，可以作为三方库进行分发，也可以生成可执行文件进行运行
-  **模块(Module)**：可以一个文件多个模块，也可以一个文件一个模块，模块可以被认为是真实项目中的代码组织单元

### 2.1.17 迭代器

数组转成iterator

```ts
IntoIterator::into_iter
或者：
values.into_iter()
```

 `Vec` 动态数组实现了 `IntoIterator` 特征，因此可以通过 `into_iter` 将其转换为迭代器

```ts
pub trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>;

    // 省略其余有默认实现的方法
}
```

- `into_iter` 会夺走所有权
- `iter` 是借用
- `iter_mut` 是可变借用

### 2.1.18 闭包

我的理解：

 **闭包其实就是一个变量**

 **他会将他范围内的变量包含到里面。形成一个大的变量**

闭包是 **一种匿名函数，它可以赋值给变量也可以作为参数传递给其它函数，不同于函数的是，它允许捕获调用者作用域中的值**

闭包捕获变量有三种途径，恰好对应函数参数的三种传入方式：转移所有权、可变借用、不可变借用

`FnOnce`，该类型的闭包会拿走被捕获变量的所有权。`Once` 顾名思义，说明该闭包只能运行一次

`FnMut`，它以可变借用的方式捕获了环境中的值，因此可以修改该值：

想要在闭包内部捕获可变借用，需要把该闭包声明为可变类型，也就是 `update_string` 要修改为 `mut update_string`：

```csharp
fn main() {
    let mut s = String::new();

    let mut update_string =  |str| s.push_str(str);
    update_string("hello");

    println!("{:?}",s);
}
```

# 3. 多线程并发

### 3.1.1 并发和并行

-  **并发(Concurrent)** 是多个队列使用同一个咖啡机，然后两个队列轮换着使用（未必是 1:1 轮换，也可能是其它轮换规则），最终每个人都能接到咖啡
-  **并行(Parallel)** 是每个队列都拥有一个咖啡机，最终也是每个人都能接到咖啡，但是效率更高，因为同时可以有两个人在接咖啡

： **并发和并行都是对“多任务”处理的描述，其中并发是轮流处理，而并行是同时处理**。

# 4. web框架

<img src="/assets/UnkNbjEfZo9MoMxbIBicyZLtnhg.png" src-width="720" class="markdown-img m-auto" src-height="366" align="center"/>

 **axum**

https://zhuanlan.zhihu.com/p/451494651

rust

第一个，基于 Axum 的 Web 框架。 Axum 算是 tokio 现在比较火的一个官方的 HTTP 的 Web 框架。

 

第二个，RPC 框架，支持了 GRPC 和 thrift，叫做 Volo。已经开源在 CloudWeGo 的组织下面了，如果之后有 RPC 的需求可以直接来使用这个框架。 第三个，异步的运行时的 Monoio 框架。这个主要是考虑到提供给一些性能非常关键的业务以及基础设施，就是基础架构的服务去使用。它的好处在于它采用 Thread Per Core 模型，这样就可以解决 Tokio 的很多问题，比如它的 future 必须加 Sync 的一个问题。因为 thread per core 的情况之下，它能保证一个 task 一定在一个线程中被运行，这样很多时候就不需要 send 加 sync 的约束，可以直接用 TLS（ thread local storage ）或者其他的这些技术，以及一些无锁的技术去编程，这可以很大程度上提高性能。第二个就是它采用了 Linux 最新发布的 io_uring 技术去做 IO 层 ，如果有对于性能要求非常高的同学可以去了解一下。

 

Volo：[g](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FcloudweGo%2Fvolo)[ithub.com/cloudweGo/v…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FcloudweGo%2Fvolo)

• Monoio：[github.com/bytedance/m…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbytedance%2Fmonoio)

• Motore：[github.com/cloudweGo/m…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FcloudweGo%2Fmotore)

• RsProxy：[rsproxy.cn/](https://link.juejin.cn/?target=https%3A%2F%2Frsproxy.cn%2F)

# 5. 其它

## 5.1 错误输出

将错误信息重定向到 `stderr` 很简单，只需在打印错误的地方，将 `println!` 宏替换为 `eprintln!`即可。

# 6. 一此ui库

<img src="/assets/Et5hbhY2No7Swnx0jhXcPS8Lnwg.png" src-width="1154" class="markdown-img m-auto" src-height="605" align="center"/>

