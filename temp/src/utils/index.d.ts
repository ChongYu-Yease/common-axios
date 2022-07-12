/**
 * 执行方法返回的对象所包含的属性
 */
export declare type GetValueByKeyInOpject = (key: string, object: {
    [k: string]: any;
}) => any;
export declare type Stringify = (params: Array<string>) => string;
export declare type DebounceInstance = (fn: Function, delay: number) => Function;
/**
 * 模仿qs.stringify
 * @param params Array<string>
 * @returns qs.stringify
 */
export declare const stringify: Stringify;
/**
 * 通过key查找object里面的值
 * @param key object的属性
 * @param object 数据
 * @returns object[key]
 */
export declare const getValueByKeyInOpject: GetValueByKeyInOpject;
export declare const debounce: DebounceInstance;
