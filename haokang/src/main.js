import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import AOS from "aos"
import "aos/dist/aos.css"
import animated from 'animate.css'
import axios from 'axios'
import Video from 'video.js'
Vue.prototype.$video = Video
Vue.prototype.axios = axios;
Vue.use(animated)
Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.use(AOS);
AOS.init();
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");

