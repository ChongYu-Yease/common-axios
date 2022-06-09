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

// console.log("创建的messageInstance", messageInstance);

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
        messagePosition,
        messageDuration,

        errorStatusKey,
        errorStatusKeyValue,
        dataKey,
        errorMessageContentKey,
        errorMessageDuration,
        errorMessagePosition,
        errorMessageContent,

        successStatusKey,
        successStatusKeyValue,
        successMessageContentKey,
        successMessageDuration,
        successMessagePosition,
        successMessageContent,

        axiosResponseCallback,
    } = axiosResponse.config as AxiosRequestConfigs

    // 执行自定义事件
    if (axiosResponseCallback && typeof axiosResponseCallback == 'function') {
        axiosResponseCallback(axiosResponse)
    }

    // 处理 错误 提示
    if (errorStatusKey && errorStatusKeyValue) {
        // 获取代表失败的值
        const _errorStatusKeyValue = getValueByKeyInOpject(
            errorStatusKey,
            axiosResponse.data
        )

        if (_errorStatusKeyValue == errorStatusKeyValue) {
            if (errorMessageContentKey) {
                // 获取消息内容
                const messageValue = getValueByKeyInOpject(
                    errorMessageContentKey,
                    axiosResponse.data
                )
                messageInstance.createMessage({
                    message: errorMessageContent || messageValue,
                    messageType: 'error',
                    messagePosition: errorMessagePosition || messagePosition || "left",
                    messageDuration: errorMessageDuration || messageDuration || 2000,
                    showClose: false,
                })

            }
        }
    }

    // 处理 成功 提示
    if (successStatusKey && successStatusKeyValue) {

        // 获取代表成功的值
        const _successStatusKeyValue = getValueByKeyInOpject(
            successStatusKey,
            axiosResponse.data
        )

        if (_successStatusKeyValue == successStatusKeyValue) {
            if (successMessageContentKey) {
                // 获取消息内容
                const messageValue = getValueByKeyInOpject(
                    successMessageContentKey,
                    axiosResponse.data
                )


                messageInstance.createMessage({
                    message: successMessageContent || messageValue,
                    messageType: 'success',
                    messagePosition: successMessagePosition || messagePosition || "left",
                    messageDuration: successMessageDuration || messageDuration || 2000,
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
            messagePosition: "center",
        })
    } else {
        messageInstance.createMessage({
            message: error.message,
            messageType: 'error',
            messageDuration: 2000,
            messagePosition: "center",
        })
    }
    return Promise.reject(error)
}
