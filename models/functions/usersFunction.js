const bcrypt = require('bcrypt');
const { usersTable } =require('../tables/usersTable');



const createUser = async function(consumerId,fullName,username,email,password){
    const hashedPassword = await bcrypt.hashSync(password,10)
    usersTable.create({consumerId,fullName,username,email,password:hashedPassword});
}
const updateUser = async function(name,username,email,password){
    const hashedPassword = await bcrypt.hashSync(password,10)
    usersTable.update({name,username,email,password:hashedPassword});
}

const findUser = async function(username, password,email) {
    try {
        const user = await usersTable.findOne({ where: { username } });
        if (user) {
            const result = bcrypt.compareSync(password, user.password);
            if (result) {
                return user;
            }
        } else {
            return user;
        }
    } catch (error) {
        console.log(`Error Finding users:`, error);
        throw error;
    }
};

module.exports= {
    createUser,
    findUser,
    updateUser
};