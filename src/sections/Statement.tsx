import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';

export function Statement() {
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
      id="statement"
      className="relative py-24 sm:py-32 px-6"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-16 sm:mb-24 text-center">
          <p className="text-white/40 text-sm tracking-widest uppercase mb-4">
            Sobre mi práctica
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white">
            Statement
          </h2>
        </div>

        {/* Quote icon */}
        <div className={`flex justify-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <Quote className="w-12 h-12 text-white/20" />
        </div>

        {/* Statement content */}
        <div className={`space-y-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed text-center font-light">
            Mi práctica se sitúa en el cruce entre <span className="text-white">sonido</span> e <span className="text-white">imagen</span>, entendidos no como disciplinas separadas sino como capas de una misma experiencia. Trabajo desde la <span className="text-white">sensación</span>: me interesa aquello que se percibe antes de poder ser nombrado, lo que aparece de manera transitoria y deja un resto, una huella.
          </p>

          <p className="text-lg sm:text-xl text-white/80 leading-relaxed text-center font-light">
            Durante el proceso, invoco a una sensibilidad profunda, un modo de pensamiento que involucra al <span className="text-white">cuerpo</span>. El cuerpo no aparece como soporte pasivo de la experiencia, sino como el lugar principal donde se construye el sentido. Escuchar, mirar y estar se vuelven actos de reflexión. La obra sucede en la intersección entre: percepción y gesto, entre materia y pregunta, entre presencia y resto.
          </p>

          <p className="text-lg sm:text-xl text-white/80 leading-relaxed text-center font-light">
            Las obras no se limitan a ocupar un espacio: lo <span className="text-white">desplazan</span>. Alteran su condición habitual y en ese desplazamiento emergen interrogantes de orden filosófico, que se formulan desde lo concreto y lo físico: desde lo que suena, lo que vibra, lo que incomoda o envuelve.
          </p>

          <p className="text-lg sm:text-xl text-white/80 leading-relaxed text-center font-light">
            Recojo fragmentos de la experiencia —ruidos, gestos, imágenes, vibraciones— para ponerlos en diálogo con la <span className="text-white">técnica</span>. No concibo la técnica como un instrumento neutro, sino como un territorio atravesado por afectos, memoria, carga emocional. En ese cruce se construyen las piezas, como dispositivos sensibles. En este proceso, la <span className="text-white">auto-edición</span> ocupa un lugar central: me edito tanto en lo artístico como en lo personal, entendiendo cada obra como una instancia de ajuste, depuración y reescritura de la experiencia.
          </p>
        </div>

        {/* Signature */}
        <div className={`mt-16 text-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-16 h-px bg-white/20 mx-auto mb-6" />
          <p className="text-white/40 text-sm tracking-widest uppercase">
            Benito Marianetti
          </p>
        </div>
      </div>
    </section>
  );
}
