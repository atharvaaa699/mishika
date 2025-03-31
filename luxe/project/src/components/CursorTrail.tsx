import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<{ x: number; y: number; alpha: number; radius: number }[]>([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      points.current.push({ 
        x: e.clientX, 
        y: e.clientY, 
        alpha: 1,
        radius: Math.random() * 8 + 4 // Random radius between 4 and 12
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let i = points.current.length - 1;
      while (i >= 0) {
        const point = points.current[i];
        point.alpha *= 0.96;

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        
        // Create gradient for each point
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.radius
        );
        gradient.addColorStop(0, `rgba(198, 164, 92, ${point.alpha})`);
        gradient.addColorStop(1, `rgba(198, 164, 92, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add connecting lines between points
        if (i > 0) {
          const nextPoint = points.current[i - 1];
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
          ctx.strokeStyle = `rgba(198, 164, 92, ${Math.min(point.alpha, nextPoint.alpha) * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        if (point.alpha < 0.05) {
          points.current.splice(i, 1);
        }
        i--;
      }

      requestAnimationFrame(animate);
    };

    // Initialize vanilla-tilt on all elements with the 'tilt-card' class
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
      max: 15,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    });

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default CursorTrail;