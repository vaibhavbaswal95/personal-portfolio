"use client";
import React, { useRef, useEffect } from 'react';

// Note: This is a placeholder implementation without Three.js
// Once Three.js is installed, we can update this with proper implementation
export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const previousMouse = useRef({ x: 0, y: 0 });
  const mouseVelocity = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Get the 2D context
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Create random points instead of a grid
    const points: { 
      x: number; 
      y: number; 
      z: number; // Add z coordinate for 3D effect
      originX: number; 
      originY: number; 
      originZ: number;
      vx: number; 
      vy: number;
      vz: number;
      size: number 
    }[] = [];
    
    // Generate random points in 3D space
    const numPoints = 100; // Slightly increased for better mesh effect
    const depthRange = 1000; // Z-coordinate range
    
    for (let i = 0; i < numPoints; i++) {
      // Create random positions with some margin from edges
      const marginX = canvas.width * 0.1;
      const marginY = canvas.height * 0.1;
      
      const x = marginX + Math.random() * (canvas.width - marginX * 2);
      const y = marginY + Math.random() * (canvas.height - marginY * 2);
      const z = Math.random() * depthRange - depthRange/2; // Random depth
      
      points.push({
        x: x,
        y: y,
        z: z,
        originX: x,
        originY: y,
        originZ: z,
        vx: 0,
        vy: 0,
        vz: 0,
        size: Math.random() * 2 + 1
      });
    }
    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      
      // Store previous mouse position
      previousMouse.current.x = mouse.current.x;
      previousMouse.current.y = mouse.current.y;
      
      // Update current mouse position
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      // Calculate mouse velocity
      mouseVelocity.current = {
        x: mouse.current.x - previousMouse.current.x,
        y: mouse.current.y - previousMouse.current.y
      };
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    // Set initial mouse position to center
    mouse.current = {
      x: canvas.width / 2,
      y: canvas.height / 2
    };
    previousMouse.current = { ...mouse.current };
    
    // Add mouse leave handler to reset velocity
    const handleMouseLeave = () => {
      mouseVelocity.current = { x: 0, y: 0 };
    };
    
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Animation loop
    let animationFrameId: number;
    let frame = 0;
    
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dark background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f1729');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 3D perspective parameters
      const focalLength = 400; // Controls perspective effect
      const viewCenter = {
        x: canvas.width / 2,
        y: canvas.height / 2
      };
      
      // Apply mouse movement to all points with 3D effect
      const mouseInfluence = 0.15; // How much mouse movement affects the entire scene
      const globalMovementX = mouseVelocity.current.x * mouseInfluence;
      const globalMovementY = mouseVelocity.current.y * mouseInfluence;
      
      // Move and project points
      const projectedPoints = points.map(point => {
        // Apply global movement from mouse
        point.vx += globalMovementX;
        point.vy += globalMovementY;
        
        // Individual point movement (cursor attraction/repulsion)
        const distX = mouse.current.x - point.x;
        const distY = mouse.current.y - point.y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        const maxDistance = 300;
        
        if (distance < maxDistance) {
          // Calculate force (inverse of distance)
          const force = (maxDistance - distance) / maxDistance;
          
          // Apply force with dampening (repulsion)
          const acceleration = force * 0.1;
          point.vx -= (distX / distance) * acceleration;
          point.vy -= (distY / distance) * acceleration;
          
          // Also move in Z direction (toward or away from viewer)
          point.vz += (Math.sin(frame * 0.01) * 0.5); // Subtle oscillation in Z
        }
        
        // Apply velocity with damping
        point.x += point.vx;
        point.y += point.vy;
        point.z += point.vz;
        point.vx *= 0.94;
        point.vy *= 0.94;
        point.vz *= 0.95;
        
        // Spring back to origin (very weak for more free movement)
        const dx = point.originX - point.x;
        const dy = point.originY - point.y;
        const dz = point.originZ - point.z;
        point.vx += dx * 0.003;
        point.vy += dy * 0.003;
        point.vz += dz * 0.005;
        
        // Wrap around edges with momentum preservation
        if (point.x < -100) point.x = canvas.width + 100;
        if (point.x > canvas.width + 100) point.x = -100;
        if (point.y < -100) point.y = canvas.height + 100;
        if (point.y > canvas.height + 100) point.y = -100;
        
        // 3D projection
        const scale = focalLength / (focalLength + point.z);
        const projectedX = (point.x - viewCenter.x) * scale + viewCenter.x;
        const projectedY = (point.y - viewCenter.y) * scale + viewCenter.y;
        
        // Calculate size based on z position (perspective)
        const projectedSize = point.size * scale;
        
        return {
          x: projectedX,
          y: projectedY,
          z: point.z,
          size: projectedSize,
          scale, // Store scale for connection opacity
          originalIndex: points.indexOf(point)
        };
      });
      
      // Sort points by z for proper rendering order (painter's algorithm)
      projectedPoints.sort((a, b) => b.z - a.z);
      
      // Connect points to form a mesh with 3D effect
      for (let i = 0; i < projectedPoints.length; i++) {
        const point = projectedPoints[i];
        
        // Find connections (more for closer points, fewer for distant ones)
        const maxConnections = Math.floor(5 * point.scale) + 2; // 2-7 connections based on distance
        const connections: {point: any, distance: number}[] = [];
        
        for (let j = 0; j < projectedPoints.length; j++) {
          if (i !== j) {
            const pointB = projectedPoints[j];
            const distance = Math.sqrt(
              Math.pow(point.x - pointB.x, 2) + 
              Math.pow(point.y - pointB.y, 2)
            );
            
            // Adjust connection distance based on perspective
            const perspectiveDistance = canvas.width * 0.25 * point.scale;
            
            // Only consider points within a reasonable distance
            if (distance < perspectiveDistance) {
              connections.push({point: pointB, distance});
            }
          }
        }
        
        // Sort by distance and take the closest
        connections.sort((a, b) => a.distance - b.distance);
        const connectTo = connections.slice(0, maxConnections);
        
        // Draw connections with perspective-based opacity
        connectTo.forEach(connection => {
          // Calculate opacity based on distance and z-position
          const baseOpacity = Math.max(0.05, 1 - (connection.distance / (canvas.width * 0.25)));
          // Points closer to viewer (higher z) have higher opacity
          const zFactor = 0.3 + (0.7 * (point.z + depthRange/2) / depthRange);
          const opacity = baseOpacity * zFactor * point.scale;
          
          ctx.strokeStyle = `rgba(80, 100, 255, ${opacity * 0.4})`;
          ctx.lineWidth = 0.5 * point.scale; // Thicker lines for closer points
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(connection.point.x, connection.point.y);
          ctx.stroke();
        });
        
        // Draw point with 3D effect
        const pointOpacity = 0.3 + (0.7 * (point.z + depthRange/2) / depthRange);
        
        // Draw glow effect
        const glowSize = point.size * 3 * point.scale;
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, glowSize
        );
        gradient.addColorStop(0, `rgba(160, 68, 255, ${pointOpacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(160, 68, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw point
        ctx.fillStyle = `rgba(160, 68, 255, ${pointOpacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size * point.scale, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Slowly reduce mouse velocity when not moving
      mouseVelocity.current.x *= 0.95;
      mouseVelocity.current.y *= 0.95;
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    // Cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-900 to-black"
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full wire-mesh"
      />
    </div>
  );
} 