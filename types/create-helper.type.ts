
import { AxiosMethods, } from './index.types'
import { AxiosInstance, } from 'axios'
import {
    ParamsInParamsHelper,
    ParamsInParamsOrDataHelper,
    ParamsInDataHelper,
} from './index.types'


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