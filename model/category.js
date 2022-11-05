const mongoose = require('mongoose');
var Schema = mongoose.Schema;
//creating schema of category
const category_schema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    parent_Id: {
        default: null,
        type: Schema.Types.ObjectId
    },
    image: {
        type: String
    },
})

//creating collection
const Category = new mongoose.model('category', category_schema)


//export collection
module.exports = { Category };