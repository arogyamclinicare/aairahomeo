import { Card } from './ui/card';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { AnimatedCounter } from './AnimatedCounter';

const testimonials = [
  {
    name: 'Priya Sharma',
    age: 34,
    condition: 'Chronic Migraine',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    rating: 5,
    text: "After suffering from severe migraines for 8 years, I was skeptical about homeopathy. But Dr. Mitchell's treatment has been life-changing. I'm now migraine-free for 6 months!",
    initials: 'PS'
  },
  {
    name: 'Rajesh Patel',
    age: 42,
    condition: 'Skin Psoriasis',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 5,
    text: "I had tried everything for my psoriasis - countless doctors and treatments. Dr. Mitchell's holistic approach finally gave me clear skin. The best decision I ever made!",
    initials: 'RP'
  },
  {
    name: 'Anita Desai',
    age: 29,
    condition: 'PCOS & Hormonal Issues',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    rating: 5,
    text: "Dr. Mitchell treated my PCOS with such care and patience. Her approach is truly holistic - treating the whole person. My cycles are regular now and I feel healthier than ever!",
    initials: 'AD'
  },
  {
    name: 'Vikram Singh',
    age: 38,
    condition: 'Chronic Asthma',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    rating: 5,
    text: "Living with asthma was limiting my life. Thanks to classical homeopathy treatment, my dependency on inhalers has reduced by 80%. I can finally breathe freely!",
    initials: 'VS'
  },
  {
    name: 'Meera Krishnan',
    age: 45,
    condition: 'Rheumatoid Arthritis',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150',
    rating: 5,
    text: "The pain from arthritis was unbearable. Dr. Mitchell's treatment not only reduced my pain but also improved my overall quality of life. Truly grateful!",
    initials: 'MK'
  },
  {
    name: 'Arjun Mehta',
    age: 7,
    condition: 'Recurring Infections',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150',
    rating: 5,
    text: "Our son used to fall sick every month. After treatment with Dr. Mitchell, his immunity has improved remarkably. He's now the healthiest kid in his class! - Parents",
    initials: 'AM'
  }
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-10 scale-95'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card className="p-8 hover:shadow-2xl transition-all duration-500 border-emerald-100 hover:border-emerald-300 bg-white group relative overflow-hidden h-full hover:-translate-y-2">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-teal-50/0 group-hover:from-emerald-50/50 group-hover:to-teal-50/50 transition-all duration-500"></div>
        
        {/* Quote decoration */}
        <Quote className="absolute top-6 right-6 w-16 h-16 text-emerald-100 opacity-50 group-hover:text-emerald-200 group-hover:scale-110 transition-all duration-500" />

        <div className="relative z-10">
          {/* Rating */}
          <div className="flex gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform"
                style={{ transitionDelay: `${i * 50}ms` }}
              />
            ))}
          </div>

          {/* Testimonial text */}
          <p className="text-gray-600 mb-6 relative z-10 italic leading-relaxed">
            "{testimonial.text}"
          </p>

          {/* Patient info */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <Avatar className="w-14 h-14 border-2 border-emerald-100 group-hover:border-emerald-300 transition-all group-hover:scale-110">
              <AvatarImage src={testimonial.image} alt={testimonial.name} />
              <AvatarFallback className="bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700">
                {testimonial.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-gray-900 group-hover:text-emerald-700 transition-colors">{testimonial.name}</div>
              <div className="text-sm text-gray-500">
                {testimonial.age} years • {testimonial.condition}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function Testimonials() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-6 py-3 rounded-full mb-6 shadow-lg">
            <Star className="w-5 h-5 fill-current animate-pulse" />
            <span className="text-sm uppercase tracking-wider">Patient Success Stories</span>
          </div>
          <h2 className="text-gray-900 mb-4">What Our Patients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Real experiences from real people who found healing through classical homeopathy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Trust badge with animated counters */}
        <div className="mt-12 sm:mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 md:gap-12 bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-6 sm:px-12 sm:py-8 rounded-2xl sm:rounded-3xl border-2 border-emerald-200 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
            <div className="text-center group cursor-default">
              <div className="text-emerald-700 mb-1 text-lg sm:text-xl md:text-2xl group-hover:scale-110 transition-transform">
                <AnimatedCounter end={4.9} suffix="/5.0" />
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="w-full sm:w-px h-px sm:h-16 bg-emerald-300"></div>
            <div className="text-center group cursor-default">
              <div className="text-emerald-700 mb-1 text-lg sm:text-xl md:text-2xl group-hover:scale-110 transition-transform">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Happy Patients</div>
            </div>
            <div className="w-full sm:w-px h-px sm:h-16 bg-emerald-300"></div>
            <div className="text-center group cursor-default">
              <div className="text-emerald-700 mb-1 text-lg sm:text-xl md:text-2xl group-hover:scale-110 transition-transform">
                <AnimatedCounter end={95} suffix="%" />
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
