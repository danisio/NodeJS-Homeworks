(function () {
    "use strict";

    var encryption = require('../utilities/encryption'),
        uploading = require('../utilities/uploading'),
        files = require('../data/files'),
        users = require('../data/users'),
        ads = require('../data/advertisements');
    var Advertisement = require('mongoose').model('Ad');

    var CONTROLLER_NAME = 'ads';

    var newAddData = [];

    module.exports = {
        getUpload: function (req, res, next) {
            var categories = Advertisement.schema.path('category').enumValues;
            res.render(CONTROLLER_NAME + '/upload', {categories: categories});
        },
        postUpload: function (req, res, next) {
            req.pipe(req.busboy);

            var userName = req.user.username;
            var newAd = {};

            req.busboy.on('file', function (fieldname, file, filename) {
                var fileNameHashed = encryption.generateHashedPassword(encryption.generateSalt(), filename);
                var path = '/' + userName + '/';
                uploading.saveFile(file, path, fileNameHashed);
                newAd['image'] = file._id;
            });

            req.busboy.on('field', function (fieldname, val) {
                newAddData[userName] = newAddData[userName] || [];
                newAddData[fieldname] = val;
                newAd[fieldname] = val;
                newAd['username'] = req.user.username;
            });

            req.busboy.on('finish', function () {
                files.addFiles(newAddData[userName]);
                ads.addNewAd(newAd, function (err, ad) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    users.findByIdAndUpdate(
                        req.user._id,
                        {$push: {ads: {title: ad.title, id: ad._id}}, safe: true, upsert: true},
                        function (err, model) {
                            if (err) {
                                console.log(err);
                                return res.send(err);
                            }
                        });
                });

                res.redirect('/ads');
            });
        }
    };
}());