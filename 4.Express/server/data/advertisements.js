(function () {
    var Advertisement = require('mongoose').model('Ad');

    module.exports = {
        addNewAd: function (ad, callback) {
            Advertisement.create(ad, callback);
        }
    };
}());