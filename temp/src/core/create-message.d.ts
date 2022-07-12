import '../css/message.css';
export declare class Message {
    private messageQueue;
    private message;
    private messageType;
    private messageDuration;
    private body;
    private id;
    timeId: number;
    constructor();
    private setMessageType;
    private createTextDom;
    removeMessage(messageDom: HTMLDivElement, targetId: number): void;
    createMessage(messageOptions: {
        message?: string;
        messageType?: '' | 'info' | 'warning' | 'error' | 'success';
        messagePosition?: 'left' | "center" | 'right' | undefined;
        messageDuration?: number;
        showClose?: boolean;
    }): void;
    private setCurrentMessageDom;
    private updateMessageDom;
}
