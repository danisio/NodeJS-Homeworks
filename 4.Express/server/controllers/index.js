(function () {
    "use strict";

    var UsersController = require('./UsersController'),
        AdsController = require('./AdsController'),
        FilesController = require('./FilesController');

    module.exports = {
        users: UsersController,
        ads: AdsController,
        files: FilesController
    };
}());