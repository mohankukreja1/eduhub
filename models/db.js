const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const DB = require('../config.json').DB
const db = new Sequelize(
    DB.DATABASE,
    DB.USER,
    DB.PASSWORD,
    {
        host: DB.HOST,
        dialect: "mysql"
    }
);
const User = db.define('users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    }


})
db.sync({force: true})
    .then(() => console.info("Database configured"))
    .catch((err) => console.error(err))

function getUserByUsername(username,cb) {

    User.findOne({where:{name:username}}).then((ans)=>{
        cb(null,ans)
    })
        .catch((err)=>{
            cb(err)
        })
}
function comparePassword(password1 ,password2 , cb) {
    if(password1 === password2){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}
function getUserById(id,cb) {
    User.findOne({where:{id:id}}).then((ans)=>{
        cb(null,ans)
    })
        .catch((err)=>{
            cb(err)
        })
}

exports.models = {
     User ,getUserByUsername,comparePassword,getUserById
}
