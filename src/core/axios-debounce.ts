import axios, { Canceler } from 'axios'
import * as qs from '../utils/index'
import { AxiosRequestConfigs } from '../index'


export class AxiosDebounce {
    // axios 队列
    private axiosQueue: Map<string, Canceler>

    constructor() {
        // 初始化队列
        this.axiosQueue = new Map()
    }

    // 添加axios 队列
    private handleAddAxiosQueue = (config: AxiosRequestConfigs): void => {
        const key = [
            config.method,
            config.url,
            qs.stringify(config.params),
            qs.stringify(config.data),
        ].join('&')

        config.cancelToken =
            config.cancelToken ||
            new axios.CancelToken((cancel: Canceler) => {
                if (!this.axiosQueue.has(key))
                    // 如果 axiosQueue 中不存在当前请求，则添加进去
                    this.axiosQueue.set(key, cancel)
            })
    }

    // 移除axios 队列 并取消axios 请求
    private handleRemoveAxiosQueue = (config: AxiosRequestConfigs): void => {
        const key = [
            config.method,
            config.url,
            qs.stringify(config.params),
            qs.stringify(config.data),
        ].join('&')

        if (this.axiosQueue.has(key)) {
            // 如果在 axiosQueue 中存在当前请求标识，需要取消当前请求，并且移除
            const cancel: Canceler = this.axiosQueue.get(key)!
            cancel(key)
            this.axiosQueue.delete(key)
            // 如果 axios 被取消 就不再创建遮罩层了
            // config.needLoading = false
        }
    }

    // 路由跳转的时候 清空所有没有请求完成的请求
    private handleClearPending = () => {
        for (const [url, cancel] of this.axiosQueue) {
            cancel(url)
        }
        this.axiosQueue.clear()
    }


    public handleAxiosDebounce(config: AxiosRequestConfigs) {
        // 在请求开始前，对之前的请求做检查取消操作
        this.handleRemoveAxiosQueue(config)
        // 将当前请求添加到 pending 中
        this.handleAddAxiosQueue(config)
    }
}
