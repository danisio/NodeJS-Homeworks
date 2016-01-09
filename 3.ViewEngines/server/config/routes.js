(function () {
    var controller = require('../controllers/MobileDevices');

    module.exports = function (app) {
        app.get('/', function (req, res) {
            res.render('home/home');
        });
        app.get('/:type', controller.getDevicesByType);
        app.get('*', function (req, res) {
            res.render('home/home');
        });
    };
}());