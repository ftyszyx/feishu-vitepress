---
create_time: 1763344036
edit_time: 1763374001
title: Coze
categories:
  - skill
---


# 1. coze_studio

https://github.com/coze-dev/coze-studio

启动

```yaml
docker compose -f ./docker/docker-compose.yml up
```

 

### 1.1.1 步骤三：注册账号

访问 `http://localhost:8888/sign` 输入用户名、密码点击注册按钮。

### 1.1.2 步骤三：配置模型

配置模型，`http://localhost:8888/admin/#model-management` 新增模型。

# 2. coze_loop

  protocol_config:

```yaml
base_url: ""         # 默认为https://ark.cn-beijing.volces.com/api/v3/，若使用Byteplus ModelArk，请指定为https://ark.ap-southeast.bytepluses.com/api/v3/api_key: "*727e****" # 方舟模型 API Key，中国境内用户参考火山方舟文档 https://www.volcengine.com/docs/82379/1541594；非中国境内的用户可参考 BytePlus ModelArk 文档 https://docs.byteplus.com/en/docs/ModelArk/1361424?
utm_source=github&utm_medium=readme&utm_campaign=coze_open_sourcemodel: "ep-****"     # 方舟模型Endpoint ID，中国境内用户参考火山方舟文档 https://www.volcengine.com/docs/82379/1099522；非中国境内的用户可参考 BytePlus ModelArk 文档 https://docs.byteplus.com/en/docs/ModelArk/model_id?utm_source=github&utm_medium=readme&utm_campaign=coze_open_sourceparam_config:
```

