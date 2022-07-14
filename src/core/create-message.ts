// 引入message 样式
import '@/css/message.css'


export interface MessageOptions {
    message?: string
    messageType?: '' | 'info' | 'warning' | 'error' | 'success'
    messagePosition?: 'left' | "center" | 'right' | undefined,
    messageDuration?: number
    showClose?: boolean
}


// 创建message
export class Message {
    // 消息队列
    private messageQueue: Array<{ messageDom: HTMLDivElement; id: number }> = []

    private bodyElement: HTMLBodyElement | null = document.querySelector('body')

    private id: number = 0

    // 定时器的id
    timeId: number = 0

    constructor() { }


    /**
     * @desc 通过 type 设置 当前 message 外层节点的class
     * @param {HTMLDivElement} messageDom 
     * @param {MessageOptions} messageOption 
     * @returns void
     */
    private setCurrentMessageDomClass(messageDom: HTMLDivElement, messageOption: MessageOptions): void {

        const messageType = messageOption.messageType ? messageOption.messageType : 'info'

        const className = `common-axios_message_${messageType}`

        messageDom.classList.add(className)
    }


    /**
     * @desc 创建文本节点
     * @param {HTMLDivElement} messageDom 
     * @param {MessageOptions} messageOption 
     * @returns void
     */
    private createTextDom(messageDom: HTMLDivElement, messageOption: MessageOptions): void {

        const p = document.createElement('p')

        p.classList.add('common-axios_message_content')

        p.textContent = messageOption.message!

        messageDom.appendChild(p)
    }

    /**
     * @desc 创建message组件外层组件节点
     * @param {MessageOptions} messageOptions 
     * @returns HTMLDivElement
     */
    private createMessageDom(messageOptions: MessageOptions): HTMLDivElement {

        const messageDom = document.createElement('div')

        messageDom.classList.add('common-axios_message')

        messageDom.classList.add('common-axios_message_leave')

        messageDom.classList.add(`common-axios_message_${messageOptions.messagePosition || "left"}`)

        return messageDom
    }

    /**
     * @desc 为外层message节点添加鼠标滑入滑出事件
     * @param {HTMLDivElement} messageDom
     * @returns void
     */
    private addEventListenerForMessageDom(messageDom: HTMLDivElement, messageOptions: MessageOptions): void {

        console.log('this.timeId', this.timeId);
        return
        // 给节点添加鼠标划入的事件
        messageDom.addEventListener("mouseenter", (_event: MouseEvent) => {

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

                const messageQueueOPtion = this.messageQueue[currentIndex]

                if (messageQueueOPtion) {

                    const id = messageQueueOPtion.id

                    this.removeMessage(messageDom, id)

                }

            }, messageOptions.messageDuration || 2000)
        })
    }

    /**
     * @desc 创建 message 节点
     * @param {MessageOptions} messageOptions 
     * @returns void
     */
    public createMessage(messageOptions: MessageOptions): void {

        // 判断 messageOptions 配置
        if (typeof messageOptions !== 'object' || messageOptions === null || messageOptions === undefined || !messageOptions.message) return

        // 创建message组件最外层的节点
        const messageDom = this.createMessageDom(messageOptions)

        // 为外层message节点添加事件
        // this.addEventListenerForMessageDom(messageDom, messageOptions)

        // 记录当前id 避免执行异步操作 造成 id 不准确的问题
        const currentId = this.id

        // 给dom节点添加class
        this.setCurrentMessageDomClass(messageDom, messageOptions)

        // 创建文本节点
        this.createTextDom(messageDom, messageOptions)

        // 设置当前 message 节点的 zIndex、top
        this.setCurrentMessageDomStyle(messageDom)

        // 将 message 节点添加到 body 当中
        this.bodyElement?.appendChild(messageDom)

        // 向消息队列当中添加消息数据
        this.messageQueue.push({ id: currentId, messageDom })

        //增加新增动画
        window.setTimeout(() => {
            messageDom.classList.remove('common-axios_message_leave')
        }, 100)

        let i

        if (messageOptions.showClose === true) {
            i = document.createElement('i')
            i.classList.add('close-button')
            messageDom.appendChild(i)
        }


        if (messageOptions.messageDuration !== 0) {
            // 如果duration为 0 则不需要setTimeout
            this.timeId = window.setTimeout(() => {
                this.removeMessage(messageDom, currentId)
            }, messageOptions.messageDuration)
        }

        // 如果当前 message 组件支持关闭的话
        if (messageOptions.showClose === true) {
            i?.addEventListener('click', () => {
                this.removeMessage(messageDom, currentId)
                if (this.id !== -1) {
                    window.clearTimeout(this.timeId)
                }
            })
        }

        this.id++
    }

    /**
     * @desc 设置当前创建的 message节点的 zIndex、top
     * @param {HTMLDivElement} messageDom
     * @returns void
     */
    private setCurrentMessageDomStyle(messageDom: HTMLDivElement): void {

        const currentIndex = this.messageQueue.length

        messageDom.style.zIndex = `${3000 + currentIndex}`

        messageDom.style.top = `${64 * currentIndex + 20}px`
    }

    /**
     * @desc 批量更新 message 节点的样式
     * @param {number} startIndex 
     * @returns void
     */
    private updateMessageDomStyle(startIndex: number): void {

        for (let i = startIndex; i < this.messageQueue.length; i++) {

            const messageDom = this.messageQueue[i].messageDom

            // 错误提示的优先级最高 应该放在最上面一层展示
            messageDom.style.zIndex = `${3000 + i}`

            // 暂不支持换行功能，换行后获取上一个元素的height和top来更新下一个元素的top
            messageDom.style.top = `${64 * i + 20}px`
        }
    }

    /**
     * @desc  移除 message 节点
     * @param {HTMLDivElement} messageDom 
     * @param {number} targetId 
     * @returns void
     */
    private removeMessage(messageDom: HTMLDivElement, targetId: number): void {
        // return
        const startIndex = this.messageQueue.findIndex((message) => message.id === targetId)

        this.updateMessageDomStyle(startIndex)

        this.messageQueue.splice(startIndex, 1)

        // 增加移除动画
        messageDom.classList.add('common-axios_message_leave')

        setTimeout(() => {
            this.bodyElement?.removeChild(messageDom)
        }, 400)
    }


}
