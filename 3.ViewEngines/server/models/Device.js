(function () {
    "use strict";

    var mongoose = require('mongoose');

    module.exports.init = function () {
        var types = [
            'Smartphones',
            'Tablets',
            'Wearables'
        ];

        var brands = [
            'Apple',
            'Samsung',
            'Microsoft Lumia',
            'Blackberry',
            'HTC',
            'LG',
            'Sony',
            'Xiaomi',
            'Lenovo',
            'Motorola',
            'Other'
        ];

        var deviceSchema = mongoose.Schema({
            type: {type: String, required: true, enum: types},
            brand: {type: String, required: true, enum: brands},
            model: {type: String, required: true},
            price: {type: Number, min: 1}
        });

        mongoose.model('Device', deviceSchema);
    };


}());