import { useEffect, useRef, useState } from 'react';
import { ExternalLink, MapPin } from 'lucide-react';

interface Performance {
  year: string;
  title: string;
  description: string;
  location?: string;
  links?: { label: string; url: string }[];
}

const performances: Performance[] = [
  {
    year: '2025',
    title: 'Barrio Aeronáutico',
    description: 'Obra incluida en la compilación Costumbre Experimental Argentina, editada por sello 1up (Perugia, Italia).',
    links: [
      { label: 'Bandcamp', url: 'https://1upnoise.bandcamp.com/track/barrio-aerona-utico' }
    ]
  },
  {
    year: '2025',
    title: 'Fanzine MEAR',
    description: 'Participación en la publicación inaugural del colectivo Música Experimental Argentina (MEAR).',
    links: [
      { label: 'Ver publicación', url: 'https://drive.google.com/file/d/1941HnFWkR02IHNAgwoQBaowjPaxuzJE-/view' }
    ]
  },
  {
    year: '2025',
    title: 'Hola Noise!',
    description: 'Participación en performance sonora colectiva como miembro del Centro de Experimentación Sonora (CES) junto a Sindicato del Drone.',
    location: 'Buenos Aires, Argentina',
    links: [
      { label: 'Instagram', url: 'https://www.instagram.com/p/DQCan1XjQR6/' },
      { label: '421 News', url: 'https://www.421.news/hola-noise-desierto-sonoro/' }
    ]
  },
  {
    year: '2025',
    title: 'Respirar por los ojos',
    description: 'Obra publicada en la primera edición del Mapa Sonoro N°1 del colectivo MEAR.',
    links: [
      { label: 'Bandcamp', url: 'https://musicaexperimentalargentina.bandcamp.com/track/respirar-por-los-ojos' }
    ]
  },
  {
    year: '2025',
    title: 'Geografía del Ruido',
    description: 'Participación en el ciclo realizado en octubre de 2025 junto a Helecho Experimentar + Dôrotti y H.A.P.',
    location: 'Rosario, Argentina',
    links: [
      { label: 'YouTube', url: 'https://www.youtube.com/watch?v=5kn5CDf15Mo' }
    ]
  },
  {
    year: '2025',
    title: 'Tertulias Artísticas',
    description: 'Participación con performance sonora en el ciclo de charlas sobre arte del Centro Cultural José Amadeo Conte Grand.',
    location: 'San Juan, Argentina'
  }
];

export function Performances() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const items = sectionRef.current?.querySelectorAll('[data-index]');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="performances"
      className="relative py-24 sm:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-16 sm:mb-24">
          <p className="text-white/40 text-sm tracking-widest uppercase mb-4">
            Trabajos Recientes
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white">
            Performances
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-px bg-white/10 hidden sm:block" />

          {performances.map((perf, index) => (
            <div
              key={index}
              data-index={index}
              className={`relative mb-12 sm:mb-16 transition-all duration-700 ${
                visibleItems.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`sm:flex ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                {/* Year marker */}
                <div className="hidden sm:flex sm:w-1/2 items-start justify-center relative">
                  <div className="absolute top-0 w-3 h-3 rounded-full bg-white/20 -translate-x-1/2" />
                  <span className="text-white/30 text-sm font-mono mt-6">
                    {perf.year}
                  </span>
                </div>

                {/* Content */}
                <div className="sm:w-1/2 pl-8 sm:pl-12 sm:pr-12">
                  {/* Mobile year */}
                  <span className="sm:hidden text-white/30 text-sm font-mono mb-2 block">
                    {perf.year}
                  </span>

                  {/* Dot for mobile */}
                  <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-white/30 sm:hidden" />

                  <h3 className="text-xl sm:text-2xl font-medium text-white mb-3">
                    {perf.title}
                  </h3>

                  <p className="text-white/60 leading-relaxed mb-4">
                    {perf.description}
                  </p>

                  {perf.location && (
                    <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{perf.location}</span>
                    </div>
                  )}

                  {perf.links && perf.links.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {perf.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-300"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
