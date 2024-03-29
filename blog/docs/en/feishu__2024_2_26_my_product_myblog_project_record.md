---
create_time: 1711417448
title: project_record
---


# project_record

# 2024/3/25

## The environment variables added in Gihub action cannot be recognized

To solve the problem, you need to add the environment variable name to jobs

<img src="/assets/L7UWbibvXoQSwxxqJg3cl9h5ncj.png" src-width="308" src-height="104" align="center"/>

# 2024/3/26

## When submitting the code step in github action, it prompts that there is no permission.

```sql
**Error: **Error: Pushing to <u>https://github.com/ftyszyx/myblog</u>
[56](https://github.com/ftyszyx/myblog/actions/runs/8423006609/job/23063634395#step:8:59)remote: Permission to ftyszyx/myblog.git denied to github-actions[bot].
```

I suspect it's a permissions issue.

Check out the permission documentation: https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs

Added permission:

<img src="/assets/OeyXb9q53oWH4axfsLtcdlAgnSf.png" src-width="449" src-height="212" align="center"/>

There is a new error report

```sql
error: failed to push some refs to '<u>https://github.com/ftyszyx/myblog</u>'
```

I know the reason, I submitted it twice,

<img src="/assets/WBBWbyyrCoepLuxUohucjTq6nBd.png" src-width="499" src-height="282" align="center"/>

Causes an exception, merge it into one commit, and it will be fine

<img src="/assets/J0E8bmHUlo0idPxWAR0cdMdMnZc.png" src-width="410" src-height="148" align="center"/>

## <u>pages build and deployment</u> How to remove

Github is equipped with pages. A workflow will be automatically added

<img src="/assets/XERKbDeATog68jxZ2SWcmypjnjd.png" src-width="866" src-height="210" align="center"/>

I want to customize this process, select this

<img src="/assets/JhhWbKuiqo5SbqxLdspc1Nphnhe.png" src-width="532" src-height="274" align="center"/>

Then delete all the run logs on the right side of this workflow

<img src="/assets/KED6b8FGIowVszxjxptcw8fGn5d.png" src-width="971" src-height="266" align="center"/>

This workflow disappears and the world becomes peaceful!

<img src="/assets/ZR5TbQAisoRNJwxx8L8cx0GGn5d.png" src-width="372" src-height="172" align="center"/>

## During preview, I found that the cover image could not be found.

After looking at the build results, there are indeed no pictures in the cover.

Because the pictures in the cover are written in the vitepress page meta

It is possible that vitepress thinks that the resources here are invalid and should only use plain text.

Reference: https://vitepress.dev/guide/frontmatter

The solution is to put the image in (not so good)

https://vitejs.dev/guide/assets.html#the-public-directory

Add a hook in the build end and copy it yourself

```sql
buildEnd: async (siteconfig) => {
    const coverurls: string[] = await createContentLoader("/*.md", {
      excerpt: true,
      includeSrc: false,
      render: false,
      transform: (rawData) => {
        return rawData
          .filter(({ frontmatter }) => frontmatter.cover)
          .map(({ frontmatter }) => {
            return frontmatter.cover;
          });
      },
    }).load();
    coverurls.forEach((item) => {
      const picpath = path.join(siteconfig.root, item);
      const picfile_name = path.basename(picpath);
      const destpath = path.join(
        siteconfig.outDir,
        siteconfig.assetsDir,
        picfile_name,
      );
      // console.log("write", picpath, destpath);
      copyFileSync(picpath, destpath);
    });
  },
```

# 2024/3/27

## After github deployment, the web page displays abnormally because the base path is incorrect.

Because the github page URL is https://ftyszyx.github.io/myblog

So baseurl needs to be modified

<img src="/assets/IMLfb0iCooB8AfxcROWcxNIFnmh.png" src-width="613" src-height="331" align="center"/>

<img src="/assets/Muc0bjrToooEIfxscKScmKWunVb.png" src-width="781" src-height="256" align="center"/>

There is another problem. After the basepath is modified, vitepress will not process the cover link.

Vitepress has an interface to get the base on the web page

https://vitepress.dev/guide/asset-handling#base-url

<img src="/assets/UDP3bkjoGoHs09xpEHacLV6EnBg.png" src-width="757" src-height="547" align="center"/>

# 2024/3/28

## The page style is too ugly and needs to be adjusted.

Especially the sidebar is too wide and the content is too narrow

## Add search

vitepress internal support

## Add comment

Use artalk

## Add click statistics

## Add browsing statistics

(There used to be one that could record the entire user process)

## How to synchronize to the official account

## How to cloude page

##
## If the picture becomes the address in the picture bed

will there be any problem

There are advantages to changing the image address into an absolute link. You can