"use strict";

var env = process.env.NODE_ENV || 'development',
    config = require('./server/config/config')[env],
    chatDb = require('./server/controllers/ChatDb');

chatDb.init(config);
chatDb.registerUser({username: 'DonchoMinkov', password: '123456q'});
chatDb.registerUser({username: 'NikolayKostov', password: '123456q'});

chatDb.sendMessage({
    from: 'DonchoMinkov',
    to: 'NikolayKostov',
    text: 'Hey, Niki!'
});

chatDb.sendMessage({
    from: 'NikolayKostov',
    to: 'DonchoMinkov',
    text: 'Hey, Doncho!'
});

setTimeout(function () {
    chatDb.getMessages({
        with: 'DonchoMinkov',
        and: 'NikolayKostov'
    });
}, 1000);