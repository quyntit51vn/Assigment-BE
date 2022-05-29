import { sequelize } from "../base/connection/mysql";

const { DataTypes } = require('sequelize');

const UserModel = sequelize.define('users', {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
    },
    sex: {
        type: DataTypes.STRING(10),
        defaultValue: 'male'
    },
    avatar: DataTypes.STRING(100),
    birth_place: DataTypes.STRING(50),
    birth_date: DataTypes.DATE,
    role: DataTypes.STRING(10),
    created_at: {
        type: DataTypes.DATE,
    },
    updated_at: {
        type: DataTypes.DATE,
    },
}, {
    // Other model options go here
});

export default UserModel