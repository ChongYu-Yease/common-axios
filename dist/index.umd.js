
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
    /*遮罩层节点*/
    var loadingNode;
    /**
     * 创建遮罩层
     * @param loadingText string loading遮罩层的文字
     */
    var createLoadingNode = function (loadingText) {
        if (document) {
            var className = "common-axios-loading-node";
            document.body.style.position = 'relative';
            loadingNode = document.createElement('div');
            loadingNode.className = className;
            loadingNode.textContent = loadingText ? loadingText : '拼命加载中...';
            loadingNode.style.color = '#409eff';
            loadingNode.style.fontSize = '14px';
            loadingNode.style.position = 'absolute';
            loadingNode.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            loadingNode.style.margin = '0';
            loadingNode.style.top = '0';
            loadingNode.style.right = '0';
            loadingNode.style.bottom = '0';
            loadingNode.style.left = '0';
            loadingNode.style.transition = 'opacity .3s';
            document.body.appendChild(loadingNode);
        }
    };
    /**
     * 移除遮罩层节点
     */
    var removeLoadingNode = function () {
        if (document) {
            var loadingNode_1 = document.getElementsByClassName('common-axios-loading-node')[0];
            document.body.removeChild(loadingNode_1);
        }
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
    /**
     * 请求前的配置
     * @param config
     * @returns config
     */
    var axiosRequestCallback = function (config) {
        var needLoading = config.needLoading, loadingText = config.loadingText, axiosDebounce = config.axiosDebounce, contentType = config.contentType;
        // 如果需要遮罩层 那就创建遮罩层节点
        if (needLoading) {
            // 向map里面添加数据
            // handleAdd
            createLoadingNode(loadingText);
        }
        // 先判断是否需要防抖 如果需要 需要防抖的话 如果接口被取消 就不再需要遮罩层
        if (axiosDebounce) {
            handleRemoveResponseLog(config); // 在请求开始前，对之前的请求做检查取消操作
            handleAddResponseLog(config); // 将当前请求添加到 pending 中
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
        // removeLoadingNode()
        var codeValue = getValueByKeyInOpject(successKey, axiosResponse.data);
        if (codeValue == successKeyValue) {
            var data = getValueByKeyInOpject(dataKey, axiosResponse.data);
            return Promise.resolve(data);
        }
        else {
            var message = getValueByKeyInOpject(messageKey, axiosResponse.data);
            return Promise.reject(message);
        }
    };
    /**
     *
     * @param axiosResponse 请求返回的参数
     * @returns
     */
    var axiosResponseErrorCallback = function (error) {
        // removeLoadingNode()
        if (axios__default['default'].isCancel(error)) ;
        return Promise.reject(error);
    };
    // 声明一个 Map 用于存储每个请求的标识 和 取消函数
    var logMap = new Map();
    /**
     * 添加请求
     * @param {AxiosRequestConfigs} config
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
            config.needLoading = false;
        }
    };

    /**
     * @param AxiosRequestConfigs
     */
    var createAxios = function (initAxiosRequestConfig) {
        var successKey = initAxiosRequestConfig.successKey || 'code';
        var successKeyValue = initAxiosRequestConfig.successKeyValue || 200;
        var messageKey = initAxiosRequestConfig.messageKey || 'message';
        var dataKey = initAxiosRequestConfig.dataKey || 'data';
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
            // get 请求 参数在 params 里
            get: function (url, params, config) {
                return createParamsInParamsHelper(axiosInstance, 'get')(url, params, config);
            },
            // head 请求 参数在 params 里
            head: function (url, data, config) {
                return createParamsInParamsHelper(axiosInstance, 'head')(url, data, config);
            },
            // delete 请求 params 和 data 里面都可以传递参数
            delete: function (url, params, config) {
                return createParamsInParamsOrDataHelper(axiosInstance, 'delete')(url, params, config);
            },
            // options 请求 params 和 data里面都可以传递参数
            options: function (url, params, config) {
                return createParamsInParamsOrDataHelper(axiosInstance, 'options')(url, params, config);
            },
            // post 请求参数在 data里
            post: function (url, data, config) {
                return createParamsInDataHelper(axiosInstance, 'post')(url, data, config);
            },
            // put 请求参数在 data里
            put: function (url, data, config) {
                return createParamsInDataHelper(axiosInstance, 'put')(url, data, config);
            },
            // patch 请求参数在 data里
            patch: function (url, data, config) {
                return createParamsInDataHelper(axiosInstance, 'patch')(url, data, config);
            },
        };
        return axiosHelpers;
    };

    exports.createAxios = createAxios;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
