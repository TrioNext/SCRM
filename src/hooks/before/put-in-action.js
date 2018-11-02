/*
THIS GUY DETECT :
  - KIÊM TRA METHOD PUT là  ACTION KHÁC VỚI ID !=NULL & !== NUMBVER
  - tra về lỗi
  - trã về schema_method thuc hien function khác từ object


*/
module.exports = function (options = {}) {
  return async context => {

    const id = context.id ;
    let data_out = {};

    /* DETECT ID */
    data_out.message =  id !==null  && isNaN(id) ? '' : 'Vui lòng kiểm tra method ' ;
    data_out.name = data_out.message === '' ? 'success' : 'hook-error';
    data_out.data = context.data;

    if(data_out.name==='success'){

        Object.assign(data_out,{
          method:id
        });

    }

    context.app.set('method_schema',data_out);

    return context;
  };
};
