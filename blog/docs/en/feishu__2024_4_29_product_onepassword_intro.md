---
title: Crypto Pass
tags:
  - develop
create_time: 1716970246
categories:
  - product
---

# Description

Nowadays, there are too many platforms on the Internet, and each platform requires an account and password.

It can't be recorded

Therefore, it is necessary to make a software to record the account number and password

Function:

1. The software requires a password to log in, (it can be unlocked twice with 2FA)
2. The information stored in the software is mainly the platform name, platform address, account name, and password. Email, mobile phone,

Passwords need to be stored encrypted

1. There is a search function, which can be quickly matched to the platform or account through search
2. Password generation function (help generate passwords)
3. Data can be stored locally or synchronized to the network disk (Baidu, Alibaba, GitHub)
4. It will lock if it is not operated for 5 minutes
5. Clear the contents of the pasteboard regularly, and adjust the clearing interval
6. Encrypt local files.

This type of software,

1. It's better to store things locally (no need to interact with the server)

2. It is best to open source (supervised by everyone)

3. Charge by synchronizing user information

# Existing software

##  Bitwarden 

https://bitwarden.com/

Open Source Website:

https://github.com/bitwardenAwesome from front-end to back-end, completely open source.

##  proton pass

Official website: https://proton.me/pass

Partially open source:

https://github.com/protonpass

## KeePass 

## 1password

https://1password.com/zh-cn ：

Charge, find a description: https://yishi.io/1password-complete-tutorial/

### Description of the web page process

Step 1: Generate a private key

<img src="/assets/EEWnbXLz9oXaqJx9iJtcDJnHnjc.png" src-width="702" class="m-auto" src-height="291" align="center"/>

Let you save

<img src="/assets/DQA4bJnoKovk6ox2q0ZcFb8onve.png" src-width="402" class="m-auto" src-height="375" align="center"/>

A PDF will be generated for you

<img src="/assets/KWj6bIh9nop0Q7x1Eq9ctGNnnOg.png" src-width="860" class="m-auto" src-height="396" align="center"/>

<img src="/assets/AMjPbf8X8oxNEGxZko4cFdNZnWf.png" src-width="786" class="m-auto" src-height="281" align="center"/>

Next

<img src="/assets/Xc5WbqmqRo2ZTAxjBMzcJNh9nXb.png" src-width="528" class="m-auto" src-height="339" align="center"/>

Main page

<img src="/assets/IQVIbZhRSo1gPIxtX9scJuWInbg.png" src-width="1503" class="m-auto" src-height="464" align="center"/>

Create a new vault

<img src="/assets/NRjpb9h9ZorQSFxopJ8cxhlqnqd.png" src-width="591" class="m-auto" src-height="571" align="center"/>

That's it here

<img src="/assets/FHz4bEAYVoTuxAxuvRLcmTSKnmQ.png" src-width="1283" class="m-auto" src-height="483" align="center"/>Vault page

<img src="/assets/XSkWbViYUo5MZdxdiZXcMEtBnph.png" src-width="1789" class="m-auto" src-height="603" align="center"/>

Create a new login account

<img src="/assets/RFrMbWoSvo4BfXxIhF2ch5LEntd.png" src-width="336" class="m-auto" src-height="568" align="center"/>

Project:

<img src="/assets/TMfTbWJV6oTn8hxOVsOc3KbynuX.png" src-width="939" class="m-auto" src-height="494" align="center"/>

Passwords can also be imported

<img src="/assets/BZeJbY10voEopBxesm8cj8SfnBh.png" src-width="310" class="m-auto" src-height="199" align="center"/>

I choose chrome

<img src="/assets/LuSIbTs2joz23Gx8J9Ncf167nie.png" src-width="1377" class="m-auto" src-height="687" align="center"/>

Select Chrome

<img src="/assets/UsdAb7dRDohNOhxRv45cA1DPn4c.png" src-width="1492" class="m-auto" src-height="633" align="center"/>

After you export the password file

<img src="/assets/Wid2b4nPPo4laLxY9FhcOPXanTd.png" src-width="1505" class="m-auto" src-height="440" align="center"/>

Upload the file 

<img src="/assets/WsyWbdTDZoGAldx68fJcImbFnVg.png" src-width="1498" class="m-auto" src-height="644" align="center"/>

<img src="/assets/WrwBbminBohyHyxELBFcUvb9nDb.png" src-width="1466" class="m-auto" src-height="666" align="center"/>

Reset the label

<img src="/assets/LyvHbxOIvo4EYUxwTjQcwdLTnbb.png" src-width="1450" class="m-auto" src-height="497" align="center"/>

It will lock if it is not operated for 10 minutes

<img src="/assets/FZ9Ibcd4lo3yBGxkeyIcjlPWnMc.png" src-width="967" class="m-auto" src-height="451" align="center"/>
### Security mechanisms

1Password isn't open source, but it follows a public specification ([white paper on the security model] (https://1password.com/files/1Password-White-Paper.pdf)) that any developer can black-box test.

David Schuetz explores how 1Password works in great detail in his blog post (https://darthnull.org/security/2018/11/09/1pass-misc/), and here's the core of his summary:

The so-called 2SKD (two-secret key derivation) mechanism means that 1Password uses both your own master password and secret key to encrypt your information, as well as verify your identity during communication with the server.**The Master password is not stored by 1Password, it only exists briefly in the machine's memory while it is being run. **

**The Secret key (i.e., the Account key in the diagram) is generated locally and only locally and is not uploaded to the server. **

<img src="/assets/W4pGb4wuFoozEzx0waccjPVZnTb.png" src-width="694" class="m-auto" src-height="479" align="center"/>

## Client-side flows

landing

<img src="/assets/RP51bHALboVVdPxYck0cKBvMnGn.png" src-width="978" class="m-auto" src-height="705" align="center"/>

<img src="/assets/U9Azb3YntoAtgXxFHSuc327onuf.png" src-width="593" class="m-auto" src-height="200" align="center"/>

<img src="/assets/Pb9IbZEI8oH0bBxjtH7ceFvVnWf.png" src-width="959" class="m-auto" src-height="776" align="center"/>

<img src="/assets/QB1tboT2LojVAixcA20czgBgnAg.png" src-width="995" class="m-auto" src-height="774" align="center"/>

<img src="/assets/Fy0Ab1K9boXXm1xuQ5cc5i7bnBg.png" src-width="993" class="m-auto" src-height="798" align="center"/>

<img src="/assets/RrlhbOU6votu2dxjlFacowXQnDf.png" src-width="682" class="m-auto" src-height="814" align="center"/>

## flowerpassword

https://flowerpassword.com/: Just help generate passwords