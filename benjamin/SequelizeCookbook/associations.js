/*
BelongsTo
BelongsTo associations are associations where the foreign key for the one-to-one relation exists on the source model.
*/
var Player = this.sequelize.define('player', {/* attributes */})
  , Team  = this.sequelize.define('team', {/* attributes */});

Player.belongsTo(Team); // Will add a teamId attribute to Player to hold the primary key value for Team

/*
Foreign keys
By default the foreign key for a belongsTo relation will be generated from the target model name and the target primary key name.
*/

var User = this.sequelize.define('user', {/* attributes */})
  , Company  = this.sequelize.define('company', {/* attributes */});

User.belongsTo(Company); // Will add companyId to user

var User = this.sequelize.define('user', {/* attributes */}, {underscored: true})
  , Company  = this.sequelize.define('company', {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true
    }
  });

User.belongsTo(Company); // Will add company_uuid to user

// In cases where as has been defined it will be used in place of the target model name.

var User = this.sequelize.define('user', {/* attributes */})
, UserRole  = this.sequelize.define('userRole', {/* attributes */});

//User.belongsTo(UserRole, {as: 'role'}); // Adds roleId to user rather than userRoleId
//In all cases the default foreign key can be overwritten with the foreignKey option. When the foreign key option is used, Sequelize will use it as-is:
var User = this.sequelize.define('user', {/* attributes */})
  , Company  = this.sequelize.define('company', {/* attributes */});

User.belongsTo(Company, {foreignKey: 'fk_company'}); // Adds fk_company to User

/*Target keys
The target key is the column on the target model that the foreign key column on the source model points to. By default the target key for a belongsTo relation will be the target model's primary key. To define a custom column, use the targetKey option.
*/
var User = this.sequelize.define('user', {/* attributes */})
  , Company  = this.sequelize.define('company', {/* attributes */});

User.belongsTo(Company, {foreignKey: 'fk_companyname', targetKey: 'name'}); // Adds fk_companyname to User

/*
HasOne
HasOne associations are associations where the foreign key for the one-to-one relation exists on the target model.
*/
var User = sequelize.define('user', {/* ... */})
var Project = sequelize.define('project', {/* ... */})
 
// One-way associations
Project.hasOne(User)

/*
  In this example hasOne will add an attribute projectId to the User model!
  Furthermore, Project.prototype will gain the methods getUser and setUser according
  to the first parameter passed to define. If you have underscore style
  enabled, the added attribute will be project_id instead of projectId.

  The foreign key will be placed on the users table.

  You can also define the foreign key, e.g. if you already have an existing
  database and want to work on it:
*/
 
Project.hasOne(User, { foreignKey: 'initiator_id' })
 
/*
  Because Sequelize will use the model's name (first parameter of define) for
  the accessor methods, it is also possible to pass a special option to hasOne:
*/
 
Project.hasOne(User, { as: 'Initiator' })
// Now you will get Project#getInitiator and Project#setInitiator
 
// Or let's define some self references
var Person = sequelize.define('person', { /* ... */})
 
Person.hasOne(Person, {as: 'Father'})
// this will add the attribute FatherId to Person
 
// also possible:
Person.hasOne(Person, {as: 'Father', foreignKey: 'DadId'})
// this will add the attribute DadId to Person
 
// In both cases you will be able to do:
//Person#setFather
//Person#getFather
 
// If you need to join a table twice you can double join the same table
Team.hasOne(Game, {as: 'HomeTeam', foreignKey : 'homeTeamId'});
Team.hasOne(Game, {as: 'AwayTeam', foreignKey : 'awayTeamId'});

Game.belongsTo(Team);


var Player = this.sequelize.define('player', {/* attributes */})
  , Coach  = this.sequelize.define('coach', {/* attributes */})
  , Team  = this.sequelize.define('team', {/* attributes */});

/*  
Belongs-To-Many associations
Belongs-To-Many associations are used to connect sources with multiple targets. Furthermore the targets can also have connections to multiple sources.
*/
Project.belongsToMany(User, {through: 'UserProject'});
User.belongsToMany(Project, {through: 'UserProject'});

/* 
This will create a new model called UserProject with the equivalent foreign keys projectId and  userId. Whether the attributes are camelcase or not depends on the two models joined by the table (in this case User and Project).
Defining through is required. Sequelize would previously attempt to autogenerate names but that would not always lead to the most logical setups.
*/

User = sequelize.define('user', {})
Project = sequelize.define('project', {})
UserProjects = sequelize.define('userProjects', {
    status: DataTypes.STRING
})
 
User.belongsToMany(Project, { through: UserProjects })
Project.belongsToMany(User, { through: UserProjects })

UserProjects = sequelize.define('userProjects', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: DataTypes.STRING
})

User.findAll({
    include: [{
      model: Project,
      through: {
        attributes: ['createdAt', 'startedAt', 'finishedAt'],
        where: {completed: true}
      }
    }]
});






