const mongoose =require('mongoose');
const { Schema } = mongoose;

const GrocerySchema = new mongoose.Schema({
    CategoryName:{
        type: String,
        required: true
    },
    productName:{
        type: String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    quantity:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    total:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('grocery', GrocerySchema);