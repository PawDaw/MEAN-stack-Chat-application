var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schemaChat = require('../model/chat');
var schemaRoom = require('../model/room');


/* POST single chat message */
router.post('/addMessage', function (req, res, next) {

    // get instance and all data belongs to that schema
    var instance = new schemaChat.Chat(req.body);

    instance.save(function (err, data) {

        if (err) {
            return console.log(err);
        }

        res.send(data);

        router.getData(req.app.locals.socketTemp);


        return data;
    });

});


/* POST single chat room */
router.post('/addRoom', function (req, res, next) {

    // get instance and all data belongs to that schema
    var instance = new schemaRoom.Room(req.body);

    instance.save(function (err, data) {

        if (err) {
            return console.log(err);
        }

        res.send(data);

        router.getRooms(req.app.locals.socketTemp);


        return data;
    });

});


/* GET user Name  SOCKET */

router.getUsername = function (socket,app) {

    console.log("Get User name");

    // send to sender browser
    socket.emit('new-getUsername', app.locals.userName);

}


/* GET all ROOMS  SOCKET */

router.getRooms = function (socket) {

    console.log("Get Rooms");

    schemaRoom.Room.find({}).exec(function (err, data) {
        if (err)
            return console.error(err);
        console.log("Load success Rooms: ", data);
        // send to sender browser
        socket.emit('new-rooms',data);


        // Broadcasting means sending a message to everyone else except for the socket that starts it
        socket.broadcast.emit('new-rooms', data);


    });

}

/* GET all blog messages  SOCKET */

router.getData = function (socket) {

    console.log("Get DATA");

    schemaChat.Chat.find({}).exec(function (err, data) {
        if (err)
        return console.error(err);
        //console.log("Load success: ", blogs);
        // send to sender browser
        socket.emit('new-message',data);


    // Broadcasting means sending a message to everyone else except for the socket that starts it
    socket.broadcast.emit('new-message', data);


});

}



//export the router
module.exports = router;
