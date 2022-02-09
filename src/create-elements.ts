import {
    CreateLoadingNode,
    CreateDottingNode,
    CreateTextNode,
    CreateMaskLayerNode,
    CreateMessageNode,
    CreateMessage,
    GetTextWith,
} from './types'
const getTextWidth: GetTextWith = (message) => {
    const span: HTMLSpanElement = document.createElement('span')
    const now = Date.now()
    const className = `common-axios-get-text-width__${now}`
    span.innerText = message
    span.className = className
    document.body.appendChild(span)
    const width = (
        document.getElementsByClassName(className)[0]! as HTMLSpanElement
    ).offsetWidth
    return width
}
/**
 * 创建遮罩层
 * return HTMLDivElement
 */
const createMaskLayerNode: CreateMaskLayerNode = () => {
    const className = `common-axios-mask-layer`
    const maskLayerNode = document.createElement('div')
    maskLayerNode.className = className
    return maskLayerNode
}

/**
 * 创建loading节点
 * @param loadingText loading文本
 * @returns HTMLSpanElement
 */
const createTextNode: CreateTextNode = (loadingText) => {
    if (!loadingText) {
        loadingText = '拼命加载中'
    }
    const span = document.createElement('span')
    span.className = 'common-axios-text'
    span.textContent = loadingText
    return span
}

/**
 * 创建带loading效果的节点
 * @returns HTMLSpanElement
 */
const createDottingNode: CreateDottingNode = () => {
    const span = document.createElement('span')
    span.className = 'common-axios-dotting'
    return span
}

/**
 * 创建遮罩层
 * @param loadingText string loading遮罩层的文字
 */
export const createLoadingNode: CreateLoadingNode = (loadingText) => {
    if (document) {
        // 创建文本节点
        const textNode = createTextNode(loadingText)
        // 创建loading节点
        const dottingNode = createDottingNode()
        const loadingBody = document.createElement('div')
        loadingBody.className = 'common-axios-loading'
        loadingBody.appendChild(textNode)
        loadingBody.appendChild(dottingNode)
        // 创建遮罩层节点
        const maskLayerNode = createMaskLayerNode()
        maskLayerNode.appendChild(loadingBody)
        document.body.appendChild(maskLayerNode)
    }
}
/**
 * 移除遮罩层节点
 */
export const removeLoadingNode = () => {
    if (document) {
        const loadingNode = document.getElementsByClassName(
            'common-axios-mask-layer'
        )[0] as HTMLDivElement
        if (loadingNode) {
            document.body.removeChild(loadingNode)
        }
    }
}

const createMessageNode: CreateMessageNode = (message, type) => {
    // console.log('message, type', message, type)
    if (!type) type = 'info'
    const modalBody = document.createElement('div')
    modalBody.className = 'modal-body'
    modalBody.innerText = message
    const modalContent = document.createElement('div')
    modalContent.className = 'modal-content'
    modalContent.classList.add(`modal-content__${type}`)
    modalContent.appendChild(modalBody)
    return modalContent
}

export const createMessage: CreateMessage = (message, type) => {
    // const width = getTextWidth(message) + 22
    const maskLayerNode = createMaskLayerNode()
    const messageNode = createMessageNode(message, type)
    // messageNode.style.marginLeft = `-${width}px`
    maskLayerNode.appendChild(messageNode)
    document.body.appendChild(maskLayerNode)
}
