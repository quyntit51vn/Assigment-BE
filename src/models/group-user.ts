import { sequelize } from "../base/connection/mysql";

const { DataTypes } = require('sequelize');

const GroupUserModel = sequelize.define('group_user', {
    // Model attributes are defined here
    group_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
    },
    updated_at: {
        type: DataTypes.DATE,
    },
}, {
    // Other model options go here
});

export default GroupUserModel