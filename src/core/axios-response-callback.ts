import {
    AxiosErrorCallback,
    AxiosResponseCallback,
} from '../../types/axios-callback.type'

// 修改 history.push 和 history.replace 方法
import "./watch-routing"

import { AxiosRequestConfigs } from '../../types/index.types'

import axios from 'axios'

import { Mask } from './create-mask'

// 遮罩层实例
const maskInstance = new Mask()

import { Message } from './create-message'

// 创建message实例
const messageInstance = new Message()

import { getValueByKeyInOpject } from "../utils/index"


/**
 *
 * @param axiosResponse 请求返回成功回调
 * @returns
 */
export const axiosResponseCallback: AxiosResponseCallback = (axiosResponse) => {
    // 关闭遮罩层
    maskInstance.removeLoading(axiosResponse.config as AxiosRequestConfigs)

    // 获取配置
    const {
        successKey, successKeyValue, errorKey, errorKeyValue, dataKey, messageKey, axiosResponseCallback,
    } = axiosResponse.config as AxiosRequestConfigs

    // 执行自定义事件
    if (axiosResponseCallback && typeof axiosResponseCallback == 'function') {
        axiosResponseCallback(axiosResponse)
    }

    // 处理 错误 提示
    if (errorKey && errorKeyValue) {
        // 获取代表失败的值
        const _errorKeyValue = getValueByKeyInOpject(
            errorKey,
            axiosResponse.data
        )

        if (_errorKeyValue == errorKeyValue) {
            if (messageKey) {
                // 获取消息内容
                const messageValue = getValueByKeyInOpject(
                    messageKey,
                    axiosResponse.data
                )
                messageInstance.createMessage({
                    message: `${messageValue}`,
                    messageType: 'error',
                    center: false,
                    // messageDuration: 2000,
                    messageDuration: 2000,
                    showClose: false,
                })
            }
        }
    }

    // 处理 成功 提示
    if (successKey && successKeyValue) {

        // 获取代表失败的值
        const _successKeyValue = getValueByKeyInOpject(
            successKey,
            axiosResponse.data
        )

        if (_successKeyValue == successKeyValue) {
            if (messageKey) {
                // 获取消息内容
                const messageValue = getValueByKeyInOpject(
                    messageKey,
                    axiosResponse.data
                )
                messageInstance.createMessage({
                    message: `${messageValue}`,
                    messageType: 'success',
                    center: false,
                    // messageDuration: 2000,
                    messageDuration: 2000,
                    showClose: false,
                })
            }
        }
    }

    // 返回数据
    if (dataKey) {
        return Promise.resolve(
            getValueByKeyInOpject(dataKey, axiosResponse.data)
        )
    } else {
        return Promise.resolve(axiosResponse.data)
    }


}

/**
 *
 * @param axiosResponse 请求返回错误回调
 * @returns
 */
export const axiosResponseErrorCallback: AxiosErrorCallback = (error) => {
    if (axios.isCancel(error)) {
        messageInstance.createMessage({
            message: `检测到${error.message}多次重复请求，接口已取消`,
            messageType: 'error',
            messageDuration: 2000,
            center: true,
        })
    } else {
        messageInstance.createMessage({
            message: error.message,
            messageType: 'error',
            messageDuration: 2000,
            center: true,
        })
    }
    return Promise.reject(error)
}
