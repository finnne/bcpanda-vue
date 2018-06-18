import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import TabHome from '@/pages/tab-home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TabHome',
      component: TabHome
    }
  ]
})
