---
sidebar_position: 2
---

# React 项目亮点

## 兼容性

- 浏览器语法兼容性以 `@vitejs/plugin-legacy` 配置为准；
- CSS 兼容性，项目中都采用了 `autoprefixer` 作为自动添加各个浏览器 CSS 前缀，配置统一是在 `vite.config.js` 中配置；
  - 在**React**项目中，因为采用了 `react-jss` 作为样式库，所以另外添加了 `react-jss` 的 `jss-plugin-vendor-prefixer` 插件，作为浏览器 CSS 样式兼容处理，配置位置在：[src/common/common-jss-plugin.js](https://gitee.com/whyfail/vite_react_init/blob/master/src/common/common-jss-plugin.js)；

## 页面适配方案

- 统一采用的都用的是：`postcss-pxtorem` 这个插件来实现 `px` 转 `rem` 来做页面适配方案；
  - 在**React**项目中，因为采用了 `react-jss` ，是 `CSS-In-JS` 方案，所以无法采用 `postcss-pxtorem` 来实现单位转换，这里我手写了个单位转换插件，并挂载到了 `react-jss` 上，插件位置在：[src/common/common-jss-plugin.js](https://gitee.com/whyfail/vite_react_init/blob/master/src/common/common-jss-plugin.js)
- 改变窗口大小时重新设置 `rem` 的方法是在 [src/common/common-set-rem.js](https://gitee.com/whyfail/vite_react_init/blob/master/src/common/common-set-rem.js) 文件中，然后在 [src/App.jsx](https://gitee.com/whyfail/vite_react_init/blob/master/src/App.jsx) 中调用；
  - 因为项目中采用的 UI 库是 `antd5` ，而 `antd5` 库采用的也是 `CSS-In-JS` 方案，所以`postcss-pxtorem` 这个插件也是没有办法修改它的样式单位，所以在 [src/App.jsx](https://gitee.com/whyfail/vite_react_init/blob/master/src/App.jsx) 中进行手动修改 `antd5` 样式单位。

## 方便开发的工具

- `react-dev-inspector`：只需单击一下即可直接从浏览器跳转到本地 IDE 代码 React 组件，配置是在 [src/main.jsx](https://gitee.com/whyfail/vite_react_init/blob/master/src/main.jsx) 文件中，运行项目后，按住`control + y` 选中元素点击，即可打开 IDE 对应的代码；
- `ahooks`: 由阿里出品的一套高质量可靠的 React Hooks 库，里面包含了非常多实用的 `Hooks` ,其中 [useRequest](https://ahooks.js.org/zh-CN/hooks/use-request/index) 是一个强大的异步数据管理的 Hooks，React 项目中的网络请求场景使用 `useRequest` 就够了；
- `axios`: 请求库，在[src/apis/index.js](https://gitee.com/whyfail/vite_react_init/blob/master/src/apis/index.js)中做了简单的配置，并在[src/apis/api_user.js](https://gitee.com/whyfail/vite_react_init/blob/master/src/apis/api_user.js)中提供了实用示例；
- `mobx`: React 项目中采用了 `Mobx` 作为全局状态管理库，使用起来也非常的简单易用，在[src/store/storeOther.js](https://gitee.com/whyfail/vite_react_init/blob/master/src/store/storeOther.js) 文件中给出了示例状态模块化，统一由[src/store/index.js](https://gitee.com/whyfail/vite_react_init/blob/master/src/store/index.js) 文件中导出使用，在 [src/components/index.jsx](https://gitee.com/whyfail/vite_react_init/blob/master/src/components/index.jsx)文件中给出了使用示例，注意点就是一定要用 `observer` 来包括组件，达到组件响应式。
- `react-jss`：一个 `CSS=IN-JSS` 库，因为 React 没有像 Vue 中的 `<style scoped>` 语法，没法隔离样式，所以采用了 `react-jss` 库来实现同一文件中写样式并样式隔离，在 [src/components/index.jsx](https://gitee.com/whyfail/vite_react_init/blob/master/src/components/index.jsx) 文件中给出了示例代码。