const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Venda = sequelize.define("vendas", {
    precoDia: {type: Sequelize.FLOAT,allowNull: false},
    precoDesconto: {type: Sequelize.FLOAT,allowNull: false},
    quantidade: {type: Sequelize.INTEGER,allowNull:false}
})

module.exports = Venda;