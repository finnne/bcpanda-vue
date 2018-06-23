// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// import TagHeader from '@/components/TagHeader';

import ObjectStroe from './store/index.js';
import ObjectRouter from './router/index.js';

import { ToastPlugin, LoadingPlugin, ConfirmPlugin } from 'vux';
import { XHeader } from 'vux';

import { Http } from '@/class/http.js';
import Config from '../static/js/appConfig.js';

// Vue.use(XHeader);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);

// Vue.component(TagHeader.name, TagHeader);
Vue.component(XHeader.name, XHeader);
// Vue.component(LoadMore.name, LoadMore);

Vue.config.productionTip = false;

Vue.prototype.$http = Http;
Vue.prototype.$config = Config;
// Vue.prototype.$request = new Request(this);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // http: { "a": 12334},
  store: ObjectStroe,
  router: ObjectRouter,
  components: { App },
  template: '<App/>',
})
