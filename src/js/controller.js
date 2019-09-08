import '../css/controller.css';

/* 
  ToDo: Base isMoving on duration of time moving, nbot just acceleration at any given moment.
  ToDo: Add delay before setting isMoving back to false
  Think about: How can a device be placed into sleep mode when not moving?
*/

const motionThreshold = 0.8;
const motionMinDurationMS = 500;

const accelerationContainer = document.querySelectorAll('[data-acc]')[0];

const txtEls = {
  msg: document.querySelector('#msgBox'),
  accX: document.querySelectorAll('[data-acc-x]')[0],
  accY: document.querySelectorAll('[data-acc-y]')[0],
  accZ: document.querySelectorAll('[data-acc-z]')[0],
  orientAlpha: document.querySelectorAll('[data-orient-alpha]')[0],
  orientBeta: document.querySelectorAll('[data-orient-beta]')[0],
  orientGamma: document.querySelectorAll('[data-orient-gamma]')[0],
};

const rotationTxt = document.querySelectorAll('[data-rotation]')[0];
const accelerationTxt = document.querySelectorAll('[data-acceleration]')[0];

const init = () => {
  if (!Boolean(window.DeviceOrientationEvent) || !Boolean(window.DeviceMotionEvent)) {
    return exitWithUnsupportedDevice();
  }

  setMessage(`Motion and Orientation events are supported.`);

  window.addEventListener('devicemotion', onDeviceMotion, true);
  window.addEventListener('deviceorientation', onDeviceOrientation, false);
};

const onDeviceMotion = e => {
  const { acceleration } = e;
  const { x, y, z } = acceleration;

  setMessage(x, 'accX');
  setMessage(y, 'accY');
  setMessage(z, 'accZ');

  const acc = Object.values(acceleration).map(axis => Math.abs(axis));
  const moving = Boolean(acc.find(axis => axis >= motionThreshold));
  accelerationContainer.className = moving ? 'moving' : '';
};

const onDeviceOrientation = e => {
  const { alpha, beta, gamma } = e;
  setMessage(alpha, 'orientAlpha');
  setMessage(beta, 'orientBeta');
  setMessage(gamma, 'orientGamma');
};

const exitWithUnsupportedDevice = () => {
  setMessage(`Orientation and Motion events are not supported in the browser on your device.`);
};

const setMessage = (msg, elName = 'msg') => {
  txtEls[elName].innerHTML = msg;
};

init();
