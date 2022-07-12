


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

// 公共方法

/**
 * 模仿qs.stringify
 * @param params Array<string>
 * @returns qs.stringify
 */

export const stringify: Stringify = (params: Array<string>): string => {
    const search = []
    for (const key in params) {
        const item = [key, params[key]]
        search.push(item.join('='))
    }

    return search.join('&')
}

/**
 * 通过key查找object里面的值
 * @param key object的属性
 * @param object 数据
 * @returns object[key]
 */
export const getValueByKeyInOpject: GetValueByKeyInOpject = (key, object) => {
    if (!key) return object
    if (key.includes('.')) {
        const keys: Array<string> = key.split('.')
        let index = 0
        let temValue: any
        while (index < keys.length) {
            const key = keys[index]
            if (!temValue) {
                temValue = object[key]
            } else {
                temValue = temValue[key]
            }
            index++
        }
        return temValue
    } else {
        return object[key]
    }
}


export const debounce: DebounceInstance = (fn, delay) => {
    let timer: number = 0
    return function () {
        const args = arguments
        // @ts-ignore
        const that: any = this  // 取debounce执行作用域的this
        if (timer) {
            window.clearTimeout(timer)
        }
        timer = window.setTimeout(function () {
            fn.apply(that, args) // 用apply指向调用debounce的对象，相当于_this.fn(args);
        }, delay)
    }
}
