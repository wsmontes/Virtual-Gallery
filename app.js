const AppController = {
	init() {
		console.log("App.js: Document loaded");
		this.setupWebXR();
		this.bindUIEvents();
		this.bindSceneEvents();
		this.initPerformanceMonitoring();
	},
	setupWebXR() {
		const isXRSupported = navigator.xr !== undefined;
		this.isVRSupported = isXRSupported;
		console.log("WebXR supported:", isXRSupported);
	},
	bindUIEvents() {
		const enterVrBtn = document.getElementById('enter-vr-btn');
		if (enterVrBtn) {
			enterVrBtn.addEventListener('click', function() {
				const scene = document.querySelector('a-scene');
				if (scene.is('vr-mode')) scene.exitVR();
				else scene.enterVR();
			});
		}
	},
	bindSceneEvents() {
		const scene = document.querySelector('a-scene');
		scene.addEventListener('loaded', function() {
			console.log('A-Frame scene loaded');
			document.getElementById('non-vr-info').style.display = 'block';
			AppController.generateAllTextures();
			scene.addEventListener('enter-vr', function() {
				document.getElementById('non-vr-info').style.display = 'none';
			});
			scene.addEventListener('exit-vr', function() {
				document.getElementById('non-vr-info').style.display = 'block';
			});
		});
		window.addEventListener('load', function() {
			setTimeout(() => {
				document.getElementById('loading-screen').style.display = 'none';
				AppController.showNonVrInfo();
				setTimeout(checkGalleryVisibility, 2000);
				if (typeof window.generateAdditionalArtwork === 'function') {
					console.log("Manually triggering additional artwork generation");
					window.generateAdditionalArtwork();
				}
				if (!AppController.isVRSupported) AppController.showFallbackMessage();
			}, 1500);
		});
	},
	generateAllTextures() {
		// Textures and artwork are created via TextureGenerator & related functions
		TextureGenerator.createFloorTexture();
		TextureGenerator.createWallTexture();
		TextureGenerator.createRoofTexture();
		// ...trigger initial artwork texture creation...
	},
	showNonVrInfo() {
		const nonVrInfo = document.getElementById('non-vr-info');
		if (nonVrInfo) {
			nonVrInfo.style.display = 'block';
			setTimeout(() => { nonVrInfo.classList.add('fold-left'); }, 5000);
		}
	},
	showFallbackMessage() {
		const message = document.createElement('div');
        message.className = 'fallback-message';
        message.innerHTML = `
            <p>Your browser doesn't fully support WebXR VR features.</p>
            <p>You can still explore in desktop mode using WASD keys and mouse.</p>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => {
                message.remove();
            }, 1000);
        }, 5000);
	},
	initPerformanceMonitoring() {
		let frameCount = 0;
		// Instead of heavy per-frame logging, simply count frames via requestAnimationFrame
		function countFrame() { frameCount++; }
		function startLoop() {
			requestAnimationFrame(startLoop);
			countFrame();
		}
		startLoop();
		// Update FPS every 1000ms (reducing CPU usage)
		setInterval(() => {
			const fps = frameCount;
			console.log(`Current FPS: ${fps}`);
			if (fps < 15) {
				applyPerformanceOptimization('reduced');
			} else if (fps < 10) {
				applyPerformanceOptimization('minimal');
			}
			frameCount = 0;
		}, 1000);
		
		function applyPerformanceOptimization(mode) {
			console.log(`Applying performance optimization: ${mode}`);
			const scene = document.querySelector('a-scene');
			if (mode === 'reduced') {
				scene.setAttribute('fog', 'type: exponential; color: #FFFFFF; density: 0.01');
				document.querySelectorAll('a-light[type="spot"]').forEach(light => light.setAttribute('intensity', '0.5'));
			} else if (mode === 'minimal') {
				scene.setAttribute('fog', 'type: exponential; color: #FFFFFF; density: 0.02');
				document.querySelectorAll('a-light[type="spot"]').forEach(light => light.setAttribute('intensity', '0.3'));
				document.querySelectorAll('[id^="plant-"]').forEach(el => el.setAttribute('visible', 'false'));
			}
		}
	}
};

document.addEventListener('DOMContentLoaded', function() {
	AppController.init();
	
	// Interactive objects binding remains here
	const interactiveElements = document.querySelectorAll('.interactive');
	interactiveElements.forEach(el => {
		el.addEventListener('click', function() {
			const info = this.getAttribute('data-info');
			showInfo(info);
		});
		el.addEventListener('mouseenter', function() {
			this.setAttribute('scale', '1.05 1.05 1.05');
		});
		el.addEventListener('mouseleave', function() {
			this.setAttribute('scale', '1 1 1');
		});
	});
	function showInfo(text) {
		const infoPanel = document.getElementById('info-panel');
		const infoText = document.getElementById('info-text');
		infoText.setAttribute('value', text);
		infoPanel.setAttribute('visible', true);
		setTimeout(() => infoPanel.setAttribute('visible', false), 4000);
	}
	
	// Performance fallback message function remains as before.
	function checkGalleryVisibility() {
		const galleryElements = [
            'floor', 'wall-left', 'wall-right', 'wall-back', 
            'wall-front-left', 'wall-front-right', 'wall-front-top', 'roof'
        ];
        
        console.log("Checking gallery visibility...");
        let visibleCount = 0;
        
        galleryElements.forEach(elementId => {
            const element = document.getElementById(elementId);
            if (element) {
                visibleCount++;
                console.log(`Element ${elementId} exists`);
            } else {
                console.warn(`Element ${elementId} not found`);
            }
        });
        
        console.log(`Gallery visibility check: ${visibleCount}/${galleryElements.length} elements found`);
        
        // If no elements are visible, try to rebuild the gallery
        if (visibleCount === 0) {
            console.warn("No gallery elements found, attempting to rebuild");
            if (typeof createGalleryStructure === 'function') {
                createGalleryStructure();
            } else {
                console.error("createGalleryStructure function not available");
                createFallbackMessage();
            }
        }
	}
	// Expose checkGalleryVisibility globally so setTimeout can find it.
	window.checkGalleryVisibility = checkGalleryVisibility;
});

// Generate all textures programmatically
function generateTextures() {
    // Create textures and add to assets
    createFloorTexture();
    createWallTexture();
    createRoofTexture();
    
    // Create initial artwork textures
    createInitialArtworkTextures();
}

// Create initial artwork textures
function createInitialArtworkTextures() {
    createArtwork1();
    createArtwork2();
    createArtwork3();
}

// Create floor texture - wood pattern
function createFloorTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Base color
    ctx.fillStyle = '#8B4513'; // Saddle brown
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Wood grain pattern
    ctx.strokeStyle = '#A0522D'; // Sienna
    ctx.lineWidth = 3;
    
    for (let i = 0; i < 40; i++) {
        const x = Math.random() * canvas.width;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        
        // Create wavy line for wood grain
        for (let y = 0; y < canvas.height; y += 10) {
            const wobble = Math.sin(y * 0.05) * 15;
            ctx.lineTo(x + wobble, y);
        }
        
        ctx.stroke();
    }
    
    // Add some noise/texture
    for (let i = 0; i < 5000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2;
        
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Create data URL and apply to floor
    const dataUrl = canvas.toDataURL('image/png');
    
    // Add to assets
    const assets = document.getElementById('assets');
    const img = document.createElement('img');
    img.id = 'floor-texture';
    img.src = dataUrl;
    assets.appendChild(img);
    
    // Apply to floor
    const floor = document.getElementById('floor');
    floor.setAttribute('material', 'src: #floor-texture; repeat: 4 4');
}

// Create wall texture - concrete/stucco pattern
function createWallTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Base color
    ctx.fillStyle = '#DDDDDD';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add noise for texture
    for (let i = 0; i < 50000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const grayValue = 180 + Math.random() * 60; // Range of grays
        
        ctx.fillStyle = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
        ctx.fillRect(x, y, 2, 2);
    }
    
    // Add some larger patches
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = 5 + Math.random() * 20;
        const grayValue = 160 + Math.random() * 60;
        
        ctx.fillStyle = `rgba(${grayValue}, ${grayValue}, ${grayValue}, 0.3)`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Create data URL and apply to walls
    const dataUrl = canvas.toDataURL('image/png');
    
    // Add to assets
    const assets = document.getElementById('assets');
    const img = document.createElement('img');
    img.id = 'wall-texture';
    img.src = dataUrl;
    assets.appendChild(img);
    
    // Apply to walls
    document.getElementById('wall-left').setAttribute('material', 'src: #wall-texture');
    document.getElementById('wall-right').setAttribute('material', 'src: #wall-texture');
    document.getElementById('wall-back').setAttribute('material', 'src: #wall-texture');
}

// Create abstract landscape artwork
function createArtwork1() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 384; // 4:3 aspect ratio
    const ctx = canvas.getContext('2d');
    
    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.6);
    gradient.addColorStop(0, '#1a2980');
    gradient.addColorStop(1, '#26d0ce');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6);
    
    // Mountains
    ctx.fillStyle = '#2c3e50';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 0.6);
    
    for (let x = 0; x < canvas.width; x += 20) {
        const height = canvas.height * 0.2 + Math.sin(x * 0.01) * canvas.height * 0.15;
        ctx.lineTo(x, canvas.height * 0.6 - height);
    }
    
    ctx.lineTo(canvas.width, canvas.height * 0.6);
    ctx.closePath();
    ctx.fill();
    
    // Ground
    const groundGradient = ctx.createLinearGradient(0, canvas.height * 0.6, 0, canvas.height);
    groundGradient.addColorStop(0, '#2ecc71');
    groundGradient.addColorStop(1, '#27ae60');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);
    
    // Sun
    ctx.fillStyle = '#f1c40f';
    ctx.beginPath();
    ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 40, 0, Math.PI * 2);
    ctx.fill();
    
    // Create data URL
    const dataUrl = canvas.toDataURL('image/png');
    
    // Add to assets
    const assets = document.getElementById('assets');
    const img = document.createElement('img');
    img.id = 'artwork1';
    img.src = dataUrl;
    assets.appendChild(img);
    
    // Apply texture safely with improved targeting
    setTimeout(() => {
        const artwork = document.getElementById('gallery-item-1-canvas');
        if (artwork) {
            artwork.setAttribute('material', 'src: #artwork1');
        } else {
            console.warn('gallery-item-1-canvas not found for texture application');
        }
    }, 200);
}

// Create digital portrait artwork
function createArtwork2() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 384;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#34495e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Abstract face shape
    ctx.fillStyle = '#ecf0f1';
    ctx.beginPath();
    ctx.ellipse(canvas.width/2, canvas.height/2, 120, 160, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = '#2980b9';
    ctx.beginPath();
    ctx.ellipse(canvas.width/2 - 40, canvas.height/2 - 30, 20, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(canvas.width/2 + 40, canvas.height/2 - 30, 20, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Pupils
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(canvas.width/2 - 40, canvas.height/2 - 30, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(canvas.width/2 + 40, canvas.height/2 - 30, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(canvas.width/2 - 40, canvas.height/2 + 40);
    ctx.quadraticCurveTo(canvas.width/2, canvas.height/2 + 70, canvas.width/2 + 40, canvas.height/2 + 40);
    ctx.stroke();
    
    // Abstract patterns
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = 10 + Math.random() * 30;
        
        ctx.fillStyle = `rgba(41, 128, 185, ${Math.random() * 0.5})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Create data URL
    const dataUrl = canvas.toDataURL('image/png');
    
    // Add to assets
    const assets = document.getElementById('assets');
    const img = document.createElement('img');
    img.id = 'artwork2';
    img.src = dataUrl;
    assets.appendChild(img);
    
    // Apply texture safely with improved targeting
    setTimeout(() => {
        const artwork = document.getElementById('gallery-item-2-canvas');
        if (artwork) {
            artwork.setAttribute('material', 'src: #artwork2');
        } else {
            console.warn('gallery-item-2-canvas not found for texture application');
        }
    }, 200);
}

// Create modern composition artwork
function createArtwork3() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 384;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw geometric shapes
    const shapes = 15;
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6'];
    
    for (let i = 0; i < shapes; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = 30 + Math.random() * 100;
        const colorIndex = Math.floor(Math.random() * colors.length);
        
        ctx.fillStyle = colors[colorIndex];
        
        // Randomly choose shape type
        const shapeType = Math.floor(Math.random() * 3);
        
        switch (shapeType) {
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
        }
    }
    
    // Add some lines connecting shapes
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }
    
    // Create data URL
    const dataUrl = canvas.toDataURL('image/png');
    
    // Add to assets
    const assets = document.getElementById('assets');
    const img = document.createElement('img');
    img.id = 'artwork3';
    img.src = dataUrl;
    assets.appendChild(img);
    
    // Apply texture safely with improved targeting
    setTimeout(() => {
        const artwork = document.getElementById('gallery-item-3-canvas');
        if (artwork) {
            artwork.setAttribute('material', 'src: #artwork3');
        } else {
            console.warn('gallery-item-3-canvas not found for texture application');
        }
    }, 200);
}

