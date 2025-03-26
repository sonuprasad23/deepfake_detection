import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MissionSection } from './components/MissionSection';
import { PricingSection } from './components/PricingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Background3D } from './components/Background3D';
import { ThemeProvider } from './components/ThemeProvider';
export function App() {
  return <ThemeProvider>
      <div className="relative min-h-screen bg-gray-950 text-white">
        <Background3D />
        <div className="relative z-10">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Hero />
            <AboutSection />
            <MissionSection />
            <PricingSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>;
}