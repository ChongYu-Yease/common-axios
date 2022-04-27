import { AxiosInstance } from 'axios'
import { AxiosRequestConfigs } from './index.types'
/**
 * 创建axios实例
 * @param config
 * return axios实例
 */
export type CreateAxiosInstance = (config: AxiosRequestConfigs) => AxiosInstance
