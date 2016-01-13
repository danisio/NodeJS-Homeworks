(function () {
    "use strict";

    var passport = require('passport');

    module.exports = {
        login: function (req, res, next) {
            var auth = passport.authenticate('local', function (err, user) {
                if (err) return next(err);
                if (!user) {
                    res.send({success: false});
                }

                req.logIn(user, function (err) {
                    if (err) return next(err);
                    res.send({
                        success: true, user: {
                            username: user.username,
                            roles: user.roles,
                            _id: user._id
                        }
                    });
                    res.redirect('/');
                })
            });

            auth(req, res, next);
        },
        logout: function (req, res, next) {
            req.logout();
            res.redirect('/');
        },
        isAuthenticated: function (req, res, next) {
            if (!req.isAuthenticated()) {
                res.status(403);
                res.redirect('/login');
            }
            else {
                next();
            }
        }
    };
}());