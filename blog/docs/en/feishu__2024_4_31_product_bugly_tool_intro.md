---
title: Description of the bugly analysis tool
tags:
  - develop
create_time: 1717119031
categories:
  - product
---

# Background

Bugly is Tencent's tool, which is very useful in projects as an excellent product for collecting flashback reports. And he's free.

bugly has its own backend, and the functions of this backend are also very powerful: there are flashback summarization, stack restore, flashback classification, and flashback search

But there are also drawbacks:

1. The data is not local, and the data has to be pulled from the bugly background again every time you search, which is very slow. There needs to be a caching mechanism

2. There are often problems with stack restoration, and it often happens that the stack table has been uploaded but the stack cannot be restored. (Unreliable)

3. There is also a bit of a problem with crash categorization, which is not the same category from the stack, but it will also be classified into one category. It's not clear what bugly classifies.

4. The custom fields of the search function are limited.

# Product features

1. Integrated login bugly function

2. The data collection function can collect the corresponding data according to the time, product, and package version selected by the user, and save it locally for easy analysis

3. Stack restore function: Automatically restore the stack and save it according to the locally configured package symbol table

4. Stack classification, classify the flashback information according to the restored stack

5. Users can comment on the stack information

6. Provide advanced search function,

# Development framework

target