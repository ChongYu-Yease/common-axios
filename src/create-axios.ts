import axios from 'axios'
import { CreateAxiosInstance } from './types'
/**
 * 创建axios实例
 * @param config
 */
export const createAxiosInstance: CreateAxiosInstance = (config) => {
    return axios.create({
        ...config,
        withCredentials:
            config && config.withCredentials !== undefined
                ? config.withCredentials
                : true,
    })
}
