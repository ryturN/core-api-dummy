const loggedFreelancerRecords = require('../tables/loggedFreelancerRecords');
const loggedUsersRecord = require('../tables/loggedUsersRecord');

const createUsersRecord = async function (getId){
    loggedUsersRecord.create({
        consumersId:getId,
    })
}
const createFreelanceRecord = async function (getId){
    loggedFreelancerRecords.create({
        freelancerId:getId,
    })
}

module.exports = {createUsersRecord,createFreelanceRecord}