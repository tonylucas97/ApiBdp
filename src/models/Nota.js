const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Nota = sequelize.define("notas", {
    subtotal: { type: Sequelize.FLOAT, allowNull: false },
    cliente: { type: Sequelize.STRING, allowNull: false },
    data: { type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW },
    descontoPorcento: { type: Sequelize.FLOAT, allowNull: false },
    metodoPagamento: { type: Sequelize.STRING, allowNull: false }
})

module.exports = Nota;