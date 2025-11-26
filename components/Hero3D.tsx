import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    // Fog for depth fading
    scene.fog = new THREE.FogExp2(0x000000, 0.05);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create Geometry - TorusKnot is complex and "techy"
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 120, 20);
    
    // Wireframe Material
    const material = new THREE.LineBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.15 
    });
    
    // Create Wireframe
    const wireframe = new THREE.WireframeGeometry(geometry);
    const line = new THREE.LineSegments(wireframe, material);
    scene.add(line);

    // Inner Core (Points)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        // Random positions inside the torus roughly
        posArray[i] = (Math.random() - 0.5) * 5; 
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x4ade80, // Green terminal color
        transparent: true,
        opacity: 0.6
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate Main Shape
      line.rotation.x += 0.001;
      line.rotation.y += 0.002;

      // Rotate Particles separately
      particlesMesh.rotation.y -= 0.001;
      particlesMesh.rotation.x -= 0.0005;

      // Gentle Floating effect
      const time = Date.now() * 0.0005;
      line.position.y = Math.sin(time) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Interactive Parallax
    const handleMouseMove = (event: MouseEvent) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Subtle tilt
        line.rotation.x += mouseY * 0.001;
        line.rotation.y += mouseX * 0.001;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-60 mix-blend-screen"
    />
  );
};

export default Hero3D;