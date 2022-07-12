import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { AxiosRequestConfigs } from '../index'
/**
 * 创建axios实例
 * @param config
 * return axios实例
 */
export type CreateAxiosInstance = (config: AxiosRequestConfigs) => AxiosInstance


/**
 * 创建axios实例
 * @param config
 * return axios实例
 */
export const createAxiosInstance: CreateAxiosInstance = (config) => {
    return axios.create({
        ...config,
        //默认开启携带cookie
        withCredentials:
            config && config.withCredentials !== undefined
                ? config.withCredentials
                : true,
    })
}
