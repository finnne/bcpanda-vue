<template>
  <div>
    <div class="sec_banner clearfix">
      <p class="beta_text">区块链熊猫beta版</p>
      <img class="img_panda" src="../assets/imgs/banner_panda.png"/>
      <img class="img_title_1" src="../assets/imgs/banner_h1.png"/>
      <img class="img_title_2" src="../assets/imgs/banner_h2.png"/>
      <button @click="receiveBtnClick()">立即领取</button>
    </div>

    <div class="sec_list">
      <div class="head">
        <h3>熊猫广场</h3>
        <a @click="navToExplain()">什么是区块链熊猫？</a>
      </div>

      <ul class="list clearfix" v-if="pandaList.length>0">
        <li v-for="panda of pandaList" @click="showPandaDetail(panda.pandaId)">
          <div class="img_con" :style="'background-color:#'+ panda.backColor">
            <span class="flex-center"><img :src="panda.url"></span>
          </div>
          <i>{{panda.degree}}</i>
          <h6>{{panda.name}}</h6>
          <p>
            第{{panda.generation}}代<small> |</small>
            <span class="price" v-if="panda.state==2">{{panda.price}}竹子</span>
            <span v-if="panda.state!=2">暂未定价</span>
          </p>
        </li>
      </ul>

      <ul class="list clearfix" v-if="pandaList.length==0">
        <li v-for="i of 4">
          <div class="img_con">
            <span></span>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import { Http } from '@/class/http.js';
  import { Pager } from '@/class/entity.js';
  import { Common } from '@/class/common.js';

  const pager = new Pager();

  export default {
    name: 'TabHome',

    data () {
      return {
        pandaList: []
      }
    },

    mounted (){
      this.loadPage();
    },

    methods: {
      loadPage : function(callback){
        Http.request({
          // url: app.Config.domain+ '/panda/list',
          url: '/static/data/list.json',
          success: (dic)=> {
            if (dic.code == 0) {
              let pandas = dic.result.particulars;
              if (pandas == null) {
                pandas = [];
              }
              for (let panda of pandas) {
                panda.degree = Common.foo.getDegreeTextByNum(panda.degree);
              }
              pager.set(pandas, 4);
              // this.setData({
              //   pandaList: this.pager.next(),
              // });
              this.pandaList = pager.next();
              // this.pullBottomFlag = true;
            }
            else {
              // app.Toast.show('request is error');
              alert('request is error');
            }
            callback && callback();
          },
          error: (err)=>{
            console.log('err', err);
          }
        });
        
      }
    },


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
  .sec_banner{
    &{
      height: 17rem;
      background: url('../assets/imgs/banner_bg.png') no-repeat center center;
      background-size: cover;
      padding-left: 2rem;
      position: relative;
    }
    .beta_text{
      font-size: 1.2rem;
      color: #000000;
      position: absolute;
      right: 10px;
      top:10px;
    }
    .img_panda{
      height: 12.8rem;
      position: absolute;
      right: 5rem;
      bottom: 0.8rem;
    }
    .img_title_1{
      display: block;
      height: 2.5rem;
      margin-top: 3.2rem;
    }
    .img_title_2{
      display: block;
      height: 1.8rem;
      margin-top: 1rem;
    }
    button{
      width: 13.5rem;
      height: 3.5rem;
      font-size: 1.4rem;
      color: #ffffff;
      font-weight: bold;
      background-color: #709039;
      border-radius: 3px;
      margin-top: 1rem;
    }
  }
  .sec_list{
    &{
      margin-bottom: 20px;
    }
    .head{
      &{
        padding: 1.2rem 0 1rem 0;
        overflow: hidden;
      }
      h3{
        display: inline-block;
        height: 1.6rem;
        border-left: 5px solid #abe2ff;
        padding-left: 8px;
        margin: 0;
        font-size: 1.6rem;
        line-height: 1.6rem;
        float: left;
      }
      a{
        font-size: 1.3rem;
        line-height: 1.6rem;
        color: #50aefe;
        margin-right: 10px;
        float: right;
      }
    }
    .list{
      &{
        width: 94%;
        margin: 0 auto;
      }
      li{
        width: 48%;
        float: left;
        border-radius: 3px;
        margin-bottom: 15px;
        position: relative;
        overflow: hidden;
      }
      li:nth-child(2n){
        margin-left: 4%;
      }
      li > .img_con{
        width: 100%;
        padding-top: 100%; 
        position: relative;
        background-color: #dddddd;
      }
      li > .img_con > span{
        display: block;
        width:100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
      li > .img_con > span > img{
        height: 90%;
      }
      li > h6{
        font-size: 1.6rem;
        font-weight: normal;
        color: #333333;
        padding: 8px 0 4px 0;
      }
      li > p{
        display: block;
        margin-bottom: 6px;
        font-size: 1.3rem;
        color: #999999;
      }
      li small{
        font-size: 13px;
        font-weight: lighter;
        margin: 0 4px;
      }
      li .price{
        color: #ff5060;
      }
      li > i{
        font-size: 1.2rem;
        color: #ffffff;
        position: absolute;
        top: 10px;
        right: 10px;
        font-style: normal;
        padding: 6px 6px 10px 6px;
        background: url('../assets/imgs/tag_bg.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
</style>
