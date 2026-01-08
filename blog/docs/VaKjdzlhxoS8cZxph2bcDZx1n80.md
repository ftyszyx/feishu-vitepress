---
create_time: 1767683507
edit_time: 1767781751
title: ast反混淆
categories:
  - skill
---


# 1. ast

参考https://cloud.tencent.com/developer/article/1989490

语法树，编译器通过词法分析和语法分析后得到的结构化数据

可以使用[https://astexplorer.net/](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fastexplorer.net%2F&objectId=1989490&objectType=1&contentType=undefined) 去查看

js中可以使用babel库来做ast

1. `@babel/core`：Babel 编译器本身，提供了 babel 的编译 API；
2. `@babel/parser`：将 JavaScript 代码解析成 AST 语法树；
3. `@babel/traverse`：遍历、修改 AST 语法树的各个节点；
4. `@babel/generator`：将 AST 还原成 JavaScript 代码；
5. `@babel/types`：判断、验证节点的类型、构建新 AST 节点等。

## 1.1 库的使用 

### 1.1.1 读取和修改

```js
const parser=require('@babel/parser')
const generator = require('@babel/generator')

const code="const a=1"
const ast=parser.parse(code)
ast.program.body[0].declarations[0].init.value = 2
ast.program.body[0].declarations[0].id.name = 'b'
_// console.log(ast.program.body)_
const result=generator.generate(ast)
console.log(result.code)
```

### 1.1.2 遍历

```js
const parser=require('@babel/parser')
const generator = require('@babel/generator')
const traverse = require('@babel/traverse')
const code = `
const a = 1500;
const b = 60;
const c = "hi";
const d = 787;
const e = "1244";
`
const ast=parser.parse(code)

const visitor = {
     **NumericLiteral**(_path_){
        _path_.node.value = (_path_.node.value + 100) * 2
    },
     **StringLiteral**(_path_){
        _path_.node.value = "hello"
    }
}
traverse.default(ast,visitor)
const result=generator.generate(ast)
console.log(result.code)
```

### 1.1.3 构造

```js
const parser=require('@babel/parser')
const generator = require('@babel/generator')
const traverse = require('@babel/traverse')
const types = require('@babel/types')
const code = `
const a = 1500;
`
const ast=parser.parse(code)

const visitor = {
     **VariableDeclaration**(_path_) {
        let left=types.binaryExpression("*",types.identifier("a"),types.numericLiteral(100))
        let right=types.numericLiteral(2)
        let init = types.binaryExpression("+", left, right);
        let declarator=types.variableDeclarator(types.identifier("b"),init)
        let declaration=types.variableDeclaration("const",[declarator]) 
        _path_.insertAfter(declaration)
        _path_.stop()
    },
}
traverse.default(ast,visitor)
const result=generator.generate(ast)
console.log(result.code)
```

## 1.2 常用的手段

### 1.2.1 字符串还原

```js
const code = `console['\u006c\u006f\u0067']('\u0048\u0065\u006c\u006c\u006f\u0020\u0077\u006f\u0072\u006c\u0064\u0021')`
const visitor = {
    StringLiteral(path) { 
        delete path.node.extra.raw
    }
}
```

### 1.2.2 表达式还原

path.evaluate()

```js
const a = !![]+!![]+!![];
const b = Math.floor(12.34 * 2.12)
const c = 10 >> 3 << 1
const d = String(21.3 + 14 * 1.32)
const e = parseInt("1.893" + "45.9088")
const f = parseFloat("23.2334" + "21.89112")
const g = 20 < 18 ? '未成年' : '成年'
const visitor = {
    "BinaryExpression|CallExpression|ConditionalExpression"(path) {
        const {confident, value} = path.evaluate()
        if (confident){
            path.replaceInline(types.valueToNode(value))
        }
    }
}
```

### 1.2.3 删除末使用的变量

删除多余变量，首先要了解 `NodePath` 中的 `scope`，`scope` 的作用主要是查找标识符的作用域、获取并修改标识符的所有引用等，删除未使用变量主要用到了 `scope.getBinding()` 方法，传入的值是当前节点能够引用到的标识符名称，返回的关键属性有以下几个：

- `identifier`：标识符的 Node 对象；
- `path`：标识符的 NodePath 对象；
- `constant`：标识符是否为常量；
- `referenced`：标识符是否被引用；
- `references`：标识符被引用的次数；
- `constantViolations`：如果标识符被修改，则会存放所有修改该标识符节点的 Path 对象；
- `referencePaths`：如果标识符被引用，则会存放所有引用该标识符节点的 Path 对象。

```js
traverse.default(ast, {
     **VariableDeclarator**(_path_) {
        _// console.log(path.node.id.name)_
        const binding = _path_.scope.getBinding(_path_.node.id.name)
        if(!binding||binding.constantViolations.length>0) return
        if (!binding.referenced) {
            _path_.remove()
        }
        _// console.log(path.toString())_
    }
})
```

### 1.2.4 删除冗余逻辑代码

输入：

```js
const  **example** = function () {
    let a;
    if (false) {
    } else {
        if (1) {
            a = 2;
        }
        else {
            a = 3;
        }
    }
    return a;
};
```

解码

```js
traverse.default(ast, {
     **enter**(_path_) {
        if (types.isBooleanLiteral(_path_.node.test) || types.isNumericLiteral(_path_.node.test)) {
            if(_path_.node.test.vale)
            {
                _path_.replaceInline(_path_.node.consequent.body);
            }
            else {
                if (_path_.node.alternate) {
                    _path_.replaceInline(_path_.node.alternate.body);
                }
                else {
                    _path_.remove();
                }
            }
        }
    }
})
```

### 1.2.5 switch-case处理

输入

```java
const _0x34e16a = '3,4,0,5,1,2'['split'](',');
let _0x2eff02 = 0x0;
while (!![]) {
    switch (_0x34e16a[_0x2eff02++]) {
        case'0':
            let _0x38cb15 = _0x4588f1 + _0x470e97;
            continue;
        case'1':
            let _0x1e0e5e = _0x37b9f3[_0x50cee0(0x2e0, 0x2e8, 0x2e1, 0x2e4)];
            continue;
        case'2':
            let _0x35d732 = [_0x388d4b(-0x134, -0x134, -0x139, -0x138)](_0x38cb15 >> _0x4588f1);
            continue;
        case'3':
            let _0x4588f1 = 0x1;
            continue;
        case'4':
            let _0x470e97 = 0x2;
            continue;
        case'5':
            let _0x37b9f3 = 0x5 || _0x38cb15;
            continue;
    }
    break;
}
```

处理

```ts
const visitor = {
    WhileStatement(path) {
        // switch 节点
        let switchNode = path.node.body.body[0];
        // switch 语句内的控制流数组名，本例中是 _0x34e16a
        let arrayName = switchNode.discriminant.object.name;
        // 获得所有 while 前面的兄弟节点，本例中获取到的是声明两个变量的节点，即 const _0x34e16a 和 let _0x2eff02
        let prevSiblings = path.getAllPrevSiblings();
        // 定义缓存控制流数组
        let array = []
        // forEach 方法遍历所有节点
        prevSiblings.forEach(pervNode => {
            let {id, init} = pervNode.node.declarations[0];
            // 如果节点 id.name 与 switch 语句内的控制流数组名相同
            if (arrayName === id.name) {
                // 获取节点整个表达式的参数、分割方法、分隔符
                let object = init.callee.object.value;
                let property = init.callee.property.value;
                let argument = init.arguments[0].value;
                // 模拟执行 '3,4,0,5,1,2'['split'](',') 语句
                array = object[property](argument)
                // 也可以直接取参数进行分割，方法不通用，比如分隔符换成 | 就不行了
                // array = init.callee.object.value.split(',');
            }
            // 前面的兄弟节点就可以删除了
            pervNode.remove();
        });

        // 储存正确顺序的控制流语句
        let replace = [];
        // 遍历控制流数组，按正确顺序取 case 内容
        array.forEach(index => {
                let consequent = switchNode.cases[index].consequent;
                // 如果最后一个节点是 continue 语句，则删除 ContinueStatement 节点
                if (types.isContinueStatement(consequent[consequent.length - 1])) {
                    consequent.pop();
                }
                // concat 方法拼接多个数组，即正确顺序的 case 内容
                replace = replace.concat(consequent);
            }
        );
        // 替换整个 while 节点，两种方法都可以
        path.replaceWithMultiple(replace);
        // path.replaceInline(replace);
    }
}
```

## 1.3 测试

[test.js](/assets/JuADbZYuPouWSmxwCGdcWZF1nld.false)

