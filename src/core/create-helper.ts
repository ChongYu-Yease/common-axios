
import { AxiosMethods, } from '@/index'
import { AxiosInstance, } from 'axios'
import {
    ParamsInParamsHelper,
    ParamsInParamsOrDataHelper,
    ParamsInDataHelper,
} from '../index'


/**
 * 创建参数在params的声明
 * axiosInstance: AxiosInstance,
 * method: AxiosMethods
 * return: ParamsInParamsHelper
 */
export type CreateParamsInParamsHelper = (
    axiosInstance: AxiosInstance,
    method: AxiosMethods
) => ParamsInParamsHelper



/**
* 创建参数在params或者data字段中的声明
* axiosInstance: AxiosInstance
* method: AxiosMethods
* return: ParamsInParamsOrDataHelper
*/
export type CreateParamsInParamsOrDataHelper = (
    axiosInstance: AxiosInstance,
    method: AxiosMethods
) => ParamsInParamsOrDataHelper



/**
 * 创建参数在data字段中的声明
 * axiosInstance: AxiosInstance
 * method: AxiosMethods
 * return: ParamsInDataHelper
 */
export type CreateParamsInDataHelper = (
    axiosInstance: AxiosInstance,
    method: AxiosMethods
) => ParamsInDataHelper



/**
 * 调用参数为params的axios请求
 * @param axiosInstance axios实例
 * @param method 请求方法
 * @returns (url: string, params?: any, config?: AxiosRequestConfigs)=> Promise<AxiosResponse<A>>
 */
export const createParamsInParamsHelper: CreateParamsInParamsHelper =
    (axiosInstance, method) => (url, params?, config?) =>
        axiosInstance[method](url, {
            params,
            ...config,
        }).catch((error) => error)

/**
 * 请求参数在pramas字段或者在data字段 的axios请求
 * @param axiosInstance axios实例
 * @param method 请求方法
 * @returns (url: string, params?: any, config?: AxiosRequestConfigs)=> Promise<AxiosResponse<A>>
 */
export const createParamsInParamsOrDataHelper: CreateParamsInParamsOrDataHelper =
    (axiosInstance, method) => {
        return (url, params, config) => {
            return axiosInstance[method](url, {
                ...params,
                ...config,
            }).catch((error) => error)
        }
    }



/**
 * 请求参数在data字段的axios请求
 * @param axiosInstance axios 实例
 * @param method 请求方法
 * @returns (url: string, params?: any, config?: AxiosRequestConfigs)=> Promise<AxiosResponse<A>>
 */
export const createParamsInDataHelper: CreateParamsInDataHelper = (
    axiosInstance,
    method
) => {
    return (url, data, config) => {
        return axiosInstance[method](url, data, {
            ...config,
        }).catch((error) => error)
    }
}
