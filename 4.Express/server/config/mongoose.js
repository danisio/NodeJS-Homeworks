(function () {
    "use strict";

    var mongoose = require('mongoose'),
        adModel = require('../data/models/Advertisement'),
        fileModel = require('../data/models/File'),
        userModel = require('../data/models/User');

    module.exports = function (config) {
        mongoose.connect(config.db);

        var db = mongoose.connection;

        db.once('open', function (error) {
            if (error) {
                console.log('Database could not be opened: ' + error);
                return;
            }

            console.log('Database up and running...')
        });

        db.on('error', function (error) {
            console.log('Database error: ' + error);
        });

        adModel.init();
        userModel.init();
        fileModel.init();
    };
}());