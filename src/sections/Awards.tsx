import { useEffect, useRef, useState } from 'react';
import { Award, ExternalLink } from 'lucide-react';

interface AwardItem {
  year: string;
  title: string;
  description: string;
  link?: string;
}

const awards: AwardItem[] = [
  {
    year: '2023',
    title: '¿Cómo no temblar?',
    description: 'Obra ganadora junto al colectivo Esotecnia.lab en la Muestra de Tecnoestéticas organizada por la Secretaría de Ciencia, Tecnología e Innovación (SECITI), San Juan, Argentina.',
    link: 'https://sisanjuan.gob.ar/ciencia-tecnologia-e-innovacion/2023-08-16/50981-seciti-presenta-la-muestra-de-tecnoesteticas-2023'
  },
  {
    year: '2022',
    title: 'La Perrera',
    description: 'Mención obtenida en La Teatrina 2022 (INT) por concepto original y sonido en performance.',
    link: 'https://benitomarianetti.bandcamp.com/album/la-perrera'
  }
];

export function Awards() {
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
      className="relative py-24 sm:py-32 px-6 bg-white/[0.02]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-16 sm:mb-24">
          <p className="text-white/40 text-sm tracking-widest uppercase mb-4">
            Logros
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white">
            Reconocimientos
          </h2>
        </div>

        {/* Awards grid */}
        <div className="grid gap-8">
          {awards.map((award, index) => (
            <div
              key={index}
              className={`group relative p-8 border border-white/10 hover:border-white/20 transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-white/50" />
                  </div>
                  <div>
                    <span className="text-white/30 text-sm font-mono block mb-1">
                      {award.year}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium text-white">
                      {award.title}
                    </h3>
                  </div>
                </div>

                <p className="text-white/60 leading-relaxed mb-4 pl-14">
                  {award.description}
                </p>

                {award.link && (
                  <a
                    href={award.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-300 pl-14"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Ver más
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
