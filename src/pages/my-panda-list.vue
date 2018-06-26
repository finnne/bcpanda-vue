<template>
  <div class="viewport">
    <header>
      <x-header title="我的熊猫"></x-header>
    </header>

    <section>
      <div class="sec_list clearfix">
        <div v-if="pandaList && pandaList.length==0">
          <div class="panda_empty">
            <img src="../../static/imgs/empty_panda.png"/>
            <h5>您还没有自己的熊猫</h5>
            <p v-if="!adoptStatus">立即去领养一只吧</p>
          </div>
          <button class="btn-base wrapper" @click="receiveBtnClick()" v-if="!adoptStatus">免费领养</button>
        </div>

        <TagPandaList v-if="(pandaList && pandaList.length>0)" v-bind:listData="pandaList" v-bind:pandaClick="showPandaDetail"></TagPandaList>
      </div>
    </section>
  </div>
</template>

<script type="text/javascript">
  import { Pager } from '@/class/entity.js';
  import { Common } from '@/class/common.js';
  import TagPandaList from '@/components/TagPandaList.vue';
  const pager = new Pager();
  export default {
    name: 'MyPandaList',
    components: { TagPandaList },
    data () {
      return {
        pandaList: null,
        adoptStatus: true,
        loadFlag: false,
      }
    },

    mounted (){
      this.loadPage();
      // this.pandaList = [];
    },

    methods: {
      loadPage: function(callback){
        if(!this.$store.state.loginState){
          return;
        }
        this.$vux.loading.show();
        this.$http.request({
          // url: this.$config.domain+ '/panda/list',
          url: this.$config.domain +'/static/data/myPandas.json',
          success: (dic)=> {
            this.$vux.loading.hide();
            if(dic.code==0){
              this.adoptStatus = dic.result.adoptStatus;
              let pandas = dic.result.particulars;
              if (pandas == null) {
                pandas = [];
              }
              for(let panda of pandas){
                panda.degree = Common.foo.getDegreeTextByNum(panda.degree);
              }
              pager.set(pandas, 40);
              this.pandaList = pager.next();
              if(callback) callback();
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

      receiveBtnClick: function(){
        if(this.$store.state.loginState){
          this.$vux.loading.show();
          this.$http.request({
            url: this.$config.domain +'/static/data/adopt.json',
            success: (dic)=> {
              this.$vux.loading.hide();
              if(dic.code==0){
                let panda = dic.result;
                panda.degree = Common.foo.getDegreeTextByNum(panda.degree);
                // this.events.publish('updateMinePage');
                // this.nav.root.push(ReceivePage, panda);
                this.$router.push({ name: 'SuccessReceive', params:{ panda } });

              }
              else{
                this.$vux.toast.show({text:dic.msg, type:'warn'});
              }
            },
            error: (err)=>{
                this.$vux.loading.hide();
                this.$vux.toast.show({text:err, type:'warn'});
            }
          });
        }
        else{
          this.$router.push({ name: 'SignIn'});
        }
      },

      showPandaDetail: function(id){
        let panda;
        for(let p of this.pandaList){
          if(p.pandaId==id){
            panda = p;
          }
        }
        if(panda){
          this.$router.push({ name: 'MyPandaDetail', params:{ panda } });
        }
      },

    },
  }
</script>

<style lang="scss" type="text/css" scoped>
  .sec_list{
    &{
      margin-top: 10px;
      margin-bottom: 20px;
    }

    .panda_empty{
      &{
        width: 94%;
        padding: 2rem 0;
        background-color: #abe2ff;
        border-radius: 5px;
        text-align: center;
        margin: 0 auto 20px auto;
      }
      img{
        display: block;
        height: 7.8rem;
        margin: 0 auto;
      }
      h5{
        font-size: 2rem;
        color: #333333;
        text-align: center;
        margin: 2.2rem auto 0 auto;
      }
      p{
        font-size: 1.4rem;
        color: #333333;
        text-align: center;
        margin: 1rem auto 0 auto;
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
        background: url('../../static/imgs/tag_bg.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }
    
  }

</style>
