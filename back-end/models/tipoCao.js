const Sequelize = require('sequelize');
const database = require('../database/database');

const TiposCaes = database.define('TiposCaes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
module.exports = TiposCaes;