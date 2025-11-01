import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Calendar, Heart, CheckCircle2, Shield, Zap, Star, ArrowRight, Badge } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';
import { useParallax } from '../hooks/useScrollAnimation';
import { LayoutTextFlip } from './ui/layout-text-flip';
import { motion } from 'framer-motion';
import { TypewriterEffectSmooth } from './ui/typewriter-effect';

interface HeroProps {
  onBookAppointment: () => void;
}

export function Hero({ onBookAppointment }: HeroProps) {
  const parallaxOffset = useParallax(0.3);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pt-20 sm:pt-24 pb-8 sm:pb-16 md:pb-20 lg:pb-24 flex items-center min-h-screen w-full">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 opacity-20 sm:opacity-30 overflow-hidden h-full">
        <div 
          className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-emerald-400 to-emerald-300 rounded-full blur-3xl animate-pulse"
          style={{ 
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translateY(${parallaxOffset}px)` 
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-teal-400 to-cyan-300 rounded-full blur-3xl animate-pulse"
          style={{ 
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px) translateY(${parallaxOffset * 0.5}px)`,
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-gradient-to-br from-cyan-300 to-teal-200 rounded-full blur-3xl animate-pulse"
          style={{ 
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            animationDelay: '2s'
          }}
        ></div>
      </div>


      <div className="relative max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-8 md:py-10">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-4 sm:space-y-4 md:space-y-5 relative z-10 w-full text-center lg:text-left overflow-hidden">
            {/* Mobile-Only Layout - Welcome Message with LayoutTextFlip */}
            <div className="lg:hidden text-center mb-4 px-2">
              <motion.div 
                className="flex flex-col items-center justify-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <LayoutTextFlip
                  text="Welcome to"
                  words={["Aaira Homeo Clinic", "Classical Homeopathy", "Natural Healing", "Holistic Care"]}
                  className="text-base text-gray-700 font-medium tracking-wide break-words"
                  wordClassName="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent font-semibold"
                  flipInterval={3000}
                />
              </motion.div>
            </div>

            {/* Main Heading - Mobile Layout with Typewriter Effect */}
            <div className="space-y-3 lg:hidden text-center mb-6 px-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-emerald-600 drop-shadow-lg break-words">
                <TypewriterEffectSmooth
                  words={[
                    { text: "Dr.", className: "text-emerald-600" },
                    { text: "Shoukat", className: "text-emerald-600" },
                    { text: "Khan", className: "text-emerald-600" },
                  ]}
                  className="justify-center"
                />
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2 flex-wrap px-2">
                <Badge className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 font-medium break-words text-center">Classical Homeopathic Physician</span>
              </div>
            </div>

            {/* Desktop Layout - Original Heading */}
            <div className="hidden lg:block space-y-2.5 sm:space-y-3 animate-in fade-in slide-in-from-left-6 duration-700 delay-200">
              <h1 className="text-gray-900 text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.25] sm:leading-tight">
                Experience Holistic Healing with
              </h1>
              <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.25] sm:leading-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Dr. Shoukat Khan
              </h2>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-gray-600 pt-1.5 sm:pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span className="text-xs sm:text-sm">13+ Years Experience</span>
              </div>
              </div>
            </div>

            {/* Description - Mobile Layout with Better Typography and Effects */}
            <div className="lg:hidden space-y-4 mb-6 text-center px-4">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal break-words animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 animate-fade-in-up">
                Experience transformative healing through time-tested homeopathic principles.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal break-words animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400 animate-fade-in-up">
                Treating the root cause, not just symptoms, with <span className="text-emerald-600 font-bold" style={{ textShadow: '0 0 8px rgba(16, 185, 129, 0.5)' }}>13+ years of expertise</span> in natural medicine.
              </p>
            </div>

            {/* Description - Desktop Layout */}
            <p className="hidden lg:block text-gray-600 text-sm sm:text-base max-w-none sm:max-w-2xl leading-relaxed animate-in fade-in slide-in-from-left-6 duration-700 delay-300 px-1 sm:px-0">
              Experience holistic healing through classical homeopathy. We focus on treating the root cause of your ailments naturally, providing personalized care for you and your family with gentle, effective remedies.
            </p>

            {/* Feature Badges - Mobile Layout with Stagger Animations */}
            <div className="lg:hidden flex justify-center gap-1.5 sm:gap-2 mb-6 px-2">
              <div className="flex gap-1.5 sm:gap-2 w-full justify-center items-center flex-wrap">
                <div className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-md border border-emerald-200 bg-emerald-50/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:scale-110 flex-shrink-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400 animate-scale-in">
                  <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="text-[9px] sm:text-[10px] text-gray-700 font-medium whitespace-nowrap">100% Natural</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-md border border-emerald-200 bg-emerald-50/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:scale-110 flex-shrink-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 animate-scale-in">
                  <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="text-[9px] sm:text-[10px] text-gray-700 font-medium whitespace-nowrap">No Side Effects</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-md border border-emerald-200 bg-emerald-50/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:scale-110 flex-shrink-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600 animate-scale-in">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="text-[9px] sm:text-[10px] text-gray-700 font-medium whitespace-nowrap">Holistic Approach</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons - Mobile Layout (Vertical Stack) */}
            <div className="lg:hidden flex flex-col gap-4 w-full max-w-sm mx-auto mb-4 px-2">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: 0.2
                }}
              >
                <Button 
                  onClick={onBookAppointment}
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 sm:px-8 sm:py-5 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 font-bold text-sm sm:text-base w-full transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span className="break-words">Book Your Consultation</span>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: 0.35
                }}
              >
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById('about');
                    if (element) {
                      const offset = 80;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - offset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                  className="border-2 border-emerald-600 bg-transparent hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700 px-6 py-4 sm:px-8 sm:py-5 rounded-lg shadow-lg transition-all duration-300 font-bold text-sm sm:text-base w-full transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="break-words">Learn More</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0" />
                </Button>
              </motion.div>
            </div>

            {/* CTA Buttons - Desktop Layout */}
            <div className="hidden lg:flex flex-col sm:flex-row gap-3 sm:gap-3 animate-in fade-in slide-in-from-left-6 duration-700 delay-400 pt-3 sm:pt-3 w-full justify-center lg:justify-start">
              <Button 
                onClick={onBookAppointment}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-4 sm:px-6 sm:py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-sm font-semibold w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4 sm:w-4 sm:h-4 mr-2" />
                Book Appointment
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => {
                  const element = document.getElementById('about');
                  if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className="border-[3px] border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-700 px-6 py-4 sm:px-6 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-sm font-semibold w-full sm:w-auto"
              >
                <Heart className="w-4 h-4 sm:w-4 sm:h-4 mr-2" />
                Learn More
              </Button>
            </div>

            {/* Trust Indicators - Desktop Only */}
            <div className="hidden lg:flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-2 md:gap-3 text-xs text-gray-600 animate-in fade-in slide-in-from-left-6 duration-700 delay-500 pt-2 sm:pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Same Day Response</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>No Side Effects</span>
              </div>
            </div>
          </div>

          {/* Right Column - Premium Medical Illustration (Desktop Only) */}
          <div className="relative hidden lg:block">
            <div className="relative group animate-in fade-in slide-in-from-right-6 duration-700 delay-300">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl blur-3xl opacity-30 group-hover:opacity-40 transition-opacity duration-500 scale-110"></div>
              
              {/* Medical Illustration Container */}
              <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl shadow-2xl border-8 border-white/50 backdrop-blur-sm p-2 group-hover:shadow-3xl transition-all duration-500 overflow-hidden inline-flex items-center justify-center">
                {/* Doctor Image */}
                <img
                  src="/images/imgfx_20251031_223840_1 (1).png"
                  alt="Dr. Shoukat Khan - Best Classical Homeopathic Doctor in Darbhanga, Bihar | Expert in Natural Treatment"
                  title="Dr. Shoukat Khan - Homeopathic Physician"
                  className="w-full h-auto object-contain rounded-3xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Decorative border */}
              <div className="absolute -z-10 -inset-4 border-2 border-emerald-200/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
