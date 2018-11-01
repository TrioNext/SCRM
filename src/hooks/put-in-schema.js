
/*
THIS GUY DETECT :
  - KIÊM TRA METHOD PUT là  UPDATE RECORD VỚI params.query
  - tra về lõi nếu ko tồn tại query condition
  - trã về schema condition dê update database


*/
module.exports = function (options = {}) {
  return async context => {

    let { query } = context.params;
    let data_out ={}

    /* case update  */

    /* DETECT params query  */
    data_out.message = Object.keys(query).length > 0 ? '' : 'Vui lòng xem lại params query fields';
    data_out.name = data_out.message === '' ? 'success' : 'hook-error';
    data_out.data = context.data ;

    if(data_out.name==='success'){

        Object.assign(data_out,{
          condition:{
            where:query
          }
        });

    }
    
    context.app.set('conditon_schema',data_out);


  };
};