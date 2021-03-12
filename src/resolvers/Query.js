const { events } = require('../models/users');
const Users = require('../models/users');

async function guide(parent, args, context){

}

function info () {
    return "Hi"
}

// Returning all users in the database
async function users(){
    try {
        const users = await Users.find();
        return users.map(user => {
            console.log(user)
            return user
        })
    } catch(err) {
        throw err;
    }
}

// Returning a specific user by using their id
async function user(parent, args,){
    try {
        const user = await Users.findById(args.id);
        console.log(user)
        return user
    } catch(err) {
        throw err
    }
}

module.exports = {
    guide,
    info,
    users,
    user
}