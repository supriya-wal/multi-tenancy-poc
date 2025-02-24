const { Sequelize, DataTypes } = require("sequelize");

const defineUserModel = (sequelize) => {
    return sequelize.define("User", {
        id: { type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        role: { type: DataTypes.STRING, defaultValue: "user" },
    });
};

module.exports = defineUserModel;
