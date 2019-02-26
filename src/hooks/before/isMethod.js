/*
THIS  IS METHOD :
  - DETECT : ID IS A METHOD OR NOT
  - RUN ON HTTP : PUT


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
    Object.keys(data.data).map((key)=>{
      if(typeof data.data[key] ==='object'){
        data.data[key] = JSON.stringify(data.data[key]);
      }
    });

    params.data = data ;
    
    return context;
  };
};
