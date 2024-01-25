const Sequelize = require('sequelize');
const database = require('../database/database');
 
const Petshops = database.define('Petshops', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_petshop: {
        type: Sequelize.STRING,
        allowNull: false
    },
    distancia_km: {
        type: Sequelize.DOUBLE
    }
})

module.exports = Petshops;