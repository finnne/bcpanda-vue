<template>
  <div class="viewport">
    <header>
      <x-header title="我的订单"></x-header>
    </header>

    <section>
        <div class="list_empty middle-box" v-if="orderList && orderList.length==0">
          <span>
            <img src="../../static/imgs/list_empty.png"/>
            <br/>
            <em>没有相关的订单信息</em>
          </span>
        </div>

        <ul class="sec_list wrapper" v-if="orderList && orderList.length>0">
          <li v-for="order of orderList">
            <span class="order_image" :style="'background-color:#'+ order.backColor">
              <img :src="order.imgAddr"/>
            </span>
            <div class="order_con">
              <div class="clearfix">
                <h4>{{order.pandaName}}</h4>
                <span class="order_buy right" v-if="order.direction==0">购买支出</span>
                <span class="order_sell right" v-if="order.direction==1">出售收入</span>
              </div>
              <p class="clearfix">
                <span>{{order.operateTime}}</span>
                <span class="right">{{(order.direction==1 ? '+' : '-')}}{{order.amount}}竹子</span>
              </p>
            </div>
          </li>
        </ul>
    </section>
  </div>
</template>

<script type="text/javascript">
  import { Pager } from '@/class/entity.js';
  import { Common } from '@/class/common.js';
  const pager = new Pager();
  export default {
    name: 'MyOrderList',
    data () {
      return {
        orderList: null,
      }
    },

    mounted (){
      this.loadPage();
    },

    methods: {
      loadPage: function(callback){
        if(!this.$store.state.loginState){
          return;
        }
        this.$vux.loading.show();
        this.$http.request({
          // url: this.$config.domain+ '/panda/list',
          url: this.$config.domain +'/static/data/order.json',
          success: (dic)=> {
            this.$vux.loading.hide();
            if(dic.code==0){
                let data = dic.result;
                if(data==null){
                  data = [];
                }
                for(let order of data){
                  order.operateTime = Common.foo.formatDate(new Date(order.operateTime), 'yyyy-MM-dd mm:ss');
                }
                pager.set(data, 10);
                this.orderList = pager.next();
              }
              else{
                this.$vux.toast.show({text:dic.msg, type:'warn'});
              }
              callback && callback();
          },
          error: (err)=>{
            this.$vux.loading.hide();
            this.$vux.toast.show({text:err, type:'warn'});
          }
        });
      },
    }
  }
</script>

<style lang="scss" type="text/css" scoped>
  .sec_list{
    &{
      margin-top: 10px;
      margin-bottom: 10px;
    }
    li{
      display: flex;
      width: 100%;
      /*height: 7.5rem;*/
      background-color: #ffffff;
      padding: 0.7rem;
      margin-bottom: 10px;
      border-radius: 3px;
      box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    li > .order_image{
      &{
        display: inline-block;
        width: 6rem;
        height: 6rem;
        background-color: #cccccc;
      }
      img{
        height: 100%;
      }
    }
    li > .order_con{
      &{
        flex-grow: 1;
        display: inline-block;
        padding: 0 0.2rem 0 1rem;
      }
      & > div{
        margin-top: 0.7rem; 
      }
      h4{
        display: inline-block;
        font-size: 1.4rem;
        color: #333333;
      }
      .order_buy{
        display: inline-block;
        width: 8rem;
        height: 2rem;
        line-height: 2rem;
        border-radius: 1rem;
        font-size: 1.2rem;
        color: #ffffff;
        text-align: center;
        background-color: #6bb967;
      }
      .order_sell{
        display: inline-block;
        width: 8rem;
        height: 2rem;
        line-height: 2rem;
        border-radius: 1rem;
        font-size: 1.2rem;
        color: #ffffff;
        text-align: center;
        background-color: #ff5060;
      }
      & > p{
        margin-top: 1rem; 
      }
      & > p > span{
        font-size: 1.2rem;
        color: #999999;
      }
      .right{
        float: right;
      }
    }
  }

  .list_empty{
    &{
      width: 100%;
      height: 100%;
      position: absolute;
      text-align: center;
    }
    & > span{
      display: inline-block;
    }
    img{
      height: 12rem;
    }
    em{
      display: inline-block;
      font-style: normal;
      font-size: 1.5rem;
      color: #999999;
      margin-top: 4rem;
    }
  }

</style>
