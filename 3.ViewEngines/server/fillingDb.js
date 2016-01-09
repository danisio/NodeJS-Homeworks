(function () {
    "use strict";

    module.exports = {
        init: function (controller) {
            var Device = require('mongoose').model('Device');
            var types = Device.schema.path('type').enumValues;
            var brands = Device.schema.path('brand').enumValues;

            for (var j = 0, brandsLen = brands.length; j < brandsLen; j += 1) {
                for (var i = 0, typesLen = types.length; i < typesLen; i += 1) {
                    var testDevice = {
                        type: types[i],
                        brand: brands[j],
                        model: types[i].substring(0, types[i].length - 1) + ' ' + brands[j] + ' ' + j,
                        price: 1000 / (i + j + 1)
                    };

                    controller.addNewDevice(testDevice);
                }
            }
        }
    };
}());