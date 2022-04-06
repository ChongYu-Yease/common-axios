import axios from 'axios'
import { CreateAxiosInstance } from '../types/create-axios.type'
/**
 * 创建axios实例
 * @param config
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
