import { AxiosRequestConfig } from 'axios';
import { AxiosResponse } from 'axios';

export declare interface AxiosHelpers {
    get: ParamsInParamsHelper;
    head: ParamsInParamsHelper;
    options: ParamsInParamsOrDataHelper;
    delete: ParamsInParamsOrDataHelper;
    put: ParamsInDataHelper;
    post: ParamsInDataHelper;
    patch: ParamsInDataHelper;
}

/**
 * axios的请求方法
 */
export declare type AxiosMethods = 'get' | 'post' | 'put' | 'delete' | 'head' | 'put' | 'patch' | 'options';

/**
 * 自定义 axios 的配置
 * 添加 needLoading 是否需要遮罩层
 * 添加 loadingText 遮罩层展示的内容
 * 添加 axiosDebounce 接口是否防抖
 * 添加 contentType 接口的请求方式
 * 添加 axiosResponseCallback 代表响应拦截器成功的回调
 * 添加 axiosRequestCallback 代表请求拦截器成功的回调
 */
export declare type AxiosRequestConfigs = AxiosRequestConfig & successStatusKeyAndsuccessStatusKeyValue & errorStatusKeyAnderrorStatusKeyValue & AxiosRequestContentType & {
    needLoading?: boolean;
    loadingText?: string;
    axiosDebounce?: boolean;
    messageDuration?: number;
    messagePosition?: 'left' | 'center' | 'right';
    errorMessageContentKey?: string;
    errorMessageDuration?: number;
    errorMessagePosition?: 'left' | 'center' | 'right';
    errorMessageContent?: string;
    successMessageContentKey?: string;
    successMessageDuration?: number;
    successMessagePosition?: 'left' | 'center' | 'right';
    successMessageContent?: string;
    /**
     * 例如: 后端返回的数据是
     *
     * {
     *  a: {
     *       b:{
     *          c:"我是c"
     *         }
     *     }
     *  }
     *
     */
    dataKey?: string;
    axiosResponseCallback?: (axiosResponse: AxiosResponse) => void;
    axiosRequestCallback?: (axiosRequestConfigs: AxiosRequestConfigs) => void;
};

export declare type AxiosRequestContentType = {
    contentType?: 'application/json' | 'application/x-www-form-urlencoded' | ' multipart/form-data';
};

export declare type CreateAxios = (axiosRequestConfigs: AxiosRequestConfigs) => AxiosHelpers;

/**
 * @param AxiosRequestConfigs
 */
export declare const createAxios: CreateAxios;

/**
 * 错误 消息 配置
 * errorStatusKey 和 errorStatusKeyValue 要么全部都有 要么一个没有
 */
export declare type errorStatusKeyAnderrorStatusKeyValue = {
    errorStatusKey?: never;
    errorStatusKeyValue?: never;
} | {
    errorStatusKey: string;
    errorStatusKeyValue: string | number;
};

export declare type LoadingList = Map<string, Function>;

/**
 * 参数在data字段中的声明
 */
export declare type ParamsInDataHelper = <T = any>(url: string, data?: any, config?: AxiosRequestConfigs) => Promise<T>;

/**
 * 参数在params的声明
 */
export declare type ParamsInParamsHelper = <T = any>(url: string, params?: any, config?: AxiosRequestConfigs) => Promise<T>;

/**
 * 参数既可以在params也可以在data的声明
 */
export declare type ParamsInParamsOrDataHelper = <T = any>(url: string, params: {
    params?: any;
    data?: any;
}, config?: AxiosRequestConfigs) => Promise<T>;

/**
 * 成功 消息 配置
 * successStatusKey 和 successStatusKeyValue 要么全部都有 要么一个没有
 */
export declare type successStatusKeyAndsuccessStatusKeyValue = {
    successStatusKey?: never;
    successStatusKeyValue?: never;
} | {
    successStatusKey: string;
    successStatusKeyValue: string | number;
};

export { }
