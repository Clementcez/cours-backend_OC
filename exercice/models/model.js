const mongoose = require('mongoose');

const modelShema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true }
});

module.exports = mongoose.model('model', modelShema);