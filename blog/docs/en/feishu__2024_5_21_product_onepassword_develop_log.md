---
title: Password Manager
tags:
  - develop
create_time: 1718958726
categories:
  - product
---

# 2024-6-21

## Security Process Exploration

### Let's review the normal login process first

User Registration:

Passwords are encrypted on the server side

```csharp
this.password = bcrypt.hashSync(this.password, 10);
```

Whether the password is correct or not

```csharp
if (!bcrypt.compareSync(login_req.password, user.password)) {
      throw new HttpException('Password error', Net_Retcode.ERR);
    }
```

Mainly with the bcrypt library: https://github.com/kelektiv/node.bcrypt.js

Principle of bcrypt :

https://www.cnblogs.com/flydean/p/15292400.html

When the player's login is verified, a token is returned to the player, and the token is stored in Redis for easy verification

````csharp
const payload: TokenPayload = { user_name: user.user_name, id: user.id };
const access_token = this.jwtService.sign(payload);
const http_config = this.config.get<AppHttpConfig>('http');
await this.redis.set(getTokenRedisKey(user.id), access_token, http_config.token_expire_in);

```ts
You need to set a password to encrypt JWT data

JWT uses a signature algorithm: https://www.cnblogs.com/kirito-c/p/12402066.html```csharp
JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: async (configservice: ConfigService) => {
        const httpconfig = configservice.get<AppHttpConfig>('http');
        return {
          secretOrPrivateKey: httpconfig.token_secret_key,
          signOptions: {
            // expiresIn: httpconfig.token_expire_time
          },
        };
      },
    }),
````

### Let's review the security mechanism of https again

Mainly with asymmetric encryption:

The server generates: public and private keys

The public key can be used for decryption, and the private key can be used for encryption

Asymmetric encryption is used for certificate validation. Or key

Symmetric encryption is performed with a key when data is transmitted

Reference: https://segmentfault.com/a/1190000021494676

<img src="/assets/JBBabFfzZohIlExlWBocGOrpnIg.png" src-width="1704" class="m-auto" src-height="1424" align="center"/>
### 1Password Principle

Reference: https://skyfly.xyz/2019/07/26/Casual/onePasswordTheory/

First of all, 1password will have two passwords:

1. Master Password (User-Remembered) Entered by the User

2. Secret key (software-generated) (stored on the user's computer, will not be transmitted, a randomly generated string)

White paper:

<img src="/assets/At63bOjRSoIUEBxvtAccTZgknke.png" src-width="7199" class="m-auto" src-height="3141" align="center"/>

master_key and secert key

<img src="/assets/G7DXbB2uuo5caFxIu6kc5Dcentd.png" src-width="856" class="m-auto" src-height="240" align="center"/>Here we use a concept called DH algorithm:

Here's a good video: https://www.bilibili.com/video/BV1sY4y1p78s/?spm_id_from=333.788&vd_source=1cfe4f7c9bf04285f79b848e60f55aea

<img src="/assets/I6yUb3XtLoTviQxgZQycnejwnEe.png" src-width="828" class="m-auto" src-height="355" align="center"/>
The process is as follows:

1. Generate an A by putting together the master password and the secret key

2. Perform hash operation (MD5 or SHA) through A to calculate a B

3. Send B to the server

4. Through the dh algorithm, the client calculates a C through A. The server also calculates a C based on B (the same encryption key on both sides)

5. Every time the client sends data to the server, it must be encrypted with C. The server is also decrypted with C,

What is this step doing to get a common c?,It doesn't seem to be useful.

What we aim for:

Encrypt the data we save and store it in the network disk for easy synchronization to your own other devices.

Then we can use AES symmetric encryption algorithm. We don't need features like complicated sharing. Our features simply need to be saved and used for your own use

The process is as follows:

1. Enter the APP, and the user enters a master password (the user remembers). At the same time, a key is generated for the user (stored locally). Put together to generate an A

2. Perform hash operation (MD5 or SHA) through A to calculate a B

3. All data stored by the user is encrypted by AES and stored in the local database

4. When the user obtains the data, the data of the database is decrypted through B and displayed to the user.

When syncing to another device, only send the encrypted data to that device. Also send the key to that device (you can send it via QR code)

Can. The user can then decrypt the database files on that device by entering the master password.

# 2024-6-27

## Initialize the password function

When the software starts, check whether there is a local scert.key, if not, a dialog box will pop up, allowing the user to enter the initial password,

After the user point is confirmed, a key is generated: a random number, which is saved locally

Spell together the user's password and key, make a hash, and generate a B,Save the username and B to the database (local database)

# 2024-7-4

Create a user table to store user information and encrypted key_hash

Create a vault table: vault

The corresponding password information stored in the vault: vault_item

1. Home:

List of vaults:

The display is shown on the right:

<img src="/assets/WBi6bR2SZouWc0xZbNycC57Gnlf.png" src-width="821" class="m-auto" src-height="242" align="center"/>

Yes, modify, set and delete

2. Click to enter to enter the account list

Something like this: You can switch the password vault directly above:

<img src="/assets/EfR0b1Gq7oANjPxpnppc1J1VnOf.png" src-width="1185" class="m-auto" src-height="512" align="center"/>
