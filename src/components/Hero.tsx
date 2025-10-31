import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Calendar, Award, Heart, CheckCircle2 } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';
import { useParallax } from '../hooks/useScrollAnimation';

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
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pt-20 pb-16 sm:pb-20 md:pb-24 flex items-center min-h-[calc(100vh-80px)]">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 opacity-20 sm:opacity-30 overflow-hidden">
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


      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Left Column - Content */}
          <div className="space-y-3 sm:space-y-4 relative z-10">
            {/* Badge */}
            <div className="animate-in fade-in slide-in-from-left-6 duration-700 delay-100">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-emerald-100">
                <span className="text-xs font-medium text-emerald-700">Trusted Homeopathic Care</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-2 sm:space-y-3 animate-in fade-in slide-in-from-left-6 duration-700 delay-200">
              <h1 className="text-gray-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Experience Holistic Healing with
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Dr. Shoukat Khan
              </h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-gray-600 pt-1">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs sm:text-sm">Classical Homeopathy Expert</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span className="text-xs sm:text-sm">13+ Years Experience</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl leading-relaxed animate-in fade-in slide-in-from-left-6 duration-700 delay-300">
              Experience holistic healing through classical homeopathy. We focus on treating the root cause of your ailments naturally, providing personalized care for you and your family with gentle, effective remedies.
            </p>

            {/* Additional Trust Information */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 animate-in fade-in slide-in-from-left-6 duration-700 delay-350 pt-1">
              <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full">
                <Award className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700 font-medium">BHMS Certified</span>
              </div>
              <div className="flex items-center gap-1.5 bg-teal-50 px-2.5 py-1 rounded-full">
                <Heart className="w-3 h-3 text-teal-600" />
                <span className="text-teal-700 font-medium">Patient-Centered Care</span>
              </div>
              <div className="flex items-center gap-1.5 bg-cyan-50 px-2.5 py-1 rounded-full">
                <Calendar className="w-3 h-3 text-cyan-600" />
                <span className="text-cyan-700 font-medium">5000+ Patients</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 animate-in fade-in slide-in-from-left-6 duration-700 delay-400 pt-2">
              <Button 
                onClick={onBookAppointment}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-5 py-3.5 sm:px-6 sm:py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm font-semibold"
              >
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
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
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-5 py-3.5 sm:px-6 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm font-semibold"
              >
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-600 animate-in fade-in slide-in-from-left-6 duration-700 delay-500 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Same Day Response</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>No Side Effects</span>
              </div>
            </div>
          </div>

          {/* Right Column - Premium Medical Illustration */}
          <div className="relative lg:block hidden">
            <div className="relative group animate-in fade-in slide-in-from-right-6 duration-700 delay-300">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl blur-3xl opacity-30 group-hover:opacity-40 transition-opacity duration-500 scale-110"></div>
              
              {/* Medical Illustration Container */}
              <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl shadow-2xl border-8 border-white/50 backdrop-blur-sm p-6 group-hover:shadow-3xl transition-all duration-500">
                {/* Main Illustration - Abstract Healing Symbol */}
                <div className="relative">
                  {/* Central Healing Symbol */}
                  <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
                    {/* Outer Circle */}
                    <div className="absolute inset-0 rounded-full border-8 border-emerald-200/50 animate-spin-slow"></div>
                    
                    {/* Middle Circle */}
                    <div className="absolute inset-8 rounded-full border-6 border-teal-300/50"></div>
                    
                    {/* Inner Symbol - Stethoscope/Healing */}
                    <div className="absolute inset-12 sm:inset-14 lg:inset-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-xl">
                      <div className="text-white">
                        <Heart className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 animate-pulse" fill="currentColor" />
                      </div>
                    </div>
                    
                    {/* Floating Particles */}
                    <div className="absolute -top-3 -right-3 w-6 h-6 sm:w-8 sm:h-8 bg-emerald-400 rounded-full animate-bounce opacity-70"></div>
                    <div className="absolute -bottom-3 -left-3 w-5 h-5 sm:w-6 sm:h-6 bg-teal-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-1/2 -right-6 sm:-right-8 w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl flex items-center justify-center transform rotate-12 group-hover:rotate-6 transition-transform duration-500">
                    <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-xl sm:rounded-2xl shadow-2xl px-4 py-3 sm:px-6 sm:py-4 border-2 border-emerald-200 group-hover:scale-105 transition-transform duration-500">
                    <div className="text-center">
                      <div className="text-xs sm:text-sm font-semibold text-gray-900">Natural Healing</div>
                      <div className="text-xs text-gray-600">Holistic Approach</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative border */}
              <div className="absolute -z-10 -inset-4 border-2 border-emerald-200/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Mobile - Simplified Illustration */}
          <div className="relative lg:hidden flex justify-center mt-6">
            <div className="relative group animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
              <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl shadow-xl border-4 border-white/50 p-6 max-w-xs">
                <div className="relative mx-auto w-40 h-40">
                  <div className="absolute inset-0 rounded-full border-6 border-emerald-200/50"></div>
                  <div className="absolute inset-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-12 h-12 text-white animate-pulse" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
