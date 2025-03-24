document.addEventListener('DOMContentLoaded', function() {
    // Check for WebXR support
    const isXRSupported = navigator.xr !== undefined;
    const isVRSupported = isXRSupported ? true : false; // Simplified check
    
    // Elements
    const loadingScreen = document.getElementById('loading-screen');
    const nonVrInfo = document.getElementById('non-vr-info');
    const enterVrBtn = document.getElementById('enter-vr-btn');
    const infoPanel = document.getElementById('info-panel');
    const infoText = document.getElementById('info-text');
    
    // Generate textures
    generateTextures();
    
    // Handle loading
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            if (!isVRSupported) {
                console.log('WebXR not fully supported - using fallback mode');
                showFallbackMessage();
            }
        }, 1500); // Simulate loading time for demo purposes
    });
    
    // VR Mode button
    if (enterVrBtn) {
        enterVrBtn.addEventListener('click', function() {
            const scene = document.querySelector('a-scene');
            if (scene.is('vr-mode')) {
                scene.exitVR();
            } else {
                scene.enterVR();
            }
        });
    }
    
    // Handle scene loaded event
    const scene = document.querySelector('a-scene');
    scene.addEventListener('loaded', function() {
        console.log('A-Frame scene loaded');
        nonVrInfo.style.display = 'block';
        
        // VR mode detection
        scene.addEventListener('enter-vr', function() {
            console.log('Entered VR mode');
            nonVrInfo.style.display = 'none';
        });
        
        scene.addEventListener('exit-vr', function() {
            console.log('Exited VR mode');
            nonVrInfo.style.display = 'block';
        });
    });
    
    // Generate all textures programmatically
    function generateTextures() {
        // Create floor texture
        createFloorTexture();
        
        // Create wall texture
        createWallTexture();
        
        // Create artwork textures
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
        
        // Create the plane with the texture
        const artwork = document.getElementById('gallery-item-1');
        artwork.setAttribute('geometry', 'primitive: plane; width: 3; height: 2');
        artwork.setAttribute('material', 'src: #artwork1');
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
        
        // Create the plane with the texture
        const artwork = document.getElementById('gallery-item-2');
        artwork.setAttribute('geometry', 'primitive: plane; width: 3; height: 2');
        artwork.setAttribute('material', 'src: #artwork2');
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
        
        // Create the plane with the texture
        const artwork = document.getElementById('gallery-item-3');
        artwork.setAttribute('geometry', 'primitive: plane; width: 3; height: 2');
        artwork.setAttribute('material', 'src: #artwork3');
    }
    
    // Interactive objects
    const interactiveElements = document.querySelectorAll('.interactive');
    interactiveElements.forEach(el => {
        el.addEventListener('click', function() {
            const info = this.getAttribute('data-info');
            showInfo(info);
        });
        
        // Hover effects
        el.addEventListener('mouseenter', function() {
            this.setAttribute('scale', '1.05 1.05 1.05');
        });
        
        el.addEventListener('mouseleave', function() {
            this.setAttribute('scale', '1 1 1');
        });
    });
    
    // Show info panel with text
    function showInfo(text) {
        infoText.setAttribute('value', text);
        infoPanel.setAttribute('visible', true);
        
        // Hide after a few seconds
        setTimeout(() => {
            infoPanel.setAttribute('visible', false);
        }, 4000);
    }
    
    function showFallbackMessage() {
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
    }
    
    // Performance monitoring
    let lastTime = 0;
    let frameCount = 0;
    
    function checkPerformance(time) {
        frameCount++;
        
        if (time - lastTime > 1000) {
            const fps = Math.round((frameCount * 1000) / (time - lastTime));
            console.log(`Current FPS: ${fps}`);
            
            if (fps < 30) {
                console.warn('Performance warning: FPS below target');
                // Could implement quality reduction here
            }
            
            frameCount = 0;
            lastTime = time;
        }
        
        requestAnimationFrame(checkPerformance);
    }
    
    requestAnimationFrame(checkPerformance);
});
