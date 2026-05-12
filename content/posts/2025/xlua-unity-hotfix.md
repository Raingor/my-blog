---
title: "xLua：腾讯 Unity Lua 热更新框架"
date: 2025-05-12T00:00:00+08:00
draft: false
tags: ["Unity", "Lua", "热更新", "游戏开发"]
---

[xLua](https://github.com/Tencent/xLua) 是腾讯开源的 Unity Lua 热更新框架，让开发者可以在不重新编译 Unity 工程的情况下更新游戏逻辑。

## 核心优势

- **原生性能**：Lua 与 C# 相互调用几乎无性能损耗
- **热补丁**：运行时替换 C# 方法实现
- **通用解决方案**：不依赖特定引擎架构
- **丰富示例**：提供大量示例工程

## 技术架构

xLua 实现了 Lua 与 C# 的高效互调：

```csharp
// C# 调用 Lua
LuaEnv luaenv = new LuaEnv();
luaenv.DoString("print('Hello xLua')");

// Lua 调用 C#
local GameObject = CS.UnityEngine.GameObject
local go = GameObject('test')
```

## 热补丁示例

```csharp
[Hotfix]
public class HotfixTest
{
    public static int Add(int a, int b)
    {
        return a + b; // 可在 Lua 中覆盖
    }
}
```

## 典型应用场景

- 游戏逻辑热更新
- 运营活动快速迭代
- A/B 测试代码实验

[View on GitHub →](https://github.com/Tencent/xLua)