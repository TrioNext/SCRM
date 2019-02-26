/*
THIS  IS METHOD :
  - DETECT : ID IS A METHOD OR NOT
  - RUN ON HTTP : GET - PUT



*/
module.exports = function (options = {}) {
  return async context => {

    let {params} = context;

    const id = context.id ;
    params.isMethod = id !==null  && isNaN(id) ? true : false ;


    let data  = {
      message:id !==null  && isNaN(id) ? '' : 'Vui lòng kiểm tra method ',
      name:id !==null  && isNaN(id)  ? 'success' : 'hook-error',
      data:context.data || {}
    }

    if(data.name==='success'){
        params.isMethod = true ;
        Object.assign(data,{
          method:id
        });

    }

    /* change all json object to string value */
    Object.keys(data_out.data).map((key)=>{
      if(typeof data_out.data[key] ==='object'){
        data_out.data[key] = JSON.stringify(data_out.data[key]);
      }
    });

    context.app.set('method_schema',data_out);

    return context;
  };
};
