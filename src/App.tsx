import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { Performances } from './sections/Performances';
import { Awards } from './sections/Awards';
import { Statement } from './sections/Statement';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        <Performances />
        <div id="awards">
          <Awards />
        </div>
        <Statement />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
