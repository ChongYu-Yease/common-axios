import { Stringify, GetValueByKeyInOpject } from "../../types/utils.type"

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
