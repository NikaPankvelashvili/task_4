import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const colors = [ new THREE.MeshBasicMaterial({color: 0xff0000}), new THREE.MeshBasicMaterial({color: 0x00ff00}),
                new THREE.MeshBasicMaterial({color: 0x0000ff}), new THREE.MeshBasicMaterial({color: 0xffff00}),
                new THREE.MeshBasicMaterial({color: 0xff00ff}),  new THREE.MeshBasicMaterial({color: 0x00ffff})]; 


const primitives = [ new THREE.BoxGeometry(1,1,1), new THREE.ConeGeometry(1,2,8), new THREE.CylinderGeometry(1,1,1,50), 
                    new THREE.DodecahedronGeometry(1), new THREE.IcosahedronGeometry(1,5), new THREE.OctahedronGeometry(1),
                    new THREE.TorusGeometry(1,0.3,16,100)];


const color = new THREE.MeshBasicMaterial

function createCube() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  return cube;
}

function randomPrimitive() {
  const geometry = primitives[Math.floor(Math.random() * primitives.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const figure = new THREE.Mesh( geometry, color)
  figure.position.set( Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10) );
  return figure;
}

function mouseClick() {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    scene.remove( intersects[0].object )
    scene.add(randomPrimitive());
  }
}

function init() {
  const cube = createCube();
  scene.add( cube );
  
  camera.position.z = 5;
  
}


function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

init();
animate();

window.addEventListener('click', mouseClick);