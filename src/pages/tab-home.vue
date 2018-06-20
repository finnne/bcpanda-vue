<template>
  <div>
    <TagHeader>
      区块链熊猫
      <!-- <span slot="right">登录</span> -->
    </TagHeader>

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

      <TagPandaList v-bind:listData="pandaList" v-bind:pandaClick="showPandaDetail"></TagPandaList>

    </div>

  </div>
</template>

<script>
  import { Http } from '@/class/http.js';
  import { Pager } from '@/class/entity.js';
  // import { Helper } from '@/class/helper.js';
  import { Common } from '@/class/common.js';

  import TagPandaList from '@/components/TagPandaList.vue';

  const pager = new Pager();

  export default {
    name: 'TabHome',
    components: { TagPandaList },
    data () {
      return {
        pandaList: []
      }
    },

    mounted (){
      this.loadPage();
    },

    methods: {
      loadPage: function(callback){
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
              this.pandaList = pager.next();
              // this.pullBottomFlag = true;
            }
            else {
              this.$Message.error(dic.msg);
            }
            callback && callback();
          }
        });
      },
      showPandaDetail: function(id){
        console.log('id',id);
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
    
  }

</style>
