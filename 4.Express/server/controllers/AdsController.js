(function () {
    "use strict";

    var ads = require('../data/advertisements');
    var Advertisement = require('mongoose').model('Ad');
    var CONTROLLER_NAME = 'ads';

    module.exports = {
        getAllAds: function (req, res, next) {
            Advertisement
                .find(function (err, ads) {
                    if (err) {
                        console.log('Cannot get ads from db' + err);
                        return;
                    }

                    res.render(CONTROLLER_NAME + '/ads', {ads: ads});
                });
        },
        getAdById: function (req, res, next) {
            var id = req.params.id;
            Advertisement
                .find({_id: id}, function (err, ad) {
                    if (err) {
                        console.log('Cannot get ad from db' + err);
                        return;
                    }

                    res.render(CONTROLLER_NAME + '/adDetails', {ad: ad});
                });
        }
    };
}());