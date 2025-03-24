/**
 * Gallery Architecture
 * Handles the creation of the physical gallery structure
 */

// Generate the entire gallery structure
function createGalleryStructure() {
    console.log("Creating gallery structure...");
    
    // First, make sure we have a container, or create one
    let galleryContainer = document.getElementById('gallery-structure');
    if (!galleryContainer) {
        console.warn("Gallery structure container not found, creating one");
        galleryContainer = document.createElement('a-entity');
        galleryContainer.id = 'gallery-structure';
        document.querySelector('a-scene').appendChild(galleryContainer);
    }
    
    // Create the basic gallery elements with fallback materials
    createFloor(galleryContainer);
    createWalls(galleryContainer);
    createRoof(galleryContainer);
    createBoundaries(galleryContainer);
    
    // Delay decorations to ensure core structure is rendered
    setTimeout(() => {
        createDecorations(galleryContainer);
    }, 1000);
    
    return galleryContainer;
}

// Create the gallery floor with fallback material
function createFloor(container) {
    const floor = document.createElement('a-plane');
    floor.id = 'floor';
    floor.setAttribute('position', '0 0 0');
    floor.setAttribute('rotation', '-90 0 0');
    floor.setAttribute('width', '20');
    floor.setAttribute('height', '20');
    
    // Add a fallback material immediately to ensure visibility
    floor.setAttribute('material', 'color: #8B4513;');
    
    container.appendChild(floor);
    console.log("Floor created");
    
    return floor;
}

// Create all walls of the gallery with fallback materials
function createWalls(container) {
    // Create left wall
    const leftWall = document.createElement('a-box');
    leftWall.id = 'wall-left';
    leftWall.setAttribute('position', '-10 3 0');
    leftWall.setAttribute('width', '0.5');
    leftWall.setAttribute('height', '6');
    leftWall.setAttribute('depth', '20');
    leftWall.setAttribute('material', 'color: #DDDDDD;');
    
    // Create right wall
    const rightWall = document.createElement('a-box');
    rightWall.id = 'wall-right';
    rightWall.setAttribute('position', '10 3 0');
    rightWall.setAttribute('width', '0.5');
    rightWall.setAttribute('height', '6');
    rightWall.setAttribute('depth', '20');
    rightWall.setAttribute('material', 'color: #DDDDDD;');
    
    // Create back wall
    const backWall = document.createElement('a-box');
    backWall.id = 'wall-back';
    backWall.setAttribute('position', '0 3 -10');
    backWall.setAttribute('width', '20');
    backWall.setAttribute('height', '6');
    backWall.setAttribute('depth', '0.5');
    backWall.setAttribute('material', 'color: #DDDDDD;');
    
    // Create front wall with opening for entrance
    const frontWallLeft = document.createElement('a-box');
    frontWallLeft.id = 'wall-front-left';
    frontWallLeft.setAttribute('position', '-7 3 10');
    frontWallLeft.setAttribute('width', '6');
    frontWallLeft.setAttribute('height', '6');
    frontWallLeft.setAttribute('depth', '0.5');
    frontWallLeft.setAttribute('material', 'color: #DDDDDD;');
    
    const frontWallRight = document.createElement('a-box');
    frontWallRight.id = 'wall-front-right';
    frontWallRight.setAttribute('position', '7 3 10');
    frontWallRight.setAttribute('width', '6');
    frontWallRight.setAttribute('height', '6');
    frontWallRight.setAttribute('depth', '0.5');
    frontWallRight.setAttribute('material', 'color: #DDDDDD;');
    
    const frontWallTop = document.createElement('a-box');
    frontWallTop.id = 'wall-front-top';
    frontWallTop.setAttribute('position', '0 5 10');
    frontWallTop.setAttribute('width', '8');
    frontWallTop.setAttribute('height', '2');
    frontWallTop.setAttribute('depth', '0.5');
    frontWallTop.setAttribute('material', 'color: #DDDDDD;');
    
    // Add all walls to container
    container.appendChild(leftWall);
    container.appendChild(rightWall);
    container.appendChild(backWall);
    container.appendChild(frontWallLeft);
    container.appendChild(frontWallRight);
    container.appendChild(frontWallTop);
    
    console.log("Walls created");
    
    return {
        leftWall, 
        rightWall, 
        backWall, 
        frontWallLeft, 
        frontWallRight, 
        frontWallTop
    };
}

