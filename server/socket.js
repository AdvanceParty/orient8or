// ************************************************
//          MOVED INTO INDEX.JS
// ************************************************
// const IO = require('socket.io');

// module.exports = app => {
//   const socket = IO(app);
//   socket.on('connection', socket => onConnect(socket));
//   socket.on('motionEvent', data => onMotionEvent(data));
//   socket.on('orientationEvent', data => onOrientationEvent(data));
//   socket.on('registerController', data => registerController(data));
//   return socket;
// };

// const onConnect = socket => {
//   const socketId = socket.id;
//   console.log(`Client ${socketId} connected`);
//   socket.on('disconnect', function() {
//     console.log('user disconnected');
//   });
// };

// const onMotionEvent = data => {
//   // { isMoving: bool }
//   console.log(data);
// };

// const onOrientationEvent = data => {
//   // { alpha: Number, beta: Number, gamma: Number }
//   console.log(data);
// };

// const registerController = data => {
//   // { alpha: Number, beta: Number, gamma: Number }
//   console.log('Registering Controller');
//   return 'Hello Controller';
// };
