import {
    AxiosRequestCallback,
    AxiosErrorCallback,
} from '../../types/axios-callback.type'

// 修改 history.push 和 history.replace 方法
import "./watch-routing"



// axios  防抖
import { AxiosDebounce } from './axios-debounce'

// 创建防抖实例
const axiosDebounceInstance = new AxiosDebounce()


import { Mask } from './create-mask'

// 遮罩层实例
const maskInstance = new Mask()

import { Message } from './create-message'

// 创建message实例
const messageInstance = new Message()

import { getValueByKeyInOpject } from "../utils/index"

/**
 * 请求前成功回调
 * @param config
 * @returns config
 */
export const axiosRequestCallback: AxiosRequestCallback = (config) => {

    const {
        needLoading,
        loadingText,
        axiosDebounce,
        contentType,
        axiosRequestCallback,
    } = config

    if (axiosRequestCallback && typeof axiosRequestCallback === 'function') {
        axiosRequestCallback(config)
    }

    // 先判断是否需要防抖 如果需要 需要防抖的话 如果接口被取消 就不再需要遮罩层
    if (axiosDebounce) {

        axiosDebounceInstance.handleRemoveAxiosQueue(config) // 在请求开始前，对之前的请求做检查取消操作
        axiosDebounceInstance.handleAddAxiosQueue(config) // 将当前请求添加到 pending 中

        // 如果开启了 axios 防抖 当离开当前页面的时候 就需要取消当前所有的请求
        // 监听 hash 模式的路由
        window.addEventListener('hashchange', (event) => {
            console.log("hashchange", event);
        })

        // 监听 history 模式的 back、forward、go 路由跳转方法
        window.addEventListener('popstate', function (event) {
            console.log('监听back/forward/go', event);
        })

        // 监听 history 模式的 pushState 路由跳转方法
        window.addEventListener('pushState', function (e) {
            console.log('change pushState', e);
        })

        // 监听 history模式的 replaceState 路由跳转方法
        window.addEventListener('replaceState', function (e) {
            console.log('change replaceState', e);
        })
    }

    // 创建遮罩层
    if (needLoading || loadingText) {
        maskInstance.createLoading(config)
    }

    // 修改content-type
    if (contentType) {
        config.headers = {
            ...config.headers,
            'Content-Type': contentType,
        }
    }

    return config
}

/**
 * 请求前错误回调
 * @param error 错误信息
 * @returns error
 */
export const axiosRequestErrorCallback: AxiosErrorCallback = (error) => {

    return Promise.reject(error)
}


