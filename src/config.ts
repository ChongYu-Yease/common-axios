import axios, { Canceler } from 'axios'
import qs from 'qs'
import { LogMap, HandleAddResponseLog, HandleRemoveResponseLog } from './types'

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const logMap: LogMap = new Map()
/**
 * 添加请求
 * @param  config axios的配置
 */
export const handleAddResponseLog: HandleAddResponseLog = (config) => {
    const key = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data),
    ].join('&')
    config.cancelToken =
        config.cancelToken ||
        new axios.CancelToken((cancel: Canceler) => {
            if (!logMap.has(key))
                // 如果 logMap 中不存在当前请求，则添加进去
                logMap.set(key, cancel)
        })
}

/**
 * 移除请求
 * @param {AxiosRequestConfigs} config
 */
export const handleRemoveResponseLog: HandleRemoveResponseLog = (config) => {
    const key = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data),
    ].join('&')

    if (logMap.has(key)) {
        // 如果在 logMap 中存在当前请求标识，需要取消当前请求，并且移除
        const cancel: Canceler = logMap.get(key)!
        cancel(key)
        logMap.delete(key)
        //如果 axios 被取消 就不再创建遮罩层了
        config.needLoading = false
    }
}

/**
 * 清空 logMap 中的请求（在路由跳转时调用）
 */
export const handleClearPending = () => {
    // 路由跳转的时候 清空所有没有请求完成的请求
    for (const [url, cancel] of logMap) {
        cancel(url)
    }
    logMap.clear()
}
