const db = require("../../dbconfig");
const adminTable = require("../tables/adminTable");
const bcrypt = require('bcrypt');

exports.newAdmin = async (data) => {
    const { username, email, password, key } = data;
    if(key != process.env.ADMIN_SECRET_KEY) {
        return false;
    }

    // Check username or email
    const isDataExist = await adminTable.findOne({
        where: {
            [Op.or]: [
                { username: username },
                { email: email }
            ]
        }
    });
    if(isDataExist) {
        return false;
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);
    // Make a new account for an admin
    await adminTable.create({
        username: username,
        email: email,
        password: hashedPassword
    });
    return true;
};

exports.loginAdmin = async (data) => {
    const { username, email, password } = data;

    // Check if there's an account or not
    const isDataExist = await adminTable.findOne({
        where: {
            [Op.or]: [
                { username: username },
                { email: email }
            ]
        }
    });
    if(!isDataExist) {
        return false;
    }

    const hashedPassword = isDataExist.password;
    // Check to verify the password
    const result = await bcrypt.compareSync(hashedPassword, password);
    if(!result) {
        return false;
    }

    return true;
}