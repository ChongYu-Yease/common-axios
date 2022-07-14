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
    private messageQueue: Array<{ messageboxDom: HTMLDivElement; id: number, allowDelete: boolean }> = []

    private bodyElement: HTMLBodyElement | null = document.querySelector('body')

    private id: number = 0

    private maxZindex: number = 0

    // 定时器的id
    timeId: number = 0

    constructor() {
        // 不使用 window.onload 会只查找 原生节点里面的z-index
        window.onload = () => {
            this.maxZindex = this.getMaxZIndex()
        }
    }

    /**
     * 给dom节点添加属性
     * @param {HTMLElement} dom 
     * @param {string} attribute 
     * @param {string} attributeValue 
     */
    private setDomAttribute(dom: HTMLElement, attribute: string, attributeValue: string): void {
        dom.setAttribute(attribute, attributeValue)
    }

    /**
     * 获取dom节点属性
     * @param {HTMLElement} dom 
     * @param {string} attribute 
     * @returns {string}
     */
    private getDomAttribute(dom: HTMLElement, attribute: string): string {
        return dom.getAttribute(attribute)!
    }

    /**
     * @desc 创建 message 文本内容节点
     * @param { HTMLDivElement } messageboxDom 
     * @param { MessageOptions } messageOption 
     * @returns void
     */
    private createMessageContentDom(messageboxDom: HTMLDivElement, messageOption: MessageOptions): void {

        const messageContentDom = document.createElement('p')

        messageContentDom.classList.add('common-axios_message_content')

        messageContentDom.textContent = messageOption.message!

        messageboxDom.appendChild(messageContentDom)
    }

    /**
     * @desc 创建message组件外层组件节点
     * @param {MessageOptions} messageOptions 
     * @returns HTMLDivElement
     */
    private createMessageboxDom(messageOptions: MessageOptions): HTMLDivElement {

        // 创建节点
        const messageboxDom = document.createElement('div')

        // 基本class
        messageboxDom.classList.add('common-axios_message')

        // 动画class
        messageboxDom.classList.add('common-axios_message_leave')

        // message内容 位置 class
        messageboxDom.classList.add(`common-axios_message_${messageOptions.messagePosition || "left"}`)

        // message节点 样式 class messageOption.messageType 做兼容 默认就是 info 属性
        messageboxDom.classList.add(`common-axios_message_${messageOptions.messageType ? messageOptions.messageType : 'info'}`)

        //移除动画
        window.setTimeout(() => {
            messageboxDom.classList.remove('common-axios_message_leave')
        }, 100)

        return messageboxDom
    }

    /**
     * @desc 为外层message节点添加鼠标滑入滑出事件
     * @param {HTMLDivElement} messageboxDom
     * @returns void
     */
    private addEventListenerForMessageDom(messageboxDom: HTMLDivElement, messageOptions: MessageOptions): void {

        // 给节点添加鼠标划入的事件
        messageboxDom.addEventListener("mouseenter", (_event: MouseEvent) => {

            // 修改当前message节点在message队列里面的属性
            const id = Number(this.getDomAttribute(_event.target as HTMLDivElement, "common-axios-id"))

            const currentIndex = this.messageQueue.findIndex(messageOption => messageOption.id === id)

            this.messageQueue.splice(currentIndex, 1, { ...this.messageQueue[currentIndex], allowDelete: false })

            // 获取当前节点所对应的 timeid
            const timeId = Number(this.getDomAttribute(_event.target as HTMLDivElement, "common-axios-time-id"))

            // 鼠标划入终止message节点的移除
            window.clearTimeout(timeId)


        })


        // 给节点添加鼠标划出的事件
        messageboxDom.addEventListener("mouseleave", (_event: MouseEvent) => {
            // 修改当前message节点在message队列里面的属性
            const id = Number(this.getDomAttribute(_event.target as HTMLDivElement, "common-axios-id"))

            const currentIndex = this.messageQueue.findIndex(messageOption => messageOption.id === id)

            this.messageQueue.splice(currentIndex, 1, { ...this.messageQueue[currentIndex], allowDelete: true })


            // 鼠标划出继续移除message节点
            window.setTimeout(() => {

                this.removeMessage(messageboxDom, id)

            }, messageOptions.messageDuration || 2000)
        })
    }

    /**
     * @desc 设置当前创建的 message 节点的 zIndex、top  
     * @decs 从上往下排 第一个出现的在第一行 第二个出现的在第二行 以此类推... 这样做的好处是 只处理最后一次出现的message节点就行了 不需要考虑之前出现的message节点
     * @param {HTMLDivElement} messageboxDom
     * @returns void
     */
    private setCurrentMessageboxDomStyle(messageboxDom: HTMLDivElement): void {

        const currentIndex = this.messageQueue.length

        // 为了解决 鼠标划入中间部分的message节点 下面的message节点的zindex 比当前的大 从节点的上面 划回去 
        messageboxDom.style.zIndex = `${this.maxZindex + 1000 - currentIndex * 10}`

        messageboxDom.style.top = `${64 * currentIndex + 20}px`
    }

    /**
     * @desc 创建 message 组件
     * @param {MessageOptions} messageOptions 
     * @returns void
     */
    public createMessage(messageOptions: MessageOptions): void {

        // 没有基本的message配置 不生成消息节点
        if (typeof messageOptions !== 'object' || messageOptions === null || messageOptions === undefined || !messageOptions.message) return

        // 创建message组件最外层的节点
        const messageboxDom = this.createMessageboxDom(messageOptions)

        // 为 message 节点设置唯一标志属性
        this.setDomAttribute(messageboxDom, "common-axios-id", JSON.stringify(this.id))

        // 创建 message 文本节点
        this.createMessageContentDom(messageboxDom, messageOptions)

        // 设置当前 message 节点的 zIndex、top
        this.setCurrentMessageboxDomStyle(messageboxDom)

        // 定时移除 message 节点 messageOptions.messageDuration 为 0 代表不移除 message 节点
        if (messageOptions.messageDuration !== 0) {

            this.timeId = window.setTimeout(() => {

                this.removeMessage(messageboxDom, currentId)

            }, messageOptions.messageDuration || 2000)

        }

        // 将当前定时器的id 记录在dom 节点上 为后续鼠标划入 节点悬停 做准备
        this.setDomAttribute(messageboxDom, "common-axios-time-id", JSON.stringify(this.timeId))

        // 为外层message节点添加事件
        this.addEventListenerForMessageDom(messageboxDom, messageOptions)

        // 记录当前id 避免执行异步操作 造成 id 不准确的问题
        const currentId = this.id

        // 向消息队列当中添加消息数据
        this.messageQueue.push({ id: currentId, messageboxDom, allowDelete: true })


        // let i

        // if (messageOptions.showClose === true) {
        //     i = document.createElement('i')
        //     i.classList.add('close-button')
        //     messageboxDom.appendChild(i)
        // }


        // // 如果当前 message 组件支持关闭的话
        // if (messageOptions.showClose === true) {
        //     i?.addEventListener('click', () => {
        //         this.removeMessage(messageboxDom, currentId)
        //         if (this.id !== -1) {
        //             window.clearTimeout(this.timeId)
        //         }
        //     })
        // }

        // 将 message 节点添加到 body 当中
        this.bodyElement?.appendChild(messageboxDom)

        this.id++
    }



    /**
     * @desc 批量更新 message 节点的样式  移动上去
     * @param {number} startIndex 
     * @returns void
     */
    private updateMessageDomStyle(startIndex: number): void {

        for (let i = startIndex; i < this.messageQueue.length; i++) {
            if (this.messageQueue[i] && !this.messageQueue[i].allowDelete) continue
            const messageboxDom = this.messageQueue[i] && this.messageQueue[i].messageboxDom
            if (messageboxDom) {
                messageboxDom.style.zIndex = `${this.maxZindex + i}`
                // 暂不支持换行功能，换行后获取上一个元素的height和top来更新下一个元素的top
                messageboxDom.style.top = `${64 * i + 20}px`
            }

        }
    }

    /**  N
     * @desc 获取当前页面最大z-index元素值
     * @returns {number}
     */
    getMaxZIndex(): number {
        return Array.from(document.querySelectorAll("*")).reduce((r, e) => Math.max(r, +window.getComputedStyle(e).zIndex || 0), 0)
    }


    /**
     * @desc  移除 message 节点
     * @param {HTMLDivElement} messageboxDom 
     * @param {number} targetId 
     * @returns void
     */
    private removeMessage(messageboxDom: HTMLDivElement, targetId: number): void {
        // 开始下标
        const startIndex = this.messageQueue.findIndex((messageOption) => messageOption.id === targetId)

        // 增加移除动画
        messageboxDom.classList.add('common-axios_message_leave')

        // 更新样式
        this.updateMessageDomStyle(startIndex)

        // 从消息队列中删掉
        this.messageQueue.splice(startIndex, 1)

        // 从body当中移除掉
        setTimeout(() => {
            this.bodyElement?.removeChild(messageboxDom)
        }, 400)
    }


}
