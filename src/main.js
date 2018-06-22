// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import TagHeader from '@/components/TagHeader';
import router from './router';
import { ToastPlugin, LoadingPlugin, ConfirmPlugin } from 'vux';
import { XHeader } from 'vux';

// Vue.use(XHeader);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);

// Vue.component(TagHeader.name, TagHeader);
Vue.component(XHeader.name, XHeader);
// Vue.component(LoadMore.name, LoadMore);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