// Create gallery roof with fallback material
function createRoof(container) {
    const roof = document.createElement('a-box');
    roof.id = 'roof';
    roof.setAttribute('position', '0 6 0');
    roof.setAttribute('width', '20');
    roof.setAttribute('height', '0.5');
    roof.setAttribute('depth', '20');
    
    // Add a fallback material immediately to ensure visibility
    roof.setAttribute('material', 'color: #F5F5F5;');
    
    container.appendChild(roof);
    console.log("Roof created");
    
    return roof;
}

// Create invisible boundaries to prevent walking through walls
function createBoundaries(container) {
    // Left boundary
    const boundaryLeft = document.createElement('a-box');
    boundaryLeft.id = 'boundary-left';
    boundaryLeft.setAttribute('position', '-9.5 1.5 0');
    boundaryLeft.setAttribute('width', '0.1');
    boundaryLeft.setAttribute('height', '3');
    boundaryLeft.setAttribute('depth', '19');
    boundaryLeft.setAttribute('opacity', '0');
    boundaryLeft.setAttribute('class', 'boundary');
    
    // Right boundary
    const boundaryRight = document.createElement('a-box');
    boundaryRight.id = 'boundary-right';
    boundaryRight.setAttribute('position', '9.5 1.5 0');
    boundaryRight.setAttribute('width', '0.1');
    boundaryRight.setAttribute('height', '3');
    boundaryRight.setAttribute('depth', '19');
    boundaryRight.setAttribute('opacity', '0');
    boundaryRight.setAttribute('class', 'boundary');
    
    // Back boundary
    const boundaryBack = document.createElement('a-box');
    boundaryBack.id = 'boundary-back';
    boundaryBack.setAttribute('position', '0 1.5 -9.5');
    boundaryBack.setAttribute('width', '19');
    boundaryBack.setAttribute('height', '3');
    boundaryBack.setAttribute('depth', '0.1');
    boundaryBack.setAttribute('opacity', '0');
    boundaryBack.setAttribute('class', 'boundary');
    
    // Front boundaries
    const boundaryFrontLeft = document.createElement('a-box');
    boundaryFrontLeft.id = 'boundary-front-left';
    boundaryFrontLeft.setAttribute('position', '-7 1.5 9.5');
    boundaryFrontLeft.setAttribute('width', '6');
    boundaryFrontLeft.setAttribute('height', '3');
    boundaryFrontLeft.setAttribute('depth', '0.1');
    boundaryFrontLeft.setAttribute('opacity', '0');
    boundaryFrontLeft.setAttribute('class', 'boundary');
    
    const boundaryFrontRight = document.createElement('a-box');
    boundaryFrontRight.id = 'boundary-front-right';
    boundaryFrontRight.setAttribute('position', '7 1.5 9.5');
    boundaryFrontRight.setAttribute('width', '6');
    boundaryFrontRight.setAttribute('height', '3');
    boundaryFrontRight.setAttribute('depth', '0.1');
    boundaryFrontRight.setAttribute('opacity', '0');
    boundaryFrontRight.setAttribute('class', 'boundary');
    
    // Add all boundaries to container
    container.appendChild(boundaryLeft);
    container.appendChild(boundaryRight);
    container.appendChild(boundaryBack);
    container.appendChild(boundaryFrontLeft);
    container.appendChild(boundaryFrontRight);
}

