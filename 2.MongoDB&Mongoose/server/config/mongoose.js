"use strict";

var mongoose = require('mongoose'),
    User = require('../models/User'),
    Message = require('../models/Message');

module.exports = function (config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.once('open', function (error) {
        if (error) {
            console.log(error);
        }
    });

    db.on('error', function (error) {
        console.log(error);
    });
};