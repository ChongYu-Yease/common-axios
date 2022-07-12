import { AxiosResponse } from 'axios';
import type { AxiosRequestConfigs } from '../index';
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
 * 请求前成功回调
 * @param config
 * @returns config
 */
export declare const axiosRequestCallback: AxiosRequestCallback;
/**
 * 请求前错误回调
 * @param error 错误信息
 * @returns error
 */
export declare const axiosRequestErrorCallback: AxiosErrorCallback;
