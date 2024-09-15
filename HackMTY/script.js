// JavaScript para agregar funcionalidades adicionales
document.addEventListener("DOMContentLoaded", function() {
    console.log("Sitio web listo para interactuar.");
    
    // Código adicional para funcionalidades interactivas
});

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


// Configuración básica de la escena
let scene, camera, renderer;

function init() {
    // Crear la escena
    scene = new THREE.Scene();

    // Crear la cámara (campo de visión, proporción de aspecto, planos cercanos y lejanos)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(3, 2, 5); // Mejoramos la posición para una vista más interesante

    // Crear el renderizador y establecer su tamaño
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // Habilitamos las sombras
    document.getElementById("threejs-container").appendChild(renderer.domElement);

    // Crear luz ambiental y luz direccional
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Luz ambiental suave
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7); // Posición de la luz
    directionalLight.castShadow = true; // Habilitar sombras proyectadas
    scene.add(directionalLight);

    // Materiales mejorados con reflejos
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x8B572A,   // Color marrón moderno para el cuerpo
        roughness: 0.5,    // Un poco rugoso para darle textura
        metalness: 0.1,    // Ligero brillo metálico
        clearcoat: 0.3,    // Un acabado suave
        clearcoatRoughness: 0.1
    });

    const roofMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xC0392B,   // Color rojo oscuro para el techo
        roughness: 0.7,    // Más rugosidad para un acabado mate
        metalness: 0.05
    });

    const windowMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xADD8E6,   // Azul claro para las ventanas
        metalness: 0.9,    // Mayor brillo
        roughness: 0.2,
        transparent: true,
        opacity: 0.7
    });

    // Cuerpo de la casa (cubos con bordes suavizados simulados)
    const geometryBody = new THREE.BoxGeometry(1.5, 1, 1);
    const body = new THREE.Mesh(geometryBody, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    scene.add(body);

    // Techo de la casa (una pirámide)
    const geometryRoof = new THREE.ConeGeometry(1.2, 0.8, 4); // Más pequeño para un mejor ajuste
    const roof = new THREE.Mesh(geometryRoof, roofMaterial);
    roof.position.y = 0.9;
    roof.rotation.y = Math.PI / 4; // Rotamos el techo para que coincida con la base
    roof.castShadow = true;
    roof.receiveShadow = true;
    scene.add(roof);

    // Añadimos una ventana en la casa (opcional)
    const windowGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.01);
    const window = new THREE.Mesh(windowGeometry, windowMaterial);
    window.position.set(0, 0.2, 0.505); // Justo en el frente de la casa
    scene.add(window);

    // Suelo para la casa (plano)
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // Giramos para que quede plano en el suelo
    plane.position.y = -0.5; // Colocar la casa sobre el suelo
    plane.receiveShadow = true;
    scene.add(plane);

    // Render loop
    function animate() {
        requestAnimationFrame(animate);

        // Animación rotatoria (opcional)
        body.rotation.y += 0.01;
        roof.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();
}

window.onload = init;
