---
title: Blogs are automatically synchronized to Alibaba Cloud
keywords:
  - feishu
  - vitepress
  - Personal blogging
  - Alibaba Cloud
  - qinglong
  - Domestic automatic deployment
create_time: 1715004884
categories:
  - product
---

# Background

The blog was originally on [github_pages] (https://ftyszyx.github.io/feishu-vitepress/), but in the absence of circumventions, access can sometimes be slow.

So I want to deploy a set in China, and it just so happens that Alibaba Cloud has a preferential server, 99 yuan a year.

By the way, I bought a domain name and filed it: bytefuse.cn

So here comes the problem, I think that after deploying the blog on Alibaba Cloud, it can automatically pull github updates.

# Scenario

1. Create a new github_action, generate a release on a regular basis, and package the blog
2. Write a script on the Alibaba Cloud server, pull the latest release regularly, and upload it to the /var/www directory
3. Deploy the nginx service on Alibaba Cloud and point to the blog directory

# Implementation

## Generate a release

This is simple, refer to [My Implementation] (https://github.com/ftyszyx/feishu-vitepress/blob/main/.github/workflows/release.yml)

## Pull the release regularly

Github has the interface: [address](https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#get-the-latest-release)

I wrote a script: [address](https://github.com/ftyszyx/qinglong)

Originally, I wanted to write a crontab timer by hand, which I did before. Recently I found out that there is a Qinglong system, and I made a set of GUI to manage the crontab of the system.

So I tried to do it with qinglong.

Please refer to Project https://github.com/ftyszyx/qinglong for details

## ngnix serviceFor ease of management, I also found a system for nginx

[nginx-ui] (https://github.com/0xJacky/nginx-ui)