import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({//store对象
    state:{
        loginState: 0,
        sessionid: '',
        token: '',
        tabIndex: 1,
    },
    mutations:{
    	setLoginState: function(obj, tk) {
		    if (tk) {
		      this.state.loginState = 1;
		      this.state.token = tk;
		      // wx.setStorageSync('loginToken', tk);
		    } else {
		      this.state.loginState = 0;
		      this.state.token = null;
		      this.state.sessionid = null;
		      // wx.removeStorageSync('loginTokenkey');
		    }
		},
		setTabIndex: function(obj, index){
			this.state.tabIndex = index;
		},
		// selectTabIndex: function(obj, index){
		// 	let page;
		// 	switch(index){
		// 		case 1:
		// 			page = 'TabHome';
		// 			break;
		// 		case 2:
		// 			page = 'TabMine';
		// 			break;
		// 	}
		// 	if(page){
		// 		this.$router.push({ name:page });
		// 	}
		// },
    }
});