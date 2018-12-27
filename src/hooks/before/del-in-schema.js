/*
  Guy :  cấu trúc xoá
        => trả về lỗi nếu ID = null || text
        => trả về thành công : thông tin kèm theo
              thong tin nguoi xoá
              thông tin ngày xoá
              thông tin nơi xoá :             [để sau]
              thông tin : comment lý do xoá : [để sau]
              thông tin log xoá :             [để sau]
*/
module.exports = function (options = {}) {
  return async context => {

    const { user } = context.params;
    const {id} =  context;
    let idata = {};

    idata.message = id === null ||  isNaN(id) ? 'Vui lòng xem lại ID' : '';
    idata.name = id === null || isNaN(id)  ? 'hook-error' : 'success';
    idata.data = {
      is_deleted:1,
      deleted_by:user.id,
      date_deleted: new Date()
    }
    idata.id = id ;
    idata.type = context.method;
    idata.model = context.service.Model.name;
    idata.token = context.params.headers.authorization ;
    

    context.app.set('data_del',idata);

  };
};
