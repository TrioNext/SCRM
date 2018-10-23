
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

// DECLARE VARIABLE AND  CONFIG DATABASE 
const sequelize = new Sequelize('mysql://user:pass@example.com:9821/db_name', {
  // Look to the next section for possible options
  define: {
    underscored: false,
    freezeTableName: false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
    timestamps: false,
  },
})

/* DO QUERIES : USEINNG SEQUELIZE */
sequelize.query('your query', [, options])
// Quick example
sequelize.query("SELECT * FROM myTable").then(myTableRows => {
  console.log(myTableRows)
})