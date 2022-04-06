
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios'), require('qs')) :
    typeof define === 'function' && define.amd ? define(['exports', 'axios', 'qs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.commonAxios = {}, global.axios, global.qs));
}(this, (function (exports, axios, qs) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
    var qs__default = /*#__PURE__*/_interopDefaultLegacy(qs);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    /**
     * 创建axios实例
     * @param config
     */
    var createAxiosInstance = function (config) {
        return axios__default['default'].create(__assign(__assign({}, config), { 
            //默认开启携带cookie
            withCredentials: config && config.withCredentials !== undefined
                ? config.withCredentials
                : true }));
    };

    /**
     * 调用参数为params的axios请求
     * @param axiosInstance axios实例
     * @param method 请求方法
     * @returns (url: string, params?: any, config?: AxiosRequestConfigs)=> Promise<AxiosResponse<T>>
     */
    var createParamsInParamsHelper = function (axiosInstance, method) { return function (url, params, config) {
        return axiosInstance[method](url, __assign({ params: params }, config)).catch(function (error) {
            return error;
        });
    }; };
    /**
     * 请求参数在pramas字段或者在data字段 的axios请求
     * @param axiosInstance axios实例
     * @param method 请求方法
     * @returns (url: string, params?: any, config?: AxiosRequestConfigs)=> Promise<AxiosResponse<T>>
     */
    var createParamsInParamsOrDataHelper = function (axiosInstance, method) {
        return function (url, params, config) {
            return axiosInstance[method](url, __assign(__assign({}, params), config)).catch(function (error) {
                return error;
            });
        };
    };
    /**
     * 请求参数在data字段的axios请求
     * @param axiosInstance axios 实例
     * @param method 请求方法
     * @returns (url: string, params?: any, config?: AxiosRequestConfigs)=> Promise<AxiosResponse<T>>
     */
    var createParamsInDataHelper = function (axiosInstance, method) {
        return function (url, data, config) {
            return axiosInstance[method](url, data, __assign({}, config)).catch(function (error) { return error; });
        };
    };

    // console.log('addHistoryMethod', addHistoryMethod)
    var AxiosDebounce = /** @class */ (function () {
        function AxiosDebounce() {
            var _this = this;
            // 添加axios 队列
            this.handleAddAxiosQueue = function (config) {
                var key = [
                    config.method,
                    config.url,
                    qs__default['default'].stringify(config.params),
                    qs__default['default'].stringify(config.data),
                ].join('&');
                config.cancelToken =
                    config.cancelToken ||
                        new axios__default['default'].CancelToken(function (cancel) {
                            if (!_this.axiosQueue.has(key))
                                // 如果 axiosQueue 中不存在当前请求，则添加进去
                                _this.axiosQueue.set(key, cancel);
                        });
            };
            // 移除axios 队列 并取消axios 请求
            this.handleRemoveAxiosQueue = function (config) {
                var key = [
                    config.method,
                    config.url,
                    qs__default['default'].stringify(config.params),
                    qs__default['default'].stringify(config.data),
                ].join('&');
                if (_this.axiosQueue.has(key)) {
                    // 如果在 axiosQueue 中存在当前请求标识，需要取消当前请求，并且移除
                    var cancel = _this.axiosQueue.get(key);
                    cancel(key);
                    _this.axiosQueue.delete(key);
                    // 如果 axios 被取消 就不再创建遮罩层了
                    // config.needLoading = false
                }
            };
            // 路由跳转的时候 清空所有没有请求完成的请求
            this.handleClearPending = function () {
                var e_1, _a;
                try {
                    for (var _b = __values(_this.axiosQueue), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var _d = __read(_c.value, 2), url = _d[0], cancel = _d[1];
                        cancel(url);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                _this.axiosQueue.clear();
            };
            // 初始化队列
            this.axiosQueue = new Map();
            // 监听 hash 模式的路由
            // window.onhashchange = function () {
            //     console.log('onhashchange')
            // }
            // // @ts-ignore
            // window.addHistoryListener = addHistoryMethod('historychange')
            // // @ts-ignore
            // history.pushState = addHistoryMethod('pushState')
            // // @ts-ignore
            // history.replaceState = addHistoryMethod('replaceState')
        }
        return AxiosDebounce;
    }());

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z$1 = "/* 遮罩层的样式 */\n.common-axios_mask-layer {\n    position: fixed;\n    top: 0;\n    left: 0;\n    /* display: none; */\n    width: 100%;\n    height: 100%;\n    overflow-x: hidden;\n    overflow-y: auto;\n    outline: 0;\n    opacity: 0.5;\n    background-color: #000;\n}\n\n/* 消息的默认样式 */\n.modal-content {\n    min-width: 380px;\n    box-sizing: border-box;\n    border-width: 1px;\n    border-style: solid;\n    border-color: #ebeef5;\n    position: fixed;\n    left: 50%;\n    top: 20px;\n    transform: translateX(-50%);\n    background-color: #edf2fc;\n    transition: opacity 0.3s, transform 0.4s, top 0.4s;\n    padding: 15px 15px 15px 20px;\n    display: flex;\n    align-items: center;\n    border-radius: 4px;\n}\n\n.modal-content__info {\n    background-color: #f0f9eb;\n    border-color: #e1f3d8;\n}\n.modal-content__success {\n    background-color: #f0f9eb;\n    border-color: #e1f3d8;\n}\n.modal-content__warning {\n    background-color: #fdf6ec;\n    border-color: #faecd8;\n}\n.modal-content__danger {\n    background-color: #fef0f0;\n    border-color: #fde2e2;\n}\n/* 消息节点的默认样式 */\n.modal-content > .modal-body {\n    text-align: center;\n    font-size: 14px;\n}\n\n/* 消息节点的info样式 */\n.modal-content__info > .modal-body {\n    color: #909399;\n}\n/* 消息节点的success样式 */\n.modal-content__success > .modal-body {\n    color: #67c23a;\n}\n/* 消息节点的warning样式 */\n.modal-content__warning > .modal-body {\n    color: #e6a23c;\n}\n/* 消息节点的danger样式 */\n.modal-content__danger > .modal-body {\n    color: #f56c6c;\n}\n/* 遮罩层body */\n.common-axios_loading-box {\n    font-size: 14px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100%;\n    width: 100%;\n}\n\n/* 遮罩层文本节点样式 */\n.common-axios_text {\n    color: #409eff;\n}\n/* 遮罩层loading节点样式 */\n.common-axios_dotting {\n    color: #409eff;\n    display: inline-block;\n    min-width: 2px;\n    min-height: 2px;\n    box-shadow: 2px 0 currentColor, 6px 0 currentColor, 10px 0 currentColor;\n    -webkit-animation: dot 2s infinite step-start both;\n    animation: dot 2s infinite step-start both;\n    margin-left: 2px;\n}\n.common-axios_dotting:before {\n    content: '...';\n} /* IE8 */\n.common-axios_dotting::before {\n    content: '';\n}\n:root .common-axios_dotting {\n    margin-right: 8px;\n}\n\n@-webkit-keyframes dot {\n    25% {\n        box-shadow: none;\n    }\n    50% {\n        box-shadow: 2px 0 currentColor;\n    }\n    75% {\n        box-shadow: 2px 0 currentColor, 6px 0 currentColor;\n    }\n}\n@keyframes dot {\n    25% {\n        box-shadow: none;\n    }\n    50% {\n        box-shadow: 2px 0 currentColor;\n    }\n    75% {\n        box-shadow: 2px 0 currentColor, 6px 0 currentColor;\n    }\n}\n";
    styleInject(css_248z$1);

    // 引入遮罩层的样式
    // 创建遮罩层
    var MaskLayer = /** @class */ (function () {
        function MaskLayer() {
            var _this = this;
            // 创建深色遮罩层
            this.createMaskLayerDom = function () {
                var maskLayerDom = document.createElement('div');
                maskLayerDom.classList.add('common-axios_mask-layer');
                return maskLayerDom;
            };
            // 创建文本节点
            this.createTextDom = function (loadingText) {
                loadingText = loadingText ? loadingText : '拼命加载中';
                var span = document.createElement('span');
                span.classList.add('common-axios_text');
                span.textContent = loadingText;
                return span;
            };
            // 创建旋转的dom节点
            this.createDottingDom = function () {
                var span = document.createElement('span');
                span.classList.add('common-axios_dotting');
                return span;
            };
            // 将文字节点和旋转节点放在一起
            this.createLoadingBox = function () {
                var loadingBox = document.createElement('div');
                loadingBox.classList.add('common-axios_loading-box');
                return loadingBox;
            };
            // 创建loading dom节点
            this.createLoadingDom = function (config) {
                // loading文本
                var loadingText = config.loadingText;
                // 创建文本节点
                var textDom = _this.createTextDom(loadingText);
                // 创建loading节点
                var dottingDom = _this.createDottingDom();
                // 创建load box 为了将两个放在一个节点内
                var loadingBox = _this.createLoadingBox();
                loadingBox.appendChild(textDom);
                loadingBox.appendChild(dottingDom);
                // 创建遮罩层节点
                var maskLayerDom = _this.createMaskLayerDom();
                maskLayerDom.appendChild(loadingBox);
                document.body.appendChild(maskLayerDom);
            };
            // 移除遮罩层
            this.removeLoadingDom = function () {
                // 延迟300毫秒关闭
                setTimeout(function () {
                    var loadingDom = document.querySelector('.common-axios_mask-layer');
                    if (loadingDom) {
                        document.body.removeChild(loadingDom);
                    }
                });
            };
            // 创建遮罩层
            this.createLoading = function (config) {
                // 添加遮罩层任务队列
                _this.addMasklayer(config);
            };
            // 关闭遮罩层
            this.removeLoading = function (config) {
                if (config) {
                    _this.removeMasklayer(config);
                }
                else {
                    _this.removeLoadingDom();
                }
            };
            // 初始化遮罩层队列
            this.masklayerQueue = [];
        }
        // 更新遮罩层的文本
        MaskLayer.prototype.uploadMasklayerContent = function (config) {
            var masklayerTextDom = document.querySelector('.common-axios_text');
            masklayerTextDom.textContent = config.loadingText
                ? config.loadingText
                : '拼命加载中';
        };
        // 创建或者更新遮罩层
        MaskLayer.prototype.uploadMasklayer = function () {
            var config = this.masklayerQueue[this.masklayerQueue.length - 1];
            var hasMasklayerDom = document.querySelector('.common-axios_mask-layer');
            if (hasMasklayerDom) {
                this.uploadMasklayerContent(config);
            }
            else {
                this.createLoadingDom(config);
            }
        };
        // 向遮罩层队列中添加记录
        MaskLayer.prototype.addMasklayer = function (config) {
            this.masklayerQueue.push(config);
            this.uploadMasklayer();
        };
        // 向遮罩层队列中删除记录
        MaskLayer.prototype.removeMasklayer = function (config) {
            var index = this.masklayerQueue.findIndex(function (itemConfig) {
                return JSON.stringify(itemConfig) === JSON.stringify(config);
            });
            this.masklayerQueue.splice(index, 1);
            if (this.masklayerQueue.length) {
                this.uploadMasklayer();
            }
            else {
                this.removeLoadingDom();
            }
        };
        return MaskLayer;
    }());

    var css_248z = ".common-axios_message {\n    min-width: 380px;\n    border-width: 1px;\n    border-style: solid;\n    border-color: #ebeef5;\n    background-color: #edf2fc;\n    transform: translateX(-50%);\n    position: fixed;\n    left: 50%;\n    top: 20px;\n    transition: opacity 0.3s, transform 0.4s, top 0.4s;\n    padding: 15px 15px 15px 20px;\n    display: flex;\n    align-items: center;\n    border-radius: 4px;\n    overflow: hidden;\n}\n\n.common-axios_message_center {\n    justify-content: center;\n}\n\n.common-axios_message .common-axios_message_content {\n    margin-left: 20px;\n    margin: 0;\n    padding: 0;\n    font-size: 14px;\n    line-height: 1;\n}\n\n.common-axios_message .close-button {\n    position: absolute;\n    top: 50%;\n    right: 15px;\n    transform: translateY(-50%);\n    cursor: pointer;\n    /* background-image: url('./img/close.png'); */\n    width: 12px;\n    height: 12px;\n    background-size: 100% 100%;\n}\n\n.common-axios_message_leave {\n    opacity: 0;\n    transform: translate(-50%, -100%);\n}\n\n.common-axios_message_enter {\n    opacity: 1;\n    transform: translate(-50%, -100%);\n}\n\n.common-axios_message_info .common-axios_message_content {\n    color: #909399;\n}\n\n.common-axios_message_success {\n    background-color: #f0f9eb;\n    border-color: #e1f3d8;\n}\n\n.common-axios_message_success .common-axios_message_content {\n    color: #67c23c;\n}\n\n.common-axios_message_warning {\n    background-color: #fdf6ec;\n    border-color: #faecd8;\n}\n\n.common-axios_message_warning .common-axios_message_content {\n    color: #e6a23c;\n}\n\n.common-axios_message_error {\n    background-color: #fef0f0;\n    border-color: #fde2e2;\n}\n\n.common-axios_message_error .common-axios_message_content {\n    color: #f56c6c;\n}\n";
    styleInject(css_248z);

    // 引入message 样式
    // 创建message
    var Message = /** @class */ (function () {
        // 初始化属性
        function Message() {
            // 消息位置
            // private position: 'top' | 'bottom' | 'left' | 'right'
            // 消息内容
            this.message = '';
            // 消息队列
            this.messageQueue = [];
            this.message = '';
            this.messageType = '';
            this.messageDuration = 2000;
            this.body = document.querySelector('body');
            this.id = 0;
        }
        // 通过type 设置dom节点的class
        Message.prototype.setMessageType = function (messageDom, messageType) {
            messageType = messageType ? messageType : 'info';
            var className = "common-axios_message_" + messageType;
            messageDom.classList.add(className);
        };
        // 创建文本节点
        Message.prototype.createTextDom = function (messageDom, message) {
            var p = document.createElement('p');
            p.classList.add('common-axios_message_content');
            p.textContent = message || this.message;
            messageDom.appendChild(p);
        };
        // 移除message 节点
        Message.prototype.removeMessage = function (messageDom, targetId) {
            var _this = this;
            var startIndex = this.messageQueue.findIndex(function (message) { return message.id === targetId; });
            this.messageQueue.splice(startIndex, 1);
            this.updateMessageDom(startIndex);
            //增加移除动画
            messageDom.classList.add('common-axios_message_leave');
            setTimeout(function () {
                _this.body.removeChild(messageDom);
            }, 400);
        };
        Message.prototype.createMessage = function (options) {
            var _this = this;
            // 判断 options 配置
            if (typeof options !== 'object') {
                options = {
                    message: '',
                    messageType: 'info',
                    center: false,
                    messageDuration: 2000,
                    showClose: false,
                };
            }
            var messageDom = document.createElement('div');
            messageDom.classList.add('common-axios_message');
            messageDom.classList.add('common-axios_message_leave');
            if (options.center === true) {
                messageDom.classList.add('common-axios_message_center');
            }
            var targetId = this.id;
            // 向消息队列当中添加消息数据
            this.messageQueue.push({
                id: targetId,
                messageDom: messageDom,
            });
            // 给dom节点添加class
            this.setMessageType(messageDom, options.messageType);
            // 创建文本节点
            this.createTextDom(messageDom, options.message);
            // 设置当前message节点的 zIndex、top
            this.setCurrentMessageDom();
            // 将message节点添加到body当中
            this.body.appendChild(messageDom);
            //增加新增动画
            setTimeout(function () {
                messageDom.classList.remove('common-axios_message_leave');
            }, 100);
            var i = null;
            if (options.showClose === true) {
                i = document.createElement('i');
                i.classList.add('close-button');
                messageDom.appendChild(i);
            }
            var messageDuration = isNaN(Number(options.messageDuration))
                ? this.messageDuration
                : Number(options.messageDuration);
            // 如果duration为0则不需要setTimeout
            var timeId;
            if (messageDuration !== 0) {
                timeId = setTimeout(function () {
                    _this.removeMessage(messageDom, targetId);
                }, messageDuration);
            }
            if (options.showClose === true) {
                // @ts-ignore
                i.addEventListener('click', function () {
                    _this.removeMessage(messageDom, targetId);
                    if (targetId !== -1) {
                        window.clearTimeout(timeId);
                    }
                });
            }
            // 更新id
            this.id++;
        };
        // 设置当前创建的 message节点的 zIndex、top
        Message.prototype.setCurrentMessageDom = function () {
            var index = this.messageQueue.length - 1;
            var targetDom = this.messageQueue[index].messageDom;
            targetDom.style.zIndex = "" + (3000 + index);
            targetDom.style.top = 64 * index + 20 + "px";
        };
        // 批量设置 message的样式
        Message.prototype.updateMessageDom = function (startIndex) {
            // 获取
            for (var i = startIndex; i < this.messageQueue.length; i++) {
                var messageDom = this.messageQueue[i].messageDom;
                // 错误提示的优先级最好 应该放在最上面一层展示
                messageDom.style.zIndex = "" + (3000 + i);
                // 暂不支持换行功能，换行后获取上一个元素的height和top来更新下一个元素的top
                messageDom.style.top = 64 * i + 20 + "px";
            }
        };
        return Message;
    }());

    // 创建防抖实例
    var axiosDebounceInstance = new AxiosDebounce();
    // 遮罩层实例
    var masklayerInstance = new MaskLayer();
    // 创建message实例
    var messageInstance = new Message();
    /**
     * 通过key查找object里面的值
     * @param key object的属性
     * @param object 数据
     * @returns object[key]
     */
    var getValueByKeyInOpject = function (key, object) {
        if (!key)
            return object;
        if (key.includes('.')) {
            var keys = key.split('.');
            var index = 0;
            var temValue = void 0;
            while (index < keys.length) {
                var key_1 = keys[index];
                if (!temValue) {
                    temValue = object[key_1];
                }
                else {
                    temValue = temValue[key_1];
                }
                index++;
            }
            return temValue;
        }
        else {
            return object[key];
        }
    };
    /**
     * 请求前成功回调
     * @param config
     * @returns config
     */
    var axiosRequestCallback = function (config) {
        var needLoading = config.needLoading, loadingText = config.loadingText, axiosDebounce = config.axiosDebounce, contentType = config.contentType, axiosRequestCallback = config.axiosRequestCallback;
        if (axiosRequestCallback && typeof axiosRequestCallback === 'function')
            axiosRequestCallback(config);
        // 先判断是否需要防抖 如果需要 需要防抖的话 如果接口被取消 就不再需要遮罩层
        if (axiosDebounce) {
            axiosDebounceInstance.handleRemoveAxiosQueue(config); // 在请求开始前，对之前的请求做检查取消操作
            axiosDebounceInstance.handleAddAxiosQueue(config); // 将当前请求添加到 pending 中
        }
        // 创建遮罩层
        if (needLoading || loadingText) {
            masklayerInstance.createLoading(config);
        }
        // 修改content-type
        if (contentType) {
            config.headers = __assign(__assign({}, config.headers), { 'Content-Type': contentType });
        }
        return config;
    };
    /**
     * 请求前错误回调
     * @param error 错误信息
     * @returns error
     */
    var axiosRequestErrorCallback = function (error) {
        return Promise.reject(error);
    };
    /**
     *
     * @param axiosResponse 请求返回成功回调
     * @returns
     */
    var axiosResponseCallback = function (axiosResponse) {
        // 关闭遮罩层
        masklayerInstance.removeLoading(axiosResponse.config);
        // 执行自定义事件
        var _a = axiosResponse.config, successKey = _a.successKey, successKeyValue = _a.successKeyValue, dataKey = _a.dataKey, messageKey = _a.messageKey, axiosResponseCallback = _a.axiosResponseCallback;
        // 执行自定义事件
        if (axiosResponseCallback && typeof axiosResponseCallback == 'function')
            axiosResponseCallback(axiosResponse);
        if (successKey && successKeyValue) {
            var _successKeyValue = getValueByKeyInOpject(successKey, axiosResponse.data);
            // 处理成功的情况
            if (_successKeyValue == successKeyValue) {
                if (dataKey) {
                    return Promise.resolve(getValueByKeyInOpject(dataKey, axiosResponse.data));
                }
                else {
                    return Promise.resolve(axiosResponse.data);
                }
            }
            else {
                if (messageKey) {
                    var messageValue = getValueByKeyInOpject(messageKey, axiosResponse.data);
                    messageInstance.createMessage({
                        message: "" + messageValue,
                        messageType: 'error',
                        center: false,
                        messageDuration: 2000,
                        showClose: false,
                    });
                    if (dataKey) {
                        return Promise.resolve(getValueByKeyInOpject(dataKey, axiosResponse.data));
                    }
                    else {
                        return Promise.resolve(axiosResponse.data);
                    }
                }
                else {
                    messageInstance.createMessage({
                        message: axiosResponse.data.message,
                        messageType: 'error',
                        center: false,
                        messageDuration: 2000,
                    });
                    if (dataKey) {
                        return Promise.resolve(getValueByKeyInOpject(dataKey, axiosResponse.data));
                    }
                    else {
                        return Promise.resolve(axiosResponse.data);
                    }
                }
            }
        }
        else {
            return Promise.resolve(axiosResponse);
        }
    };
    /**
     *
     * @param axiosResponse 请求返回错误回调
     * @returns
     */
    var axiosResponseErrorCallback = function (error) {
        if (axios__default['default'].isCancel(error)) {
            messageInstance.createMessage({
                message: "\u68C0\u6D4B\u5230" + error.message + "\u591A\u6B21\u91CD\u590D\u8BF7\u6C42\uFF0C\u63A5\u53E3\u5DF2\u53D6\u6D88",
                messageType: 'error',
                center: true,
            });
        }
        else {
            messageInstance.createMessage({
                message: error.message,
                messageType: 'error',
                center: true,
            });
        }
        return Promise.reject(error);
    };

    /* 创建axios实例 */
    /**
     * @param AxiosRequestConfigs
     */
    var createAxios = function (initAxiosRequestConfig) {
        /* 创建axios实例 */
        var axiosInstance = createAxiosInstance(initAxiosRequestConfig);
        /** 添加请求拦截器 **/
        axiosInstance.interceptors.request.use(function (config) { return axiosRequestCallback(config); }, function (error) { return axiosRequestErrorCallback(error); });
        /** 添加响应拦截器 **/
        axiosInstance.interceptors.response.use(function (axiosResponse) { return axiosResponseCallback(axiosResponse); }, function (error) { return axiosResponseErrorCallback(error); });
        var axiosHelpers = {
            get: createParamsInParamsHelper(axiosInstance, 'get'),
            head: createParamsInParamsHelper(axiosInstance, 'head'),
            delete: createParamsInParamsOrDataHelper(axiosInstance, 'delete'),
            options: createParamsInParamsOrDataHelper(axiosInstance, 'options'),
            post: createParamsInDataHelper(axiosInstance, 'post'),
            put: createParamsInDataHelper(axiosInstance, 'put'),
            patch: createParamsInDataHelper(axiosInstance, 'patch'),
        };
        return axiosHelpers;
    };

    exports.createAxios = createAxios;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
