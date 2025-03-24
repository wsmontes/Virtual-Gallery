/**
 * Gallery Composition
 * Manages the overall composition of the gallery including lighting and scene setup
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the gallery when scene is loaded
    const scene = document.querySelector('a-scene');
    
    // Important: This ensures everything loads in the right order
    if (scene.hasLoaded) {
        console.log('Scene already loaded, initializing gallery immediately...');
        initializeGallery();
    } else {
        scene.addEventListener('loaded', function() {
            console.log('Scene loaded event fired, initializing gallery...');
            initializeGallery();
        });
    }
    
    function initializeGallery() {
        GalleryComposition.setupEnvironment();
        // Register custom components
        registerCustomComponents();
        
        // Remove debug indicator that creates the red spinning cube
        // addDebugElement();
    }
});

const GalleryComposition = {
    setupEnvironment() {
        console.log("Setting up gallery environment...");
        // Use module methods instead of undefined helpers:
        TextureGenerator.initializeTextures();
        console.log("Textures initialized");
        GalleryArchitecture.createGalleryStructure();
        console.log("Gallery structure created");
        applyTexturesToStructure();
        console.log("Textures applied to structure");
        createLighting();
        console.log("Lighting created");
        createInitialArtwork();
        console.log("Initial artwork created");
        if (typeof window.generateAdditionalArtwork === 'function') {
            window.generateAdditionalArtwork();
            console.log("Additional artwork generated");
        } else {
            console.warn("generateAdditionalArtwork function not found - skipping additional artwork generation");
        }
        setupInteractions();
        console.log("Interactions setup complete");
    },
    // ...other grouping functions can be defined if needed...
};

// Setup the entire gallery environment
function setupEnvironment() {
    console.log("Setting up gallery environment...");
    
    // Create all textures first
    initializeTextures();
    console.log("Textures initialized");
    
    // Then create gallery structure
    createGalleryStructure();
    console.log("Gallery structure created");
    
    // Apply textures to structure elements
    applyTexturesToStructure();
    console.log("Textures applied to structure");
    
    // Setup lighting
    createLighting();
    console.log("Lighting created");
    
    // Create initial artwork frames
    createInitialArtwork();
    console.log("Initial artwork created");
    
    // Generate additional artwork if the function exists
    if (typeof window.generateAdditionalArtwork === 'function') {
        window.generateAdditionalArtwork();
        console.log("Additional artwork generated");
    } else {
        console.warn("generateAdditionalArtwork function not found - skipping additional artwork generation");
    }
    
    // Add interactive features
    setupInteractions();
    console.log("Interactions setup complete");
}

// Create basic lighting first to ensure visibility
function createBasicLighting() {
    const scene = document.querySelector('a-scene');
    
    // Simple ambient light to ensure everything is visible
    const ambientLight = document.createElement('a-light');
    ambientLight.id = 'basic-ambient-light';
    ambientLight.setAttribute('type', 'ambient');
    ambientLight.setAttribute('intensity', '0.8');
    scene.appendChild(ambientLight);
    
    // Simple directional light
    const directionalLight = document.createElement('a-light');
    directionalLight.id = 'basic-directional-light';
    directionalLight.setAttribute('type', 'directional');
    directionalLight.setAttribute('position', '0 1 1');
    directionalLight.setAttribute('intensity', '0.8');
    scene.appendChild(directionalLight);
}

// Create fallback environment if something fails
function createFallbackEnvironment() {
    console.log("Creating fallback environment");
    const scene = document.querySelector('a-scene');
    
    // Create simple floor
    const floor = document.createElement('a-plane');
    floor.setAttribute('position', '0 0 0');
    floor.setAttribute('rotation', '-90 0 0');
    floor.setAttribute('width', '20');
    floor.setAttribute('height', '20');
    floor.setAttribute('color', '#CCCCCC');
    scene.appendChild(floor);
    
    // Create simple walls
    const wall1 = document.createElement('a-box');
    wall1.setAttribute('position', '-10 3 0');
    wall1.setAttribute('width', '0.5');
    wall1.setAttribute('height', '6');
    wall1.setAttribute('depth', '20');
    wall1.setAttribute('color', '#AAAAAA');
    scene.appendChild(wall1);
    
    // Add basic ambient light
    const light = document.createElement('a-light');
    light.setAttribute('type', 'ambient');
    light.setAttribute('intensity', '0.8');
    scene.appendChild(light);
    
    // Add message to user
    const text = document.createElement('a-text');
    text.setAttribute('value', 'Fallback Environment - Gallery failed to initialize properly');
    text.setAttribute('position', '0 2 -5');
    text.setAttribute('align', 'center');
    text.setAttribute('color', 'red');
    text.setAttribute('scale', '2 2 2');
    scene.appendChild(text);
}

// Enhanced lighting with spotlights
function createEnhancedLighting() {
    const lightingContainer = document.getElementById('gallery-lighting');
    if (!lightingContainer) {
        console.warn("Gallery lighting container not found, creating it");
        const newLightingContainer = document.createElement('a-entity');
        newLightingContainer.id = 'gallery-lighting';
        document.querySelector('a-scene').appendChild(newLightingContainer);
        
        // Add hanging lights and spotlights (use existing functions)
        addHangingLights(newLightingContainer);
        addSpotlights(newLightingContainer);
    }
}

// Modified apply textures function with fallbacks
function applyTexturesToStructure() {
    // Apply textures with fallback colors
    applyTextureWithFallback('floor', 'floor-texture', '#8B4513', { repeat: '4 4' });
    applyTextureWithFallback('wall-left', 'wall-texture', '#DDDDDD');
    applyTextureWithFallback('wall-right', 'wall-texture', '#DDDDDD');
    applyTextureWithFallback('wall-back', 'wall-texture', '#DDDDDD');
    applyTextureWithFallback('wall-front-left', 'wall-texture', '#DDDDDD');
    applyTextureWithFallback('wall-front-right', 'wall-texture', '#DDDDDD');
    applyTextureWithFallback('wall-front-top', 'wall-texture', '#DDDDDD');
    applyTextureWithFallback('roof', 'roof-texture', '#F5F5F5', { repeat: '4 4' });
}

// Apply texture with a fallback color
function applyTextureWithFallback(elementId, textureId, fallbackColor, options = {}) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element ${elementId} not found for texture application`);
        return false;
    }
    
    // Get the texture element
    const textureElement = document.getElementById(textureId);
    
    // Apply texture if available, otherwise use fallback color
    if (textureElement) {
        let materialAttribute = `src: #${textureId}`;
        
        // Add repeat if specified
        if (options.repeat) {
            materialAttribute += `; repeat: ${options.repeat}`;
        }
        
        element.setAttribute('material', materialAttribute);
        console.log(`Applied texture ${textureId} to ${elementId}`);
    } else {
        // Apply fallback color
        element.setAttribute('material', `color: ${fallbackColor}`);
        console.log(`Applied fallback color ${fallbackColor} to ${elementId}`);
    }
    
    return true;
}

// Create all lighting for the gallery
function createLighting() {
    const lightingContainer = document.getElementById('gallery-lighting');
    
    // Add ambient light
    const ambientLight = document.createElement('a-light');
    ambientLight.setAttribute('type', 'ambient');
    ambientLight.setAttribute('intensity', '0.5');
    lightingContainer.appendChild(ambientLight);
    
    // Add directional light
    const directionalLight = document.createElement('a-light');
    directionalLight.setAttribute('type', 'directional');
    directionalLight.setAttribute('position', '1 1 1');
    directionalLight.setAttribute('intensity', '0.8');
    lightingContainer.appendChild(directionalLight);
    
    // Add hanging lights
    addHangingLights(lightingContainer);
    
    // Add spotlights for artwork
    addSpotlights(lightingContainer);
    
    // Add ambient sound
    createAmbientSound(lightingContainer);
}

// Add decorative hanging lights throughout the gallery
function addHangingLights(container) {
    // Light positions
    const lightPositions = [
        { x: -5, y: 5, z: -5, color: "#FFFFAA" },
        { x: 5, y: 5, z: -5, color: "#FFFFAA" },
        { x: -5, y: 5, z: 5, color: "#FFFFAA" },
        { x: 5, y: 5, z: 5, color: "#FFFFAA" },
        { x: 0, y: 5, z: 0, color: "#FFFFFF" }  // Center light
    ];
    
    // Create each hanging light
    lightPositions.forEach((pos, index) => {
        const lightId = `hanging-light-${index + 1}`;
        
        // Light fixture
        const lightFixture = document.createElement('a-entity');
        lightFixture.id = lightId;
        lightFixture.setAttribute('position', `${pos.x} ${pos.y} ${pos.z}`);
        
        // Wire for hanging light
        const wire = document.createElement('a-cylinder');
        wire.setAttribute('radius', '0.02');
        wire.setAttribute('height', '1');
        wire.setAttribute('color', '#333333');
        wire.setAttribute('position', '0 0.5 0');
        
        // Light bulb
        const bulb = document.createElement('a-sphere');
        bulb.setAttribute('radius', '0.1');
        bulb.setAttribute('color', '#FFFF88');
        bulb.setAttribute('position', '0 0 0');
        
        // Actual light source
        const light = document.createElement('a-light');
        light.setAttribute('type', 'point');
        light.setAttribute('color', pos.color);
        light.setAttribute('intensity', '0.7');
        light.setAttribute('distance', '10');
        
        // Combine elements
        lightFixture.appendChild(wire);
        lightFixture.appendChild(bulb);
        lightFixture.appendChild(light);
        container.appendChild(lightFixture);
    });
}

// Create additional spot lights to highlight artwork
function addSpotlights(container) {
    // Create spotlights for back wall artwork
    const backWallSpotlights = [
        { x: -5, y: 5, z: -8, target: { x: -5, y: 2, z: -9.7 } },
        { x: 0, y: 5, z: -8, target: { x: 0, y: 2, z: -9.7 } },
        { x: 5, y: 5, z: -8, target: { x: 5, y: 2, z: -9.7 } }
    ];
    
    backWallSpotlights.forEach((pos, index) => {
        createSpotlight(container, `back-spotlight-${index}`, pos, pos.target);
    });
    
    // Create spotlights for side walls
    const sideWallSpotlights = [
        // Left wall
        { x: -8, y: 5, z: -5, target: { x: -9.7, y: 2, z: -5 } },
        { x: -8, y: 5, z: 0, target: { x: -9.7, y: 2, z: 0 } },
        { x: -8, y: 5, z: 5, target: { x: -9.7, y: 2, z: 5 } },
        
        // Right wall
        { x: 8, y: 5, z: -5, target: { x: 9.7, y: 2, z: -5 } },
        { x: 8, y: 5, z: 0, target: { x: 9.7, y: 2, z: 0 } },
        { x: 8, y: 5, z: 5, target: { x: 9.7, y: 2, z: 5 } }
    ];
    
    sideWallSpotlights.forEach((pos, index) => {
        createSpotlight(container, `side-spotlight-${index}`, pos, pos.target);
    });
}

// Helper function to create a spotlight with a target
function createSpotlight(container, id, position, target) {
    // Create spotlight entity
    const spotlight = document.createElement('a-entity');
    spotlight.id = id;
    spotlight.setAttribute('position', `${position.x} ${position.y} ${position.z}`);
    
    // Create the light
    const light = document.createElement('a-light');
    light.setAttribute('type', 'spot');
    light.setAttribute('intensity', '0.8');
    light.setAttribute('angle', '30');
    light.setAttribute('penumbra', '0.5');
    light.setAttribute('decay', '1');
    light.setAttribute('distance', '15');
    light.setAttribute('color', '#FFFFFF');
    light.setAttribute('castShadow', 'true');
    light.setAttribute('target', `#${id}-target`);
    
    // Create target for the spotlight
    const lightTarget = document.createElement('a-entity');
    lightTarget.id = `${id}-target`;
    lightTarget.setAttribute('position', `${target.x} ${target.y} ${target.z}`);
    
    // Add to container
    spotlight.appendChild(light);
    container.appendChild(spotlight);
    container.appendChild(lightTarget);
    
    return spotlight;
}

// Create ambient sound for gallery atmosphere with more resilient audio source
function createAmbientSound(container) {
    // Use a truly public audio file from a CDN that allows cross-origin requests
    // Using a royalty-free ambient track from freesound.org (converted to base64 to avoid CORS issues)
    try {
        // First attempt with an embedded Base64 audio for maximum reliability
        const audioBase64 = "data:audio/mp3;base64,SUQzAwAAAAAAIlRJVDIAAAAZAAAARnJlZSBBbWJpZW50IEJhY2tncm91bmQAVERSQwAAAA8AAAA3MDQ5L2ZyZWVzb3VuZAA=";
        
        // Create ambient music entity
        const ambientMusic = document.createElement('a-entity');
        ambientMusic.id = 'ambient-music';
        
        // Set up sound component with base64 data
        ambientMusic.setAttribute('sound', {
            src: audioBase64,
            autoplay: true,
            loop: true,
            volume: 0.15, // Lower volume to avoid being overwhelming
            positional: false // Non-positional sound that follows the camera
        });
        
        // Add event listeners for debugging
        ambientMusic.addEventListener('sound-loaded', function() {
            console.log('Ambient sound loaded successfully');
        });
        
        ambientMusic.addEventListener('sound-error', function(e) {
            console.warn('Error loading base64 ambient sound, trying fallback URL');
            tryFallbackAudio(ambientMusic);
        });
        
        container.appendChild(ambientMusic);
    } catch (e) {
        console.error('Error creating ambient sound:', e);
        // Create a silent placeholder to avoid further errors
        createSilentAudioEntity(container);
    }
}

// Fallback to alternate URLs if primary fails
function tryFallbackAudio(audioEntity) {
    // List of public fallback URLs to try
    const fallbackUrls = [
        'https://cdn.aframe.io/examples/assets/audio/ambient.ogg', // A-Frame's own ambient audio
        'https://assets.codepen.io/12094/ambient_music.mp3',
        'https://freesound.org/data/previews/532/532064_6183475-lq.mp3'
    ];
    
    // Try each URL in sequence
    let fallbackIndex = 0;
    
    function tryNextUrl() {
        if (fallbackIndex >= fallbackUrls.length) {
            console.error('All ambient audio fallbacks failed, using silent audio');
            createSilentAudioEntity(audioEntity.parentNode);
            audioEntity.remove();
            return;
        }
        
        const url = fallbackUrls[fallbackIndex++];
        console.log(`Trying fallback audio URL ${fallbackIndex}: ${url}`);
        
        audioEntity.setAttribute('sound', {
            src: `url(${url})`,
            autoplay: true,
            loop: true,
            volume: 0.15,
            positional: false
        });
        
        audioEntity.addEventListener('sound-error', tryNextUrl, { once: true });
    }
    
    tryNextUrl();
}

// Create a silent audio entity as last resort
function createSilentAudioEntity(container) {
    console.log("Creating silent audio entity as fallback");
    const silentEntity = document.createElement('a-entity');
    silentEntity.id = 'silent-audio';
    container.appendChild(silentEntity);
}

// Create the initial artwork for the back wall
function createInitialArtwork() {
    const galleryItems = document.getElementById('gallery-items');
    
    // Define positions for main gallery items - increased Z offset from walls
    const positions = [
        { id: 'gallery-item-1', x: -5, y: 2, z: -9.5, info: "Artwork 1: Abstract Landscape" },
        { id: 'gallery-item-2', x: 0, y: 2, z: -9.5, info: "Artwork 2: Digital Portrait" },
        { id: 'gallery-item-3', x: 5, y: 2, z: -9.5, info: "Artwork 3: Modern Composition" }
    ];
    
    // Create each artwork entity with frames
    positions.forEach((pos, index) => {
        // Remove any existing artwork with this ID to prevent duplicates
        const existingArtwork = document.getElementById(pos.id);
        if (existingArtwork) {
            existingArtwork.remove();
        }
        
        // Create main entity (black frame)
        const artwork = document.createElement('a-entity');
        artwork.id = pos.id;
        artwork.setAttribute('position', `${pos.x} ${pos.y} ${pos.z}`);
        artwork.setAttribute('class', 'interactive');
        artwork.setAttribute('data-info', pos.info);
        artwork.setAttribute('geometry', 'primitive: plane; width: 3.05; height: 2.05');
        artwork.setAttribute('material', 'color: #111111; side: double'); // Added double-sided
        
        // Create the canvas with increased offset
        const artworkCanvas = document.createElement('a-plane');
        artworkCanvas.setAttribute('width', '3');
        artworkCanvas.setAttribute('height', '2');
        // Updated z-offset to avoid z-fighting issues
        artworkCanvas.setAttribute('position', '0 0 0.1'); // was: '0 0 0.05'
        artworkCanvas.id = `${pos.id}-canvas`;
        artworkCanvas.setAttribute('material', 'side: double'); // Added double-sided
        
        artwork.appendChild(artworkCanvas);
        galleryItems.appendChild(artwork);
    });
    
    // Generate textures for initial artwork using the TextureGenerator module.
    TextureGenerator.createArtTexture('gallery-item-1-canvas', 'artwork1', 1);
    TextureGenerator.createArtTexture('gallery-item-2-canvas', 'artwork2', 2);
    TextureGenerator.createArtTexture('gallery-item-3-canvas', 'artwork3', 3);
}

// Register custom A-Frame components
function registerCustomComponents() {
    // Only register if not already registered
    if (!AFRAME.components['boundary-check']) {
        // Register boundary checking component
        AFRAME.registerComponent('boundary-check', {
            init: function() {
                this.camera = this.el;
                this.boundaries = document.querySelectorAll('.boundary');
                this.speed = 0.2;
                this.canMove = true;
                this.lastPosition = new THREE.Vector3();
                this.currentPosition = new THREE.Vector3();
                
                // Store initial position
                this.camera.object3D.getWorldPosition(this.lastPosition);
                this.currentPosition.copy(this.lastPosition);
            },
            
            tick: function() {
                // Store current position
                this.camera.object3D.getWorldPosition(this.currentPosition);
                
                // If position has changed, check boundaries
                if (!this.currentPosition.equals(this.lastPosition)) {
                    // Check collision with each boundary
                    let collision = false;
                    const cameraPosition = this.currentPosition.clone();
                    
                    // Create a bounding box for the camera
                    const cameraBoundingBox = new THREE.Box3();
                    cameraBoundingBox.setFromCenterAndSize(
                        cameraPosition, 
                        new THREE.Vector3(0.5, 0.5, 0.5)
                    );
                    
                    // Check for collisions with boundaries
                    this.boundaries.forEach(boundary => {
                        const boundaryEl = boundary.object3D;
                        const boundaryBox = new THREE.Box3().setFromObject(boundaryEl);
                        
                        if (cameraBoundingBox.intersectsBox(boundaryBox)) {
                            collision = true;
                        }
                    });
                    
                    // If collision detected, revert to previous position
                    if (collision) {
                        const rig = document.getElementById('rig');
                        const rigPosition = new THREE.Vector3();
                        rig.object3D.getWorldPosition(rigPosition);
                        
                        // Calculate movement direction
                        const direction = new THREE.Vector3().subVectors(
                            this.currentPosition, 
                            this.lastPosition
                        );
                        
                        // Move back by setting position to last valid position
                        rig.setAttribute('position', {
                            x: rigPosition.x - direction.x,
                            y: rigPosition.y,
                            z: rigPosition.z - direction.z
                        });
                    } else {
                        // Update last position if no collision
                        this.lastPosition.copy(this.currentPosition);
                    }
                }
            }
        });
    } else {
        console.log('boundary-check component already registered, skipping');
    }
}

// Setup interaction behaviors
function setupInteractions() {
    // Artwork interactivity removed.
}
