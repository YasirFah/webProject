const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    ads: Number,
    taxes: Number,
    discount: Number,
    total: Number,
    count: Number,
    category: String
});

module.exports = mongoose.model('Product', productSchema);
