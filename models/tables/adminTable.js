const { DataTypes, STRING } = require("sequelize");
const db = require("../../dbconfig");

const adminTable = db.define('admin', {
    adminId: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
});

adminTable.sync().then(() => {
    console.log('Admin table is synchronized!');
});

module.exports = adminTable;