/*
  THIS IS A SIMPLE GUY : ON PRINCIPLE : WHERE AT
  deteted data json ON HTTP: METHOD : POST
  FUNCITON PARAMAS :  HELPER - SCHEMA FIELDS [] MAC DINH
  RETURN lỗi báo thiếu fields mặc định cần có

*/
module.exports = function (options = {}) {
  return async context => {

    const Helper = options.Helper;

    const userInfo = context.params.user;

    let {data} =  context;
    let data_out ={}
    const schema =  options.schema ||   ['field'];

    const filers =  Helper.isPassedSchema(schema,Object.keys(data))
    data_out.message = filers === '' ? '' : ' Vui lòng kiểm tra  '+filers;
    data_out.name = data_out.message === '' ? 'success' : 'hook-error';
    data_out.data = data ;

    data_out.type = context.method;
    data_out.model = context.service.Model.name;
    data_out.token = context.params.headers.authorization ;

    data_out.userInfo = {
      id:userInfo.id,
      name:userInfo.name,
      gender:userInfo.gender,
      is_leader:userInfo.is_leader
    }




    /* change all json object to string value */
    Object.keys(data).map((key)=>{
      if(typeof data[key] ==='object'){
        data[key] = JSON.stringify(data[key]);
      }
    });


    context.app.set('data_out',data_out);

    //context.app.set('data_out',data_out);

    return context;
  };
};
