const { DataTypes } = require("sequelize");
const db = require("../../dbconfig");

const photosTable = db.define('photos', {
    fotoImg: {
        type: DataTypes.STRING
    }
});

photosTable.sync().then(() => {
    console.log('Photos table is synced!')
});

db.sync().then(()=>{
    console.log('dataSkills sync!')
})
module.exports = photosTable;