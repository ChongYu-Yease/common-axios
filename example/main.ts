
import { createApp } from "vue";
import App from "./App.vue";
import { createAxios } from "common-axios"
const axios = createAxios({

})
console.log("axios", axios);

const app = createApp(App)
// app.use(Vue3MonacoEditor)
app.mount("#app");