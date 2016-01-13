(function () {
    "use strict";

    var path = require('path'),
        rootPath = path.normalize(__dirname + '/../..');

    module.exports = {
        development: {
            rootPath: rootPath,
            db: 'mongodb://localhost:27017/expresshomework',
            port: process.env.PORT || 8080
        }
    };
}());