import React from 'react';
import { Award, Heart, BookOpen, Users } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function AboutDoctor() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section id="about" className="relative overflow-hidden">
      {/* Seamless gradient transition - extends upward into Hero section */}
      <div className="absolute top-0 left-0 right-0 h-40 sm:h-48 md:h-56 bg-gradient-to-b from-emerald-50 via-teal-50 to-emerald-50/80 -mt-40 sm:-mt-48 md:-mt-56 pointer-events-none z-0"></div>
      
      {/* Gradient background content area matching Hero */}
      <div className="relative bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50 pt-24 sm:pt-32 md:pt-40 pb-20 sm:pb-24 md:pb-32 z-10">
      {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-64 h-64 sm:w-72 sm:h-72 bg-emerald-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 sm:w-96 sm:h-96 bg-teal-100 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={sectionRef}
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent text-sm uppercase tracking-wider">
              Meet Your Physician
            </span>
          </div>
          <h2 className="text-gray-900 mb-4 text-3xl sm:text-4xl md:text-5xl">About Dr. Shoukat Khan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Dedicated to providing holistic healthcare through classical homeopathy
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Doctor Image */}
          <div 
            ref={imageRef}
            className={`flex justify-center transition-all duration-1000 ${
              imageVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 -rotate-6'
            }`}
          >
            <div className="relative group">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4 sm:border-6 md:border-8 border-emerald-100 group-hover:border-emerald-200 transition-all duration-500 group-hover:scale-105">
                <img
                  src="/images/dr photo.png"
                  alt="Dr. Shoukat Khan - Expert Classical Homeopathic Physician in Darbhanga, Bihar with 13+ Years Experience"
                  title="Dr. Shoukat Khan - BHMS, Classical Homeopathic Doctor"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  width="400"
                  height="400"
                  itemProp="image"
                />
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white px-4 py-2 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl animate-bounce hover:animate-none transition-all duration-300 hover:scale-110">
                <div className="text-center">
                  <div className="text-base sm:text-xl">13+ Years</div>
                  <div className="text-xs sm:text-sm opacity-90">Experience</div>
                </div>
              </div>

              {/* Decorative rings */}
              <div className="absolute -inset-2 sm:-inset-4 border-2 border-emerald-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
              <div className="absolute -inset-4 sm:-inset-8 border border-emerald-100 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"></div>
            </div>
          </div>

          {/* Doctor Information */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-gray-900 text-xl sm:text-2xl">Qualifications & Experience</h3>
              <div className="space-y-2 text-gray-600 text-sm sm:text-base">
                <p className="flex items-start gap-2">
                  <Award className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span>BHMS (Bachelor of Homeopathic Medicine & Surgery)</span>
                </p>
                <p className="flex items-start gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span>Certified in Advanced Homeopathic Therapeutics</span>
                </p>
                <p className="flex items-start gap-2">
                  <Users className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span>13+ years of clinical practice</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-gray-900 text-lg sm:text-xl">Treatment Philosophy</h4>
              <p className="text-gray-600 text-sm sm:text-base">
                I believe in treating the person as a whole, not just the disease. Classical homeopathy focuses on understanding the unique constitution of each patient and addressing the root cause of ailments rather than merely suppressing symptoms.
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                My approach combines time-tested homeopathic principles with modern understanding of health, ensuring safe, gentle, and effective treatment for patients of all ages.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-gray-900 text-lg sm:text-xl">Languages Spoken</h4>
              <div className="flex flex-wrap gap-2">
                {['English', 'Hindi', 'Urdu'].map((language) => (
                  <span
                    key={language}
                    className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 text-emerald-700">
                <Heart className="w-6 h-6" />
                <p className="text-gray-700">
                  &quot;Healing is not just about medicine, it&apos;s about understanding and care&quot;
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
