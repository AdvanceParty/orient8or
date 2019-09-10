const THREE = require('three');

var camera, scene, renderer;
var mesh;

const txImage = require('../img/ap-logo.png');

init();
animate();

function init() {
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

  // var count = geometry.attributes.position.count;
  // var col = new THREE.Color();

  // for (var i = 0; i < count; i++) {
  //   col.setRGB(50, i * 20, 0);
  //   geometry.attributes.color.setXYZ(i, col.r, col.g, col.b);
  // }

  // console.log(geometry.faces);
  // console.log(geometry.attributes);
  // console.log(geometry.materials);

  const materials = [matTop, matBottom, matBottom, matBottom, matBottom, matBottom];
  // geometry.faces[0].materialIndex = 0;
  // geometry.faces[1].materialIndex = 1;
  // geometry.faces[2].materialIndex = 2;
  // geometry.faces[3].materialIndex = 3;
  // geometry.faces[4].materialIndex = 4;
  // geometry.faces[5].materialIndex = 5;

  mesh = new THREE.Mesh(geometry, materials);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xdedede, 1);

  renderer.render(scene, camera);

  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  // requestAnimationFrame(animate);
  // mesh.rotation.x += 0.005;
  // mesh.rotation.y += 0.01;
  // renderer.render(scene, camera);
}
