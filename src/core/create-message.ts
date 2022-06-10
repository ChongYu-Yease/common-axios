// 引入message 样式
import '../css/message.css'

// 创建message
export class Message {
    // 消息队列
    private messageQueue: Array<{ messageDom: HTMLDivElement; id: number }>

    // 消息内容
    private message: string

    // 消息类型
    private messageType: '' | 'success' | 'warning' | 'error' | 'info'

    // 消息节点消失的时间间隔
    private messageDuration: number

    // body节点
    private body: HTMLBodyElement

    // id
    private id: number

    // 定时器的id
    timeId: number

    // 初始化属性
    constructor() {
        // 消息队列
        this.messageQueue = []
        this.message = ''
        this.messageType = ''
        this.messageDuration = 2000
        this.body = document.querySelector('body')!
        this.id = 0
        this.timeId = 0
    }

    // 通过type 设置dom节点的class
    private setMessageType(messageDom: HTMLDivElement, messageType?: string) {
        messageType = messageType ? messageType : 'info'
        const className = `common-axios_message_${messageType}`
        messageDom.classList.add(className)
    }

    // 创建文本节点
    private createTextDom(messageDom: HTMLDivElement, message: string) {
        const p = document.createElement('p')
        p.classList.add('common-axios_message_content')
        p.textContent = message || this.message
        messageDom.appendChild(p)
    }

    // 移除message 节点
    removeMessage(messageDom: HTMLDivElement, targetId: number) {
        console.log("removeMessage", "targetId", targetId);
        console.log("this.messageQueue", this.messageQueue);

        const startIndex = this.messageQueue.findIndex(
            (message) => message.id === targetId
        )
        console.log("startIndex", startIndex);
        this.updateMessageDom(startIndex)
        this.messageQueue.splice(startIndex, 1)



        //增加移除动画
        messageDom.classList.add('common-axios_message_leave')

        setTimeout(() => {
            this.body.removeChild(messageDom)
        }, 400)
    }

    createMessage(messageOptions: {
        message?: string
        messageType?: '' | 'info' | 'warning' | 'error' | 'success'
        messagePosition?: 'left' | "center" | 'right' | undefined,
        messageDuration?: number
        showClose?: boolean
    }) {
        // 判断 messageOptions 配置
        if (typeof messageOptions !== 'object' || messageOptions === null || messageOptions === undefined || !messageOptions.message) return

        const messageDom = document.createElement('div')

        messageDom.classList.add('common-axios_message')

        messageDom.classList.add('common-axios_message_leave')

        messageDom.classList.add(`common-axios_message_${messageOptions.messagePosition || "left"}`)

        // 给节点添加鼠标划入的事件
        messageDom.addEventListener("mouseenter", (event: MouseEvent) => {

            // 鼠标划入终止message节点的移除
            window.clearTimeout(this.timeId)

        })
        // 给节点添加鼠标划出的事件
        messageDom.addEventListener("mouseleave", (event: MouseEvent) => {
            // 鼠标划出继续移除message节点
            this.timeId = window.setTimeout(() => {
                const targetDom = event.target as HTMLDivElement
                const targetDomStyle = window.getComputedStyle(targetDom)
                // 从队列中移除
                const currentIndex = this.messageQueue.findIndex((messageOption) => {
                    const messageDomStyle = window.getComputedStyle(messageOption.messageDom)
                    return JSON.stringify(messageDomStyle) === JSON.stringify(targetDomStyle)
                })
                const id = this.messageQueue[currentIndex].id
                this.removeMessage(messageDom, id)
            }, this.messageDuration)
        })

        const targetId = this.id

        // 向消息队列当中添加消息数据
        this.messageQueue.push({
            id: targetId,
            messageDom,
        })


        // 给dom节点添加class
        this.setMessageType(messageDom, messageOptions.messageType)

        // 创建文本节点
        this.createTextDom(messageDom, messageOptions.message)

        // 设置当前message节点的 zIndex、top
        this.setCurrentMessageDom()

        // 将message节点添加到body当中
        this.body.appendChild(messageDom)

        //增加新增动画
        window.setTimeout(() => {
            messageDom.classList.remove('common-axios_message_leave')
        }, 100)

        let i = null

        if (messageOptions.showClose === true) {
            i = document.createElement('i')
            i.classList.add('close-button')
            messageDom.appendChild(i)
        }

        const messageDuration = isNaN(Number(messageOptions.messageDuration))
            ? this.messageDuration
            : Number(messageOptions.messageDuration)

        // 如果duration为0则不需要setTimeout

        if (messageDuration !== 0) {
            this.timeId = window.setTimeout(() => {
                this.removeMessage(messageDom, targetId)
            }, messageDuration)
        }

        if (messageOptions.showClose === true) {
            // @ts-ignore
            i.addEventListener('click', () => {
                this.removeMessage(messageDom, targetId)
                if (targetId !== -1) {
                    window.clearTimeout(this.timeId)
                }
            })
        }

        // 更新id
        this.id++
    }

    // 设置当前创建的 message节点的 zIndex、top
    private setCurrentMessageDom() {
        const index = this.messageQueue.length - 1
        const targetDom = this.messageQueue[index].messageDom
        targetDom.style.zIndex = `${3000 + index}`
        targetDom.style.top = `${64 * index + 20}px`
    }

    // 批量设置 message的样式
    private updateMessageDom(startIndex: number) {
        // 获取
        for (let i = startIndex; i < this.messageQueue.length; i++) {
            const messageDom = this.messageQueue[i].messageDom
            // 错误提示的优先级最好 应该放在最上面一层展示
            messageDom.style.zIndex = `${3000 + i}`
            // 暂不支持换行功能，换行后获取上一个元素的height和top来更新下一个元素的top
            messageDom.style.top = `${64 * i + 20}px`
        }
    }
    // 终止移除message节点
    stopRemoveMessage(targetId: number) {
        // const startIndex = this.messageQueue.findIndex(
        //     (message) => message.id === targetId
        // )
        // this.messageQueue.splice(startIndex, 1)
        // this.updateMessageDom(startIndex)
        // this.setCurrentMessageDom()

    }
    // 继续移除message节点
    continueRemoveMessage(targetId: number) {

    }
}
