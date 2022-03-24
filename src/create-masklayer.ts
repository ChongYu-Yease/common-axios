import qs from 'qs'
import { AxiosRequestConfigs } from './index.types'
// 引入遮罩层的样式
import './mask-layer.css'

// 创建遮罩层
export class MaskLayer {
    // 遮罩层队列
    private masklayerQueue: Array<string>

    constructor() {
        this.masklayerQueue = []
    }

    private addMasklayerQueue(config: AxiosRequestConfigs) {
        // 生成key 其实这个key 没有什么作用 不知道后续会遇到什么需求 先这么做吧
        const key = [
            config.method,
            config.url,
            qs.stringify(config.params),
            qs.stringify(config.data),
        ].join('&')

        // 向遮罩层队列中添加记录
        this.masklayerQueue.push(key)
    }

    // 创建深色遮罩层
    private createMaskLayerDom = (): HTMLDivElement => {
        const maskLayerDom = document.createElement('div')
        maskLayerDom.classList.add('common-axios-mask-layer')
        return maskLayerDom
    }

    // 创建文本节点
    private createTextDom = (loadingText?: string): HTMLSpanElement => {
        loadingText = loadingText ? loadingText : '拼命加载中'
        const span = document.createElement('span')
        span.classList.add('common-axios-text')
        span.textContent = loadingText
        return span
    }

    // 创建旋转的dom节点
    private createDottingDom = (): HTMLSpanElement => {
        const span = document.createElement('span')
        span.classList.add('common-axios-dotting')
        return span
    }

    // 将文字节点和旋转节点放在一起
    private createLoadingBox = (): HTMLDivElement => {
        const loadingBox = document.createElement('div')
        loadingBox.classList.add('common-axios-loading-box')
        return loadingBox
    }

    // 创建loading dom节点
    private createLoadingDom = (config: AxiosRequestConfigs): void => {
        const { loadingText } = config
        if (document) {
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
    }

    // 移除遮罩层
    private removeLoadingDom = (): void => {
        if (document) {
            const loadingDom = document.querySelector(
                '.common-axios-mask-layer'
            )
            if (loadingDom) {
                document.body.removeChild(loadingDom)
            }
        }
    }

    // 创建遮罩层
    public createLoading = (config: AxiosRequestConfigs): void => {
        // 添加遮罩层任务队列
        this.addMasklayerQueue(config)

        if (this.masklayerQueue.length < 2) this.createLoadingDom(config)
    }

    // 关闭遮罩层
    public removeLoading = (config: AxiosRequestConfigs) => {
        this.masklayerQueue.pop()
        if (this.masklayerQueue.length === 0)
            setTimeout(() => {
                this.removeLoadingDom()
            }, 3000)
    }
}
