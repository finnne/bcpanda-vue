import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({//store对象
    state:{
        loginState: 0,
        sessionid: '',
        token: '',
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
    }
});