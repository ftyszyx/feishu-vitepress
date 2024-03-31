---
create_time: 1711417448
title: project_record
---

# project_record

# 2024/3/25

## The environment variables added in the Gihub action are not recognized

To solve the problem, you need to add the name of the environment variable to the jobs

<img src="/assets/L7UWbibvXoQSwxxqJg3cl9h5ncj.png" src-width="308" src-height="104" align="center"/>

# 2024/3/26

## The step prompt for submitting code in GitHub Action indicates that you have no permissions

```sql
**Error: **Error: Pushing to <u>https://github.com/ftyszyx/myblog</u>
[56] (https://github.com/ftyszyx/myblog/actions/runs/8423006609/job/23063634395#step:8:59)remote: Permission to ftyszyx/myblog.git denied to github-actions[bot].
```

Suspicion is a permission issue,

View the Permision documentation: https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs

Added permision:

<img src="/assets/OeyXb9q53oWH4axfsLtcdlAgnSf.png" src-width="449" src-height="212" align="center"/>

There are new errors

```sql
error: failed to push some refs to '<u>https://github.com/ftyszyx/myblog</u>'
```

Knowing the reason, I made two submissions,

<img src="/assets/WBBWbyyrCoepLuxUohucjTq6nBd.png" src-width="499" src-height="282" align="center"/>

Cause exceptions, merge into one commit, and that's it

<img src="/assets/J0E8bmHUlo0idPxWAR0cdMdMnZc.png" src-width="410" src-height="148" align="center"/>

## How to get rid of <u>pages build and deployment</u>

Pages is available on Github. A workflow is automatically added

<img src="/assets/XERKbDeATog68jxZ2SWcmypjnjd.png" src-width="866" src-height="210" align="center"/>

I want to customize this process, choose this

<img src="/assets/JhhWbKuiqo5SbqxLdspc1Nphnhe.png" src-width="532" src-height="274" align="center"/>

Then delete all the run logs on the right side of the workflow

<img src="/assets/KED6b8FGIowVszxjxptcw8fGn5d.png" src-width="971" src-height="266" align="center"/>

This workflow is gone, and the world is quiet!

<img src="/assets/ZR5TbQAisoRNJwxx8L8cx0GGn5d.png" src-width="372" src-height="172" align="center"/>
## I found that the cover image could not be found during preview

After looking at the build result, there is indeed no picture in the cover

Because the image in the cover is written in the VitePress Page Meta

It's possible that vitepress thinks that the resources here are invalid and should only be in plain text

Reference: https://vitepress.dev/guide/frontmatter

The solution is to put the picture in (not so good)

https://vitejs.dev/guide/assets.html#the-public-directory

Add a hook to the build end and copy the past yourself

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
       console.log("write", picpath, destpath);
      copyFileSync(picpath, destpath);
    });
  },
```

# 2024/3/27

## After GitHub is deployed, the webpage is displayed abnormally because the base path is incorrect

Because the github page URL is https://ftyszyx.github.io/myblog

So the baseurl needs to be modified

<img src="/assets/IMLfb0iCooB8AfxcROWcxNIFnmh.png" src-width="613" src-height="331" align="center"/>

<img src="/assets/Muc0bjrToooEIfxscKScmKWunVb.png" src-width="781" src-height="256" align="center"/>
There is also a problem that after this basepath is modified, VitePress will not handle the link to the cover

Vitepress has an interface to get the base in a web page

https://vitepress.dev/guide/asset-handling#base-url

<img src="/assets/UDP3bkjoGoHs09xpEHacLV6EnBg.png" src-width="757" src-height="547" align="center"/>
# 2024/3/28

## The page style is too ugly and needs to be adjusted

In particular, the siderbar is too wide and the content is too narrow

## Add search

VitePress in-house support

## Add comments

To implement it with Artalk, you need to build your own server

# 2024/3/29

## Multi-language support

After all, it's for showing yourself, or you still have to add English,

The English language can be machine-generated, and the framework refers to the official one.

To start with a reference software, I often use a plugin: Immersive Translation

https://immersivetranslate.com/

https://github.com/immersive-translate/immersive-translate/

He used google translate and it worked okay

Find the relevant gogole translation npm library

https://github.com/vitalets/google-translate-api?tab=readme-ov-file#readme with this library

But free Google Translate has limitations

If the number of prompts is limited and you need to use a proxy, there are free proxies here

https://free-proxy-list.net/

It's too troublesome, change the micro software

https://github.com/plainheart/bing-translate-api

## Added click stats

## Increase browsing statistics

(There was one that could record the whole process of the user before)

## How to synchronize to the official account

## How cloude page

## 
## If the picture becomes the address in the picture bed

Will there be a problem

There is an advantage to changing the image address to an absolute link, yes