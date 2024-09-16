---
title: github相关学习
tags:
  - develop
create_time: 1714113741
categories:
  - skill
---


# Github actions

Github actions简直是一个免费的计算资源，不好好好利用，简直是浪费

Github actions官方库：

https://github.com/actions

## 创建一个release

### Create relase

官方有个api:

https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#create-a-release

 可以直接用github action库[create-relase](https://github.com/actions/create-release)

<img src="/assets/YdIvb7DnDoiLeUxHHZFcS7Dan7c.png" src-width="781" class="markdown-img m-auto" src-height="161" align="center"/>

所以要加一个permission

参考如下：

```yaml
on:
  workflow_dispatch:
name: create release
permissions:
  contents: write
jobs:
  build:
    name: Create Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # This token is provided by Actions, you do not need to create your own token
        with:
          tag_name: ${{ github.run_number}}
          release_name: Release_${{ github.run_number}}
          body: |
            Changes in this Release
            - First Change
            - Second Change
          draft: false
          prerelease: false
```

### Upload release asset

但这时还没有东西，只是把源码压缩了，不是最终的编译产物

需要用到另一个库[upload-release-asset](https://github.com/actions/upload-release-asset)

流程就是在打包完后，先建立zip，再上传

```yaml
- name: zip dist
    run: zip -r dist.zip blog/docs/.vitepress/dist/* 
        
- name: Upload Release Asset
    id: upload-release-asset
    uses: actions/upload-release-asset@v1
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    with:
      upload_url: ${{ steps.create_release.outputs.upload_url }} # This pulls from the CREATE RELEASE step above, referencing it's ID to get its outputs object, which include a `upload_url`. See this blog post for more info: https://jasonet.co/posts/new-features-of-github-actions/#passing-data-to-future-steps
      asset_path: ./dist.zip
      asset_name: dist.zip
      asset_content_type: application/zip
```

### Release comment

## Github actions permissions

https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs

# github加速

目前发现比较好的是

https://gitmirror.com/files.html

只用在github地址前加个前缀即可

# Github actions 支持的系统

https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners

###  **Linux**

- Red Hat Enterprise Linux 8 or later
- CentOS 8 or later
- Oracle Linux 8 or later
- Fedora 29 or later
- Debian 10 or later
- Ubuntu 20.04 or later
- Linux Mint 20 or later
- openSUSE 15.2 or later
- SUSE Enterprise Linux (SLES) 15 SP2 or later

###  **Windows**

- Windows 10 64-bit
- Windows 11 64-bit
- Windows Server 2016 64-bit
- Windows Server 2019 64-bit
- Windows Server 2022 64-bit

###  **macOS**

- macOS 11.0 (Big Sur) or later

###  **Architectures**

The following processor architectures are supported for the self-hosted runner application.

- `x64` Linux, macOS, Windows.
- `ARM64` Linux, macOS, Windows (currently in beta).
- `ARM32` Linux.

