const Sequelize = require("sequelize");

const sequelize = new Sequelize("heroku_b14fb5a2189fe81","bc7b1e9e9f5739","a156d1f9",{
    host:"us-cdbr-east-04.cleardb.com",
    dialect:"mysql",
    raw:true,
    define:{
        timestamps:false
    }
})

module.exports = sequelize;