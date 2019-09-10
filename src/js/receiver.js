import '../css/receiver.css';
const THREE = require('three');
const txImage = require('../img/ap-logo.png');

var camera, scene, renderer;
var mesh;

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
  initCube();
  state.socket = io();
  state.socket.on('connect', () => onConnect(state.socket));
  state.targetRotation = { x: 0, y: 0, z: 0 };
};

const onConnect = socket => {
  const socketId = socket.id;
  state.socketId = socketId;
  socket.on('orientation', data => onControllerOrientation(data));
  animate();
  setMessage(`Connected. Socket id: ${state.socketId}`);
};

const onControllerOrientation = data => {
  let { alpha, beta, gamma } = data;

  beta += 180;
  gamma += 180;

  setMessage(alpha, 'orientAlpha');
  setMessage(beta, 'orientBeta');
  setMessage(gamma, 'orientGamma');

  document.documentElement.style.setProperty('--zRot', alpha);
  document.documentElement.style.setProperty('--yRot', beta);
  document.documentElement.style.setProperty('--xRot', gamma);

  state.targetRotation = {
    x: gamma,
    y: beta,
    z: alpha,
  };
};

const setMessage = (msg, elName = 'msg') => {
  txtEls[elName].innerHTML = msg;
};

function initCube() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;
  scene = new THREE.Scene();
  // scene.background = new THREE.Color(0xffffff);

  var texture = new THREE.TextureLoader().load(txImage);
  var geometry = new THREE.BoxBufferGeometry(300, 200, 100);
  var matTop = new THREE.MeshBasicMaterial({ color: 0xff6183 });
  var matBottom = new THREE.MeshBasicMaterial({ color: 0xe9f024 });
  var matSides = new THREE.MeshBasicMaterial({ color: 0x60d1db });
  var matFrontBack = new THREE.MeshBasicMaterial({ color: 0xffdd00 });

  const materials = [matTop, matBottom, matBottom, matBottom, matBottom, matBottom];

  mesh = new THREE.Mesh(geometry, materials);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xdedede, 1);

  renderer.render(scene, camera);
  mesh.rotation.x = 0;
  mesh.rotation.y = 0;
  mesh.rotation.z = 0;

  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  const target = state.targetRotation;
  // const xDiff = Math.round(mesh.rotation.x - target.x); // * 0.3;
  // const yDiff = Math.round(mesh.rotation.y - target.y); // * 0.3;
  // const zDiff = Math.round(mesh.rotation.z - target.z); // * 0.3;

  // if (mesh.rotation.x != target.x) {
  //   mesh.rotation.x += xDiff;
  // }
  // if (mesh.rotation.xy != target.xy) {
  //   mesh.rotation.xy += yDiff;
  // }
  // if (mesh.rotation.z != target.z) {
  //   mesh.rotation.z += zDiff;
  // }

  // setMessage(`xDiff: ${xDiff} | yDiff: ${yDiff} | zDiff: ${zDiff}`);
  // setMessage(`target.x: ${target.x} | target.y: ${target.y} | target.z: ${target.z}`);

  mesh.rotation.x += (target.x - mesh.rotation.x) / 20;
  mesh.rotation.y = target.y;
  mesh.rotation.z = target.z;
  renderer.render(scene, camera);
}

init();
