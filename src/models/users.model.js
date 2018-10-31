// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const users = sequelize.define('users',{

     id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
        unique: true

     },
     username:{
        type:DataTypes.STRING,
        allowNull:false,
        set(val){
          this.setDataValue('username',val.toLowerCase())
        }
     },
     name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notEmpty:{
            args:true,
            msg:"Vui lòng nhập tên"
          },
          len: {
            args:[4,40],
            msg:" Tên tối thiểu 4 ký tự"
          }

        }
     },
     password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notEmpty:{
            args:true,
            msg:"Vui lòng nhập mật khẩu"
          },
          len:{
            args: [4,200],
            msg:' Vui lòng nhập mật khẩu : ít nhất là 4 ký tự'
          }
        }
     },
     job_level:{
        type:DataTypes.TINYINT,
        defaultValue:2
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
        */
     },
     job_type:{
        type:DataTypes.TINYINT,
        defaultValue:2,
        /*
        - NV Chính thức
        - Bán thời gian
        - Thử việc
        - Làm thêm ngoài giờ
        - Nhân viên thời vụ
        - Làm dự án
        */
    },
    is_affiliated:{
      type:DataTypes.TINYINT,
      defaultValue:0, /* Thành viên sale liên kết  */
    },


    is_leader:{
      type:DataTypes.TINYINT,
      defaultValue:0
    },
    status:{
      type:DataTypes.TINYINT,
      defaultValue:5      // [0:vắng - 1: có mặt - 2: nghĩ phép có tính công - 3: nghĩ phép ko tính công - 4: nghĩ việc]
    },
    is_deleted:{
      type:DataTypes.TINYINT,
      defaultValue:0
    },
    collections_tags:{
      type:DataTypes.TEXT,   //[phòng ban - chức vụ - office - company - store]
      allowNull:true,
      defaultValue:null
    },
    deleted_by:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    creator_id:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },

    company_id:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    office_id:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    store_id:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    salary_balance:{
      type:DataTypes.DECIMAL,
      defaultValue:0
    },
    commission_balance:{
      type:DataTypes.DECIMAL,
      defaultValue:0
    },
    salary_set:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    date_created:{
      type:'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true
    },
    date_modified:{
      type:'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true
    },
    date_deleted:{
      type:'TIMESTAMP',
      allowNull: true
    },
    schedule:{
      type:DataTypes.TEXT,
      allowNull:true,
      defaultValue:null
    },
    address:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:"Vui lòng nhập địa chỉ"
        },
        len: [4,100]

      }

    },
    region_id:{
      type:DataTypes.INTEGER,
      defaultValue:0,
    },
    subregion_id:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    phone:{
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue:null
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate:{
        isEmail: {
          args:true,
          msg:'Vui lòng nhập e-mail hợp lệ'
        }
      },
      set(val){
        this.setDataValue('email',val.toLowerCase())
      }
    },
    is_remote_working:{
      type:DataTypes.TINYINT,
      defaultValue:0
    },
    available_working_on:{
      type:DataTypes.TEXT,
      allowNull:true,
      defaultValue:null
    },
    checkin_available:{
      type:DataTypes.TEXT,
      allowNull:true,
      defaultValue:null

    },
    is_pass_training:{
      type:DataTypes.TINYINT,
      defaultValue:0
    },
    json:{
      type:DataTypes.TEXT,
      allowNull:true,
      defaultValue:null,
      get(){
        var json = this.getDataValue('json');
        json = json !== null ? json : '{}';

         // 'this' allows you to access attributes of the instance
        return JSON.parse(json);
      }
    }

  })



  return users;



};
