const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Admin = sequelize.define("admins",{
    nome:Sequelize.STRING,
    usuario: Sequelize.STRING,
    senha:Sequelize.STRING,
})

module.exports = Admin;