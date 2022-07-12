import { AxiosMethods } from '../index';
import { AxiosInstance } from 'axios';
import { ParamsInParamsHelper, ParamsInParamsOrDataHelper, ParamsInDataHelper } from '../index';
/**
 * 创建参数在params的声明
 * axiosInstance: AxiosInstance,
 * method: AxiosMethods
 * return: ParamsInParamsHelper
 */
export declare type CreateParamsInParamsHelper = (axiosInstance: AxiosInstance, method: AxiosMethods) => ParamsInParamsHelper;
/**
* 创建参数在params或者data字段中的声明
* axiosInstance: AxiosInstance
* method: AxiosMethods
* return: ParamsInParamsOrDataHelper
*/
export declare type CreateParamsInParamsOrDataHelper = (axiosInstance: AxiosInstance, method: AxiosMethods) => ParamsInParamsOrDataHelper;
/**
 * 创建参数在data字段中的声明
 * axiosInstance: AxiosInstance
 * method: AxiosMethods
 * return: ParamsInDataHelper
 */
export declare type CreateParamsInDataHelper = (axiosInstance: AxiosInstance, method: AxiosMethods) => ParamsInDataHelper;
/**
 * 调用参数为params的axios请求
 * @param axiosInstance axios实例
 * @param method 请求方法
 * @returns (url: string, params?: any, config?: AxiosRequestConfigs)=> Promise<AxiosResponse<A>>
 */
export declare const createParamsInParamsHelper: CreateParamsInParamsHelper;
/**
 * 请求参数在pramas字段或者在data字段 的axios请求
 * @param axiosInstance axios实例
 * @param method 请求方法
 * @returns (url: string, params?: any, config?: AxiosRequestConfigs)=> Promise<AxiosResponse<A>>
 */
export declare const createParamsInParamsOrDataHelper: CreateParamsInParamsOrDataHelper;
/**
 * 请求参数在data字段的axios请求
 * @param axiosInstance axios 实例
 * @param method 请求方法
 * @returns (url: string, params?: any, config?: AxiosRequestConfigs)=> Promise<AxiosResponse<A>>
 */
export declare const createParamsInDataHelper: CreateParamsInDataHelper;
