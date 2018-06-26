<template>
	<ul class="list clearfix">
		<template v-if="listData.length>0">
		    <li v-for="panda of listData" @click="clickHandler(panda.pandaId)">
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
		</template>

		<template v-if="listData.length==0">
			<li v-for="i of 4">
		      <div class="img_con">
		        <span></span>
		      </div>
		    </li>
		</template>
	</ul>
</template>

<script type="text/javascript">
	export default {
		name: 'TagPandaList',
		props: ['listData', 'pandaClick'],
		methods: {
			clickHandler: function(id){
				this.pandaClick && this.pandaClick(id);
			}
		}
	}
</script>

<style lang="scss" type="text/css" scoped>
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
</style>