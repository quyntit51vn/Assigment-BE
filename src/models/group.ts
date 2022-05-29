import { sequelize } from "../base/connection/mysql";
import UserModel from "./user";

const { DataTypes } = require('sequelize');

const GroupModel = sequelize.define('groups', {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    leader_id: DataTypes.INTEGER.UNSIGNED,
    subject: DataTypes.STRING(255),
    date_start: DataTypes.DATE,
    created_at: {
        type: DataTypes.DATE,
    },
    updated_at: {
        type: DataTypes.DATE,
    },
}, {
    // Other model options go here
});
UserModel.hasMany(GroupModel,
    {
        as: 'teach_groups',
        foreignKey: 'leader_id',
    })
GroupModel.belongsTo(UserModel,
    {
        as: 'leader',
        foreignKey: 'leader_id',
    })

UserModel.belongsToMany(GroupModel,
    {
        as: 'groups',
        through: 'group_user',
    })
GroupModel.belongsToMany(UserModel,
    {
        as: 'students',
        through: 'group_user',
    })
export default GroupModel