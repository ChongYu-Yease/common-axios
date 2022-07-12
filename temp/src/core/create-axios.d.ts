import type { AxiosInstance } from 'axios';
import { AxiosRequestConfigs } from '../index';
/**
 * 创建axios实例
 * @param config
 * return axios实例
 */
export declare type CreateAxiosInstance = (config: AxiosRequestConfigs) => AxiosInstance;
/**
 * 创建axios实例
 * @param config
 * return axios实例
 */
export declare const createAxiosInstance: CreateAxiosInstance;
