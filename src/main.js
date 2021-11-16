import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;

const nasaAxios = axios.create({
  baseURL: "https://api.nasa.gov",
  params: {
    api_key: process.env.VUE_APP_NASA_KEY,
  },
});
Vue.prototype.$axios = nasaAxios;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
