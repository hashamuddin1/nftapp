const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//creating schema of product
const product_schema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    upload_date: {
        type: Date,
        default: new Date()
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    sub_category: {
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    status: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        required: true
    },
})

//creating collection
const product = new mongoose.model('product', product_schema)

//export collection
module.exports = { product };