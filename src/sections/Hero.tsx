import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, ArrowDown } from 'lucide-react';
import benitoSound from '../sounds/benito.mp3';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    let time = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(13, 13, 13, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;

      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 - i * 0.005})`;
        ctx.lineWidth = 1;

        for (let x = 0; x < canvas.width; x += 5) {
          const y = centerY + 
            Math.sin((x + time * 50) * 0.01 + i * 0.5) * 30 * (i + 1) +
            Math.sin((x + time * 30) * 0.02) * 15;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      time += 0.016;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    // Inicializar el audio
    audioRef.current = new Audio(benitoSound);
    audioRef.current.loop = true;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(error => {
        console.error('Error al reproducir el audio:', error);
      });
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated waveform background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #111111 100%)' }}
      />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-bg z-[1] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-6 flex justify-center">
          <button
            onClick={toggleAudio}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all duration-300 group"
            aria-label={isPlaying ? "Pausar audio" : "Reproducir audio"}
          >
            {isPlaying ? (
              <Volume2 className="w-5 h-5 text-white/80 group-hover:text-white" />
            ) : (
              <VolumeX className="w-5 h-5 text-white/60 group-hover:text-white/80" />
            )}
          </button>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-4 text-white">
          Benito
          <br />
          <span className="text-white/40">Marianetti</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-white/50 font-light tracking-widest uppercase mb-12">
          Artista Sonoro
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#performances"
            className="px-8 py-3 border border-white/20 text-white/80 hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-wider uppercase"
          >
            Ver Performances
          </a>
          <a
            href="#statement"
            className="px-8 py-3 text-white/50 hover:text-white transition-colors duration-300 text-sm tracking-wider uppercase"
          >
            Statement
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown className="w-5 h-5 text-white/30" />
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[1]" />
    </section>
  );
}
