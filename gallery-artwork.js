// Fix to ensure the additional artwork function is properly exposed globally

// Explicitly define and expose the generateAdditionalArtwork function right away
window.generateAdditionalArtwork = function() {
    console.log("Generating additional artwork...");
    const artworkContainer = document.getElementById('additional-artwork');
    if (!artworkContainer) {
        console.error("additional-artwork container not found");
        artworkContainer = document.createElement('a-entity');
        artworkContainer.id = 'additional-artwork';
        document.querySelector('a-scene').appendChild(artworkContainer);
    }
    
    try {
        // Generate artworks for back wall (add more to existing)
        createBackWallArtwork(artworkContainer);
        
        // Generate artworks for left wall (expanded)
        createLeftWallArtwork(artworkContainer);
        
        // Generate artworks for right wall (expanded)
        createRightWallArtwork(artworkContainer);
        
        // Generate artwork for front wall (entrance area)
        createFrontWallArtwork(artworkContainer);
        
        // Add some decorative elements
        addGalleryDecorations(artworkContainer);
    } catch (e) {
        console.error("Error generating additional artwork:", e);
        if (window.galleryErrorHandler) {
            window.galleryErrorHandler.handleError('artwork-generation', e);
        }
    }
};

// Keep the original DOMContentLoaded listener too for the case of normal flow
document.addEventListener('DOMContentLoaded', function() {
    // Wait for A-Frame scene to be loaded
    const scene = document.querySelector('a-scene');
    scene.addEventListener('loaded', function() {
        // Generate additional artwork
        generateAdditionalArtwork();
    });
    
    // Function to generate and place additional artwork
    function generateAdditionalArtwork() {
        const artworkContainer = document.getElementById('additional-artwork');
        
        // Generate artworks for back wall (add more to existing)
        createBackWallArtwork(artworkContainer);
        
        // Generate artworks for left wall (expanded)
        createLeftWallArtwork(artworkContainer);
        
        // Generate artworks for right wall (expanded)
        createRightWallArtwork(artworkContainer);
        
        // Generate artwork for front wall (entrance area)
        createFrontWallArtwork(artworkContainer);
        
        // Add some decorative elements
        addGalleryDecorations(artworkContainer);
    }
    
    // Make the generateAdditionalArtwork function globally available
    window.generateAdditionalArtwork = function() {
        console.log("Generating additional artwork...");
        const artworkContainer = document.getElementById('additional-artwork');
        if (!artworkContainer) {
            console.error("additional-artwork container not found");
            return;
        }
        
        try {
            // Generate artworks for back wall (add more to existing)
            createBackWallArtwork(artworkContainer);
            
            // Generate artworks for left wall (expanded)
            createLeftWallArtwork(artworkContainer);
            
            // Generate artworks for right wall (expanded)
            createRightWallArtwork(artworkContainer);
            
            // Generate artwork for front wall (entrance area)
            createFrontWallArtwork(artworkContainer);
            
            // Add some decorative elements
            addGalleryDecorations(artworkContainer);
        } catch (e) {
            console.error("Error generating additional artwork:", e);
        }
    };
    
    // Create additional artwork for back wall (adding to existing pieces)
    function createBackWallArtwork(container) {
        // Upper back-wall frames removed as per requirements.
    }
    
    // Create artwork for left wall (expanded coverage)
    function createLeftWallArtwork(container) {
        // REDUCED: Fewer paintings on left wall, better spaced
        const leftWallPositions = [
            // Only include the main row at y: 2
            { x: -9.65, y: 2, z: -6, rotation: "0 90 0", scale: "1 1 1", info: "Left Wall Artwork 1: Urban Cityscape" },
            { x: -9.65, y: 2, z: -2, rotation: "0 90 0", scale: "1 1 1", info: "Left Wall Artwork 2: Moonlit Forest" },
            { x: -9.65, y: 2, z: 2, rotation: "0 90 0", scale: "1 1 1", info: "Left Wall Artwork 3: Ocean Waves" },
            { x: -9.65, y: 2, z: 6, rotation: "0 90 0", scale: "1 1 1", info: "Left Wall Artwork 4: Mountain Vista" }
        ];
        
        // Clear previous artwork for this wall to avoid duplicates
        document.querySelectorAll('[id^="left-wall-art-"]').forEach(el => el.remove());
        
        // Create all artworks for left wall
        leftWallPositions.forEach((pos, index) => {
            const artworkId = `left-wall-art-${index + 1}`;
            const artwork = createArtworkEntity(artworkId, pos, `leftWall${index + 1}`);
            container.appendChild(artwork);
            
            // Generate the texture for this artwork
            createArtTexture(artworkId, `leftWall${index + 1}`, index + 30);
        });
    }
    
    // Create artwork for right wall (expanded coverage)
    function createRightWallArtwork(container) {
        // REDUCED: Fewer paintings on right wall, better spaced
        const rightWallPositions = [
            { x: 9.65, y: 2, z: -6, rotation: "0 -90 0", scale: "1 1 1", info: "Right Wall Artwork 1: Desert Sunset" },
            { x: 9.65, y: 2, z: -2, rotation: "0 -90 0", scale: "1 1 1", info: "Right Wall Artwork 2: Mountain Range" },
            { x: 9.65, y: 2, z: 2, rotation: "0 -90 0", scale: "1 1 1", info: "Right Wall Artwork 3: Misty Valley" },
            { x: 9.65, y: 2, z: 6, rotation: "0 -90 0", scale: "1 1 1", info: "Right Wall Artwork 4: Tropical Beach" }
        ];
        
        // Clear previous artwork for this wall to avoid duplicates
        document.querySelectorAll('[id^="right-wall-art-"]').forEach(el => el.remove());
        
        // Create all artworks for right wall
        rightWallPositions.forEach((pos, index) => {
            const artworkId = `right-wall-art-${index + 1}`;
            const artwork = createArtworkEntity(artworkId, pos, `rightWall${index + 1}`);
            container.appendChild(artwork);
            
            // Generate the texture for this artwork
            createArtTexture(artworkId, `rightWall${index + 1}`, index + 50);
        });
    }
    
    // Create artwork for front wall (entrance area)
    function createFrontWallArtwork(container) {
        // REDUCED: Only keep the main view-line artworks (y: 2)
        const frontWallPositions = [
            // Only keep the larger, more important artworks
            { x: -7, y: 2, z: 9.65, rotation: "0 180 0", scale: "1 1 1", info: "Entrance Artwork 1: Welcome to VR Gallery" },
            { x: 7, y: 2, z: 9.65, rotation: "0 180 0", scale: "1 1 1", info: "Entrance Artwork 2: Digital Explorations" }
        ];
        
        // Clear previous artwork for this wall to avoid duplicates
        document.querySelectorAll('[id^="front-wall-art-"]').forEach(el => el.remove());
        
        // Create all artworks for front wall
        frontWallPositions.forEach((pos, index) => {
            const artworkId = `front-wall-art-${index + 1}`;
            const artwork = createArtworkEntity(artworkId, pos, `frontWall${index + 1}`);
            container.appendChild(artwork);
            
            // Generate the texture for this artwork
            createArtTexture(artworkId, `frontWall${index + 1}`, index + 70);
        });
    }
    
    // Add decorative elements to gallery
    function addGalleryDecorations(container) {
        // Add description plaques under some artwork
        const plaquePositions = [
            { x: -5, y: 0.8, z: -9.6, rotation: "0 0 0", width: 1, height: 0.3, 
              text: "Abstract Landscape: A study in color and form representing nature's elements." },
            { x: 0, y: 0.8, z: -9.6, rotation: "0 0 0", width: 1, height: 0.3, 
              text: "Digital Portrait: Contemporary exploration of human features through digital medium." },
            { x: 5, y: 0.8, z: -9.6, rotation: "0 0 0", width: 1, height: 0.3, 
              text: "Modern Composition: Geometric abstraction of everyday objects and concepts." }
        ];
        
        // Create plaques with descriptions
        plaquePositions.forEach((pos, index) => {
            const plaqueId = `description-plaque-${index + 1}`;
            
            // Create plaque background
            const plaque = document.createElement('a-entity');
            plaque.id = plaqueId;
            plaque.setAttribute('position', `${pos.x} ${pos.y} ${pos.z}`);
            plaque.setAttribute('rotation', pos.rotation);
            
            // Add plaque background
            const plaqueBackground = document.createElement('a-plane');
            plaqueBackground.setAttribute('width', pos.width);
            plaqueBackground.setAttribute('height', pos.height);
            plaqueBackground.setAttribute('color', '#555555');
            
            // Add text to plaque
            const plaqueText = document.createElement('a-text');
            plaqueText.setAttribute('value', pos.text);
            plaqueText.setAttribute('align', 'center');
            plaqueText.setAttribute('width', pos.width * 0.9);
            plaqueText.setAttribute('color', 'white');
            plaqueText.setAttribute('position', '0 0 0.01');
            plaqueText.setAttribute('wrap-count', '30');
            plaqueText.setAttribute('font', 'dejavu');
            plaqueText.setAttribute('scale', '0.25 0.25 0.25');
            
            // Combine elements
            plaque.appendChild(plaqueBackground);
            plaque.appendChild(plaqueText);
            container.appendChild(plaque);
        });
        
        // Add hanging lights
        const lightPositions = [
            { x: -5, y: 5, z: -5, color: "#FFFFAA" },
            { x: 5, y: 5, z: -5, color: "#FFFFAA" },
            { x: -5, y: 5, z: 5, color: "#FFFFAA" },
            { x: 5, y: 5, z: 5, color: "#FFFFAA" },
            { x: 0, y: 5, z: 0, color: "#FFFFFF" }  // Center light
        ];
        
        // Create hanging lights
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
    
    // Helper function to create artwork entity
    function createArtworkEntity(id, position, textureId) {
        const entity = document.createElement('a-entity');
        entity.id = id;
        entity.setAttribute('position', `${position.x} ${position.y} ${position.z}`);
        entity.setAttribute('rotation', position.rotation);
        
        // Apply scale if provided
        if (position.scale) {
            entity.setAttribute('scale', position.scale);
        }
        
        entity.setAttribute('class', 'interactive');
        entity.setAttribute('data-info', position.info);
        
        // Add a thicker frame to give a small buffer and prevent z-fighting
        entity.setAttribute('geometry', 'primitive: plane; width: 3.05; height: 2.05');
        
        // Add black frame first - now with side: double to be visible from both sides
        entity.setAttribute('material', 'color: #111111; side: double'); 
        
        // Create the actual artwork with a larger z-offset to prevent clipping issues
        const artworkCanvas = document.createElement('a-plane');
        artworkCanvas.setAttribute('width', '3');
        artworkCanvas.setAttribute('height', '2');
        // Updated z-offset from 0.05 to 0.1
        artworkCanvas.setAttribute('position', '0 0 0.1'); // was: '0 0 0.05'
        artworkCanvas.setAttribute('material', 'color: #FFFFFF; side: double'); // Double-sided material
        artworkCanvas.id = `${id}-canvas`;
        
        entity.appendChild(artworkCanvas);
        
        return entity;
    }
    
    // Generate art textures with various styles based on seed number
    function createArtTexture(entityId, textureId, seed) {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 384; // 4:3 aspect ratio
        const ctx = canvas.getContext('2d');
        
        // Style selection based on seed
        const styleType = seed % 5;
        
        switch(styleType) {
            case 0:
                createAbstractArt(ctx, canvas, seed);
                break;
            case 1:
                createLandscapeArt(ctx, canvas, seed);
                break;
            case 2:
                createGeometricArt(ctx, canvas, seed);
                break;
            case 3:
                createFluidArt(ctx, canvas, seed);
                break;
            case 4:
                createPatternArt(ctx, canvas, seed);
                break;
        }
        
        // Create signature in corner
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.font = '14px Arial';
        ctx.fillText(`VR Gallery #${seed}`, canvas.width - 100, canvas.height - 15);
        
        // Create data URL
        const dataUrl = canvas.toDataURL('image/png');
        
        // Add to assets
        const assets = document.getElementById('assets');
        const img = document.createElement('img');
        img.id = textureId;
        img.src = dataUrl;
        assets.appendChild(img);
        
        // We need to target the inner canvas element
        const canvasEntityId = `${entityId}-canvas`;
        
        // Apply to entity with double-sided material
        const entity = document.getElementById(canvasEntityId);
        if (entity) {
            entity.setAttribute('material', `src: #${textureId}; side: double`);
        } else {
            console.warn(`Entity ${canvasEntityId} not found for texture application`);
        }
    }
    
    // Abstract expressionist style
    function createAbstractArt(ctx, canvas, seed) {
        // Background
        const bgColor = getRandomColor(seed);
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Generate random splatters and brushstrokes
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = 10 + Math.random() * 80;
            
            ctx.fillStyle = getRandomColor(seed + i);
            
            // Random shapes
            const shapeType = Math.floor(Math.random() * 3);
            
            if (shapeType === 0) {
                // Circles/splatters
                ctx.beginPath();
                ctx.arc(x, y, size/2, 0, Math.PI * 2);
                ctx.fill();
            } else if (shapeType === 1) {
                // Brush strokes
                ctx.beginPath();
                const endX = x + (Math.random() * 200 - 100);
                const endY = y + (Math.random() * 200 - 100);
                ctx.lineWidth = Math.random() * 20;
                ctx.strokeStyle = getRandomColor(seed + i + 10);
                ctx.moveTo(x, y);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            } else {
                // Drips
                ctx.beginPath();
                const drips = Math.floor(Math.random() * 5) + 1;
                for (let d = 0; d < drips; d++) {
                    const driplength = Math.random() * 100;
                    ctx.fillRect(x + d*10, y, 5, driplength);
                }
            }
        }
    }
    
    // Landscape art
    function createLandscapeArt(ctx, canvas, seed) {
        // Sky gradient
        const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.6);
        skyGradient.addColorStop(0, getRandomBlueShade(seed));
        skyGradient.addColorStop(1, getRandomBlueShade(seed + 5));
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6);
        
        // Sun or moon
        const isMoon = (seed % 2 === 0);
        const celestialX = canvas.width * (0.2 + Math.random() * 0.6);
        const celestialY = canvas.height * (0.1 + Math.random() * 0.3);
        const celestialSize = 20 + Math.random() * 40;
        
        if (isMoon) {
            // Moon
            ctx.fillStyle = '#FFFAEA';
            ctx.beginPath();
            ctx.arc(celestialX, celestialY, celestialSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Moon craters
            ctx.fillStyle = 'rgba(200,200,200,0.3)';
            for (let i = 0; i < 5; i++) {
                const craterX = celestialX - celestialSize/2 + Math.random() * celestialSize;
                const craterY = celestialY - celestialSize/2 + Math.random() * celestialSize;
                const craterSize = 2 + Math.random() * 5;
                ctx.beginPath();
                ctx.arc(craterX, craterY, craterSize, 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            // Sun
            const sunGradient = ctx.createRadialGradient(
                celestialX, celestialY, 0,
                celestialX, celestialY, celestialSize
            );
            sunGradient.addColorStop(0, '#FFF176');
            sunGradient.addColorStop(1, '#FF8F00');
            ctx.fillStyle = sunGradient;
            ctx.beginPath();
            ctx.arc(celestialX, celestialY, celestialSize, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Mountains or hills
        const mountainColor = getRandomEarthTone(seed);
        ctx.fillStyle = mountainColor;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.6);
        
        const peaks = 5 + Math.floor(Math.random() * 7);
        const peakWidth = canvas.width / peaks;
        
        for (let i = 0; i <= peaks; i++) {
            const x = i * peakWidth;
            const peakHeight = canvas.height * (0.1 + Math.random() * 0.25);
            const y = canvas.height * 0.6 - peakHeight;
            
            if (i === 0) {
                ctx.lineTo(x, y);
            } else {
                const controlX = x - peakWidth / 2;
                const controlY = y - Math.random() * 50;
                ctx.quadraticCurveTo(controlX, controlY, x, y);
            }
        }
        
        ctx.lineTo(canvas.width, canvas.height * 0.6);
        ctx.closePath();
        ctx.fill();
        
        // Ground/land
        const groundGradient = ctx.createLinearGradient(0, canvas.height * 0.6, 0, canvas.height);
        groundGradient.addColorStop(0, getRandomEarthTone(seed + 2));
        groundGradient.addColorStop(1, getRandomEarthTone(seed + 4));
        ctx.fillStyle = groundGradient;
        ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);
        
        // Trees or elements
        const elementCount = 3 + Math.floor(Math.random() * 8);
        
        for (let i = 0; i < elementCount; i++) {
            const x = 20 + Math.random() * (canvas.width - 40);
            const y = canvas.height * 0.65 + Math.random() * (canvas.height * 0.3);
            const elementType = Math.floor(Math.random() * 3);
            
            if (elementType === 0) {
                // Tree
                const treeHeight = 30 + Math.random() * 70;
                const trunkWidth = 5 + Math.random() * 10;
                
                // Trunk
                ctx.fillStyle = '#5D4037';
                ctx.fillRect(x - trunkWidth/2, y - treeHeight, trunkWidth, treeHeight);
                
                // Foliage
                ctx.fillStyle = getRandomGreenShade(seed + i);
                ctx.beginPath();
                ctx.arc(x, y - treeHeight, treeHeight/2, 0, Math.PI * 2);
                ctx.fill();
            } else if (elementType === 1) {
                // Rock
                ctx.fillStyle = '#9E9E9E';
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + 15 + Math.random() * 20, y);
                ctx.lineTo(x + 10 + Math.random() * 15, y - 10 - Math.random() * 15);
                ctx.lineTo(x - 5 - Math.random() * 10, y - 5 - Math.random() * 10);
                ctx.closePath();
                ctx.fill();
            } else {
                // Bush
                ctx.fillStyle = getRandomGreenShade(seed + i);
                ctx.beginPath();
                ctx.arc(x, y, 10 + Math.random() * 15, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    
    // Geometric abstract art
    function createGeometricArt(ctx, canvas, seed) {
        // Background
        ctx.fillStyle = getRandomLightColor(seed);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Number of shapes
        const shapesCount = 10 + Math.floor(Math.random() * 20);
        
        // Create shapes
        for (let i = 0; i < shapesCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = 20 + Math.random() * 100;
            
            // Random color with transparency
            ctx.fillStyle = `${getRandomColor(seed + i)}${Math.floor(Math.random() * 99) + 1}`;
            
            // Shape type
            const shapeType = Math.floor(Math.random() * 4);
            
            switch(shapeType) {
                case 0: // Circle
                    ctx.beginPath();
                    ctx.arc(x, y, size/2, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 1: // Square
                    ctx.fillRect(x - size/2, y - size/2, size, size);
                    break;
                case 2: // Triangle
                    ctx.beginPath();
                    ctx.moveTo(x, y - size/2);
                    ctx.lineTo(x + size/2, y + size/2);
                    ctx.lineTo(x - size/2, y + size/2);
                    ctx.closePath();
                    ctx.fill();
                    break;
                case 3: // Rectangle
                    const width = size;
                    const height = size * (0.3 + Math.random() * 1.7);
                    ctx.fillRect(x - width/2, y - height/2, width, height);
                    break;
            }
            
            // Sometimes add a border
            if (Math.random() > 0.7) {
                ctx.strokeStyle = getRandomColor(seed + i + 10);
                ctx.lineWidth = 1 + Math.random() * 5;
                ctx.stroke();
            }
        }
        
        // Add some lines
        const linesCount = 5 + Math.floor(Math.random() * 10);
        
        for (let i = 0; i < linesCount; i++) {
            const startX = Math.random() * canvas.width;
            const startY = Math.random() * canvas.height;
            const endX = Math.random() * canvas.width;
            const endY = Math.random() * canvas.height;
            
            ctx.strokeStyle = getRandomColor(seed + i + 20);
            ctx.lineWidth = 1 + Math.random() * 8;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    }
    
    // Fluid/liquid art style
    function createFluidArt(ctx, canvas, seed) {
        // Background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Create fluid-like patterns
        for (let i = 0; i < 4; i++) {
            const gradientColors = [
                getRandomColor(seed + i),
                getRandomColor(seed + i + 5),
                getRandomColor(seed + i + 10)
            ];
            
            // Create several waves of each color
            for (let j = 0; j < 3; j++) {
                const waveHeight = 50 + Math.random() * 150;
                const waveY = Math.random() * canvas.height;
                
                ctx.fillStyle = gradientColors[j];
                ctx.beginPath();
                ctx.moveTo(0, waveY);
                
                // Create wavy pattern
                for (let x = 0; x < canvas.width; x += 10) {
                    const waveDelta = Math.sin(x * 0.02 + j + i) * waveHeight;
                    ctx.lineTo(x, waveY + waveDelta);
                }
                
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();
                ctx.fill();
            }
        }
        
        // Add some circular fluid blobs
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = 10 + Math.random() * 50;
            
            const blobGradient = ctx.createRadialGradient(
                x, y, 0,
                x, y, radius
            );
            
            blobGradient.addColorStop(0, getRandomColor(seed + i + 30) + "CC");
            blobGradient.addColorStop(1, getRandomColor(seed + i + 35) + "00");
            
            ctx.fillStyle = blobGradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Pattern-based art
    function createPatternArt(ctx, canvas, seed) {
        // Background with gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, getRandomColor(seed));
        gradient.addColorStop(1, getRandomColor(seed + 5));
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Determine pattern type
        const patternType = seed % 3;
        
        if (patternType === 0) {
            // Grid pattern
            const gridSize = 20 + Math.floor(Math.random() * 40);
            
            for (let x = 0; x < canvas.width; x += gridSize) {
                for (let y = 0; y < canvas.height; y += gridSize) {
                    if ((x + y) % (gridSize * 2) === 0) {
                        ctx.fillStyle = getRandomColor(seed + x + y);
                        ctx.fillRect(x, y, gridSize, gridSize);
                    }
                }
            }
        } else if (patternType === 1) {
            // Concentric circles
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const maxRadius = Math.max(canvas.width, canvas.height);
            
            for (let r = maxRadius; r > 0; r -= 20) {
                ctx.fillStyle = getRandomColor(seed + r);
                ctx.beginPath();
                ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            // Stripe pattern
            const stripeWidth = 10 + Math.floor(Math.random() * 30);
            
            for (let y = 0; y < canvas.height; y += stripeWidth * 2) {
                ctx.fillStyle = getRandomColor(seed + y);
                ctx.fillRect(0, y, canvas.width, stripeWidth);
            }
        }
        
        // Add some random elements for complexity
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = 5 + Math.random() * 20;
            
            ctx.fillStyle = getRandomColor(seed + i + 50);
            
            // Random elements
            const elementType = Math.floor(Math.random() * 3);
            
            if (elementType === 0) {
                // Dot
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            } else if (elementType === 1) {
                // Square
                ctx.fillRect(x, y, size, size);
            } else {
                // Star
                drawStar(ctx, x, y, 5, size, size/2);
                ctx.fill();
            }
        }
    }
    
    // Helper function to draw a star shape
    function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;
        
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;
            
            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
    }
    
    // Color helper functions
    function getRandomColor(seed) {
        const colors = [
            '#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', 
            '#1abc9c', '#d35400', '#34495e', '#e67e22', '#27ae60'
        ];
        return colors[Math.abs(seed) % colors.length];
    }
    
    function getRandomLightColor(seed) {
        const colors = [
            '#ecf0f1', '#f5f5f5', '#e0e0e0', '#f0e6cc', '#d6eaf8',
            '#e8daef', '#d5f5e3', '#fcf3cf', '#fadbd8', '#f9e79f'
        ];
        return colors[Math.abs(seed) % colors.length];
    }
    
    function getRandomBlueShade(seed) {
        const blues = [
            '#2980b9', '#3498db', '#1abc9c', '#16a085', '#2c3e50',
            '#8e44ad', '#2574A9', '#59ABE3', '#22313F', '#6BB9F0'
        ];
        return blues[Math.abs(seed) % blues.length];
    }
    
    function getRandomGreenShade(seed) {
        const greens = [
            '#27ae60', '#2ecc71', '#229954', '#1E8449', '#196F3D',
            '#145A32', '#17A589', '#117A65', '#0B5345', '#2ECC71'
        ];
        return greens[Math.abs(seed) % greens.length];
    }
    
    function getRandomEarthTone(seed) {
        const earthTones = [
            '#795548', '#8D6E63', '#A1887F', '#6D4C41', '#5D4037',
            '#4E342E', '#BF360C', '#D84315', '#E65100', '#4E342E'
        ];
        return earthTones[Math.abs(seed) % earthTones.length];
    }
});
