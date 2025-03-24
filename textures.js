/**
 * Texture Generator for VR Gallery
 * Contains all functions for procedurally generating textures
 */

const TextureGenerator = {
    // Cache textures to avoid re‑generating them repeatedly
    cache: {},
    // Resolution scale factor (1 = 512×512; reduce to 0.5 for 256×256 on low‑end devices)
    resScale: 1,
    
    // Public API
    initializeTextures() {
        console.log('Starting texture initialization...');
        try {
            this.createFloorTexture();
            this.createWallTexture();
            this.createRoofTexture();
            console.log('Base textures created successfully');
        } catch (e) {
            console.error('Error creating textures:', e);
        }
    },
    
    createFloorTexture() {
        const cacheKey = 'floor-texture';
        if (this.cache[cacheKey]) return this.cache[cacheKey];
        
        console.log('Creating floor texture...');
        const baseRes = 512;
        const width = baseRes * this.resScale;
        const height = baseRes * this.resScale;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
            console.error('Could not get canvas context for floor texture');
            return null;
        }
        
        // Base color
        ctx.fillStyle = '#8B4513'; // Saddle brown
        ctx.fillRect(0, 0, width, height);
        
        // Wood grain pattern
        ctx.strokeStyle = '#A0522D'; // Sienna
        ctx.lineWidth = 3 * this.resScale;
        
        for (let i = 0; i < 40; i++) {
            const x = Math.random() * width;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            
            // Create wavy line for wood grain
            for (let y = 0; y < height; y += 10 * this.resScale) {
                const wobble = Math.sin(y * 0.05) * 15;
                ctx.lineTo(x + wobble, y);
            }
            
            ctx.stroke();
        }
        
        // Add some noise/texture
        for (let i = 0; i < 5000; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const radius = Math.random() * 2 * this.resScale;
            
            ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Create data URL and add to assets
        try {
            const dataUrl = canvas.toDataURL('image/png');
            addTextureToAssets('floor-texture', dataUrl);
            console.log('Floor texture created successfully');
            this.cache[cacheKey] = dataUrl;
            return dataUrl;
        } catch (e) {
            console.error('Error creating floor texture:', e);
            return null;
        }
    },
    
    createWallTexture() {
        const cacheKey = 'wall-texture';
        if (this.cache[cacheKey]) return this.cache[cacheKey];
        
        const baseRes = 512;
        const width = baseRes * this.resScale;
        const height = baseRes * this.resScale;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Base color
        ctx.fillStyle = '#DDDDDD';
        ctx.fillRect(0, 0, width, height);
        
        // Add noise for texture
        for (let i = 0; i < 50000; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const grayValue = 180 + Math.random() * 60; // Range of grays
            
            ctx.fillStyle = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
            ctx.fillRect(x, y, 2 * this.resScale, 2 * this.resScale);
        }
        
        // Add some larger patches
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 5 + Math.random() * 20;
            const grayValue = 160 + Math.random() * 60;
            
            ctx.fillStyle = `rgba(${grayValue}, ${grayValue}, ${grayValue}, 0.3)`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Create data URL
        const dataUrl = canvas.toDataURL('image/png');
        
        // Add to assets
        addTextureToAssets('wall-texture', dataUrl);
        this.cache[cacheKey] = dataUrl;
        
        return dataUrl;
    },
    
    createRoofTexture() {
        const cacheKey = 'roof-texture';
        if (this.cache[cacheKey]) return this.cache[cacheKey];
        
        const baseRes = 512;
        const width = baseRes * this.resScale;
        const height = baseRes * this.resScale;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Base color
        ctx.fillStyle = '#F5F5F5';
        ctx.fillRect(0, 0, width, height);
        
        // Create ceiling tile pattern
        ctx.strokeStyle = '#DDDDDD';
        ctx.lineWidth = 2 * this.resScale;
        
        // Draw horizontal lines
        for (let y = 0; y < height; y += 64 * this.resScale) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Draw vertical lines
        for (let x = 0; x < width; x += 64 * this.resScale) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Add some texture details to tiles
        for (let tileY = 0; tileY < height; tileY += 64 * this.resScale) {
            for (let tileX = 0; tileX < width; tileX += 64 * this.resScale) {
                // Add subtle shadow/highlight
                ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.05})`;
                ctx.fillRect(tileX + 2 * this.resScale, tileY + 2 * this.resScale, 60 * this.resScale, 60 * this.resScale);
                
                // Add texture pattern
                for (let i = 0; i < 10; i++) {
                    const x = tileX + 5 * this.resScale + Math.random() * (54 * this.resScale);
                    const y = tileY + 5 * this.resScale + Math.random() * (54 * this.resScale);
                    const size = 1 * this.resScale + Math.random() * 3 * this.resScale;
                    
                    ctx.fillStyle = `rgba(200,200,200,${Math.random() * 0.3})`;
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
        
        // Create data URL
        const dataUrl = canvas.toDataURL('image/png');
        
        // Add to assets
        addTextureToAssets('roof-texture', dataUrl);
        this.cache[cacheKey] = dataUrl;
        
        return dataUrl;
    },
    
    createArtTexture(entityId, textureId, seed) {
        const cacheKey = textureId + '-' + seed;
        if (this.cache[cacheKey]) {
            if (entityId) applyTextureToElement(entityId, textureId);
            return this.cache[cacheKey];
        }
        
        const baseWidth = 512, baseHeight = 384;
        const width = baseWidth * this.resScale, height = baseHeight * this.resScale;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Style selection based on seed
        const styleType = seed % 5;
        
        switch(styleType) {
            case 0:
                this.createAbstractArt(ctx, canvas, seed);
                break;
            case 1:
                this.createLandscapeArt(ctx, canvas, seed);
                break;
            case 2:
                this.createGeometricArt(ctx, canvas, seed);
                break;
            case 3:
                this.createFluidArt(ctx, canvas, seed);
                break;
            case 4:
                this.createPatternArt(ctx, canvas, seed);
                break;
        }
        
        // Create signature in corner
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.font = `${14 * this.resScale}px Arial`;
        ctx.fillText(`VR Gallery #${seed}`, width - 100 * this.resScale, height - 15 * this.resScale);
        
        // Create data URL
        const dataUrl = canvas.toDataURL('image/png');
        
        // Add to assets
        addTextureToAssets(textureId, dataUrl);
        
        // Apply to entity if entityId is provided
        if (entityId) {
            applyTextureToElement(entityId, textureId);
        }
        
        this.cache[cacheKey] = dataUrl;
        return dataUrl;
    },
    
    // Abstract expressionist style
    createAbstractArt(ctx, canvas, seed) {
        // Background
        const bgColor = this.ColorHelper.getRandomColor(seed);
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Generate random splatters and brushstrokes
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = 10 + Math.random() * 80;
            
            ctx.fillStyle = this.ColorHelper.getRandomColor(seed + i);
            
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
                ctx.strokeStyle = this.ColorHelper.getRandomColor(seed + i + 10);
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
    },
    
    // Landscape art
    createLandscapeArt(ctx, canvas, seed) {
        // Sky gradient
        const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.6);
        skyGradient.addColorStop(0, this.ColorHelper.getRandomBlueShade(seed));
        skyGradient.addColorStop(1, this.ColorHelper.getRandomBlueShade(seed + 5));
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
        const mountainColor = this.ColorHelper.getRandomEarthTone(seed);
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
        groundGradient.addColorStop(0, this.ColorHelper.getRandomEarthTone(seed + 2));
        groundGradient.addColorStop(1, this.ColorHelper.getRandomEarthTone(seed + 4));
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
                ctx.fillStyle = this.ColorHelper.getRandomGreenShade(seed + i);
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
                ctx.fillStyle = this.ColorHelper.getRandomGreenShade(seed + i);
                ctx.beginPath();
                ctx.arc(x, y, 10 + Math.random() * 15, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    },
    
    // Geometric abstract art
    createGeometricArt(ctx, canvas, seed) {
        // Background
        ctx.fillStyle = this.ColorHelper.getRandomLightColor(seed);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Number of shapes
        const shapesCount = 10 + Math.floor(Math.random() * 20);
        
        // Create shapes
        for (let i = 0; i < shapesCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = 20 + Math.random() * 100;
            
            // Random color with transparency
            ctx.fillStyle = `${this.ColorHelper.getRandomColor(seed + i)}${Math.floor(Math.random() * 99) + 1}`;
            
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
                ctx.strokeStyle = this.ColorHelper.getRandomColor(seed + i + 10);
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
            
            ctx.strokeStyle = this.ColorHelper.getRandomColor(seed + i + 20);
            ctx.lineWidth = 1 + Math.random() * 8;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    },
    
    // Fluid/liquid art style
    createFluidArt(ctx, canvas, seed) {
        // Background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Create fluid-like patterns
        for (let i = 0; i < 4; i++) {
            const gradientColors = [
                this.ColorHelper.getRandomColor(seed + i),
                this.ColorHelper.getRandomColor(seed + i + 5),
                this.ColorHelper.getRandomColor(seed + i + 10)
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
            
            blobGradient.addColorStop(0, this.ColorHelper.getRandomColor(seed + i + 30) + "CC");
            blobGradient.addColorStop(1, this.ColorHelper.getRandomColor(seed + i + 35) + "00");
            
            ctx.fillStyle = blobGradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    },
    
    // Pattern-based art
    createPatternArt(ctx, canvas, seed) {
        // Background with gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, this.ColorHelper.getRandomColor(seed));
        gradient.addColorStop(1, this.ColorHelper.getRandomColor(seed + 5));
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
                        ctx.fillStyle = this.ColorHelper.getRandomColor(seed + x + y);
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
                ctx.fillStyle = this.ColorHelper.getRandomColor(seed + r);
                ctx.beginPath();
                ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            // Stripe pattern
            const stripeWidth = 10 + Math.floor(Math.random() * 30);
            
            for (let y = 0; y < canvas.height; y += stripeWidth * 2) {
                ctx.fillStyle = this.ColorHelper.getRandomColor(seed + y);
                ctx.fillRect(0, y, canvas.width, stripeWidth);
            }
        }
        
        // Add some random elements for complexity
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = 5 + Math.random() * 20;
            
            ctx.fillStyle = this.ColorHelper.getRandomColor(seed + i + 50);
            
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
                this.drawStar(ctx, x, y, 5, size, size/2);
                ctx.fill();
            }
        }
    },
    
    // Helper function to draw a star shape
    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
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
    },
    
    // Expose helper: ColorHelper
    ColorHelper: {
        getRandomColor(seed) {
            const colors = [
                '#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', 
                '#1abc9c', '#d35400', '#34495e', '#e67e22', '#27ae60'
            ];
            return colors[Math.abs(seed) % colors.length];
        },
        getRandomLightColor(seed) {
            const colors = [
                '#ecf0f1', '#f5f5f5', '#e0e0e0', '#f0e6cc', '#d6eaf8',
                '#e8daef', '#d5f5e3', '#fcf3cf', '#fadbd8', '#f9e79f'
            ];
            return colors[Math.abs(seed) % colors.length];
        },
        getRandomBlueShade(seed) {
            const blues = [
                '#2980b9', '#3498db', '#1abc9c', '#16a085', '#2c3e50',
                '#8e44ad', '#2574A9', '#59ABE3', '#22313F', '#6BB9F0'
            ];
            return blues[Math.abs(seed) % blues.length];
        },
        getRandomGreenShade(seed) {
            const greens = [
                '#27ae60', '#2ecc71', '#229954', '#1E8449', '#196F3D',
                '#145A32', '#17A589', '#117A65', '#0B5345', '#2ECC71'
            ];
            return greens[Math.abs(seed) % greens.length];
        },
        getRandomEarthTone(seed) {
            const earthTones = [
                '#795548', '#8D6E63', '#A1887F', '#6D4C41', '#5D4037',
                '#4E342E', '#BF360C', '#D84315', '#E65100', '#4E342E'
            ];
            return earthTones[Math.abs(seed) % earthTones.length];
        }
    }
};

