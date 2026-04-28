---
create_time: 1777302284
edit_time: 1777302323
title: Openai
categories:
  - skill
---


 已经用 opencli browser 实测了一次。结论是：ChatGPT Web 生图不是直接打公开的 gpt-image-1 /v1/images/generations，而是走 ChatGPT 内部对话流，把“生图”当作一次 chat turn + 内部异步图片任务。

我把 token、签名、user id、文件签名都打码了，关键流程是：

```bash
1. POST /backend-api/f/conversation/prepare
   -> 返回 conduit_token，用于后续对话/推送通道准备

2. POST /backend-api/f/conversation
   Content-Type: application/json
   Response: text/event-stream

   请求体核心：
   {
     "action": "next",
     "messages": [{
       "author": {"role": "user"},
       "content": {
         "content_type": "text",
         "parts": ["请再生成一张图片：..."]
       }
     }],
     "conversation_id": "...",
     "parent_message_id": "...",
     "model": "gpt-5-3",
     "client_prepare_state": "success",
     "conversation_mode": {"kind": "primary_assistant"},
     "supports_buffering": true,
     "supported_encodings": ["v1"]
   }

3. SSE 里先返回一个内部 assistant/tool turn
   - assistant message recipient 是一个内部工具名
   - content 里有 {"skipped_mainline": true}
   - 随后返回一个 tool message/card：正在处理图片
   - metadata 里出现：
     image_gen_task_id
     image_gen_multi_stream: true
     block_interruption: true
     permissions: notification/image_gen

4. SSE 很快结束
   事件里有：
   - conversation_async_status
   - message_marker
   - server_ste_metadata
   - message_stream_complete
   - [DONE]

   其中 server_ste_metadata 里能看到：
   turn_use_case: "image gen"
   model_slug: "gpt-5-3"
   resume_with_websockets: true

5. 图片任务异步完成后，前端拿到 file_id
   然后请求：
   GET /backend-api/files/download/file_...?conversation_id=...&inline=false

   返回：
   {
     "status": "success",
     "download_url": "/backend-api/estuary/content?id=file_...&sig=...",
     "file_name": "...png",
     "file_size_bytes": ...
   }

6. 浏览器最终加载图片：
   GET /backend-api/estuary/content?id=file_...&sig=...
   Content-Type: image/png

7. 再 POST /backend-api/conversation/<conversation_id>/async-status
   -> {"status":"OK"}
```

