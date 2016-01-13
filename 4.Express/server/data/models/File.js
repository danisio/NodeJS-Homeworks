(function () {
    "use strict";

    var mongoose = require('mongoose');

    module.exports.init = function () {
        var fileSchema = mongoose.Schema({
            name: {type: String, required: true, unique: true}
        });

        mongoose.model('File', fileSchema);
    };
}());