// Utility functions remain at global scope
// addTextureToAssets and applyTextureToElement remain unchanged

// Utility: Add texture to A-Frame assets with better error handling
function addTextureToAssets(id, dataUrl) {
    const assets = document.getElementById('assets');
    if (!assets) {
        console.warn('Assets container not found. Creating temporary container.');
        const scene = document.querySelector('a-scene');
        if (!scene) {
            console.error('Scene not found. Cannot add textures.');
            return null;
        }
        
        const tempAssets = document.createElement('a-assets');
        tempAssets.id = 'assets';
        scene.appendChild(tempAssets);
    }
    
    let img = document.getElementById(id);
    
    if (!img) {
        img = document.createElement('img');
        img.id = id;
        assets.appendChild(img);
    }
    
    img.src = dataUrl;
    
    // Debug output
    console.log(`Texture ${id} added to assets`);
    
    return img;
}

// Apply texture to an element when it exists
function applyTextureToElement(elementId, textureId, options = {}) {
    const element = document.getElementById(elementId);
    if (element) {
        let materialAttribute = `src: #${textureId}`;
        
        // Add repeat if specified
        if (options.repeat) {
            materialAttribute += `; repeat: ${options.repeat}`;
        }
        
        element.setAttribute('material', materialAttribute);
        return true;
    }
    return false;
}

// Run initialization when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Textures will be initialized from app.js
});
