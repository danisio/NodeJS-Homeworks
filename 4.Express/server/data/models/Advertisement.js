(function () {
    "use strict";

    var mongoose = require('mongoose');

    module.exports.init = function () {
        var categories = [
            'TV & Video',
            'GSM & Tablets',
            'Photo & Video',
            'Auto & GPS',
            'PC Peripherals',
            'IT',
            'Gaming & Fun',
            'Audio',
            'Small Domestic Appliances',
            'Air Conditioners & Heaters',
            'Home Appliances'
        ];

        var adSchema = mongoose.Schema({
            title: {type: String, required: true},
            category: {type: String, required: true, enum: categories},
            description: {type: String, required: true},
            images: [String],
            username: {type: String, required: true},
            price: {type: Number, min: 1, required:true}
        });

        mongoose.model('Ad', adSchema);
    };
}());