(function () {
    "use strict";

    var express = require('express');

    module.exports = function (app, config) {
        app.set('view engine', 'jade');
        app.set('views', config.rootPath + '/server/views');
        app.use(express.static(config.rootPath + '/public'));
    };
}());