const { DataTypes, Sequelize } = require("sequelize");
const db = require("../../dbconfig/index");

const loggedUsersRecord = db.define('usersRecords',{
    nomor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    consumersId: {
        type: DataTypes.STRING,
    },
    loggedRecord: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
},
{
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})
loggedUsersRecord.sync().then(()=>{
    console.log('db has sync!')
})

module.exports = loggedUsersRecord