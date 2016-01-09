(function () {
    "use strict";

    var DeviceController = require('./DeviceController');

    module.exports = {
        addNewDevice: function (device) {
            DeviceController.addNewDevice(device);
        },
        getDevicesByType: function (req, res) {
            DeviceController.getDevicesByType(req, res)
        }
    };
}());