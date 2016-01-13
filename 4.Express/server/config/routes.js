(function () {
    var auth = require('./auth'),
        controllers = require('../controllers');

    module.exports = function (app) {
        app.get('/', function (req, res) {
            res.render('index');
        });

        app.get('/register', controllers.users.getRegister);
        app.post('/register', controllers.users.postRegister);

        app.get('/login', controllers.users.getLogin);
        app.post('/login', auth.login);

        app.get('/profile', auth.isAuthenticated, controllers.users.getProfile);

        app.get('/logout', auth.isAuthenticated, auth.logout);

        app.get('/ads', controllers.ads.getAllAds);
        app.get('/ads/details/:id', auth.isAuthenticated, controllers.ads.getAdById);
        app.get('/ads/upload', auth.isAuthenticated, controllers.files.getUpload);
        app.post('/ads/upload', auth.isAuthenticated, controllers.files.postUpload);
    };
}());