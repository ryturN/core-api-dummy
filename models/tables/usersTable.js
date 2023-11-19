const { DataTypes } = require("sequelize");
const db = require("../../dbconfig");

const usersTable = db.define('users', {
    nomor:{
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
    },
    consumerId:{
        type: DataTypes.STRING,
        primaryKey: true
    },  
    fullName:{
        type: DataTypes.STRING
    },
    username:{
        type: DataTypes.STRING,
        unique: true,
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
    },
    password:{
        type: DataTypes.STRING
    },
    telephoneNumber:{
        type: DataTypes.STRING,
    },
    nationalId:{
        type: DataTypes.STRING,
    },
    specialPoint:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    level: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }
});

usersTable.sync().then(() => {
    console.log('Users table is synced!');
})

module.exports = usersTable;