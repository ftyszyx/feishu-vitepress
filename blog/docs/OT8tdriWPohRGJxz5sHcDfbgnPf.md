---
create_time: 1772415884
edit_time: 1772416971
title: Newapi
categories:
  - other_platform
---


最近在使用各种ai工具，发现有很多的ai模型中转站都是用一个叫newapi的框架，很好奇。研究一下

# 1. 项目地址

https://github.com/QuantumNous/new-api

# 2. 安装

```md
# Clone the project
git clone https://github.com/QuantumNous/new-api.git
cd new-api

# Edit docker-compose.yml configuration
nano docker-compose.yml

# Start the service
docker-compose up -d
```

修改一下配置，使用外部的psgres和redis

```yaml
# New-API Docker Compose Configuration
# 
# Quick Start:
#   1. docker-compose up -d
#   2. Access at http://localhost:3000
#
# Using MySQL instead of PostgreSQL:
#   1. Comment out the postgres service and SQL_DSN line 15
#   2. Uncomment the mysql service and SQL_DSN line 16
#   3. Uncomment mysql in depends_on (line 28)
#   4. Uncomment mysql_data in volumes section (line 64)
#
# ⚠️  IMPORTANT: Change all default passwords before deploying to production!

version: '3.4' # For compatibility with older Docker versions

services:
  new-api:
    image: calciumion/new-api:latest
    container_name: new-api
    restart: always
    command: --log-dir /app/logs
    ports:
      - "20119:3000"
    volumes:
      - ./data:/data
      - ./logs:/app/logs
    environment:
      - SQL_DSN=postgresql://new-api:123456@1panel_ps:5432/new-api # ⚠️ IMPORTANT: Change the password in production! 
      - REDIS_CONN_STRING=redis://:mypassword@1panel_redis:6379
      - TZ=Asia/Shanghai
      - ERROR_LOG_ENABLED=true # 是否启用错误日志记录 (Whether to enable error log recording)
      - BATCH_UPDATE_ENABLED=true  # 是否启用批量更新 (Whether to enable batch update)
#      - STREAMING_TIMEOUT=300  # 流模式无响应超时时间，单位秒，默认120秒，如果出现空补全可以尝试改为更大值 （Streaming timeout in seconds, default is 120s. Increase if experiencing empty completions）
#      - SESSION_SECRET=random_string  # 多机部署时设置，必须修改这个随机字符串！！ （multi-node deployment, set this to a random string!!!!!!!）
#      - SYNC_FREQUENCY=60  # Uncomment if regular database syncing is needed
#      - GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX  # Google Analytics 的测量 ID (Google Analytics Measurement ID)
#      - UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx  # Umami 网站 ID (Umami Website ID)
#      - UMAMI_SCRIPT_URL=https://analytics.umami.is/script.js  # Umami 脚本 URL，默认为官方地址 (Umami Script URL, defaults to official URL)
    healthcheck:
      test: ["CMD-SHELL", "wget -q -O - http://localhost:3000/api/status | grep -o '\"success\":\\s*true' || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks:
      - 1panel-network
networks:
  1panel-network:
    external: true
```

