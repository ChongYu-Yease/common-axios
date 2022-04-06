import { AxiosMethods, AxiosRequestConfigs } from '../types/index.types'
import { AxiosInstance, AxiosResponse } from 'axios'

type CreateParamsInParamsHelper = (
    axiosInstance: AxiosInstance,
    method: AxiosMethods
) => (url: string, params?: any, config?: AxiosRequestConfigs) => Promise<any>

/**
 * 调用参数为params的axios请求
 * @param axiosInstance axios实例
 * @param method 请求方法
 * @returns (url: string, params?: any, config?: AxiosRequestConfigs)=> Promise<AxiosResponse<T>>
 */
export const createParamsInParamsHelper: CreateParamsInParamsHelper =
    (axiosInstance, method) => (url, params?, config?) =>
        axiosInstance[method](url, {
            params,
            ...config,
        }).catch((error) => {
            return error
        })

type CreateParamsInParamsOrDataHelper = (
    axiosInstance: AxiosInstance,
    method: AxiosMethods
) => (url: string, params?: any, config?: AxiosRequestConfigs) => Promise<any>

/**
 * 请求参数在pramas字段或者在data字段 的axios请求
 * @param axiosInstance axios实例
 * @param method 请求方法
 * @returns (url: string, params?: any, config?: AxiosRequestConfigs)=> Promise<AxiosResponse<T>>
 */
export const createParamsInParamsOrDataHelper: CreateParamsInParamsOrDataHelper =
    (axiosInstance, method) => {
        return (url, params, config) => {
            return axiosInstance[method](url, {
                ...params,
                ...config,
            }).catch((error) => {
                return error
            })
        }
    }

type CreateParamsInDataHelper = (
    axiosInstance: AxiosInstance,
    method: AxiosMethods
) => (url: string, params?: any, config?: AxiosRequestConfigs) => Promise<any>

/**
 * 请求参数在data字段的axios请求
 * @param axiosInstance axios 实例
 * @param method 请求方法
 * @returns (url: string, params?: any, config?: AxiosRequestConfigs)=> Promise<AxiosResponse<T>>
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
