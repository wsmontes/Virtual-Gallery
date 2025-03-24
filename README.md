# Virtual Gallery

## Overview
An interactive virtual art gallery that procedurally generates textures and artwork, dynamically builds the gallery structure, and includes advanced error recovery and performance optimization techniques.

## Technologies
- HTML/CSS/JavaScript
- A-Frame for WebVR/WebXR
- WebXR API for VR compatibility
- Procedural texture generation using HTML Canvas
- Dynamic 3D scene assembly with error handling and performance optimizations

## Features
- Procedurally-generated textures for flooring, walls, roof, and artwork
- Dynamic gallery architecture and interactive elements built at runtime
- Error handling and recovery mechanisms for texture loading, artwork generation, and lighting
- Performance monitoring with real-time FPS check and adaptive optimizations
- Fallback messaging when WebXR is not fully supported

## Live Demo
Visit the Virtual Gallery: [https://wsmontes.github.io/Virtual-Gallery/](https://wsmontes.github.io/Virtual-Gallery/)

## Additional Information
- Textures and artwork are generated on-the-fly using Canvas 2D API.
- Error handling in the gallery is managed using a global error handler that attempts specific recovery actions.
- The gallery structure (walls, floor, roof, and decorations) is dynamically constructed at runtime and updated for optimal display depending on performance.
- Detailed logging and performance optimizations are included to ensure a smooth VR/Desktop experience.

## License
This project is licensed under the MIT License.
