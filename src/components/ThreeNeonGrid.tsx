import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "./ThemeContext";

export default function ThreeNeonGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  // Keep track of theme in a ref so the rendering loop has immediate access to it
  const themeRef = useRef(theme);
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Setup Scene, Camera, and WebGLRenderer
    const scene = new THREE.Scene();
    
    // Transparent background so CSS page colors show underneath
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      1,
      1000
    );
    // Position camera looking down at an angle
    camera.position.set(0, 75, 140);
    camera.lookAt(0, 0, -20);

    // 2. Create the Undulating 3D Grid using LineSegments
    const gridWidth = 240;
    const gridDepth = 240;
    const columns = 24;
    const rows = 24;
    const stepX = gridWidth / columns;
    const stepZ = gridDepth / rows;

    const vertices: number[] = [];
    const indices: number[] = [];

    // Generate grid vertices (flat on Y=0 initially)
    for (let z = 0; z <= rows; z++) {
      const zPos = z * stepZ - gridDepth / 2;
      for (let x = 0; x <= columns; x++) {
        const xPos = x * stepX - gridWidth / 2;
        vertices.push(xPos, 0, zPos);
      }
    }

    // Connect vertices with indices to form lines
    for (let z = 0; z <= rows; z++) {
      for (let x = 0; x <= columns; x++) {
        const current = z * (columns + 1) + x;
        // Connect horizontal line (rightwards)
        if (x < columns) {
          indices.push(current, current + 1);
        }
        // Connect vertical line (downwards)
        if (z < rows) {
          indices.push(current, current + (columns + 1));
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);

    // Grid Materials (Separate colors for Light/Dark modes)
    const lightColor = new THREE.Color("#0F6E56"); // Mid teal
    const darkColor = new THREE.Color("#10B981");  // Glowing emerald
    
    const material = new THREE.LineBasicMaterial({
      color: themeRef.current === "dark" ? darkColor : lightColor,
      transparent: true,
      opacity: themeRef.current === "dark" ? 0.25 : 0.08,
      linewidth: 1,
    });

    const gridLines = new THREE.LineSegments(geometry, material);
    scene.add(gridLines);

    // 3. Add Floating 3D Dust Particles (Neon nodes)
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Scatter particles in a box above the grid plane
      particlePositions[i * 3] = (Math.random() - 0.5) * gridWidth;
      particlePositions[i * 3 + 1] = Math.random() * 40 + 5; // Y position height
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * gridDepth;

      particleVelocities.push(
        (Math.random() - 0.5) * 0.05, // X speed
        Math.random() * 0.02 + 0.01,  // Y speed rising
        (Math.random() - 0.5) * 0.05  // Z speed
      );
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    // Create glowing circle texture dynamically on canvas to avoid loading images
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(16, 185, 129, 0.8)");
      grad.addColorStop(1, "rgba(16, 185, 129, 0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      color: themeRef.current === "dark" ? darkColor : lightColor,
      size: themeRef.current === "dark" ? 2.5 : 1.5,
      map: particleTexture,
      transparent: true,
      opacity: themeRef.current === "dark" ? 0.6 : 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 4. Mouse Move Tracking (Camera Parallax)
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 75;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize between -1 and 1
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Calculate target camera shifts based on mouse
      targetCameraX = mouseX * 25;
      targetCameraY = 75 + mouseY * 15;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 5. Scroll Tracking (Perspective Skew & Parallax Zoom)
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 6. Animation Render Loop
    let animationFrameId: number;
    let time = 0;
    const posAttribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const positions = posAttribute.array as Float32Array;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.008;

      // Adjust grid colors/opacity dynamically when theme context swaps
      if (themeRef.current === "dark") {
        material.color.lerp(darkColor, 0.1);
        material.opacity = THREE.MathUtils.lerp(material.opacity, 0.20, 0.1);
        particleMaterial.color.lerp(darkColor, 0.1);
        particleMaterial.opacity = THREE.MathUtils.lerp(particleMaterial.opacity, 0.5, 0.1);
        particleMaterial.size = THREE.MathUtils.lerp(particleMaterial.size, 2.5, 0.1);
      } else {
        material.color.lerp(lightColor, 0.1);
        material.opacity = THREE.MathUtils.lerp(material.opacity, 0.05, 0.1);
        particleMaterial.color.lerp(lightColor, 0.1);
        particleMaterial.opacity = THREE.MathUtils.lerp(particleMaterial.opacity, 0.15, 0.1);
        particleMaterial.size = THREE.MathUtils.lerp(particleMaterial.size, 1.5, 0.1);
      }

      // Update grid heights (Undulate Y positions using Sin/Cos)
      for (let z = 0; z <= rows; z++) {
        const zNorm = z / rows;
        for (let x = 0; x <= columns; x++) {
          const xNorm = x / columns;
          const index = (z * (columns + 1) + x) * 3;

          // Wave height math (larger peaks towards the back of the grid)
          const scaleHeight = 6 + zNorm * 8;
          positions[index + 1] = 
            Math.sin(xNorm * 4 + time * 1.5) * 
            Math.cos(zNorm * 3 + time) * 
            scaleHeight;
        }
      }
      posAttribute.needsUpdate = true;

      // Update Floating Dust Particles (Rise upwards & recycle)
      const pPositions = particleGeometry.getAttribute("position").array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Apply velocity increments
        pPositions[i * 3] += particleVelocities[i * 3];
        pPositions[i * 3 + 1] += particleVelocities[i * 3 + 1];
        pPositions[i * 3 + 2] += particleVelocities[i * 3 + 2];

        // If particle rises too high, recycle it back to the bottom
        if (pPositions[i * 3 + 1] > 50) {
          pPositions[i * 3 + 1] = 2;
          pPositions[i * 3] = (Math.random() - 0.5) * gridWidth;
          pPositions[i * 3 + 2] = (Math.random() - 0.5) * gridDepth;
        }
      }
      particleGeometry.getAttribute("position").needsUpdate = true;

      // Camera transitions based on Mouse parallax & Page scrolling
      const targetX = targetCameraX;
      // Scroll moves camera down/closer, skewing perspective
      const targetY = targetCameraY - Math.min(scrollY * 0.08, 30);
      const targetZ = 140 - Math.min(scrollY * 0.12, 60);

      // Smooth camera interpolation (lerp)
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.position.z += (targetZ - camera.position.z) * 0.05;
      
      // Look point shifts slightly based on mouse
      camera.lookAt(mouseX * 15, -Math.min(scrollY * 0.05, 15), -20 - Math.min(scrollY * 0.05, 10));

      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Resize events
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // 8. Cleanup and Resource Disposal on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      // Dispose Three.js objects
      geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      pCanvas.remove();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-transparent"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
