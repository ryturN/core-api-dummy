const { DataTypes } = require("sequelize");
const db = require("../../dbconfig");

const photosTable = db.define('photos', {
    fotoImg: {
        type: DataTypes.STRING
    }
});

module.exports = photosTable;