// Create roof texture - ceiling pattern
function createRoofTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Base color
    ctx.fillStyle = '#F5F5F5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Create ceiling tile pattern
    ctx.strokeStyle = '#DDDDDD';
    ctx.lineWidth = 2;
    
    // Draw horizontal lines
    for (let y = 0; y < canvas.height; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Draw vertical lines
    for (let x = 0; x < canvas.width; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Add some texture details to tiles
    for (let tileY = 0; tileY < canvas.height; tileY += 64) {
        for (let tileX = 0; tileX < canvas.width; tileX += 64) {
            // Add subtle shadow/highlight
            ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.05})`;
            ctx.fillRect(tileX + 2, tileY + 2, 60, 60);
            
            // Add texture pattern
            for (let i = 0; i < 10; i++) {
                const x = tileX + 5 + Math.random() * 54;
                const y = tileY + 5 + Math.random() * 54;
                const size = 1 + Math.random() * 3;
                
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
    const assets = document.getElementById('assets');
    const img = document.createElement('img');
    img.id = 'roof-texture';
    img.src = dataUrl;
    assets.appendChild(img);
    
    // Apply to roof
    const roof = document.getElementById('roof');
    roof.setAttribute('material', 'src: #roof-texture; repeat: 4 4');
    
    // Apply to other wall elements too
    document.getElementById('wall-front-left').setAttribute('material', 'src: #wall-texture');
    document.getElementById('wall-front-right').setAttribute('material', 'src: #wall-texture');
    document.getElementById('wall-front-top').setAttribute('material', 'src: #wall-texture');
}

// Apply texture safely with retries
function applyArtworkTexture(artworkId, textureId) {
    // Try to find the artwork element
    const artwork = document.getElementById(artworkId);
    if (artwork) {
        artwork.setAttribute('material', `src: #${textureId}`);
        return true;
    } else {
        console.warn(`Artwork ${artworkId} not found, will retry once`);
        // Try again after a short delay
        setTimeout(() => {
            const retryArtwork = document.getElementById(artworkId);
            if (retryArtwork) {
                retryArtwork.setAttribute('material', `src: #${textureId}`);
                console.log(`Successfully applied texture to ${artworkId} on retry`);
            } else {
                console.error(`Failed to find artwork ${artworkId} even after retry`);
            }
        }, 500);
        return false;
    }
}
