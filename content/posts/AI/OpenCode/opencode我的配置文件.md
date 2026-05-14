# opencode我的配置文件

```bash

{

"$schema": "https://opencode.ai/config.json",

"provider": {

"deeprouter": {

"npm": "@ai-sdk/openai-compatible",

"name": "DeepRouter",

"options": {

"baseURL": "https://deeprouter.top/v1",

"apiKey": "sk-c3CeWjgpYYvJRL7nqvF8zQAigyUFZ2n30MfYQaezvdK4SzeI"

},

"models": {

"claude-sonnet-4-6": {

"name": "anthropic/claude-sonnet-4-6"

},

"claude-opus-4-6": {

"name": "anthropic/claude-opus-4-6"

}

}

},

"modelscope": {

"npm": "@ai-sdk/openai-compatible",

"name": "ModelScope",

"options": {

"baseURL": "https://api-inference.modelscope.cn/v1/",

"apiKey": "ms-7268adee-8365-47f8-b8e3-5b3f7533b91e"

},

"models": {

"ZhipuAI/GLM-5": {

"name": "ZhipuAI/GLM-5"

},

"MiniMax/MiniMax-M2.7": {

"name": "MiniMax/MiniMax-M2.7"

},

"deepseek-ai/DeepSeek-V3.2": {

"name": "deepseek-ai/DeepSeek-V3.2"

}

}

}

},

"mcp": {

"chrome-devtools": {

"type": "local",

"command": [

"npx",

"-y",

"chrome-devtools-mcp"

],

"enabled": true

}

}

}

```