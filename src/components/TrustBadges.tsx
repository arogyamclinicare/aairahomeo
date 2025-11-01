import React from 'react';
import { Shield, Award, Users, Heart } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function BadgeItem({ badge, index }: { badge: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5 });
  const Icon = badge.icon;

  return (
    <div
      ref={ref}
      className={`text-center group cursor-default transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 group-hover:bg-white/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
        <Icon className="w-10 h-10 text-white" />
      </div>
      <div className="text-white text-xl mb-1">{badge.title}</div>
      <div className="text-emerald-100">{badge.description}</div>
    </div>
  );
}

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: 'Safe & Natural',
      description: 'No side effects',
      color: 'emerald'
    },
    {
      icon: Award,
      title: '13+ Years',
      description: 'Expert Experience',
      color: 'teal'
    },
    {
      icon: Users,
      title: '5000+',
      description: 'Happy Patients',
      color: 'cyan'
    },
    {
      icon: Heart,
      title: 'Holistic Care',
      description: 'Complete Healing',
      color: 'emerald'
    }
  ];

  return (
    <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 py-20 overflow-hidden">
      {/* Animated background pattern */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {badges.map((badge, index) => (
            <BadgeItem key={index} badge={badge} index={index} />
          ))}
        </div>
      </div>

      {/* Decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>
    </div>
  );
}
