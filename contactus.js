// יצירת סצנה, מצלמה ורנדרר
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector(".blob-preview").appendChild(renderer.domElement);

// חומר עם shader מותאם אישית
const uniforms = {
  u_time: { value: 0.0 },
  u_mouse: { value: new THREE.Vector2(0.5, 0.5) }
};

const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: `
    uniform float u_time;
    varying vec2 vUv;

    float noise(vec3 p){
      return sin(p.x)*sin(p.y)*sin(p.z);
    }

    void main() {
      vUv = uv;
      vec3 newPosition = position + normal * 0.2 * sin(u_time + position.x * 2.0 + position.y * 2.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;

    void main() {
      float dist = distance(vUv, vec2(0.5));
      float alpha = smoothstep(0.5, 0.25, dist);
      gl_FragColor = vec4(0.9, 0.9, 1.0, alpha * 0.9);
    }
  `,
  transparent: true
});

// גיאומטריית כדור עם הרבה פסים
const geometry = new THREE.SphereGeometry(1, 128, 128);
const blob = new THREE.Mesh(geometry, material);
scene.add(blob);

// עדכון מיקום העכבר
document.addEventListener("mousemove", (e) => {
  uniforms.u_mouse.value.x = e.clientX / window.innerWidth;
  uniforms.u_mouse.value.y = 1.0 - e.clientY / window.innerHeight;
});

// רספונסיביות
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// אנימציה מתמדת
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  uniforms.u_time.value = clock.getElapsedTime();
  blob.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();
