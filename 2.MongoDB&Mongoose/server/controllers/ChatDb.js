"use strict";

var UserController, MessageController;

module.exports = {
    init: function (config) {
        require('../config/mongoose')(config);
        UserController = require('../controllers/UserController');
        MessageController = require('../controllers/MessageController');
    },
    registerUser: function (user) {
        UserController.registerUser(user);
    },
    sendMessage: function (messageData) {
        return MessageController.sendMessage(messageData);
    },
    getMessages: function (messageData) {
        return MessageController.getMessagesBetweenUsers(messageData, function (messages) {
            console.log(messages.join('\n\n'));
        });
    }
};