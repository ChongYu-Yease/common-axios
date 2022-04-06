/**
 *
 * @param params Array<string>
 * @returns qs.stringify
 */

export function stringify(params: Array<string>): string {
    const search = []
    for (const key in params) {
        const item = [key, params[key]]
        search.push(item.join('='))
    }

    return search.join('&')
}
