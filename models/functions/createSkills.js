const skillsTables = require('../tables/skills');

const createSkills = async function (getId,skills){
    skillsTables.create({
        freelancerId:getId,
        skills
    })
}

module.exports = createSkills