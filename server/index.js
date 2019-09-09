const server = require('./server');
const IO = require('socket.io');
const staticFilePath = `${__dirname}/public/`;

const state = {
  app: null,
  socket: null,
  controller: null,
  orientation: { alpha: 0, beta: 0, gamma: 0 },
  clients: new Map(),
};

const start = () => {
  // *****************************************************
  // ToDo: don't recreate app or socket if already exists
  // *****************************************************

  const app = server(staticFilePath);
  const socket = createSocket(app);

  app.listen(3000, () => console.log('listening on *:3000'));
  state.app = app;
  state.socket = socket;
};

const createSocket = app => {
  const socket = IO(app);
  socket.on('connect', socket => onConnect(socket));
  return socket;
};

const onConnect = socket => {
  const socketId = socket.id;
  state.clients.set(socketId, 1);

  socket.on('motionEvent', data => onMotionEvent(data));
  socket.on('orientationEvent', data => onOrientationEvent(data));
  socket.on('disconnect', () => onDisconnect(socketId));
  socket.on('registerController', data => registerController(data));

  logConnections();
};

const onDisconnect = clientId => {
  console.log(`state.controller: ${state.controller} | clientId: ${clientId}`);
  state.controller = state.controller == clientId ? null : state.controller;
  state.clients.delete(clientId);

  logConnections();
};

const onMotionEvent = data => {
  // { isMoving: bool }
  // console.log(data);
};

const onOrientationEvent = data => {
  const alpha = Math.round(data.alpha);
  const beta = Math.round(data.beta);
  const gamma = Math.round(data.gamma);
  state.orientation = { alpha, beta, gamma };
  state.socket.emit('orientation', state.orientation);
};

const registerController = clientId => {
  // ToDo: improve accept/reject criteria
  const accept = !Boolean(state.controller);

  if (accept) {
    state.controller = clientId;
  }
  logConnections();
  return accept;
};

const logConnections = () => {
  console.log(`----- Connections ----`);
  console.log(`Controller: ${state.controller}`);
  console.table(state.clients);
  console.log(`----------------------\n`);
};

start();
