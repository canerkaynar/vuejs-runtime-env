import { createApp } from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import { getRuntimeConfig } from "./utils/getRuntimeConfig";
import axios from "axios";

const runtimeEnvVars = getRuntimeConfig() || {};
const mergedEnvVars = {
  ...process.env,
  ...runtimeEnvVars
};
axios.defaults.baseURL = mergedEnvVars.VUE_APP_API_URL;

createApp(App)
  .use(store)
  .use(router)
  .mixin({
    data() {
      return {
        env: mergedEnvVars
      };
    }
  })
  .mount("#app");
