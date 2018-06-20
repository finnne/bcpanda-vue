import Axios from 'axios';

export const Http = {
  request: (param) => {
    // const app = getApp();   
    const headerObject = param.header;
    const exitHandler = param.exit || loginStateHandler;
    param.method = param.method || 'GET';
    param.header = {
      ...{
        'Accept': 'application/json; charset=UTF-8',
        // 'Cookie': app.Global.sessionid || '',
        // 'token': app.Global.token || '',
      },
      ...headerObject
    };
    
    // if (app.Config.debug) {
    //   console.info(param.method||'GET', param.url, param.data);
    // }
    Axios({ 
      method: param.method, 
      url: param.url, 
      data: param.data, 
      headers: param.header 
    }).then((res)=> { 
      console.info('success: ', res);
      // if (app.Config.debug) {
      //   console.info('result', res);
      // }
      // if (res.status==200){
        // if (!app.Global.sessionid) {
        //   app.Global.sessionid = res.header["Set-Cookie"];
        // }
        const callFlag = exitHandler(res.data);
        if (callFlag && typeof param.success == 'function') {
          param.success(res.data);
        }
      // }
      // else{
      //   // wx.showToast({
      //   //   title: 'error: ' + res.status,
      //   //   icon: 'none'
      //   // });
      //   console.info('error: ', res.status);
      // }
    }).catch((err)=>{
      // if (app.Config.debug) {
      //   console.error('error', err);
      // }
      if (typeof param.error == 'function') {
        param.error(err);
      } else {
        // wx.showToast({
        //   title: 'error: '+ err.errMsg,
        //   icon: 'none'
        // });
        console.error('catch error: ', err);
      }
    });

  },
}

const loginStateHandler = (dic) => {
  if (dic.code == 1002 || dic.code == 1003) {
    // wx.hideLoading();
    // const app = getApp();
    // app.setLoginState(null);
    // wx.navigateTo({
    //   url: '/pages/sign-in/sign-in',
    // })
    console.info('is exit!!!')
    return false;
  }
  else{
    return true;
  }
}
