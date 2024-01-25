const Sequelize = require('sequelize');
const database = require('../database/database');
const Petshops = require('./petshop')
const TiposCaes = require('./tipoCao')

const Precos = database.define('Precos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    petshop_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    TiposCaes_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    preco_semana: {
        type: Sequelize.DOUBLE
    },
    preco_fim_desemana: {
        type: Sequelize.DOUBLE
    }
})


Precos.belongsTo(Petshops, { foreignKey: 'petshop_id' });
Precos.belongsTo(TiposCaes, { foreignKey: 'TiposCaes_id' });

module.exports = Precos;