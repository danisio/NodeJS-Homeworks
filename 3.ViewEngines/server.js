(function () {
    "use strict";

    var express = require('express'),
        env = process.env.NODE_ENV || 'development',
        fillingDb = require('./server/fillingDb');

    var app = express();

    var config = require('./server/config/config')[env];

    require('./server/config/express')(app, config);
    require('./server/config/mongoose')(config);
    require('./server/config/routes')(app);

    var controller = require('./server/controllers/MobileDevices');

    fillingDb.init(controller);
    app.listen(config.port);

    console.log("Server running on port: " + config.port);
}());