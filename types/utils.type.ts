/**
 * 执行方法返回的对象所包含的属性
 */
export type GetValueByKeyInOpject = (
    key: string,
    object: { [k: string]: any }
) => any

export type Stringify = (params: Array<string>) => string



// 防抖函数
export type DebounceInstance = (fn: Function, delay: number) => Function