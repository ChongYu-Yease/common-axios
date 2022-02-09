
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

    /**
     * 创建axios实例
     * @param config
     */
    var createAxiosInstance = function (config) {
        return axios__default['default'].create(__assign(__assign({}, config), { withCredentials: config && config.withCredentials !== undefined
                ? config.withCredentials
                : true }));
    };

    /**
     * 调用参数为params的axios请求
     * @param axiosInstance axios实例
     * @param method 请求方法
     * @returns (url: string, params?: any, config?: AxiosRequestConfigs)=> Promise<AxiosResponse<T>>
     */
    var createParamsInParamsHelper = function (axiosInstance, method) {
        return function (url, params, config) {
            return axiosInstance[method](url, __assign({ params: params }, config)).catch(function (error) {
                return error;
            });
        };
    };
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
            return axiosInstance[method](url, __assign({ data: data }, config)).catch(function (error) { return error; });
        };
    };

    // 声明一个 Map 用于存储每个请求的标识 和 取消函数
    var logMap = new Map();
    /**
     * 添加请求
     * @param  config axios的配置
     */
    var handleAddResponseLog = function (config) {
        var key = [
            config.method,
            config.url,
            qs__default['default'].stringify(config.params),
            qs__default['default'].stringify(config.data),
        ].join('&');
        config.cancelToken =
            config.cancelToken ||
                new axios__default['default'].CancelToken(function (cancel) {
                    if (!logMap.has(key))
                        // 如果 logMap 中不存在当前请求，则添加进去
                        logMap.set(key, cancel);
                });
    };
    /**
     * 移除请求
     * @param {AxiosRequestConfigs} config
     */
    var handleRemoveResponseLog = function (config) {
        var key = [
            config.method,
            config.url,
            qs__default['default'].stringify(config.params),
            qs__default['default'].stringify(config.data),
        ].join('&');
        if (logMap.has(key)) {
            // 如果在 logMap 中存在当前请求标识，需要取消当前请求，并且移除
            var cancel = logMap.get(key);
            cancel(key);
            logMap.delete(key);
            //如果 axios 被取消 就不再创建遮罩层了
            config.needLoading = false;
        }
    };

    /**
     * 创建遮罩层
     * return HTMLDivElement
     */
    var createMaskLayerNode = function () {
        var className = "common-axios-mask-layer";
        var maskLayerNode = document.createElement('div');
        maskLayerNode.className = className;
        return maskLayerNode;
    };
    /**
     * 创建loading节点
     * @param loadingText loading文本
     * @returns HTMLSpanElement
     */
    var createTextNode = function (loadingText) {
        if (!loadingText) {
            loadingText = '拼命加载中';
        }
        var span = document.createElement('span');
        span.className = 'common-axios-text';
        span.textContent = loadingText;
        return span;
    };
    /**
     * 创建带loading效果的节点
     * @returns HTMLSpanElement
     */
    var createDottingNode = function () {
        var span = document.createElement('span');
        span.className = 'common-axios-dotting';
        return span;
    };
    /**
     * 创建遮罩层
     * @param loadingText string loading遮罩层的文字
     */
    var createLoadingNode = function (loadingText) {
        if (document) {
            // 创建文本节点
            var textNode = createTextNode(loadingText);
            // 创建loading节点
            var dottingNode = createDottingNode();
            var loadingBody = document.createElement('div');
            loadingBody.className = 'common-axios-loading';
            loadingBody.appendChild(textNode);
            loadingBody.appendChild(dottingNode);
            // 创建遮罩层节点
            var maskLayerNode = createMaskLayerNode();
            maskLayerNode.appendChild(loadingBody);
            document.body.appendChild(maskLayerNode);
        }
    };
    /**
     * 移除遮罩层节点
     */
    var removeLoadingNode = function () {
        if (document) {
            var loadingNode = document.getElementsByClassName('common-axios-mask-layer')[0];
            if (loadingNode) {
                document.body.removeChild(loadingNode);
            }
        }
    };

    var requestLog = [];
    /**
     * 添加axios请求记录 并返回需不要需要创建遮罩层
     * @param config axios resquest config
     * @returns boolean
     */
    var addRequestLog = function (config) {
        var key = [
            config.method,
            config.url,
            qs__default['default'].stringify(config.params),
            qs__default['default'].stringify(config.data),
        ].join('&');
        if (requestLog.length === 0) {
            requestLog.push(key);
            return true;
        }
        else {
            requestLog.push(key);
            return false;
        }
    };
    var removeRequestLog = function () {
        requestLog.pop();
        if (requestLog.length === 0)
            removeLoadingNode();
    };
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
     * 请求拦截器callback
     * @param config
     * @returns config
     */
    var axiosRequestCallback = function (config) {
        var needLoading = config.needLoading, loadingText = config.loadingText, axiosDebounce = config.axiosDebounce, contentType = config.contentType;
        // 先判断是否需要防抖 如果需要 需要防抖的话 如果接口被取消 就不再需要遮罩层
        if (axiosDebounce) {
            handleRemoveResponseLog(config); // 在请求开始前，对之前的请求做检查取消操作
            handleAddResponseLog(config); // 将当前请求添加到 pending 中
        }
        // 如果需要遮罩层 那就创建遮罩层节点
        if (needLoading) {
            var needLoad = addRequestLog(config);
            // TODO 向map里面添加数据
            if (needLoad)
                createLoadingNode(loadingText);
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
        removeLoadingNode();
        return Promise.reject(error);
    };
    /**
     *
     * @param axiosResponse 请求返回的参数
     * @returns
     */
    var axiosResponseCallback = function (axiosResponse, _a) {
        var successKey = _a.successKey, successKeyValue = _a.successKeyValue, messageKey = _a.messageKey, dataKey = _a.dataKey;
        removeRequestLog();
        // 请求完毕无论成功与否，关闭遮罩层
        if (successKey && successKeyValue) {
            var codeValue = getValueByKeyInOpject(successKey, axiosResponse.data);
            if (codeValue == successKeyValue) {
                // createMessage('成功了!', 'success')
                // createMessage('默认的!', 'info')
                // createMessage('警告的!', 'warning')
                // createMessage('错误的!', 'danger')
                if (dataKey) {
                    return Promise.resolve(getValueByKeyInOpject(dataKey, axiosResponse.data));
                }
                else {
                    return Promise.resolve(axiosResponse.data);
                }
            }
            else {
                if (messageKey) {
                    var message = getValueByKeyInOpject(messageKey, axiosResponse.data);
                    return Promise.reject(message);
                }
                return Promise.reject(axiosResponse.data);
            }
        }
        else {
            return Promise.resolve(axiosResponse);
        }
    };
    /**
     *
     * @param axiosResponse 请求返回的参数
     * @returns
     */
    var axiosResponseErrorCallback = function (error) {
        removeLoadingNode();
        if (axios__default['default'].isCancel(error)) ;
        return Promise.reject(error);
    };

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

    var css_248z = "html,\nbody {\n    margin: 0;\n    padding: 0;\n    position: relative;\n}\n/* 遮罩层的样式 */\n.common-axios-mask-layer {\n    position: fixed;\n    top: 0;\n    left: 0;\n    /* display: none; */\n    width: 100%;\n    height: 100%;\n    overflow-x: hidden;\n    overflow-y: auto;\n    outline: 0;\n    opacity: 0.5;\n    background-color: #000;\n}\n/* 消息的默认样式 */\n.modal-content {\n    min-width: 380px;\n    box-sizing: border-box;\n    border-width: 1px;\n    border-style: solid;\n    border-color: #ebeef5;\n    position: fixed;\n    left: 50%;\n    top: 20px;\n    transform: translateX(-50%);\n    background-color: #edf2fc;\n    transition: opacity 0.3s, transform 0.4s, top 0.4s;\n    padding: 15px 15px 15px 20px;\n    display: flex;\n    align-items: center;\n    border-radius: 4px;\n}\n.modal-content__info {\n    background-color: #f0f9eb;\n    border-color: #e1f3d8;\n}\n.modal-content__success {\n    background-color: #f0f9eb;\n    border-color: #e1f3d8;\n}\n.modal-content__warning {\n    background-color: #fdf6ec;\n    border-color: #faecd8;\n}\n.modal-content__danger {\n    background-color: #fef0f0;\n    border-color: #fde2e2;\n}\n/* 消息节点的默认样式 */\n.modal-content > .modal-body {\n    text-align: center;\n    font-size: 14px;\n}\n\n/* 消息节点的info样式 */\n.modal-content__info > .modal-body {\n    color: #909399;\n}\n/* 消息节点的success样式 */\n.modal-content__success > .modal-body {\n    color: #67c23a;\n}\n/* 消息节点的warning样式 */\n.modal-content__warning > .modal-body {\n    color: #e6a23c;\n}\n/* 消息节点的danger样式 */\n.modal-content__danger > .modal-body {\n    color: #f56c6c;\n}\n/* 遮罩层body */\n.common-axios-loading {\n    font-size: 14px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100%;\n    width: 100%;\n}\n/* 遮罩层文本节点样式 */\n.common-axios-text {\n    color: #409eff;\n}\n/* 遮罩层loading节点样式 */\n.common-axios-dotting {\n    color: #409eff;\n    display: inline-block;\n    min-width: 2px;\n    min-height: 2px;\n    box-shadow: 2px 0 currentColor, 6px 0 currentColor, 10px 0 currentColor;\n    -webkit-animation: dot 2s infinite step-start both;\n    animation: dot 2s infinite step-start both;\n    margin-left: 2px;\n}\n.common-axios-dotting:before {\n    content: '...';\n} /* IE8 */\n.common-axios-dotting::before {\n    content: '';\n}\n:root .common-axios-dotting {\n    margin-right: 8px;\n}\n\n@-webkit-keyframes dot {\n    25% {\n        box-shadow: none;\n    }\n    50% {\n        box-shadow: 2px 0 currentColor;\n    }\n    75% {\n        box-shadow: 2px 0 currentColor, 6px 0 currentColor;\n    }\n}\n@keyframes dot {\n    25% {\n        box-shadow: none;\n    }\n    50% {\n        box-shadow: 2px 0 currentColor;\n    }\n    75% {\n        box-shadow: 2px 0 currentColor, 6px 0 currentColor;\n    }\n}\n";
    styleInject(css_248z);

    /**
     * @param AxiosRequestConfigs
     */
    var createAxios = function (initAxiosRequestConfig) {
        var successKey = initAxiosRequestConfig.successKey;
        var successKeyValue = initAxiosRequestConfig.successKeyValue;
        var messageKey = initAxiosRequestConfig.messageKey;
        var dataKey = initAxiosRequestConfig.dataKey;
        var temSuccessKey;
        var temSuccessKeyValue;
        var temMessageKey;
        var temDataKey;
        /* 创建axios实例 */
        var axiosInstance = createAxiosInstance(initAxiosRequestConfig);
        /** 添加请求拦截器 **/
        axiosInstance.interceptors.request.use(function (config) {
            var successKey = config.successKey, successKeyValue = config.successKeyValue, messageKey = config.messageKey, dataKey = config.dataKey;
            temSuccessKey = successKey ? successKey : '';
            temSuccessKeyValue = successKeyValue ? successKeyValue : '';
            temMessageKey = messageKey ? messageKey : '';
            temDataKey = dataKey ? dataKey : '';
            return axiosRequestCallback(config);
        }, function (error) { return axiosRequestErrorCallback(error); });
        /** 添加响应拦截器  **/
        axiosInstance.interceptors.response.use(function (axiosResponse) {
            return axiosResponseCallback(axiosResponse, {
                // 临时配置的优先级更高
                successKey: temSuccessKey ? temSuccessKey : successKey,
                successKeyValue: temSuccessKeyValue
                    ? temSuccessKeyValue
                    : successKeyValue,
                dataKey: temDataKey ? temDataKey : dataKey,
                messageKey: temMessageKey ? temMessageKey : messageKey,
            });
        }, function (error) { return axiosResponseErrorCallback(error); });
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
