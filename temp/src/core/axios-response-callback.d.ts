import { AxiosResponse } from 'axios';
import { AxiosRequestConfigs } from '../index';
/**
 * axios 请求后成功的回调
 */
export declare type AxiosResponseCallback = <T = any, R = AxiosResponse<T>>(axiosResponse: AxiosResponse) => Promise<R> | Promise<T>;
/**
 * axios 请求配置回调
 */
export declare type AxiosRequestCallback = (config: AxiosRequestConfigs) => AxiosRequestConfigs;
/**
 * axios 请求前 请求后的错误回调 的声明
 */
export declare type AxiosErrorCallback = (error: Error) => Promise<Error>;
/**
 *
 * @param axiosResponse 请求返回成功回调
 * @returns
 */
export declare const axiosResponseCallback: AxiosResponseCallback;
/**
 *
 * @param axiosResponse 请求返回错误回调
 * @returns
 */
export declare const axiosResponseErrorCallback: AxiosErrorCallback;
