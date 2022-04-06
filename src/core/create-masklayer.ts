import { AxiosRequestConfigs } from '../../types/index.types'
// 引入遮罩层的样式
import '../css/mask-layer.css'
import qs from 'qs'
// 创建遮罩层
export class MaskLayer {
    // 遮罩层队列
    private masklayerQueue: Array<AxiosRequestConfigs>

    constructor() {
        // 初始化遮罩层队列
        this.masklayerQueue = []
    }

    // 更新遮罩层的文本
    private uploadMasklayerContent(config: AxiosRequestConfigs): void {
        const masklayerTextDom: HTMLSpanElement =
            document.querySelector('.common-axios_text')!
        masklayerTextDom.textContent = config.loadingText
            ? config.loadingText
            : '拼命加载中'
    }

    // 创建或者更新遮罩层
    private uploadMasklayer(): void {
        const config = this.masklayerQueue[this.masklayerQueue.length - 1]
        const hasMasklayerDom = document.querySelector(
            '.common-axios_mask-layer'
        )
        if (hasMasklayerDom) {
            this.uploadMasklayerContent(config)
        } else {
            this.createLoadingDom(config)
        }
    }
    // 向遮罩层队列中添加记录
    private addMasklayer(config: AxiosRequestConfigs) {
        this.masklayerQueue.push(config)
        this.uploadMasklayer()
    }

    // 向遮罩层队列中删除记录
    private removeMasklayer(config: AxiosRequestConfigs): void {
        const index = this.masklayerQueue.findIndex(
            (itemConfig) =>
                JSON.stringify(itemConfig) === JSON.stringify(config)
        )
        this.masklayerQueue.splice(index, 1)
        if (this.masklayerQueue.length) {
            this.uploadMasklayer()
        } else {
            this.removeLoadingDom()
        }
    }

    // 创建深色遮罩层
    private createMaskLayerDom = (): HTMLDivElement => {
        const maskLayerDom = document.createElement('div')
        maskLayerDom.classList.add('common-axios_mask-layer')
        return maskLayerDom
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
        const maskLayerDom = this.createMaskLayerDom()

        maskLayerDom.appendChild(loadingBox)

        document.body.appendChild(maskLayerDom)
    }

    // 移除遮罩层
    private removeLoadingDom = (): void => {
        // 延迟300毫秒关闭
        setTimeout(() => {
            const loadingDom = document.querySelector(
                '.common-axios_mask-layer'
            )
            if (loadingDom) {
                document.body.removeChild(loadingDom)
            }
        })
    }

    // 创建遮罩层
    public createLoading = (config: AxiosRequestConfigs): void => {
        // 添加遮罩层任务队列
        this.addMasklayer(config)
    }

    // 关闭遮罩层
    public removeLoading = (config?: AxiosRequestConfigs) => {
        if (config) {
            this.removeMasklayer(config)
        } else {
            this.removeLoadingDom()
        }
    }
}
