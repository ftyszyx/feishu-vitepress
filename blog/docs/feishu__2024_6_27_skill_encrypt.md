---
title: 加密与解密
create_time: 1722068122
categories:
  - skill
---


# 加密算法

## base64

Base64 编码是将二进制数据转换为可打印的 ASCII 字符的一种编码方式。它将输入数据按每 3 个字节一组进行分组，然后将每组转换为 4 个 6 位的编码字符。

码表如下：

<img src="/assets/AmIFbSEuMojEVex8tUHcxWk0nsd.png" src-width="878" class="markdown-img m-auto" src-height="504" align="center"/>

但如果输入数据的字节长度不是 3 的整数倍，在编码的末尾就会出现 `=` 号来进行填充。

例如，如果输入数据的字节长度正好是 3 的整数倍，编码结果中就不会有 `=` 号

## base64url

标准的 Base64 编码使用的字符集包括“+”、“/”和“=”，然而“+”在 URI 地址中会被解释为空格，“/”对于 URL 地址和文件系统路径来说是目录分隔符，“=”用于在查询字符串中表示键值对。为了避免这些特殊字符在 URL 或文件名中引起的问题，Base64URL 编码做了以下修改：

- 将“+”替换为“-”（减号）；
- 将“/”替换为“_”（下划线）；
- 不使用填充字符“=”；
- 禁止使用换行符等。

## aes算法

对称加密

node.js代码：使用的算法aes-256-cbc中的数字和key的位数是对应的

256表示加密后的bit数

aes192,key要24 bytes

aes256,key要32 bytes

```yaml
const arg = 'aes-256-cbc'
function Encode2(data, key) {
  const iv = crypto.randomBytes(16)
  const cliper = crypto.createCipheriv(arg, key, iv)
  let encrypted = cliper.update(data, 'utf8', 'base64url')
  encrypted += cliper.final('base64url')
  let text = encrypted + '|' + iv.toString('base64url')
  return text
}

function Decode2(data, key) {
  const [data_str, iv_str] = data.split('|')
  const iv = Buffer.from(iv_str, 'base64url')
  const decipher = crypto.createDecipheriv(arg, key, iv)
  let decrypted = decipher.update(data_str, 'base64url', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

const key = crypto.createHash('sha256').update('1234567890123456').digest()  
const src_test = '耗损在需要'
const res = Encode2(src_test, key)
console.log('加密后的文本:', res)
const res2 = Decode2(res, key)
console.log('解密后的文本:', res2)
```

## hash算法

node.js实现

```yaml
crypto.createHash('sha256').update('1234567890123456').digest()
```