// Create enhanced decorations with plants and seating
function createDecorations(container) {
    // Add floor transition mat at entrance
    const entranceMat = document.createElement('a-plane');
    entranceMat.id = 'entrance-mat';
    entranceMat.setAttribute('position', '0 0.01 8');
    entranceMat.setAttribute('rotation', '-90 0 0');
    entranceMat.setAttribute('width', '6');
    entranceMat.setAttribute('height', '3');
    entranceMat.setAttribute('color', '#444444');
    
    // Add gallery name on entrance
    const gallerySign = document.createElement('a-entity');
    gallerySign.id = 'gallery-sign';
    gallerySign.setAttribute('position', '0 4.5 9.7');
    gallerySign.setAttribute('text', 'value: VR ART GALLERY; color: #333333; align: center; width: 10; font: exo2bold');
    
    // Add information desk
    const infoDesk = document.createElement('a-box');
    infoDesk.id = 'info-desk';
    infoDesk.setAttribute('position', '0 0.5 6');
    infoDesk.setAttribute('width', '2');
    infoDesk.setAttribute('height', '1');
    infoDesk.setAttribute('depth', '1');
    infoDesk.setAttribute('color', '#8B4513');
    
    // Add visitor's book on desk
    const visitorBook = document.createElement('a-box');
    visitorBook.id = 'visitor-book';
    visitorBook.setAttribute('position', '0 1.05 6');
    visitorBook.setAttribute('width', '0.5');
    visitorBook.setAttribute('height', '0.1');
    visitorBook.setAttribute('depth', '0.7');
    visitorBook.setAttribute('color', '#F5F5DC');
    visitorBook.setAttribute('class', 'interactive');
    visitorBook.setAttribute('data-info', 'Visitor Book: Please leave your comments and impressions about the gallery.');
    
    // Add decorations to container
    container.appendChild(entranceMat);
    container.appendChild(gallerySign);
    container.appendChild(infoDesk);
    container.appendChild(visitorBook);
    
    // Add plants around the gallery
    createPlants(container);
    
    // Add seating for visitors
    createSeating(container);
    
    // Add standing exhibition pedestals
    createExhibitionPedestals(container);
}

// Add plants to make the gallery more inviting
function createPlants(container) {
    const plantPositions = [
        { x: -8, y: 0, z: 8, scale: "1 1 1" },     // Near entrance left
        { x: 8, y: 0, z: 8, scale: "1 1 1" },      // Near entrance right
        { x: -8, y: 0, z: -8, scale: "1.2 1.2 1.2" }, // Back left corner
        { x: 8, y: 0, z: -8, scale: "1.2 1.2 1.2" }   // Back right corner
    ];
    
    plantPositions.forEach((pos, index) => {
        // Create plant pot
        const pot = document.createElement('a-cylinder');
        pot.id = `plant-pot-${index}`;
        pot.setAttribute('position', `${pos.x} 0.4 ${pos.z}`);
        pot.setAttribute('radius', '0.4');
        pot.setAttribute('height', '0.8');
        pot.setAttribute('color', '#8B4513');
        
        // Create plant
        const plant = document.createElement('a-entity');
        plant.id = `plant-${index}`;
        plant.setAttribute('position', `${pos.x} 0.8 ${pos.z}`);
        
        // Plant foliage (using sphere for simplicity)
        const foliage = document.createElement('a-sphere');
        foliage.setAttribute('position', '0 0.6 0');
        foliage.setAttribute('radius', '0.6');
        foliage.setAttribute('color', '#2E8B57');
        foliage.setAttribute('scale', pos.scale);
        
        // Add parts together
        plant.appendChild(foliage);
        container.appendChild(pot);
        container.appendChild(plant);
    });
}

