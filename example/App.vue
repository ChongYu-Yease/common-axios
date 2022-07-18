<template>
  <h3>common-axios测试demo</h3>
  <div class="test-buttons">
    <button class="test-button slow" @click="handleGetSlowTableData">请求一个慢接口</button>
    <button class="test-button slow" @click="handleSyncGetMoreSlowTableData">同步请求多个慢接口</button>
    <button class="test-button slow" @click="handleASyncGetMoreSlowTableData">异步请求多个慢接口</button>
    <button class="test-button fast" @click="handleOnceGetFastTableData">请求一个快接口</button>
    <button class="test-button fast" @click="handleSyncGetFastTableData">同步请求多个快接口</button>
    <button class="test-button fast" @click="handleASyncGetFastTableData">异步请求多个快接口</button>
  </div>
</template>

<script lang='ts' setup>
import { createAxios, } from "common-axios"

// 创建common-axios 实例
const commonAxios = createAxios({
  baseURL: "http://plutus-api.vdian.net",
  withCredentials: true,
  // needLoading: true,
  // loadingText: "数据加载中"
})

/**
 * 请求一个慢接口数据
 */
const handleGetSlowTableData = async () => {

  const result = await commonAxios.post(
    "/api/checkoutDetails/v1/data",
    {
      matterId: 69,
      metaId: 82,
      parentMetaId: 121,
      queryParams: {},
      type: 2,
      uid: null,
      version: "2022-04",
    },
    {
      successStatusKey: "code",
      successStatusKeyValue: "000000",
      successMessageContentKey: "status",
      successMessageDuration: 2000,
      successMessagePosition: "right",
      axiosDebounce: true,
    }
  );
}

/**
 * 同步请求多个慢接口
 */
const handleSyncGetMoreSlowTableData = async () => {
  await handleGetSlowTableData()
  await handleGetSlowTableData()
  await handleGetSlowTableData()
  await handleGetSlowTableData()
}

/**
 * 异步请求多个慢接口
 */
const handleASyncGetMoreSlowTableData = () => {
  handleGetSlowTableData()
  handleGetSlowTableData()
  handleGetSlowTableData()
}

/**
 * 测试用的快接口 用于测试默认配置
 */
const handleGetFastTableData = async (errorMessageContent: string, messageDuration?: number) => {
  const result = await commonAxios.post<{}>(
    "/api/matter/record/v1/checkout/page",
    {
      businessOwners: null,
      checkoutStatus: "",
      companyCodes: null,
      financeOwners: null,
      matterNameLike: "",
      // pageNumber: 1,
      // pageSize: 20,
      // version: "2022-05",
    },
    {
      messageDuration: messageDuration || 2000,
      messagePosition: "right", //默认消息位置
      successStatusKey: "code",
      successStatusKeyValue: "000000",
      successMessageContentKey: "status",
      // successMessageDuration: 1000,
      // successMessagePosition: "center", //测试成功提示位置
      successMessageContent: "哈哈哈成功了",
      errorStatusKey: "code",
      errorStatusKeyValue: "999999",
      errorMessageContentKey: "message",
      errorMessageDuration: messageDuration || 2000,
      errorMessagePosition: "center", //测试错误提示位置
      errorMessageContent: errorMessageContent,
      needLoading: true,
      dataKey: "",
    }
  );
}

const handleOnceGetFastTableData = () => {
  handleGetFastTableData('哈哈哈失败了1')
}

/**
 * 同步请求多个快接口
 */
const handleSyncGetFastTableData = async () => {
  await handleGetFastTableData('哈哈哈失败了1', 3000)
  await handleGetFastTableData('哈哈哈失败了2', 2000)
  await handleGetFastTableData('哈哈哈失败了3', 1000)
}

/**
 * 异步请求多个快接口
 */
const handleASyncGetFastTableData = () => {
  // handleGetFastTableData()
  // handleGetFastTableData()
  // handleGetFastTableData()
}

</script>
<style lang='less' scoped>
.test-buttons {
  z-index: 101;

  .test-button {
    margin-right: 5px;
    color: #fff;

    &.fast {
      background-color: #67c23a;
      border-color: #67c23a;
    }

    &.slow {
      background-color: #f56c6c;
      border-color: #f56c6c;
    }
  }
}
</style>