import { AxiosRequestConfigs } from '../index';
export declare class AxiosDebounce {
    private axiosQueue;
    constructor();
    private handleAddAxiosQueue;
    private handleRemoveAxiosQueue;
    private handleClearPending;
    handleAxiosDebounce(config: AxiosRequestConfigs): void;
}