// Add seating for visitors
function createSeating(container) {
    const benchPositions = [
        { x: -5, y: 0.4, z: 0, rotation: "0 0 0" },
        { x: 5, y: 0.4, z: 0, rotation: "0 0 0" },
        { x: 0, y: 0.4, z: -5, rotation: "0 90 0" }
    ];
    
    benchPositions.forEach((pos, index) => {
        // Create bench
        const bench = document.createElement('a-entity');
        bench.id = `bench-${index}`;
        bench.setAttribute('position', `${pos.x} ${pos.y} ${pos.z}`);
        bench.setAttribute('rotation', pos.rotation);
        
        // Bench seat
        const seat = document.createElement('a-box');
        seat.setAttribute('width', '3');
        seat.setAttribute('depth', '0.8');
        seat.setAttribute('height', '0.1');
        seat.setAttribute('color', '#8B4513');
        
        // Bench legs
        const legPositions = [
            { x: -1.3, y: -0.25, z: -0.3 },
            { x: -1.3, y: -0.25, z: 0.3 },
            { x: 1.3, y: -0.25, z: -0.3 },
            { x: 1.3, y: -0.25, z: 0.3 }
        ];
        
        legPositions.forEach((legPos, legIndex) => {
            const leg = document.createElement('a-box');
            leg.setAttribute('position', `${legPos.x} ${legPos.y} ${legPos.z}`);
            leg.setAttribute('width', '0.1');
            leg.setAttribute('depth', '0.1');
            leg.setAttribute('height', '0.4');
            leg.setAttribute('color', '#8B4513');
            bench.appendChild(leg);
        });
        
        bench.appendChild(seat);
        container.appendChild(bench);
    });
}

// Add pedestals for 3D exhibits
function createExhibitionPedestals(container) {
    const pedestalPositions = [
        { x: -3, y: 0, z: -3 },
        { x: 3, y: 0, z: -3 },
        { x: 0, y: 0, z: 3 }
    ];
    
    pedestalPositions.forEach((pos, index) => {
        // Create pedestal
        const pedestal = document.createElement('a-box');
        pedestal.id = `pedestal-${index}`;
        pedestal.setAttribute('position', `${pos.x} 0.6 ${pos.z}`);
        pedestal.setAttribute('width', '0.8');
        pedestal.setAttribute('depth', '0.8');
        pedestal.setAttribute('height', '1.2');
        pedestal.setAttribute('color', '#DDDDDD');
        
        // Add a display item on top
        const displayItem = document.createElement('a-entity');
        displayItem.id = `display-item-${index}`;
        displayItem.setAttribute('position', `${pos.x} 1.3 ${pos.z}`);
        displayItem.setAttribute('class', 'interactive');
        
        // Different display items based on index
        if (index === 0) {
            // Abstract sculpture
            const sculpture = document.createElement('a-torus-knot');
            sculpture.setAttribute('radius', '0.2');
            sculpture.setAttribute('radius-tubular', '0.05');
            sculpture.setAttribute('p', '2');
            sculpture.setAttribute('q', '3');
            sculpture.setAttribute('color', '#E74C3C');
            sculpture.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear');
            displayItem.appendChild(sculpture);
            displayItem.setAttribute('data-info', 'Abstract Sculpture: A modern torus knot form representing infinity');
        } else if (index === 1) {
            // Geometric pyramid
            const pyramid = document.createElement('a-tetrahedron');
            pyramid.setAttribute('radius', '0.3');
            pyramid.setAttribute('color', '#3498DB');
            pyramid.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 12000; easing: linear');
            displayItem.appendChild(pyramid);
            displayItem.setAttribute('data-info', 'Geometric Pyramid: A study in pure form and mathematical perfection');
        } else {
            // Spherical object
            const sphere = document.createElement('a-sphere');
            sphere.setAttribute('radius', '0.25');
            sphere.setAttribute('color', '#2ECC71');
            sphere.setAttribute('animation', 'property: position; to: 0 0.1 0; loop: true; dir: alternate; dur: 2000; easing: easeInOutQuad');
            displayItem.appendChild(sphere);
            displayItem.setAttribute('data-info', 'Floating Sphere: An exploration of gravity and spatial perception');
        }
        
        container.appendChild(pedestal);
        container.appendChild(displayItem);
    });
}

// Initialize the gallery structure
document.addEventListener('DOMContentLoaded', function() {
    // Gallery will be created by composition.js
});
