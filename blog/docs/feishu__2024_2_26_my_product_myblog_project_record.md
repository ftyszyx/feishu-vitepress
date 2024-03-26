# project_record

# 2024/3/25

- [x] Gihub action中增加的环境变量无法识别

解决需要在jobs上加上环境变量名

<img src="/assets/L7UWbibvXoQSwxxqJg3cl9h5ncj.png" src-width="308" src-height="104" align="center"/>

# 2024/3/26

- [ ] 问题1：github action中提交代码step提示无权限

```sql
**Error: **Error: Pushing to <u>https://github.com/ftyszyx/myblog</u>
[56](https://github.com/ftyszyx/myblog/actions/runs/8423006609/job/23063634395#step:8:59)remote: Permission to ftyszyx/myblog.git denied to github-actions[bot].
```

怀疑是权限问题，

查看permision 文档：https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs

- [ ] 问题2：需要将图片上传到一个图床

