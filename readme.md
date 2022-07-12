### common-axios

### 安装方法

```shell
npm install common-axios -S
```
OR
```shell
yarn add common-axios

```

### 设计目的

    1.原生axios使用方法众多，且使用方法不够统一;

    2.axios的拓展需要自己在项目自定义，看起来自由度比较高，但是配置相对比较繁琐;

    3.提供了轻量级自定义创建遮罩层，自定义message组件;

### 快速开始

```js
// 导出创建方法
import { createAxios } from 'common-axios'
```

### common-axios 配置

```js
/* 创建 axios 实例 */
const axios =
    createAxios(/** @see http://www.axios-js.com/zh-cn/docs/#axios-create-config **/)
```

```js

除了上述地址包括配置之外还支持如下字段配置

/* 是否创建遮罩层，默认为false needLoading 和 loadingText 只要配置了一个就可以生成遮罩层 注意：目前遮罩层针对同步请求的时候 遮罩层有闪烁的行为 不建议使用 */
needLoading?: boolean

/* 遮罩层展示的内容 默认为拼命加载中 needLoading 和 loadingText 只要配置了一个就可以生成遮罩层 注意：目前遮罩层针对同步请求的时候 遮罩层有闪烁的行为 不建议使用 */
loadingText?: string

/* 接口防抖 应用场景：同一个接口，同一个请求方式，同样的请求参数发起了多次数据请求，当第一次发起请求的接口没有返回数据之前，后续的接口都会被取消 默认为false */
axiosDebounce?: boolean

/* 是否创建遮罩层，默认为false */
needLoading?: boolean

/* 遮罩层展示的内容 默认为 "拼命加载中" */
loadingText?: string

/* 接口防抖 应用场景：同一个接口，同一个请求方式，同样的请求参数发起了多次数据请求，当第一次发起请求的接口没有返回数据之前，后续的接口都会被取消 */
axiosDebounce?: boolean

{
    /* 代表失败的参数的key */
    errorStatusKey?: never

    /* 代表失败的参数的key所对应的值 */
    errorStatusKeyValue?: never
} | {
    /* 代表失败的参数的key */
    errorStatusKey: string

    /* 代表失败的参数的key所对应的值 */
    errorStatusKeyValue: string | number
}

{
    /* 代表成功的参数的key */
    successStatusKey?: never

    /* 代表成功的参数的key所对应的值 */
    successStatusKeyValue?: never
} | {
    /* 代表成功的参数的key */
    successStatusKey: string

    /* 代表成功的参数的key所对应的值 */
    successStatusKeyValue: string | number
}

/* 消息持续时间 默认为2000毫秒 */
messageDuration?: number

/* 消息提示位置 默认为left */
messagePosition?: 'left' | 'center' | 'right'

/* 错误消息字段所对应的key 默认undefind */
errorMessageContentKey?: string

/* 错误消息持续时间 如果没有配置 且配置了 messageDuration 属性 则执行 messageDuration 的配置  */
errorMessageDuration?: number

/* 错误消息提示的位置 如果没有配置 且配置了 messagePosition 属性 则执行 messagePosition 的配置  */
errorMessagePosition?: 'left' | 'center' | 'right'

/* 错误消息提示的自定义内容 优先级高于 errorMessageContentKey 所对应的内容 */
errorMessageContent?: string

/* 成功消息字段所对应的key 默认undefind */
successMessageContentKey?: string

/* 成功消息持续时间 如果没有配置 且配置了 messageDuration 属性 则执行 messageDuration 的配置 */
successMessageDuration?: number

/* 成功消息提示的位置 如果没有配置 且配置了 messagePosition 属性 则执行 messagePosition 的配置 */
successMessagePosition?: 'left' | 'center' | 'right'

/* 成功消息提示的自定义内容 优先级高于 successMessageContentKey 所对应的内容 */
successMessageContent?: string

/* 代表返回数据的key，支持a.b.c */
/**
 * 例如: 后端返回的数据是
 *
 * {
 *  a: {
 *       b:{
 *          c:"我是c"
 *         }
 *     }
 *  }
 *
*/
dataKey?: string

/* 拦截成功回调 用于全局拦截 */
axiosResponseCallback?: (axiosResponse: AxiosResponse) => void

/* 请求成功回调 用于全局拦截 */
axiosRequestCallback?: (axiosRequestConfigs: AxiosRequestConfigs) => void


```

### 具体使用方法

```js
/* get请求参数位置以及请求配置 【 head 】请求如同*/
const result = await axiosHelpers.get(<url>,<params>,<config>)
```

```js
/* post请求参数位置以及请求配置 【 put 】，【 patch 】请求如同 */
const result = await axiosHelpers.post(<url>,<data>,<config>)
```

```js
/* delete请求参数位置以及请求配置 【 option 】请求如同 */
const result = await axiosHelpers.delete(<url>,<{params:params,data:data}>,<config>)

```

### 注意

    1.目前来说所有的请求第二个参数均是请求参数，第三个参数均是请求配置，如果不需要请求参数，还请用占位符代替！！！


### TODO

    1. common-axios 遮罩层在同步请求的时候的创建逻辑和销毁逻辑还存在bug;

    2. 当用户开启axiosDebounce的时候，在页面离开的时候无法监听路由，在axios取消接口操作;

### 免责声明

    本axios包是自己用业余时间封装打包的，如若您使用了该包，出现问题不负责任
