import { AxiosRequestConfigs } from '../index'
// 引入遮罩层的样式
import '../css/mask.css'

// 创建遮罩层
export class Mask {
    maskDom: HTMLElement | null
    // 遮罩层队列
    private maskQueue: Array<AxiosRequestConfigs>

    constructor() {
        // 初始化遮罩层队列
        this.maskQueue = []
        this.maskDom = null
    }

    // 更新遮罩层的文本
    private uploadMaskContent(config: AxiosRequestConfigs): void {
        const maskTextDom: HTMLSpanElement =
            document.querySelector('.common-axios_text')!
        maskTextDom.textContent = config.loadingText
            ? config.loadingText
            : '拼命加载中'
    }

    // 创建或者更新遮罩层
    private uploadMask(): void {
        const config = this.maskQueue[this.maskQueue.length - 1]
        const hasMaskDom = document.querySelector(
            '.common-axios_mask'
        )
        if (hasMaskDom) {
            this.uploadMaskContent(config)
        } else {
            this.createLoadingDom(config)
        }
    }

    // 向遮罩层队列中添加记录
    private addMask(config: AxiosRequestConfigs) {
        this.maskQueue.push(config)
        this.uploadMask()
    }

    // 向遮罩层队列中删除记录
    private removeMask(config: AxiosRequestConfigs): void {
        const index = this.maskQueue.findIndex(
            (itemConfig) =>
                JSON.stringify(itemConfig) === JSON.stringify(config)
        )
        this.maskQueue.splice(index, 1)
        if (this.maskQueue.length) {
            this.uploadMask()
        } else {
            this.removeLoadingDom()
        }
    }
    // 创建节点方法
    private createDom = (tagName: string, className: string, innerText?: string): HTMLElement => {
        const dom = document.createElement(tagName)
        dom.classList.add(className)
        if (innerText) {
            dom.innerText = innerText
        }
        return dom
    }


    // 创建loading dom节点
    private createLoadingDom = (config: AxiosRequestConfigs): void => {

        // loading文本
        const { loadingText } = config

        // 创建文本节点
        const textDom = this.createDom("span", "'common-axios_mask'", loadingText)

        // 创建loading节点
        const dottingDom = this.createDom('span', 'common-axios_dotting')

        // 创建load box 为了将两个放在一个节点内
        const loadingDom = this.createDom('div', 'common-axios_loading-box')

        loadingDom.appendChild(textDom)

        loadingDom.appendChild(dottingDom)

        // 创建遮罩层节点
        this.maskDom = this.createDom('div', 'common-axios_mask')

        this.maskDom.appendChild(loadingDom)

        document.body.appendChild(this.maskDom)
    }

    // 移除遮罩层
    private removeLoadingDom = (): void => {
        // 延迟300毫秒关闭
        setTimeout(() => {
            const loadingDom = document.querySelector(
                '.common-axios_mask'
            )
            if (loadingDom) {
                document.body.removeChild(loadingDom)
            }
        })
    }

    // 创建遮罩层
    public createLoading = (config: AxiosRequestConfigs): void => {
        // 添加遮罩层任务队列
        this.addMask(config)
    }

    // 关闭遮罩层
    public removeLoading = (config?: AxiosRequestConfigs) => {
        if (config) {
            this.removeMask(config)
        } else {
            this.removeLoadingDom()
        }
    }
}
