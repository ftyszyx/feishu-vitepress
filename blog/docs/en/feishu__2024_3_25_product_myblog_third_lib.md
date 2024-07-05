---
title: Feishu Blog - Configuration of third-party tools
keywords:
  - feishu
  - vitepress
  - Personal blogging
create_time: 1714040918
categories:
  - product
---

# Click on Stats umami

[umami] (https://github.com/ftyszyx/umami) The main function is to count the access data of the website, this system UI design is beautiful, the function is streamlined, very good.

But what I need is to have an API for the website to get the number of visits to the current page.

Although umami has an API, it has two problems:

1. API access requires permission verification (you need to store your own token in the blog, there is a risk of leakage)
2. The data returned by the official API is used for drawing pictures, which is not easy to use

So I forked the project and made changes

Modified github URL: https://github.com/ftyszyx/umami.git

There are two main changes:

## Added API to get website click data

/api/websites/${umami_website_id}/blogpage

To get statistics for each page of the website, this API does not require permissions

The format is as follows:

```yaml
{
    "views": [
        {
            "url_path": "/",
            "num": 11
        },
        {
            "url_path": "/feishu__2023_1_21_skill_vim",
            "num": 4
        }
}
```## At the same time, you need to deal with cross-domain issues

Because my blog is on github, there will be cross-domain problems when visiting other websites, so I simply let it go, and you can also set a specific address at that time.

Modified next.config.js headers are returned

```ts
{
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
```

## Recompile container

Because the code has been modified, you need to compile the container yourself. Refer to the github action configuration of the original project, it is very easy, refer to the modification in github actions for details 

## Precautions

Account logged in for the first time: **admin **Password is**umami**

After entering, you must modify it, otherwise it will become a public toilet.

For specific usage documents, please refer to the official website: [umami documentation](https://umami.is/docs)

# Third-party commenting system artalk

I use [artalk] (https://artalk.js.org/) because I refer to other blog systems that also use this.

But after the ride, this background page is really ugly, please see:

<img src="/assets/SOAmbW19Bouo78xyfENc6CKjnvc.png" src-width="1202" class="m-auto" src-height="532" align="center"/>
The first time I entered the backstage, I didn't know how to use it and was a little confused, please see [official documentation] (https://artalk.js.org/guide/intro.html) for specific use.

## Precautions

After installing the system, you need to change the account password in the configuration file

I started it by dockerIn the /data/artalk.yml directory of the project

Add an account and password

<img src="/assets/TKTObVrHMo6FFJx9Q9kc52NRnSf.png" src-width="471" class="m-auto" src-height="134" align="center"/>

At the same time, docker needs to be restarted