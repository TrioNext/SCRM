/*
THIS GUY
  DO GET USERINFO - ON AUTHENTICATED
  RETURN UserInfo : THONG QUA APP Object
*/
module.exports = function (options = {}) {
  return async context => {

    //const userInfo =  context.params.user;

    const userInfo = context.app.get('userInfo') || context.params.user;
    context.app.set('userInfo',userInfo);
    
  };
};
