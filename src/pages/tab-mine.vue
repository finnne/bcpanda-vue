<template>
  <div class="viewport">

    <header>
      <x-header title="我的" :left-options="{showBack:false}"></x-header>
    </header>

    <section>

      <!-- <TagSignIn ParentCpnt="TabHome" @onLogin="changeLoginState()" v-if="!isLogin"></TagSignIn> -->
      <TagSignIn ParentCpnt="TabHome" v-if="!isLogin"></TagSignIn>

      <div v-if="isLogin">
        <div class="sec_banner">
          <div class="flex-middle">
              <span class="user_head"><img :src="userInfo.headUrl"/></span>
              <h4 class="user_name">　{{userInfo.userName}}　</h4>
              <h4 class="user_tel">　{{userInfo.phone}}　</h4>
          </div>
        </div>

        <ul class="link_group">
          <li @click="myPandaBtnClick()">
            <span class="link_icon middle-box">
              <img src="../../static/imgs/icon_panda.png"/>
            </span>
            <div class="link_block middle-box">
              <label>我的熊猫</label>
              <span class="link_right middle-box">
                <img class="link_arrow" src="../../static/imgs/icon_arrow.png"/>
              </span>
            </div>
          </li>
          <li @click="myOrderBtnClick()">
            <span class="link_icon middle-box">
              <img src="../../static/imgs/icon_order.png"/>
            </span>
            <div class="link_block middle-box">
              <label>我的订单</label>
              <span class="link_right middle-box">
                <img class="link_arrow" src="../../static/imgs/icon_arrow.png"/>
              </span>
            </div>
          </li>
        </ul>

        <ul class="link_group">
          <li>
            <span class="link_icon middle-box">
              <img src="../../static/imgs/icon_banboo.png"/>
            </span>
            <div class="link_block middle-box">
              <label>我的竹子</label>
              <span class="link_right middle-box">
                <em class="colred">{{userInfo.banbooScore}}</em>
              </span>
            </div>
          </li>
          <li @click="signinClick()">
            <span class="link_icon middle-box">
              <img src="../../static/imgs/icon_sign.png"/>
            </span>
            <div class="link_block middle-box">
              <label>每日签到</label>
              <span class="link_right middle-box">
                <em :class="(userInfo.signstate ? 'colgray' : 'colblue')">{{userInfo.signstate ? "今日已领" : "签到领竹子"}}</em>
                <img class="link_arrow" src="../../static//imgs/icon_arrow.png"/>
              </span>
            </div>
          </li>
        </ul>

        <div class="wrapper">
          <button class="btn-hollow logout_btn" @click="logoutClick()">退出登录</button>
        </div>
      </div>
    </section>

    <footer>
      <TagTabBar></TagTabBar>
    </footer>

  </div>
</template>

