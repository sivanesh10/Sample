const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const Lead = sequelize.define('Lead', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: false
    },

    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    }

}, {
    tableName: 'leads',
    timestamps: false
});

module.exports = Lead;