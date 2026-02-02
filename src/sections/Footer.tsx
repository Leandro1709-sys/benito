import { Volume2 } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 border-t border-white/10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
              <Volume2 className="w-4 h-4 text-white/40" />
            </div>
            <span className="text-white/60 text-sm">
              Benito Marianetti
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <a
              href="#performances"
              className="text-white/40 hover:text-white text-sm transition-colors duration-300"
            >
              Performances
            </a>
            <a
              href="#statement"
              className="text-white/40 hover:text-white text-sm transition-colors duration-300"
            >
              Statement
            </a>
            <a
              href="#contact"
              className="text-white/40 hover:text-white text-sm transition-colors duration-300"
            >
              Contacto
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-white/30 text-sm">
            © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
