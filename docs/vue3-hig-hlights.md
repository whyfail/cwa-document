---
sidebar_position: 4
---

# Vue3 模板核心

## 兼容性

- 浏览器语法兼容性以 `@vitejs/plugin-legacy` 配置为准；
- CSS 兼容性，项目中都采用了 `autoprefixer` 作为自动添加各个浏览器 CSS 前缀，配置统一是在 `vite.config.js` 中配置；

## 页面适配方案

- 移除适配方法在[这里](/blog/2023-10-17)
- 统一采用的都用的是：`postcss-pxtorem` 这个插件来实现 `px` 转 `rem` 来做页面适配方案；
- 改变窗口大小时重新设置 `rem` 的方法是在 [src/common/common-set-rem.js](https://gitee.com/whyfail/vite_react_init/blob/master/src/common/common-set-rem.js) 文件中，然后在 [src/App.jsx](https://gitee.com/whyfail/vite_react_init/blob/master/src/App.jsx) 中调用；

## 方便开发的工具

- `vite-code-inspector-plugin`：只需单击一下即可直接从浏览器跳转到本地 IDE 代码 Vue 组件的插件，按 window(`alt + shift`)\mac(`option + shift`) 激活插件，然后就可以点击组件进行跳转到 IDE 的代码处；

```js
import { defineConfig } from "vite"
import { ViteCodeInspectorPlugin } from "vite-code-inspector-plugin"

export default defineConfig({
  base: "./",
  plugins: [ViteCodeInspectorPlugin()],
})
```

- `unplugin-element-plus`:为 Element Plus 按需引入样式 插件；

```js
import { defineConfig } from "vite"
import ElementPlus from "unplugin-element-plus/vite"

export default defineConfig({
  base: "./",
  plugins: [
    ElementPlus({
      useSource: true,
    }),
  ],
})
```

- `Pina`：目前 vue3 最流行的全局状态管理库，此外还添加了日志打印功能；

```js
/**
 * stores状态模块化
 */
import { createPinia } from "pinia"
import useUserStore from "./storeUser.js"

// 创建全局状态
export const pinia = createPinia()

// 全局状态日志查看
pinia.use(({ store }) => {
  store.$subscribe((e) => {
    // 在存储变化的时候执行
    console.debug(
      `%c${new Date().toLocaleString()}：${e.storeId} 中的 ${e.events.key}状态改变：`,
      "background-color: #00BCD4; padding: 6px 12px; border-radius: 2px; font-size: 14px; color: #fff; font-weight: 600;"
    )
    console.debug(`   `, e)
  })
  store.$onAction((e) => {
    // 在 action 的时候执行
    console.debug(
      `%c${new Date().toLocaleString()}：${e.name} 方法调用：`,
      "background-color: #2196f3; padding: 6px 12px; border-radius: 2px; font-size: 14px; color: #fff; font-weight: 600;"
    )
    console.debug(`   `, e)
  })
})

export default function useStore() {
  return {
    storeUser: useUserStore(),
  }
}
```

```js
import { defineStore } from "pinia"

const useUserStore = defineStore({
  id: "storeUser",
  state: () => ({
    number: 0,
  }),

  actions: {
    addNumber() {
      this.number += 1
    },
    subtractNumber() {
      this.number -= 1
    },
  },
})

export default useUserStore
```

```vue
<script setup>
import useStore from "../stores"

const { storeUser } = useStore()
</script>

<template>
  <div>
    <div>{{ storeUser.number }}</div>
    <div>
      <button @click="storeUser.addNumber">+</button>
      <button @click="storeUser.subtractNumber">-</button>
    </div>
  </div>
</template>
```