<script>

  import TagTabBar from '@/components/TagTabBar.vue';
  import TagSignIn from '@/components/TagSignIn.vue';
  
  const defaultInfo = {
    "headUrl":"../../static/imgs/head_default.png",
    "userName": "--",
    "phone": "--",
    "banbooScore": "--",
    "signstate": true,
    // "particulars": [],
  }

  export default {
      name: 'TabMine',
      components: { TagTabBar,  TagSignIn},
      data () {
        return {
          // isLogin: this.$store.state.loginState,
          userInfo: {}
        }
      },

      computed:{
        isLogin: function(){
          let loginState = this.$store.state.loginState;
          if(loginState){
            this.loadPage();
          }
          return loginState;
        }
      },

      mounted (){
        this.loadPage();
      },

      methods: {
        // changeLoginState:function(){
        //   this.isLogin = this.$store.state.loginState;
        //   if(this.isLogin){
        //     this.loadPage();
        //   }
        // },

        loadPage: function(callback){
          if(!this.$store.state.loginState){
            // this.changeLoginState();
            callback && callback();
            return;
          }
          if(!this.$store.state.loginState){
            this.userInfo = defaultInfo;
            return;
          }
          this.$http.request({
            url: this.$config.domain +'/static/data/account.json',
            success: (dic)=> {
              if(dic.code==0){
                this.userInfo = dic.result;
              }
              else{
                this.$vux.toast.show({text:dic.msg, type:'warn'});
              }
              callback && callback();
            },
            error: (err)=>{
              this.$vux.toast.show({text:err, type:'warn'});
              callback && callback();
            }
          });
        },

        myPandaBtnClick: function() {
          this.$router.push({ name: 'MyPandaList' });
        },

        myOrderBtnClick: function() {
          this.$router.push({ name: 'MyOrderList' });
        },

        signinClick: function(){
          if(this.userInfo.signstate) return;
          this.$vux.loading.show();
          this.$http.request({
            url: this.$config.domain +'/static/data/signin.json',
            // url: this.request.get(this.$config.domain +'/panda/addScore'),
            success: (dic)=> {
              this.$vux.loading.hide();  
              if(dic.code==0){
                this.$vux.toast.show({
                  text:'今日签到成功<br/>获得'+ dic.result.addBanboo +'个竹子', 
                  type:'success'
                });
                this.userInfo.banbooScore = dic.result.banbooScore;
                this.userInfo.signstate = dic.result.signstate;
              }
              else{
                this.$vux.toast.text(dic.msg);
              }
            },
            error: (err) => {
              this.$vux.loading.hide();
              this.$vux.toast.text(err);
            }
          });
        },

        logoutClick: function(){
          this.$vux.loading.show();
          this.$http.request({
            url: this.$config.domain +'/static/data/ok.json',
            // url: this.request.get(this.$config.domain +'/app/security/logout'),
            success: (dic)=> {
              this.$vux.loading.hide();  
              if(dic.code==0){
                this.userInfo = defaultInfo;
                this.$store.commit('setLoginState',null);
                // this.changeLoginState();
              }
              else{
                this.toast.show(dic.msg);
              }
            },
            error:(err) => {
              this.$vux.loading.hide();
              this.$vux.toast.text(err);
            } 
          });
        },

      }
  }
</script>

<style lang="scss" type="text/css" scoped>

  .sec_banner{
    &{
      height: 17.5rem;
      background: url('../../static/imgs/banner_mine.png') no-repeat center center;
      background-size: cover;
      position: relative;
    }
    .user_head{
      &{
        display: inline-block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #f8f8f8;
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
        overflow: hidden;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    .user_name{
      font-size: 1.5rem;
      color: #ffffff;
      margin: 8px 0 0 0 ;
    }
    .user_tel{
      font-size: 1.8rem;
      color: #ffffff;
      margin: 8px 0 0 0;
    }

  }

  .link_group{
    &{
      width: 100%;
      background-color: #ffffff;
      margin-top: 10px; 
    }
    li{
      width: 100%;
      height: 6rem;
      display: flex;
      flex-direction: row;
    }
    .link_icon{
      display: block;
      width: 5rem;
      height: 100%;
      text-align: center;
    }
    .link_icon > img{
      width: 50%;
      vertical-align: middle;
    }
    .link_block{
      height: 100%;
      border-top: 1px solid #e4e4e4;
      overflow: hidden;
      flex-grow:1;
    }
    li:first-child .link_block{
      border-top: none;
    }
    .link_block > label{
      font-size: 1.6rem;
      color: #333333;
      vertical-align: middle;
    }
    .link_right{
      float: right;
      height: 100%;
      margin-right: 15px;
    }
    .link_right > em{
      font-size: 1.4rem;
      font-style: normal;
      line-height: 1em;
      vertical-align: middle;
    }
    .link_arrow{
      height: 1.6rem;
      vertical-align: middle;
      margin-left: 5px;
    }
  }

  .logout_btn{
    width: 100%;
    margin: 20px auto 40px auto;
  }

</style>
