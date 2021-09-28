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
camera.position.set(0, 10, 50);

// LIGHT
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-10, 15, 15);
scene.add(light);

const floor_dimensions = { x: 20, y: 0.8, z: 15 };

// BOX
const material = new THREE.MeshLambertMaterial({ color: 0xffbda5 });
const geometry1 = new THREE.BoxGeometry(
    floor_dimensions.x * 1.5,
    floor_dimensions.y,
    floor_dimensions.z * 1.5
);
const box = new THREE.Mesh(geometry1, material);
scene.add(box);
box.position.set(0, -floor_dimensions.y, 0);

const material2 = new THREE.MeshLambertMaterial({ color: 0x003399 });
const geometry2 = new THREE.BoxGeometry(
    floor_dimensions.x * 1.01,
    floor_dimensions.y * 1.01,
    floor_dimensions.z * 1.01
);
const box2 = new THREE.Mesh(geometry2, material2);
scene.add(box2);
box2.position.set(0, 0, 0);

function newBox(x, y, z, withEdge = false) {
    const material = new THREE.MeshLambertMaterial({
        color: 0x000000,
        opacity: 0.5,
        transparent: true,
    });
    const geometry = new THREE.BoxGeometry(x, y, z);
    const mesh = new THREE.Mesh(geometry, material);
    if (withEdge) {
        var geometry_edge = new THREE.EdgesGeometry(
            new THREE.BoxGeometry(x, y, z)
        );
        var material_edge = new THREE.LineBasicMaterial({
            color: 0xffffff,
        });
        var edge = new THREE.LineSegments(geometry_edge, material_edge);
        mesh.add(edge);
    }
    return mesh;
}

const floors = [];
// const floor_dimensions = {x: 20, y: 0.8, z: 15}
for (let i = 0; i < 10; i += 2) {
    floors.push(
        newBox(floor_dimensions.x, floor_dimensions.y, floor_dimensions.z, true)
    );
    floors[floors.length - 1].position.set(0, 2 * i, 0);
}
floors.forEach((el) => scene.add(el));

const columns = [];
const column_dimensions = { x: 1, y: 3.5, z: 1 };
for (let i = 0; i < 8; i += 2) {
    columns.push(
        newBox(column_dimensions.x, column_dimensions.y, column_dimensions.z)
    );
    columns[columns.length - 1].position.set(
        (0.9 * floor_dimensions.x) / 2 - column_dimensions.x / 2,
        column_dimensions.y / 2 + floor_dimensions.y / 2 + 2 * i,
        (-0.9 * floor_dimensions.z) / 2 + column_dimensions.z / 2
    );
    columns.push(
        newBox(column_dimensions.x, column_dimensions.y, column_dimensions.z)
    );
    columns[columns.length - 1].position.set(
        (0.9 * floor_dimensions.x) / 2 - column_dimensions.x / 2,
        column_dimensions.y / 2 + floor_dimensions.y / 2 + 2 * i,
        (0.9 * floor_dimensions.z) / 2 - column_dimensions.z / 2
    );
    columns.push(
        newBox(column_dimensions.x, column_dimensions.y, column_dimensions.z)
    );
    columns[columns.length - 1].position.set(
        (-0.9 * floor_dimensions.x) / 2 + column_dimensions.x / 2,
        column_dimensions.y / 2 + floor_dimensions.y / 2 + 2 * i,
        (-0.9 * floor_dimensions.z) / 2 + column_dimensions.z / 2
    );
    columns.push(
        newBox(column_dimensions.x, column_dimensions.y, column_dimensions.z)
    );
    columns[columns.length - 1].position.set(
        (-0.9 * floor_dimensions.x) / 2 + column_dimensions.x / 2,
        column_dimensions.y / 2 + floor_dimensions.y / 2 + 2 * i,
        (0.9 * floor_dimensions.z) / 2 - column_dimensions.z / 2
    );
}
columns.forEach((el) => scene.add(el));

const controls = new OrbitControls(camera, renderer.domElement);
function animate() {
    requestAnimationFrame(animate);
    // box.rotation.x += 0.01;
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
    renderer.render(scene, camera);
}
animate();
