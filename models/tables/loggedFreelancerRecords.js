const { DataTypes, Sequelize } = require("sequelize");
const db = require("../../dbconfig/index");

const loggedFreelancerRecords = db.define('freelancerRecords',{
    nomor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    freelancerId: {
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

loggedFreelancerRecords.sync({alter: true}).then(()=>{
    console.log('skills has sync!')
})

module.exports = loggedFreelancerRecords