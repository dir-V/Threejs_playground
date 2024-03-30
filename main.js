// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.134.0/build/three.module.js';
import * as THREE from 'three';
import "./style.css";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';

//Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( '#D3D3D30');


//Dir
const geometry = new THREE.TetrahedronGeometry(4, 0);
const material = new THREE.MeshStandardMaterial({
    color: "#FF0000",
    roughness: 0.5,
    metalness: 0.3
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Light

const light1 = new THREE.PointLight(0xffffff, 500, 0);
light1.position.set(0, 0, -10);
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 500, 0);
light2.position.set(0, -10, 10);
scene.add(light2);

const light3 = new THREE.PointLight(0xffffff, 500, 0);
light3.position.set(-10, 10 , 0);
scene.add(light3);

const light4 = new THREE.PointLight(0xffffff, 500, 0);
light4.position.set(-20, 0 ,-10);
scene.add(light4);


//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/ sizes.height, 0.1, 100);
camera.position.z = 15;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 5;



// Resizing
window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    //Camera updating
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
})
const loop = () => {
    controls.update()

    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}
loop();

const tl = gsap.timeline({defaults: {duration: 1} } );
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, {z:1, x: 1, y:1})

//animation colour change
let mouseDown = false;
let rgb = []
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));

window.addEventListener("mousemove", (e) => {
    if (mouseDown){
        rgb = [
            Math.round((e.pageX / sizes.width) * 255),
            Math.round((e.pageY / sizes.height) * 255),
            150,
        ]
        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
        gsap.to(mesh.material.color,{
            r: newColor.r,
            g: newColor.g,
            b: newColor.b,
        })
    }
})

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate, );

	mesh.rotation.x += 0.003;
	mesh.rotation.y += 0.003;

	renderer.render( scene, camera );
}


animate();