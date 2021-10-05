import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// CAMERA
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
);
camera.position.set(-30, 100, -150);

// LIGHT
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-10, 15, 15);
scene.add(light);

// GROUND
const ground_data = { dimensions: { x: 80, y: 0.8, z: 180 }, color: 0xffbda5 };
const ground_mat = new THREE.MeshLambertMaterial({ color: ground_data.color });
const ground_geo = new THREE.BoxGeometry(
    ground_data.dimensions.x * 2,
    ground_data.dimensions.y,
    ground_data.dimensions.z * 1.5
);
const ground = new THREE.Mesh(ground_geo, ground_mat);
scene.add(ground);
ground.position.set(0, -ground_data.dimensions.y, 0);

function build_wall({
    x,
    y = 30,
    z,
    pos_x = 0,
    pos_z = 0,
    pos_y = 0,
    color = 0x434343,
    side = THREE.FrontSide,
    opacity = 0.5,
    rotate = 0,
}) {
    const wall_mat = new THREE.MeshBasicMaterial({
        color,
        opacity,
        side,
        transparent: true,
    });
    const wall_geo = new THREE.BoxGeometry(x, y, z);
    const wall = new THREE.Mesh(wall_geo, wall_mat);
    scene.add(wall);

    if (rotate) wall.rotation.y = rotate;
    if (!pos_y) pos_y = y / 2;

    wall.position.set(pos_x, pos_y, pos_z);
}
const walls = [
    { x: 50, z: 1, pos_x: 15, pos_z: -90 }, // A
    { x: 10, z: 1, pos_x: -35, pos_z: -90 }, // B

    { x: 1, z: 180, pos_x: 40 }, // C - Left outer wall
    { x: 1, z: 60, pos_x: 10, pos_z: -60 }, // D
    { x: 1, z: 180, pos_x: -40 }, //E - Right outer wall
    { x: 80, z: 1, pos_z: 90 },
    { x: 40, z: 1, pos_x: 20, pos_z: -30 }, // F
    { x: 40, z: 1, pos_x: 20, pos_z: 0 }, // G
    { x: 1, z: 30, pos_x: 0, pos_z: -15 }, //H
    { x: 20, z: 1, pos_x: 30, pos_z: 10 }, //I
    { x: 20, z: 1, pos_x: 30, pos_z: 60 }, //J
    { x: 20, z: 1, pos_x: -30, pos_z: 10 }, //K
    { x: 20, z: 1, pos_x: -30, pos_z: 60 }, //L
    { x: 1, z: 50, pos_x: -20, pos_z: 35 }, //M
    { x: 1, z: 50, pos_x: 20, pos_z: 35 }, //N
    { x: 60, z: 1, pos_x: 0, pos_z: 70 }, // O
    { x: 1, z: 20, pos_x: 30, pos_z: 80 }, //P
    { x: 1, z: 20, pos_x: -30, pos_z: 80 }, //Q
    { x: 20, y: 5, z: 1, pos_x: -20, pos_z: -90, pos_y: 27.5 }, //maindoortop
    {
        x: 10,
        y: 25,
        z: 1,
        pos_x: -10 + (Math.cos(Math.PI / 3) * 10) / 2,
        pos_z: -90 + (Math.sin(Math.PI / 3) * 10) / 2,
        color: 0x831a1a,
        opacity: 0.9,
        rotate: (Math.PI * 4) / 6,
    }, //maindoor
    {
        x: 10,
        y: 25,
        z: 1,
        pos_x: -25,
        pos_z: -90,
        color: 0x831a1a,
        opacity: 0.9,
    }, //maindoor
    {
        x: 35,
        z: 1,
        pos_x: -22.5,
        pos_z: -70,
        color: 0x00689c,
        opacity: 0.9,
    }, // ying bi
    {
        z: 10,
        x: 1,
        y: 25,
        color: 0xffffff,
        pos_x: 9.9,
        pos_z: -54.8,
        opacity: 0.9,
    },
    {
        z: 10,
        x: 1,
        y: 25,
        color: 0xffffff,
        pos_x: 9.9,
        pos_z: -65.2,
        opacity: 0.9,
    },
    {
        z: 10,
        x: 1,
        y: 25,
        color: 0xffffff,
        pos_x: -19.9,
        pos_z: 25,
        opacity: 0.9,
    },
    {
        z: 10,
        x: 1,
        y: 25,
        color: 0xffffff,
        pos_x: 19.9,
        pos_z: 45,
        opacity: 0.9,
    },
    {
        z: 1,
        x: 10,
        y: 25,
        color: 0xffffff,
        pos_x: -5.2,
        pos_z: 69.9,
        opacity: 0.9,
    },
    {
        z: 1,
        x: 10,
        y: 25,
        color: 0xffffff,
        pos_x: 5.2,
        pos_z: 69.9,
        opacity: 0.9,
    },
    {
        z: 1,
        x: 10,
        y: 25,
        color: 0xffffff,
        pos_x: 10,
        pos_z: 0.1,
        opacity: 0.9,
    },
];

walls.forEach(build_wall);

// final touch
const loader = new THREE.TextureLoader();
const flower_material = new THREE.MeshBasicMaterial({
    map: loader.load('./flower.jpg'),
});

const pretty_wall_geo = new THREE.BoxGeometry(30, 20, 1);
const pretty_wall = new THREE.Mesh(pretty_wall_geo, flower_material);
scene.add(pretty_wall);
pretty_wall.position.set(-22.5, 17, -70.2);

const controls = new OrbitControls(camera, renderer.domElement);
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
