const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Mercadoria = sequelize.define("mercadorias",{
    nome: {type:Sequelize.STRING,allowNull:false},
    precoCompra: {type:Sequelize.DECIMAL(10, 2),allowNull:false},
    precoVenda: {type:Sequelize.DECIMAL(10, 2),allowNull:false},
    nomeImg: {type:Sequelize.STRING},
    data: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    codigoBarras: {type: Sequelize.STRING, allowNull:false}
})

module.exports = Mercadoria;