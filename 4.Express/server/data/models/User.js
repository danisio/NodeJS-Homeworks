(function () {
    "use strict";

    var mongoose = require('mongoose'),
        encryption = require('../../utilities/encryption');

    module.exports.init = function () {
        var userSchema = mongoose.Schema({
            username: {type: String, require: '{PATH} is required', unique: true},
            salt: String,
            hashPass: String,
            ads: []
        });

        userSchema.method({
            authenticate: function (password) {
                return (encryption.generateHashedPassword(this.salt, password) === this.hashPass);
            }
        });

        mongoose.model('User', userSchema);
    };
}());