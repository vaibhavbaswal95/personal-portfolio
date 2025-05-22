"use client";
import React, { useRef, useEffect, useState } from 'react';

/**
 * ThreeBackground - Creates an interactive wireframe mesh background
 * 
 * This component renders a 3D-like wireframe mesh that responds to mouse movement
 * using HTML Canvas. It creates a constellation of points in 3D space that are
 * connected by lines, creating a network/mesh effect.
 */
export default function ThreeBackground() {
  // Add state to track if component is mounted
  const [isMounted, setIsMounted] = useState(false);
  
  // Store references to canvas and container elements
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position and movement
  const mouse = useRef({ x: 0, y: 0 });              // Current mouse position
  const previousMouse = useRef({ x: 0, y: 0 });      // Previous mouse position
  const mouseVelocity = useRef({ x: 0, y: 0 });      // Mouse movement speed/direction
  const isMouseInContainer = useRef(false);          // Track if mouse is in the container
  const lastViewCenter = useRef({ x: 0, y: 0 });     // Last view center when mouse was in container
  
  // First useEffect only to set mounted state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Main animation effect - only runs after component is mounted
  useEffect(() => {
    if (!isMounted) return;
    
    // Get references to DOM elements
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    /**
     * Set canvas dimensions to match container size
     * Called on window resize and initialization
     */
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Get the 2D rendering context
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    /**
     * Data structure for points in the wireframe mesh
     * Each point has:
     * - x, y, z: Current position in 3D space
     * - originX, originY, originZ: Original/resting position
     * - vx, vy, vz: Velocity in each direction
     * - size: Visual size of the point
     */
    const points: { 
      x: number;           // Current x position
      y: number;           // Current y position
      z: number;           // Current z position (depth)
      originX: number;     // Original x position
      originY: number;     // Original y position
      originZ: number;     // Original z position
      vx: number;          // Velocity in x direction
      vy: number;          // Velocity in y direction
      vz: number;          // Velocity in z direction
      size: number         // Size of point (visual radius)
    }[] = [];
    
    // Configuration for the 3D space
    const numPoints = 200;       // Number of points in the mesh
    const depthRange = 300;     // Reduced range of z-values (depth) to prevent extreme values
    
    /**
     * Initialize random points in 3D space
     * Points are distributed within the canvas area with a margin from edges
     * Each point gets a random size and z-position for depth effect
     */
    for (let i = 0; i < numPoints; i++) {
      // Create margin from canvas edges
      const marginX = canvas.width * 0.1;
      const marginY = canvas.height * 0.1;
      
      // Generate random position with margins
      const x = marginX + Math.random() * (canvas.width - marginX * 2);
      const y = marginY + Math.random() * (canvas.height - marginY * 2);
      const z = Math.random() * depthRange - depthRange/2; // -150 to 150 (more constrained)
      
      // Add point to array with initial properties
      points.push({
        x: x,               // Start at generated position
        y: y,
        z: z,
        originX: x,         // Remember original position
        originY: y,
        originZ: z,
        vx: 0,              // Initial velocity is zero
        vy: 0,
        vz: 0,
        size: Math.random() * 1.5 + 0.5  // Random size between 0.5-2.0 (smaller range)
      });
    }
    
    /**
     * Helper function to clamp values between min and max
     */
    const clamp = (value: number, min: number, max: number): number => {
      return Math.min(Math.max(value, min), max);
    };
    
    /**
     * Handle mouse movement to track position and velocity
     * This drives the interactive nature of the background
     */
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      
      // Store current position as previous before updating
      previousMouse.current.x = mouse.current.x;
      previousMouse.current.y = mouse.current.y;
      
      // Update current mouse position relative to canvas
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      // Calculate velocity (how fast and in what direction the mouse moved)
      mouseVelocity.current = {
        x: clamp((mouse.current.x - previousMouse.current.x) * 2.0, -10, 10), // Limit max velocity
        y: clamp((mouse.current.y - previousMouse.current.y) * 2.0, -10, 10)  // Limit max velocity
      };
    };
    
    // Set initial mouse position to center of canvas
    mouse.current = {
      x: canvas.width / 2,
      y: canvas.height / 2
    };
    previousMouse.current = { ...mouse.current };
    lastViewCenter.current = { ...mouse.current };
    
    /**
     * Handle mouse entering the container
     */
    const handleMouseEnter = () => {
      isMouseInContainer.current = true;
    };
    
    /**
     * Handle mouse leaving the container
     * Reset velocity to avoid drift when mouse leaves
     */
    const handleMouseLeave = () => {
      mouseVelocity.current = { x: 0, y: 0 };
      isMouseInContainer.current = false;
      // Store the last position when mouse was in container
      lastViewCenter.current = {
        x: mouse.current.x,
        y: mouse.current.y
      };
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);
    
    // Animation variables
    let animationFrameId: number;  // Store reference to animation frame
    let frame = 0;                 // Track frame count for animations
    
    /**
     * Main rendering function - called every animation frame
     * Handles all drawing and physics calculations
     */
    const render = () => {
      // Increment frame counter (used for oscillation effects)
      frame++;
      
      // Clear the canvas for new frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      /**
       * Draw dark background gradient
       * Creates a subtle blue-to-black gradient backdrop
       */
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f1729');  // Dark blue
      gradient.addColorStop(1, '#000000');  // Black
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      /**
       * Configure 3D perspective projection
       * Determines how 3D points are mapped to 2D canvas
       */
      const focalLength = 400;  // Controls perspective strength
      const viewCenter = {
        // Use mouse position as viewpoint when in container, otherwise use last position
        x: isMouseInContainer.current ? mouse.current.x : lastViewCenter.current.x || canvas.width / 2,
        y: isMouseInContainer.current ? mouse.current.y : lastViewCenter.current.y || canvas.height / 2
      };
      
      /**
       * Apply global mouse movement to all points
       * This creates the "entire mesh moves" effect
       */
      const mouseInfluence = 0.5;  // Reduced influence (was 0.8)
      const globalMovementX = mouseVelocity.current.x * mouseInfluence;
      const globalMovementY = mouseVelocity.current.y * mouseInfluence;
      
      /**
       * Process and project all points from 3D to 2D
       * Maps 3D coordinates to 2D screen coordinates with perspective effect
       */
      const projectedPoints = points.map(point => {
        // Apply global movement from mouse velocity
        point.vx += globalMovementX;
        point.vy += globalMovementY;
        
        /**
         * Individual point interaction with cursor
         * Points near the cursor are repelled from it
         */
        const distX = mouse.current.x - point.x;
        const distY = mouse.current.y - point.y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        const maxDistance = 200;  // Reduced maximum distance for cursor influence (was 300)
        
        if (distance < maxDistance && distance > 0) { // Avoid division by zero
          // Calculate force based on distance (closer = stronger)
          const force = (maxDistance - distance) / maxDistance;
          
          // Apply repelling force (push point away from cursor)
          const acceleration = force * 0.8; // Slightly reduced force (was 0.9)
          point.vx -= (distX / distance) * acceleration;
          point.vy -= (distY / distance) * acceleration;
          
          // Create a visual "ripple" effect from cursor - slowed down and reduced effect
          point.vz += (Math.sin(frame * 0.004 + distance * 0.004) * 0.6);  // Slower oscillation in Z, reduced amplitude
        }
        
        /**
         * Physics simulation for point movement
         * Apply velocity, damping, spring forces, and wrapping
         */
        // Apply velocity with damping
        point.x += point.vx * 0.6; // Slower movement speed (was 0.7)
        point.y += point.vy * 0.6; // Slower movement speed (was 0.7)
        point.z += point.vz * 0.4; // Slower movement speed (was 0.5)
        
        // Apply damping (reduces velocity over time)
        point.vx *= 0.95;
        point.vy *= 0.95;
        point.vz *= 0.96;
        
        // Limit velocity to prevent extreme movements
        point.vx = clamp(point.vx, -5, 5);
        point.vy = clamp(point.vy, -5, 5);
        point.vz = clamp(point.vz, -5, 5);
        
        // Spring force to return to original position (weak)
        const dx = point.originX - point.x;
        const dy = point.originY - point.y;
        const dz = point.originZ - point.z;
        point.vx += dx * 0.003;
        point.vy += dy * 0.003;
        point.vz += dz * 0.003;
        
        // Add subtle continuous movement
        point.vx += Math.sin(frame * 0.001 + point.originY * 0.01) * 0.1; // Subtle horizontal drift (reduced)
        point.vy += Math.cos(frame * 0.001 + point.originX * 0.01) * 0.1; // Subtle vertical drift (reduced)
        
        // Limit z-coordinate to prevent points from going too far in z-space
        point.z = clamp(point.z, -depthRange, depthRange);
        
        // Make sure points wrap around if they go off-screen
        // When points go beyond the canvas, they appear on the opposite side
        const padding = 50; // Added extra space before wrapping
        if (point.x < -padding) point.x = canvas.width + padding;
        if (point.x > canvas.width + padding) point.x = -padding;
        if (point.y < -padding) point.y = canvas.height + padding;
        if (point.y > canvas.height + padding) point.y = -padding;
        
        /**
         * Apply 3D perspective projection
         * Convert 3D coordinates to 2D coordinates with perspective
         */
        // Scale based on z-position (depth) - further = smaller
        // Add safeguard to prevent division by zero or negative values
        const adjustedZ = Math.max(-focalLength + 1, point.z); // Ensure z is never <= -focalLength
        const scale = focalLength / (focalLength + adjustedZ);
        
        // Center projection at view center (mouse or last known position)
        const projectedX = (point.x - viewCenter.x) * scale + viewCenter.x;
        const projectedY = (point.y - viewCenter.y) * scale + viewCenter.y;
        
        // Return projected 2D coordinates and other properties for rendering
        return {
          x: projectedX,
          y: projectedY,
          scale: scale,
          size: point.size,
          // Fade points based on z-position and scale
          alpha: Math.min(0.6, 0.3 + scale * 0.3) // 0.3-0.6 opacity
        };
      });
      
      /**
       * Draw connections between points
       * Creates the wireframe mesh effect with lines
       */
      // Set line style
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.5;
      
      // Draw connections between points that are close enough
      // Only draw a limited number of connections per point to avoid dense mesh
      const connectionDistance = 200; // Reduced maximum distance for connections (was 300)
      const maxConnections = 3;      // Maximum number of connections per point
      
      projectedPoints.forEach((a, i) => {
        // Find and sort nearest points
        const nearest = projectedPoints
          .map((b, j) => {
            if (i === j) return { index: j, distance: Infinity };
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return { index: j, distance };
          })
          .sort((a, b) => a.distance - b.distance)
          .slice(0, maxConnections); // Take only the closest N points
        
        // Draw connections to nearest points
        nearest.forEach(n => {
          if (n.distance < connectionDistance && n.distance > 0) { // Ensure positive distance
            const b = projectedPoints[n.index];
            // Fade line opacity based on distance
            const opacity = 0.1 * (1 - n.distance / connectionDistance);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            
            // Ensure points are at valid positions
            if (isFinite(a.x) && isFinite(a.y) && isFinite(b.x) && isFinite(b.y)) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        });
      });
      
      /**
       * Draw the points themselves
       * Each point is a small circle with size and opacity based on position
       */
      projectedPoints.forEach(point => {
        // Ensure the point has valid coordinates
        if (!isFinite(point.x) || !isFinite(point.y)) return;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${point.alpha})`;
        
        // Calculate the radius and ensure it's a positive value
        const radius = Math.max(0.1, point.size * point.scale);
        
        // Only draw circles with valid positive radius
        if (radius > 0 && isFinite(radius)) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      // Request next animation frame
      animationFrameId = requestAnimationFrame(render);
    };
    
    // Start the animation
    render();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMounted]);
  
  // Return a placeholder div during SSR
  if (!isMounted) {
    return <div className="fixed inset-0 w-full h-full bg-[#0f1729] -z-10" />;
  }
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full overflow-hidden -z-10"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
} 