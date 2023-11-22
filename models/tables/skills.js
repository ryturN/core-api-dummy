const { DataTypes, Sequelize } = require("sequelize");
const db = require("../../dbconfig/index");

const skillsTables = db.define('skills',{
    nomor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    freelancerId: {
        type: DataTypes.STRING,
    },
    skills: {
        type: DataTypes.STRING,
    },
});

skillsTables.sync().then(()=>{
    console.log('skills has sync!')
})
module.exports = skillsTables