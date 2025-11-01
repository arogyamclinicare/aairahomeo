import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutDoctor } from './components/AboutDoctor';
import { Treatments } from './components/Treatments';
import { Timeline } from './components/Timeline';
import { Testimonials } from './components/Testimonials';
import { ClinicInfo } from './components/ClinicInfo';
import { FAQ } from './components/FAQ';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { AppointmentDialog } from './components/AppointmentDialog';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ScrollProgress } from './components/ScrollProgress';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
        {/* Custom cursor effect */}
        <div 
          className="pointer-events-none fixed w-6 h-6 rounded-full border-2 border-emerald-500/50 z-[100] transition-transform duration-100"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
          aria-hidden="true"
        />
        
        <ScrollProgress />
        <Header onBookAppointment={() => setIsAppointmentOpen(true)} />
        <main id="main-content">
          <Hero onBookAppointment={() => setIsAppointmentOpen(true)} />
          <AboutDoctor />
          <Treatments />
          <Timeline />
          <Testimonials />
          <ClinicInfo />
          <FAQ />
          <CTASection onBookAppointment={() => setIsAppointmentOpen(true)} />
        </main>
        <Footer onBookAppointment={() => setIsAppointmentOpen(true)} />
        
        <AppointmentDialog 
          open={isAppointmentOpen} 
          onOpenChange={setIsAppointmentOpen}
        />
        
        <WhatsAppButton />
        <Toaster />
      </div>
    </ErrorBoundary>
  );
}
