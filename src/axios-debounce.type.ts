import { Canceler } from 'axios'

import { AxiosRequestConfigs } from './index.types'

export type LogMap = Map<string, Canceler>

export type HandleAddResponseLog = (config: AxiosRequestConfigs) => void

export type HandleRemoveResponseLog = (config: AxiosRequestConfigs) => void
