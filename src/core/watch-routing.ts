// 监听pushState/replaceState
const historyWrap = function (type: "pushState" | "replaceState") {


    // 记录原来的方法
    const originCallback = history[type];
    const event = new Event(type);
    return function () {
        // @ts-ignore
        const result = originCallback.apply(this, arguments);

        // @ts-ignore
        event.arguments = arguments;

        window.dispatchEvent(event);

        return result;
    };
};
// 重写 pushState
history.pushState = historyWrap('pushState');

// 重写 replaceState
history.replaceState = historyWrap('replaceState');