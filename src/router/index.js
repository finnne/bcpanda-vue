import Vue from 'vue'
import Router from 'vue-router'
import TabHome from '@/pages/tab-home'
import TabMine from '@/pages/tab-mine'
import SignIn from '@/pages/sign-in'
import SignUp from '@/pages/sign-up'
import Explain from '@/pages/explain'
import Agreement from '@/pages/agreement'
import SuccessReceive from '@/pages/success-receive'
import SuccessBuy from '@/pages/success-buy'
import PandaDetail from '@/pages/panda-detail'
import MyOrderList from '@/pages/my-order-list'
import MyPandaList from '@/pages/my-panda-list'
import MyPandaDetail from '@/pages/my-panda-detail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TabHome',
      component: TabHome,
      meta:{index:0},
    },
    {
      path: '/tab-mine',
      name: 'TabMine',
      component: TabMine,
      meta:{index:0},
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn,
      meta:{index:1},
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
      meta:{index:2},
    },
    {
      path: '/explain',
      name: 'Explain',
      component: Explain,
      meta:{index:1},
    },
    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement,
      meta:{index:3},
    },
    {
      path: '/panda-detail',
      name: 'PandaDetail',
      component: PandaDetail,
      meta:{index:1},
    },
    {
      path: '/success-receive',
      name: 'SuccessReceive',
      component: SuccessReceive,
      meta:{index:1},
    },
    {
      path: '/success-buy',
      name: 'SuccessBuy',
      component: SuccessBuy,
      meta:{index:2},
    },
    {
      path: '/my-order-list',
      name: 'MyOrderList',
      component: MyOrderList,
      meta:{index:3},
    },
    {
      path: '/my-panda-list',
      name: 'MyPandaList',
      component: MyPandaList,
      meta:{index:3},
    },
    {
      path: '/my-panda-detail',
      name: 'MyPandaDetail',
      component: MyPandaDetail,
      meta:{index:4},
    },

  ]
})
