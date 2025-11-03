import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { GraduationCap, Building2, Users } from 'lucide-react';

const milestones = [
  {
    year: '2012',
    icon: GraduationCap,
    title: 'Medical Education',
    description: 'Completed medical education in Classical Homeopathy, earning BHMS degree'
  },
  {
    year: '2012',
    icon: Building2,
    title: 'Clinic Established',
    description: 'Founded Aaira Homeo Clinic with vision for holistic healing'
  },
  {
    year: '2016',
    icon: Building2,
    title: 'Practice Expansion',
    description: 'Expanded clinical practice with focus on chronic disease management'
  },
  {
    year: '2023',
    icon: Users,
    title: '5000+ Patients',
    description: 'Milestone achievement in patient care and successful treatments'
  }
];

export function Timeline() {
  return (
    <section className="py-12 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <h2 className="text-gray-900 mb-2 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Our Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            A decade of dedication to natural healing and patient care excellence
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-emerald-200 via-teal-300 to-cyan-200"></div>

          <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
            {milestones.map((milestone, index) => (
              <TimelineItem key={index} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const Icon = milestone.icon;
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`w-[45%] sm:w-[48%] md:w-5/12 transition-all duration-1000 ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : `opacity-0 ${isLeft ? 'translate-x-[-50px]' : 'translate-x-[50px]'} translate-y-10`
        }`}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        <div className="bg-white rounded-lg sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-500 border border-emerald-100 hover:border-emerald-300 group">
          <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-100 to-teal-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-emerald-600 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base font-semibold">{milestone.year}</div>
              <h3 className="text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold leading-tight">{milestone.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed">{milestone.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Center dot */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 border-2 sm:border-4 border-white shadow-md sm:shadow-lg transition-all duration-500 ${
          isVisible ? 'scale-100' : 'scale-0'
        }`}
        style={{ transitionDelay: `${index * 200 + 300}ms` }}
      ></div>
    </div>
  );
}
