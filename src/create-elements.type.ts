// 获取文件宽度
export type GetTextWith = (message: string) => number

// 创建信息
export type CreateMessage = (
    message: string,
    type?: 'success' | 'info' | 'warning' | 'danger'
) => void

// 创建信息节点
export type CreateMessageNode = (
    message: string,
    type?: 'success' | 'info' | 'warning' | 'danger'
) => HTMLDivElement

export type CreateMaskLayerNode = () => HTMLDivElement

// 创建loading节点
export type CreateLoadingNode = (loadingText: string | undefined) => void

// 创建带loading效果的节点
export type CreateDottingNode = () => HTMLSpanElement

// 创建文本节点
export type CreateTextNode = (
    loadingText: string | undefined
) => HTMLSpanElement

// 移除遮罩层
export type RemoveLoadingNode = (className: string) => void
