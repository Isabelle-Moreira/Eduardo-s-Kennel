const Sequelize = require('sequelize');
const database = require('../database/database');

const TiposCaes = database.define('TiposCaes', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
module.exports = TiposCaes;