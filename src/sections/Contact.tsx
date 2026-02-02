import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Music, Instagram, Youtube } from 'lucide-react';

interface Platform {
  name: string;
  url: string;
  icon: React.ReactNode;
  label: string;
}

const platforms: Platform[] = [
  {
    name: 'Bandcamp',
    url: 'https://benitomarianetti.bandcamp.com',
    icon: <Music className="w-5 h-5" />,
    label: 'benitomarianetti.bandcamp.com'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/benito_marianetti',
    icon: <Instagram className="w-5 h-5" />,
    label: '@benito_marianetti'
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/intl-es/artist/5tNOoeTuiT3iBiMKbScKgR',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
    label: 'Spotify Artist'
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@benitomarianetti',
    icon: <Youtube className="w-5 h-5" />,
    label: '@benitomarianetti'
  }
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-32 px-6 bg-white/[0.02]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-16 sm:mb-24 text-center">
          <p className="text-white/40 text-sm tracking-widest uppercase mb-4">
            Conecta
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white">
            Plataformas
          </h2>
        </div>

        {/* Platforms grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {platforms.map((platform, index) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-6 border border-white/10 hover:border-white/30 transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/40 transition-all duration-300">
                  {platform.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1">
                    {platform.name}
                  </h3>
                  <p className="text-white/40 text-sm">
                    {platform.label}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors duration-300" />
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-white/40 mb-6">
            ¿Interesado en colaborar?
          </p>
          <a
            href="mailto:contacto@benitomarianetti.com"
            className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 text-white/80 hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-wider uppercase"
          >
            Enviar mensaje
          </a>
        </div>
      </div>
    </section>
  );
}
