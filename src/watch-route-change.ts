class Dep {
    watch: Watch | undefined
    id: Object
    public subs: Array<Watch>
    // 订阅池
    constructor() {
        this.id = new Date()
        this.subs = [] //该事件下被订阅对象的集合
    }
    defined() {
        // @ts-ignore
        // 添加订阅者
        Dep.watch.add(this)
    }
    notify() {
        //通知订阅者有变化
        this.subs.forEach((item) => {
            if (typeof item.update === 'function') {
                try {
                    item.update.apply(item) //触发订阅者更新函数
                } catch (err) {
                    console.warn(err)
                }
            }
        })
    }
}
// // @ts-ignore
// Dep.watch = null

class Watch {
    name: string
    id: Object
    callBack: Function
    constructor(name: string, fn: Function) {
        this.name = name //订阅消息的名称
        this.id = new Date() //这里简单的运用时间戳做订阅者的ID
        this.callBack = fn //订阅消息发送改变时->订阅者执行的回调函数
    }
    //将订阅者放入dep订阅池
    add(dep: Dep) {
        dep.subs.push(this)
    }

    //将订阅者更新方法
    update() {
        const cb = this.callBack //赋值为了不改变函数内调用的this
        cb(this.name)
    }
}

export const addHistoryMethod = (function () {
    const historyDep = new Dep()
    console.log('historyDep', historyDep)

    return function (name: string) {
        if (name === 'historychange') {
            return function (name: string, fn: Function) {
                const watcher = new Watch(name, fn)
                // @ts-ignore
                Dep.watch = watcher
                historyDep.defined()
                // @ts-ignore
                Dep.watch = undefined //置空供下一个订阅者使用
            }
        } else if (name === 'pushState' || name === 'replaceState') {
            const method = window.history[name]
            return function () {
                // @ts-ignore
                method.apply(window.history, arguments)
                historyDep.notify()
            }
        }
    }
})()
