---
Title: Qinglong Automation Tools (Automatic O&M)
tags:
  - develop
create_time: 1714123555
categories:
  - skill
---

# Description:

Automated O&M tools include:

Qinglong: https://github.com/whyour/qinglong 

I want him to do some automatic task management, because there is a UI, it should be more efficient

# Installation

Refer to the official documentation

# Use

Refer to this https://github.com/6dylan6/jdpro

You basically know the general process

The first thing is to add a github subscription, which contains all the js scripts

After subscribing, there are many tasks in the task list,

https://cloud.tencent.com/developer/article/2087378

# Research

Take this project as an example:

https://sitoi.github.io/dailycheckin/

I refer to this and write an update zip that automatically gets the blog

GitHub API to get the latest release of the current project

https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#get-the-latest-release

This API requires a token

There are three ways, choose the last one**Personal access tokens**https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token

## My first script

### Script Address:

https://github.com/ftyszyx/qinglong

### Pull code

To increase a subscription:

<img src="/assets/Lp2Rb5ZNUo2qrAxSu3ocL6cmnrc.png" src-width="493" class="m-auto" src-height="348" align="center"/>

All auto-add tasks are turned off

<img src="/assets/OAL5b8O7uoczr7xLFF3cPHfWnEf.png" src-width="475" class="m-auto" src-height="104" align="center"/>

### Add configuration

<img src="/assets/ZKt4bRl0uoE6XRxHDMhcuRCxnGd.png" src-width="1023" class="m-auto" src-height="355" align="center"/>

Create a new config.json with the content config.bak

<img src="/assets/GnsybkeHqoTIy6x2AUQcGNDOnIe.png" src-width="507" class="m-auto" src-height="311" align="center"/>

### Add a task

<img src="/assets/QdPNbzKCsovRQsxCVP0cNqXSnZf.png" src-width="1001" class="m-auto" src-height="235" align="center"/>

<img src="/assets/C46obAfrwoGr76xYfD1cupENnOb.png" src-width="462" class="m-auto" src-height="390" align="center"/>

### Add dependencies

<img src="/assets/H48YbieXro4gtnx9uJ7cHafJn2e.png" src-width="905" class="m-auto" src-height="320" align="center"/>

# Question

The generated file can only be in the directory mapped by docker

It cannot be accessed by other users, and a directory mapping needs to be added

<img src="/assets/ILYqbFjQToCbikx2G5Xc0paxnih.png" src-width="346" class="m-auto" src-height="73" align="center"/>

# Summary

Qinglong is similar to a simplified version of Jenkins.

The main function is to manage scheduled tasks.Execute external scripts on a scheduled basis