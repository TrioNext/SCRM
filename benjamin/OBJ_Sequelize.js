
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

// MODEL DEFINITION : 
const Employee = sequelize.define('employee', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        const title = this.getDataValue('title');
        // 'this' allows you to access attributes of the instance
        return this.getDataValue('name') + ' (' + title + ')';
      },
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('title', val.toUpperCase());
      }
    },
    latitude: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: { min: -90, max: 90 }
      },
      longitude: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: { min: -180, max: 180 }
      },
},
{
    indexes:[
      {
        unique: true,
        fields: ['id','email','username']
      },
    ]
  }
);

// RUN QUERY 
Employee
  .create({ name: 'John Doe', title: 'senior engineer' })
  .then(employee => {
    console.log(employee.get('name')); // John Doe (SENIOR ENGINEER)
    console.log(employee.get('title')); // SENIOR ENGINEER
})

// VALIDATE 
const ValidateMe = sequelize.define('foo', {
    foo: {
      type: Sequelize.STRING,
      validate: {
        is: ["^[a-z]+$",'i'],     // will only allow letters
        is: /^[a-z]+$/i,          // same as the previous example using real RegExp
        not: ["[a-z]",'i'],       // will not allow letters
        isEmail: true,            // checks for email format (foo@bar.com)
        isUrl: true,              // checks for url format (http://foo.com)
        isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
        isIPv4: true,             // checks for IPv4 (129.89.23.1)
        isIPv6: true,             // checks for IPv6 format
        isAlpha: true,            // will only allow letters
        isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
        isNumeric: true,          // will only allow numbers
        isInt: true,              // checks for valid integers
        isFloat: true,            // checks for valid floating point numbers
        isDecimal: true,          // checks for any numbers
        isLowercase: true,        // checks for lowercase
        isUppercase: true,        // checks for uppercase
        notNull: true,            // won't allow null
        isNull: true,             // only allows null
        notEmpty: true,           // don't allow empty strings
        equals: 'specific value', // only allow a specific value
        contains: 'foo',          // force specific substrings
        notIn: [['foo', 'bar']],  // check the value is not one of these
        isIn: [['foo', 'bar']],   // check the value is one of these
        notContains: 'bar',       // don't allow specific substrings
        len: [2,10],              // only allow values with length between 2 and 10
        isUUID: 4,                // only allow uuids
        isDate: true,             // only allow date strings
        isAfter: "2011-11-05",    // only allow date strings after a specific date
        isBefore: "2011-11-05",   // only allow date strings before a specific date
        max: 23,                  // only allow values <= 23
        min: 23,                  // only allow values >= 23
        isCreditCard: true,       // check for valid credit card numbers
  
        // custom validations are also possible:
        isEven(value) {
          if (parseInt(value) % 2 != 0) {
            throw new Error('Only even values are allowed!')
            // we also are in the model's context here, so this.otherField
            // would get the value of otherField if it existed
          }
        }
      }
    }
  });


