import { AxiosRequestConfigs } from '../index';
import '../css/mask.css';
export declare class Mask {
    maskDom: HTMLElement | null;
    private maskQueue;
    constructor();
    private uploadMaskContent;
    private uploadMask;
    private addMask;
    private removeMask;
    private createDom;
    private createLoadingDom;
    private removeLoadingDom;
    createLoading: (config: AxiosRequestConfigs) => void;
    removeLoading: (config?: AxiosRequestConfigs | undefined) => void;
}
