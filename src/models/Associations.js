const sequelize = require("../config/database");
const Admin = require("./Admin");
const Mercadoria = require("./Mercadoria");
const Nota = require("./Nota");
const Venda = require("./Venda");

Admin.hasMany(Nota);
Nota.belongsTo(Admin);
Nota.hasMany(Venda);
Venda.belongsTo(Nota);
Mercadoria.hasMany(Venda);
Venda.belongsTo(Mercadoria);

sequelize.sync({force:false})
