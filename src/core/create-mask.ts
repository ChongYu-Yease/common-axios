import { AxiosRequestConfigs } from '../../types/index.types'
// 引入遮罩层的样式
import '../css/mask.css'

// 创建遮罩层
export class Mask {
    // 遮罩层队列
    private maskQueue: Array<AxiosRequestConfigs>

    constructor() {
        // 初始化遮罩层队列
        this.maskQueue = []
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

    // 创建深色遮罩层
    private createMaskDom = (): HTMLDivElement => {
        const maskDom = document.createElement('div')
        maskDom.classList.add('common-axios_mask')
        return maskDom
    }

    // 创建文本节点
    private createTextDom = (loadingText?: string): HTMLSpanElement => {
        loadingText = loadingText ? loadingText : '拼命加载中'
        const span = document.createElement('span')
        span.classList.add('common-axios_text')
        span.textContent = loadingText
        return span
    }

    // 创建旋转的dom节点
    private createDottingDom = (): HTMLSpanElement => {
        const span = document.createElement('span')
        span.classList.add('common-axios_dotting')
        return span
    }

    // 将文字节点和旋转节点放在一起
    private createLoadingBox = (): HTMLDivElement => {
        const loadingBox = document.createElement('div')
        loadingBox.classList.add('common-axios_loading-box')
        return loadingBox
    }

    // 创建loading dom节点
    private createLoadingDom = (config: AxiosRequestConfigs): void => {
        // loading文本
        const { loadingText } = config

        // 创建文本节点
        const textDom = this.createTextDom(loadingText)

        // 创建loading节点
        const dottingDom = this.createDottingDom()

        // 创建load box 为了将两个放在一个节点内
        const loadingBox = this.createLoadingBox()

        loadingBox.appendChild(textDom)

        loadingBox.appendChild(dottingDom)

        // 创建遮罩层节点
        const maskDom = this.createMaskDom()

        maskDom.appendChild(loadingBox)

        document.body.appendChild(maskDom)
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
