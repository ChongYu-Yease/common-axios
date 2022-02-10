### common-axios

### 安装方法

```sh
npm install common-axios -S

yarn add simple-axios
```

### 设计目的

    1.统一所有请求方法的入参规则, 第一个参数为 url, 第二个参数为携带的请求参数, 第三个参数为请求配置项,
    2.除了原生的axiosConfig之外，另外还动态支持自定义配置
    3.自定义创建遮罩层，遮罩层的展示内容

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
/* 是否创建遮罩层，默认为false */
needLoading?: boolean

/* 遮罩层展示的内容 需要needLoading:true */
loadingText?: string

/* 接口防抖 应用场景：同一个接口，同一个请求方式，同样的请求参数发起了多次数据请求，当第一次发起请求的接口没有返回数据之前，后续的接口都会被取消 默认为false */
axiosDebounce?: boolean

/* 代表成功的参数的key 默认为undefined */
successKey?: string

/* 代表成功的参数的key所对应的值 默认为undefined */
successKeyValue?: string

/* 请求方式的contentType 默认为'application/json' */
contentType?:
    | 'application/json'
    | 'application/x-www-form-urlencoded'
    | ' multipart/form-data'
```

### 具体使用方法

```js
/* get请求参数位置以及请求配置 head请求如同*/
const result = await axiosHelpers.get(<url>,<params>,<config>)
```

```js
/* post请求参数位置以及请求配置 put，patch请求如同 */
const result = await axiosHelpers.post(<url>,<data>,<config>)
```

```js
/* delete请求参数位置以及请求配置 option请求如同 */
const result = await axiosHelpers.delete(<url>,<{params:params,data:data}>,<config>)

```

### 注意

    1.目前来说所有的请求第二个参数均是请求参数，第三个参数均是请求配置，如果不需要请求参数，还请用占位符代替！！！

### 抛砖引玉

    1.本包使用ts+rollup封装打包的，如果您有兴趣您也可以贡献自己的代码

### 免责声明

    本axios包是自己用业余时间封装打包的，如若您使用了该包，出现问题皆有自己承担
