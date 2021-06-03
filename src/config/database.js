const Sequelize = require("sequelize");

const sequelize = new Sequelize("bpdapidb","tonyjogos123","55425610a",{
    host:"mysql743.umbler.com",
    dialect:"mysql",
    raw:true,
    define:{
        timestamps:false
    }
})

module.exports = sequelize;