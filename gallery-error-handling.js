/**
 * Gallery Error Handling
 * Provides error recovery and debugging features for the VR Gallery
 */

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Error handling system initialized");
    
    window.GalleryErrorHandler = {
        errors: [],
        handleError(context, error) {
            const errorInfo = { context, error, timestamp: new Date().toISOString() };
            this.errors.push(errorInfo);
            if (error instanceof Error) {
                console.error(`Gallery Error in ${context}:`, error.message, error.stack);
            } else {
                console.error(`Gallery Error in ${context}:`, error);
            }
            this.attemptRecovery(context, error);
            if (window.galleryDebug) this.showErrorIndicator(context, error);
        },
        attemptRecovery(context, error) {
            switch(context) {
                case 'texture-loading':
                    console.log("Attempting texture recovery...");
                    this.recoverTextures();
                    break;
                case 'artwork-generation':
                    console.log("Attempting artwork recovery...");
                    this.recoverArtwork();
                    break;
                case 'lighting':
                    console.log("Attempting lighting recovery...");
                    this.recoverLighting();
                    break;
                default:
                    console.log("No specific recovery available for:", context);
                    break;
            }
        },
        recoverTextures() {
            // Apply default materials to elements if textures failed
            const elements = ['floor', 'wall-left', 'wall-right', 'wall-back', 
                             'wall-front-left', 'wall-front-right', 'wall-front-top', 'roof'];
            
            elements.forEach(id => {
                const el = document.getElementById(id);
                if (el && (!el.getAttribute('material') || el.getAttribute('material').src === '')) {
                    console.log(`Applying fallback material to ${id}`);
                    
                    // Different colors for different element types
                    let color = '#AAAAAA';
                    if (id === 'floor') color = '#8B4513';
                    if (id === 'roof') color = '#F5F5F5';
                    
                    el.setAttribute('material', `color: ${color}`);
                }
            });
        },
        recoverArtwork() {
            // Create simple colored planes if artwork fails
            const artworkContainer = document.getElementById('gallery-items');
            if (!artworkContainer) return;
            
            // Check if any artwork exists, if not create simple ones
            if (artworkContainer.childElementCount === 0) {
                const positions = [
                    { id: 'recovery-art-1', x: -5, y: 2, z: -9.7, color: '#e74c3c' },
                    { id: 'recovery-art-2', x: 0, y: 2, z: -9.7, color: '#3498db' },
                    { id: 'recovery-art-3', x: 5, y: 2, z: -9.7, color: '#2ecc71' }
                ];
                
                positions.forEach(pos => {
                    const artwork = document.createElement('a-plane');
                    artwork.id = pos.id;
                    artwork.setAttribute('position', `${pos.x} ${pos.y} ${pos.z}`);
                    artwork.setAttribute('width', '3');
                    artwork.setAttribute('height', '2');
                    artwork.setAttribute('color', pos.color);
                    
                    artworkContainer.appendChild(artwork);
                });
            }
        },
        recoverLighting() {
            // Create basic lighting if advanced lighting fails
            const scene = document.querySelector('a-scene');
            
            // Check if there's any lighting at all
            const lights = document.querySelectorAll('a-light');
            if (lights.length === 0) {
                console.log("Creating recovery lighting");
                
                // Simple ambient light
                const ambient = document.createElement('a-light');
                ambient.setAttribute('type', 'ambient');
                ambient.setAttribute('intensity', '0.7');
                
                // Simple directional light
                const directional = document.createElement('a-light');
                directional.setAttribute('type', 'directional');
                directional.setAttribute('position', '0 1 1');
                directional.setAttribute('intensity', '0.6');
                
                scene.appendChild(ambient);
                scene.appendChild(directional);
            }
        },
        showErrorIndicator(context, error) {
            // (Optional debug visual indicator code; kept commented)
            return;
        }
    };
    
    window.addEventListener('error', function(e) {
        const context = e.filename ? `${e.filename}:${e.lineno}:${e.colno}` : 'window';
        const errorDetails = e.error || e.message || 'Unknown error';
        console.error(`Gallery Error in ${context}:`, errorDetails);
    });
});
