const mongoose = require('mongoose');

//creating schema of role
const role_schema = new mongoose.Schema({


    role: {
        type: String,
        required: true,
        trim: true
    }

})


const Role = new mongoose.model('roles', role_schema)


//export collection
module.exports = { Role };