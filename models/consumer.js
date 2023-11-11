const { DataTypes } = require("sequelize");
const db = require("../dbconfig");

// const model_admin = require("./admin");

const model_consumer = db.define('consumer', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    no_hp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nik: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    }
});

model_consumer.sync().then(() => {
    console.log('Consumer Table synced successfully');
});

module.exports = model_consumer;