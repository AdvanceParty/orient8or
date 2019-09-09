import '../css/receiver.css';

const state = {};
const io = require('socket.io-client');

const txtEls = {
  msg: document.querySelector('#msgBox'),
  accX: document.querySelectorAll('[data-acc-x]')[0],
  accY: document.querySelectorAll('[data-acc-y]')[0],
  accZ: document.querySelectorAll('[data-acc-z]')[0],
  orientAlpha: document.querySelectorAll('[data-orient-alpha]')[0],
  orientBeta: document.querySelectorAll('[data-orient-beta]')[0],
  orientGamma: document.querySelectorAll('[data-orient-gamma]')[0],
};

const init = () => {
  state.socket = io();
  state.socket.on('connect', () => onConnect(state.socket));
};

const onConnect = socket => {
  const socketId = socket.id;
  state.socketId = socketId;
  socket.on('orientation', data => onControllerOrientation(data));
  console.log(`Connected. Socket id: ${state.socketId}`);
};

const onControllerOrientation = data => {
  const { alpha, beta, gamma } = data;
  setMessage(alpha, 'orientAlpha');
  setMessage(beta, 'orientBeta');
  setMessage(gamma, 'orientGamma');

  document.documentElement.style.setProperty('--zRot', alpha);
  document.documentElement.style.setProperty('--yRot', beta);
  document.documentElement.style.setProperty('--xRot', gamma);
};

const setMessage = (msg, elName = 'msg') => {
  txtEls[elName].innerHTML = msg;
};

init();
