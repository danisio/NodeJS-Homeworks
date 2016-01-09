(function () {
    "use strict";

    var Device = require('mongoose').model('Device');

    module.exports = {
        addNewDevice: function (req, res, next) {
            var deviceData = {
                type: req.type,
                brand: req.brand,
                model: req.model,
                price: req.price
            };

            Device.create(deviceData, function (err) {
                if (err) {
                    console.log('Failed to add new device: ' + err);
                }
            })
        },
        getDevicesByType: function (req, res, next) {
            var deviceType = req.params.type;
            Device
                .find({"type": deviceType}, function (err, devices) {
                    if (err) {
                        console.log('Cannot get devices from db' + err);
                        return;
                    }

                    res.render('devices/device', {files: devices, device: deviceType});
                });
        }
    };
}());