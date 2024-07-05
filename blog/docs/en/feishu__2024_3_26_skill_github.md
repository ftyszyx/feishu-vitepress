---
title: github related learning
tags:
  - develop
create_time: 1714113741
categories:
  - skill
---

# Github actions

Github actions are simply a free computing resource, and if you don't use them well, it's a waste

Github actions repositories:

https://github.com/actions

## Create a release

### Create relase

There is an official API:

https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#create-a-release

You can use the github action repository [create-relase](https://github.com/actions/create-release) directly

<img src="/assets/YdIvb7DnDoiLeUxHHZFcS7Dan7c.png" src-width="781" class="m-auto" src-height="161" align="center"/>
So add a permission

For reference, please refer to the following:

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
        id: create_releaseuses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets. GITHUB_TOKEN }} # This token is provided by Actions, you do not need to create your own token
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

But there is nothing at this time, it is just a compression of the source code, not the final compilation product

Requires another library [upload-release-asset](https://github.com/actions/upload-release-asset)

The process is to create a zip and then upload it after packaging

```yaml
- name: zip dist
    run: zip -r dist.zip blog/docs/.vitepress/dist/* 
        
- name: Upload Release Asset
    id: upload-release-asset
    uses: actions/upload-release-asset@v1
    env:
      GITHUB_TOKEN: ${{ secrets. GITHUB_TOKEN }}
    with:
      upload_url: ${{ steps.create_release.outputs.upload_url }} # This pulls from the CREATE RELEASE step above, referencing it's ID to get its outputs object, which include a `upload_url`. See this blog post for more info: https://jasonet.co/posts/new-features-of-github-actions/#passing-data-to-future-steps
      asset_path: ./dist.zip
      asset_name: dist.zip
      asset_content_type: application/zip
```

### Release comment

## Github actions permissions

https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs

# github acceleration

So far, the better ones have been found

https://gitmirror.com/files.htmlJust prefix the github address