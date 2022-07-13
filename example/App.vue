<template>
  <div class='common-axios'>
    common-axios 测试demo
  </div>
</template>

<script lang='ts' setup>
import { onMounted } from "vue"
import { createAxios, } from "common-axios"
// 创建common-axios 实例
const axios = createAxios({
  baseURL: "http://plutus-api.vdian.net",
  withCredentials: true,
  // needLoading: true,
  // loadingText: "数据加载中"
})

const handleGetSlowTableData = async () => {

  const result = await axios.post(
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
  console.log("result", result);
};

// // 测试用的快接口 用于测试默认配置
// // http://plutus-api.vdian.net/api/matter/record/v1/checkout/page
// const handleGetFastTableData = async () => {
//   const result = await commonAxios.post<{}>(
//     "/api/matter/record/v1/checkout/page",
//     {
//       businessOwners: null,
//       checkoutStatus: "",
//       companyCodes: null,
//       financeOwners: null,
//       matterNameLike: "",
//       // pageNumber: 1,
//       // pageSize: 20,
//       // version: "2022-05",
//     },
//     {
//       messageDuration: 2000,
//       messagePosition: "right", //默认消息位置
//       successStatusKey: "code",
//       successStatusKeyValue: "000000",
//       successMessageContentKey: "status",
//       // successMessageDuration: 1000,
//       // successMessagePosition: "center", //测试成功提示位置
//       successMessageContent: "哈哈哈成功了",
//       errorStatusKey: "code",
//       errorStatusKeyValue: "999999",
//       errorMessageContentKey: "message",
//       errorMessageDuration: 2000,
//       errorMessagePosition: "center", //测试错误提示位置
//       errorMessageContent: "失败了哈哈哈",
//       needLoading: true,
//       dataKey: "",
//     }
//   );
//   // console.log("result", result);
// };
onMounted(() => {

  // handleGetSlowTableData();
  // handleGetSlowTableData();
  // handleGetSlowTableData();
  // handleGetSlowTableData();
  // handleGetFastTableData();
  // handleGetFastTableData();
});
</script>
<style lang='less' scoped>
</style>