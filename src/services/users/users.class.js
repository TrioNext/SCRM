/*
cURL 	
		GET : 
			/employees
			+ Params 
			- p		: 0
			- max		: 10
			- sort_by		: id
			- sort_type	: default : ASC
            - region_id	: null 
            - subregion_id : null
			- is_delete	: default : 0
			- key		: null
            - status		: null // [0:vắng - 1: có mặt - 2: nghĩ phép có tính công - 3: nghĩ phép ko tính công - 4: nghĩ việc]
            - job_level : null 
                    /*
                    - Mới tốt nghiệp 
                    - Thực tập 
                    - Nhân viên	
                    - Trưởng nhóm /  Giám sát
                    - Quản lý cửa hàng
                    - Trợ lý quản lý cửa hàng
                    - Trưởng phòng
                    - Phó phòng
                    - Giám đốc
                    - Phó giám đốc
                    - Giám đốc điều hành
                    - Chủ tịch
                    
            - job_type : null 
                    - NV Chính thức
                    - Bán thời gian
                    - Thử việc
                    - Làm thêm ngoài giờ
                    - Nhân viên thời vụ
                    - Làm dự án
            - is_affiliated : null              
             

			/employess/info?{id}
		POST : 
			/employees/create
			+ Params
		
			/employees/update
			+ Params

		DELETE : 
			/employees/{id}
*/

const { Service } = require( 'feathers-sequelize');
const mUser = require('../../models/users.model');

class User extends Service {
    

    whereSchema(query){

        const basic = query.basicQuery;
        delete query.basicQuery;
        const where = {
            where: {
                $and: query
             }
        };
        return Object.assign({},where,basic);

    }

    test(){
        return 'test';
    }

    async read(params){

        const query = params.query;
        const fullSchema = this.whereSchema(query);
        const list = await this.Model.findAndCountAll(fullSchema); 
        
        return list;


    }
    

    async get(id,params){
        
        console.log(Number.isInteger(parseInt(id)));
        
        let results ;
        if(!Number.isInteger(parseInt(id))){
            results =  this[id](params);
        }else{  
             
            delete params.query;
            results = await super.get(id,params) 
        }

        return results; 
                        

    }
    async remove(id, data, params ){

        const delData = {
            is_deleted:true
        }
        return await this.Model.update(delData,{
            where: {
                id: {
                  $eq: id
                }
            }
        });

        //return params;

    }


  }

  /* options : app - hook - event */
  module.exports = function (options) {
    const app = options.app;
    const Model = mUser(app);
    const paginate = app.get('paginate');

    const sequelize = {
        Model,
        paginate
    }


    return new User(sequelize);

  };

  module.exports.Service = User;
