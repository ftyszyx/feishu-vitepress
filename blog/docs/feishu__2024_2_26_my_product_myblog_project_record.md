# project_record

# 2024/3/25

## Gihub action中增加的环境变量无法识别

解决需要在jobs上加上环境变量名

<img src="/assets/L7UWbibvXoQSwxxqJg3cl9h5ncj.png" src-width="308" src-height="104" align="center"/>

# 2024/3/26

## github action中提交代码step提示无权限

```sql
**Error: **Error: Pushing to <u>https://github.com/ftyszyx/myblog</u>
[56](https://github.com/ftyszyx/myblog/actions/runs/8423006609/job/23063634395#step:8:59)remote: Permission to ftyszyx/myblog.git denied to github-actions[bot].
```

怀疑是权限问题，

查看permision 文档：https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs

加了permision：

<img src="/assets/OeyXb9q53oWH4axfsLtcdlAgnSf.png" src-width="449" src-height="212" align="center"/>

又有新的报错

```sql
error: failed to push some refs to '<u>https://github.com/ftyszyx/myblog</u>'
```

知道原因了，我搞了两次提交，

<img src="/assets/WBBWbyyrCoepLuxUohucjTq6nBd.png" src-width="499" src-height="282" align="center"/>

导致异常，合并成一次提交，就好了

<img src="/assets/J0E8bmHUlo0idPxWAR0cdMdMnZc.png" src-width="410" src-height="148" align="center"/>

##  <u>pages build and deployment</u> 怎么去掉

Github 上配了pages。会自动加了一个workflow

<img src="/assets/XERKbDeATog68jxZ2SWcmypjnjd.png" src-width="866" src-height="210" align="center"/>

我想定制这一流程，选这个

<img src="/assets/JhhWbKuiqo5SbqxLdspc1Nphnhe.png" src-width="532" src-height="274" align="center"/>

然后把这个workflow右边的run log全删除

<img src="/assets/KED6b8FGIowVszxjxptcw8fGn5d.png" src-width="971" src-height="266" align="center"/>

这个workflow就消失了，世界清静了！

<img src="/assets/ZR5TbQAisoRNJwxx8L8cx0GGn5d.png" src-width="372" src-height="172" align="center"/>

## preview时发现cover图片找不到

看了build的结果，cover中的图片的确是没有

因为cover中的图片写在了vitepress page meta中

有可能vitepress认为这里的资源是无效的，应该只用纯文本

参考：https://vitepress.dev/guide/frontmatter

解决方案是把图片放到（不太好）

https://vitejs.dev/guide/assets.html#the-public-directory

在build end中加hook,自己复制过去

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

## 需要将图片上传到一个图床

