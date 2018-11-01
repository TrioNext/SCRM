/*
  THIS IS A SIMPLE GUY : ON PRINCIPLE : WHERE AT
  deteted data json ON HTTP: METHOD : POST
  FUNCITON PARAMAS :  HELPER - SCHEMA FIELDS [] MAC DINH
  RETURN lỗi báo thiếu fields mặc định cần có

*/
module.exports = function (options = {}) {
  return async context => {

    const Helper = options.Helper;
    let {data} =  context;
    let format_out ={}
    const schema =  options.schema ||   ['field'];

    const filers =  Helper.isPassedSchema(schema,Object.keys(data))
    format_out.message = filers === '' ? '' : ' Vui lòng kiểm tra  '+filers;
    format_out.name = format_out.message === '' ? 'success' : 'hook-error';
    format_out.data = data ;

    context.app.set('data_out',format_out);
    
    //context.app.set('data_out',format_out);

    return context;
  };
};
