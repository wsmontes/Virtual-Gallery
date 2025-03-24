// Water effect simulation using THREE.js

// Scene setup
const container = document.getElementById('water-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Camera position and controls
camera.position.set(0, 30, 60);
camera.lookAt(0, 0, 0);
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI * 0.45;
controls.minDistance = 20;
controls.maxDistance = 150;

// Add sky and enhanced lighting
const skyColor = new THREE.Color(0x87ceeb);
scene.background = skyColor;
scene.fog = new THREE.Fog(skyColor, 100, 300);

// Lighting
const ambientLight = new THREE.AmbientLight(0x6b7d8e, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xfffaf0, 1.2);
directionalLight.position.set(-30, 50, 30);
scene.add(directionalLight);

// Add subtle sunlight effect
const sunLight = new THREE.DirectionalLight(0xffeedd, 0.8);
sunLight.position.set(10, 40, -30);
scene.add(sunLight);

// Water parameters
const waterGeometry = new THREE.PlaneGeometry(150, 150, 160, 160); // Higher resolution grid

// Multiple ripples storage
const MAX_RIPPLES = 10;
const ripples = [];

// Water material with enhanced custom shaders
const waterMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    ripples: { value: [] }, // Will store ripple data
    sunDirection: { value: new THREE.Vector3(0.5, 0.8, 0.3).normalize() },
    sunColor: { value: new THREE.Color(0xffffff) },
  },
  vertexShader: `
    uniform float time;
    uniform vec3 sunDirection;
    uniform vec2 resolution;
    
    // Ripple structure: x,y = position, z = impact, w = time
    uniform vec4 ripples[${MAX_RIPPLES}];
    
    varying vec2 vUv;
    varying float noise;
    varying vec3 vNormal;
    varying float height;
    varying vec3 vWorldPosition;
    
    // Simplex noise functions
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      // First corner
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      // Permutations
      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
              
      // Gradients
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      
      // Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      // Mix final noise value
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
    
    // Calculate normal from height field
    vec3 calculateNormal(vec3 pos, float noiseValue) {
      // Use small offsets to calculate gradient
      float eps = 0.1;
      vec3 normal;
      
      // Sample near points
      float hL = snoise(vec3(pos.x - eps, pos.y, time * 0.3));
      float hR = snoise(vec3(pos.x + eps, pos.y, time * 0.3));
      float hD = snoise(vec3(pos.x, pos.y - eps, time * 0.3));
      float hU = snoise(vec3(pos.x, pos.y + eps, time * 0.3));
      
      // Calculate normal using central differences
      normal.x = (hL - hR) / (2.0 * eps);
      normal.y = (hD - hU) / (2.0 * eps);
      normal.z = 1.0;
      
      return normalize(normal);
    }
    
    void main() {
      vUv = uv;
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      
      // Multi-layered water waves using simplex noise
      vec3 pos = position;
      
      // Large slow waves
      float largeWaves = snoise(vec3(pos.x * 0.01, pos.y * 0.01, time * 0.1)) * 2.0;
      
      // Medium waves
      float mediumWaves = snoise(vec3(pos.x * 0.04, pos.y * 0.04, time * 0.3)) * 1.0;
      
      // Small ripples
      float smallWaves = snoise(vec3(pos.x * 0.1, pos.y * 0.1, time * 0.5)) * 0.3;
      
      // Combine different wave scales
      float baseHeight = largeWaves + mediumWaves + smallWaves;
      pos.z += baseHeight;
      height = baseHeight;
      
      // Process all interactive ripples
      for (int i = 0; i < ${MAX_RIPPLES}; i++) {
        if (ripples[i].z > 0.01) { // If ripple is active (impact > 0.01)
          vec2 ripplePos = ripples[i].xy;
          float impact = ripples[i].z;
          float rippleTime = ripples[i].w;
          
          float dist = distance(vec2(pos.x, pos.y), ripplePos);
          
          // More realistic wave propagation
          float speed = 5.0;
          float waveLength = 4.0;
          float amplitude = impact * 2.0;
          float phase = dist * waveLength - rippleTime * speed;
          
          // Attenuate wave with distance and time
          float attenuation = max(0.0, 1.0 - dist / 20.0) * max(0.0, 1.0 - rippleTime * 0.5);
          
          // Add wave using attenuated sine wave with decay
          pos.z += sin(phase) * amplitude * attenuation / (1.0 + dist * 0.4);
        }
      }
      
      // Calculate accurate normals for lighting
      vNormal = calculateNormal(pos, baseHeight);
      
      noise = pos.z * 0.5 + 0.5; // Normalize to 0-1 range for color mapping
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec2 resolution;
    uniform vec3 sunDirection;
    uniform vec3 sunColor;
    
    varying vec2 vUv;
    varying float noise;
    varying vec3 vNormal;
    varying float height;
    varying vec3 vWorldPosition;
    
    // Fresnel effect calculation
    float fresnel(vec3 eyeVector, vec3 worldNormal) {
      return pow(1.0 + dot(eyeVector, worldNormal), 3.0);
    }
    
    void main() {
      // Dynamic water color calculation
      vec3 deepColor = vec3(0.0, 0.05, 0.2);
      vec3 shallowColor = vec3(0.0, 0.5, 0.8);
      
      // Enhanced water color gradient based on height and position
      float depthFactor = max(0.0, 1.0 - (noise * 2.0));
      vec3 waterColor = mix(shallowColor, deepColor, depthFactor);
      
      // Calculate eye vector for reflections/refractions
      vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
      
      // Enhanced Fresnel effect for reflectivity
      float fresnelTerm = fresnel(viewDirection, vNormal);
      
      // Sunlight specular reflection
      float sunSpecular = pow(max(0.0, dot(reflect(-sunDirection, vNormal), viewDirection)), 100.0) * 0.8;
      
      // Water surface normal variation for caustics
      float caustics = sin(vUv.x * 30.0 + time * 2.0) * sin(vUv.y * 30.0 + time * 2.0) * 0.03;
      caustics += sin(vUv.x * 20.0 - time) * sin(vUv.y * 20.0 - time) * 0.02;
      
      // Combine lighting effects
      vec3 finalColor = waterColor;
      
      // Add sky reflection based on fresnel term
      vec3 skyColor = vec3(0.3, 0.6, 0.9);
      finalColor = mix(finalColor, skyColor, fresnelTerm * 0.5);
      
      // Add sun specular highlights
      finalColor += sunSpecular * sunColor;
      
      // Add subtle caustics and wave highlights
      finalColor += caustics * vec3(0.5, 0.7, 1.0);
      
      // Small wave crests highlights
      float waveCrest = smoothstep(0.4, 0.5, noise);
      finalColor += waveCrest * 0.3;
      
      // Transparency based on depth and angle
      float alpha = min(0.9 + fresnelTerm * 0.1, 0.98);
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
  transparent: true
});

const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI / 2; // Flat on XZ plane
scene.add(water);

// Enhanced underwater environment
const sandTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/floors/FloorsCheckerboard_S.jpg');
sandTexture.wrapS = THREE.RepeatWrapping;
sandTexture.wrapT = THREE.RepeatWrapping;
sandTexture.repeat.set(4, 4);

const bottomGeometry = new THREE.PlaneGeometry(150, 150);
const bottomMaterial = new THREE.MeshStandardMaterial({
  color: 0xe0c9a6,
  roughness: 0.8,
  map: sandTexture,
  side: THREE.DoubleSide
});
const bottomPlane = new THREE.Mesh(bottomGeometry, bottomMaterial);
bottomPlane.rotation.x = -Math.PI / 2;
bottomPlane.position.y = -8;
scene.add(bottomPlane);

// Add some underwater rocks and plants for realism
function addUnderwaterObjects() {
  // Add some rocks
  const rockGeometry = new THREE.SphereGeometry(1, 6, 6);
  const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.9 });
  
  for (let i = 0; i < 15; i++) {
    const rock = new THREE.Mesh(rockGeometry, rockMaterial);
    const scale = Math.random() * 1.5 + 0.5;
    rock.scale.set(scale, scale * 0.7, scale);
    rock.position.set(
      Math.random() * 140 - 70,
      -7.5 + Math.random() * 2,
      Math.random() * 140 - 70
    );
    rock.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    scene.add(rock);
  }
  
  // Add some seaweed/plants
  const plantGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 5);
  const plantMaterial = new THREE.MeshStandardMaterial({ color: 0x196e1d, roughness: 0.8 });
  
  for (let i = 0; i < 20; i++) {
    const plant = new THREE.Mesh(plantGeometry, plantMaterial);
    plant.position.set(
      Math.random() * 140 - 70,
      -6.5,
      Math.random() * 140 - 70
    );
    plant.scale.set(1, 1 + Math.random(), 1);
    // Make plants bend slightly
    plant.rotation.set(
      (Math.random() - 0.5) * 0.5,
      Math.random() * Math.PI * 2,
      (Math.random() - 0.5) * 0.5
    );
    scene.add(plant);
  }
}

addUnderwaterObjects();

// Create splash particle system
class SplashSystem {
  constructor() {
    this.particles = [];
    this.geometry = new THREE.SphereGeometry(0.15, 6, 6);
    this.material = new THREE.MeshBasicMaterial({ 
      color: 0xffffff, 
      transparent: true,
      opacity: 0.8
    });
  }
  
  createSplash(position, count = 20) {
    for (let i = 0; i < count; i++) {
      const particle = new THREE.Mesh(this.geometry, this.material);
      
      // Position at splash point
      particle.position.set(position.x, position.y + 0.2, position.z);
      
      // Random velocity
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.1 + Math.random() * 0.3;
      const velocity = new THREE.Vector3(
        Math.cos(angle) * speed,
        0.3 + Math.random() * 0.5, // Up velocity
        Math.sin(angle) * speed
      );
      
      // Add to scene
      scene.add(particle);
      
      // Store particle data
      this.particles.push({
        mesh: particle,
        velocity: velocity,
        life: 1.0
      });
    }
  }
  
  update() {
    // Update all particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      
      // Apply gravity and update position
      particle.velocity.y -= 0.015;
      particle.mesh.position.add(particle.velocity);
      
      // Reduce life
      particle.life -= 0.02;
      particle.mesh.material.opacity = particle.life;
      particle.mesh.scale.multiplyScalar(0.98);
      
      // Remove dead particles
      if (particle.life <= 0 || particle.mesh.position.y < -0.5) {
        scene.remove(particle.mesh);
        this.particles.splice(i, 1);
      }
    }
  }
}

const splashSystem = new SplashSystem();

// Initialize ripples array
for (let i = 0; i < MAX_RIPPLES; i++) {
  ripples.push(new THREE.Vector4(0, 0, 0, 0)); // x,y position, z impact, w time
}
waterMaterial.uniforms.ripples.value = ripples;

// Handle mouse/touch interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isPointerDown = false;
let lastTapTime = 0;

function updateMouse(event) {
  // Get correct mouse position for both mouse and touch events
  const x = event.clientX || (event.touches && event.touches[0] ? event.touches[0].clientX : 0);
  const y = event.clientY || (event.touches && event.touches[0] ? event.touches[0].clientY : 0);
  
  mouse.x = (x / window.innerWidth) * 2 - 1;
  mouse.y = -(y / window.innerHeight) * 2 + 1;
}

function pointerDown(event) {
  updateMouse(event);
  isPointerDown = true;
  createRippleAtMouse(true); // Strong impact on click
}

function pointerMove(event) {
  updateMouse(event);
  if (isPointerDown) {
    createRippleAtMouse(false); // Lighter impact on drag
  }
}

function pointerUp() {
  isPointerDown = false;
}

function createRippleAtMouse(isClick) {
  const now = Date.now();
  if (now - lastTapTime < (isClick ? 50 : 100)) return; // Rate limiting based on interaction type
  lastTapTime = now;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(water);
  
  if (intersects.length > 0) {
    const point = intersects[0].point;
    
    // Create visual splash if it's a click
    if (isClick) {
      splashSystem.createSplash(point, 15 + Math.floor(Math.random() * 10));
    }
    
    // Find oldest ripple to replace
    let oldestRippleIndex = 0;
    let oldestRippleTime = Infinity;
    
    for (let i = 0; i < ripples.length; i++) {
      // If we find an inactive ripple, use it immediately
      if (ripples[i].z <= 0.01) {
        oldestRippleIndex = i;
        break;
      }
      
      // Otherwise track the oldest active ripple
      if (ripples[i].w < oldestRippleTime) {
        oldestRippleTime = ripples[i].w;
        oldestRippleIndex = i;
      }
    }
    
    // Set new ripple
    const impactStrength = isClick ? (0.8 + Math.random() * 0.4) : (0.3 + Math.random() * 0.2);
    ripples[oldestRippleIndex].set(point.x, point.z, impactStrength, 0);
  }
}

// Add event listeners
window.addEventListener('mousedown', pointerDown);
window.addEventListener('mousemove', pointerMove);
window.addEventListener('mouseup', pointerUp);
window.addEventListener('touchstart', pointerDown, { passive: true });
window.addEventListener('touchmove', pointerMove, { passive: true });
window.addEventListener('touchend', pointerUp);

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  waterMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Update water time uniform for animation
  const deltaTime = 0.016; // Assume ~60fps
  waterMaterial.uniforms.time.value += deltaTime;
  
  // Update splash particles
  splashSystem.update();
  
  // Update ripples time
  for (let i = 0; i < ripples.length; i++) {
    if (ripples[i].z > 0.01) {
      // Increment time for active ripples
      ripples[i].w += deltaTime * 3;
      
      // Gradually reduce impact as ripple expands
      ripples[i].z *= 0.98;
    }
  }
  
  controls.update();
  renderer.render(scene, camera);
}

animate();
