(function () {
    var User = require('mongoose').model('User');

    module.exports = {
        create: function(user, callback) {
            User.create(user, callback);
        },
        findByIdAndUpdate: function (id, options,callback) {
            User.findByIdAndUpdate(id, options, callback);
        }
    };
}());