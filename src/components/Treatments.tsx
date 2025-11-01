import React from 'react';
import { Card } from './ui/card';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { 
  Sparkles, 
  Baby, 
  Heart, 
  Wind, 
  User, 
  Droplets,
  Activity,
  Smile,
  Stethoscope,
  Brain,
  Bone,
  AlertCircle
} from 'lucide-react';

const treatments = [
  {
    icon: Sparkles,
    title: 'Skin Problems',
    description: 'Eczema, psoriasis, acne, vitiligo, and other dermatological conditions',
    color: 'emerald'
  },
  {
    icon: Droplets,
    title: 'Hair Loss',
    description: 'Alopecia, premature graying, dandruff, and scalp conditions',
    color: 'teal'
  },
  {
    icon: Wind,
    title: 'Respiratory Issues',
    description: 'Asthma, allergic rhinitis, sinusitis, bronchitis, and chronic cough',
    color: 'cyan'
  },
  {
    icon: Heart,
    title: "Women's Health",
    description: 'PCOS, menstrual disorders, menopause, infertility',
    color: 'emerald'
  },
  {
    icon: Activity,
    title: 'Chronic Diseases',
    description: 'Diabetes, hypertension, thyroid disorders, arthritis',
    color: 'teal'
  },
  {
    icon: Baby,
    title: 'Child Healthcare',
    description: 'Teething troubles, growth issues, immunity building, childhood ailments',
    color: 'cyan'
  },
  {
    icon: Smile,
    title: 'Digestive Disorders',
    description: 'IBS, acidity, constipation, gastritis, liver disorders',
    color: 'emerald'
  },
  {
    icon: Brain,
    title: 'Mental Health',
    description: 'Anxiety, depression, stress, insomnia, migraine',
    color: 'teal'
  },
  {
    icon: Bone,
    title: 'Joint & Bone',
    description: 'Arthritis, back pain, sciatica, osteoporosis',
    color: 'cyan'
  },
  {
    icon: AlertCircle,
    title: 'Autoimmune Disorders',
    description: 'Rheumatoid arthritis, lupus, allergies',
    color: 'emerald'
  },
  {
    icon: User,
    title: "Men's Health",
    description: 'Prostate issues, male infertility, sexual health',
    color: 'teal'
  },
  {
    icon: Stethoscope,
    title: 'Lifestyle Diseases',
    description: 'Obesity, metabolic syndrome, hormonal imbalances',
    color: 'cyan'
  }
];

const colorMap = {
  emerald: {
    bg: 'bg-gradient-to-br from-emerald-100 to-emerald-200',
    icon: 'text-emerald-600'
  },
  teal: {
    bg: 'bg-gradient-to-br from-teal-100 to-teal-200',
    icon: 'text-teal-600'
  },
  cyan: {
    bg: 'bg-gradient-to-br from-cyan-100 to-cyan-200',
    icon: 'text-cyan-600'
  }
};

function TreatmentCard({ treatment, index }: { treatment: typeof treatments[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const Icon = treatment.icon;
  const colors = colorMap[treatment.color as keyof typeof colorMap];

  // Get image path for treatments that have custom images
  const getImagePath = (title: string): string | null => {
    const imageMap: { [key: string]: string } = {
      'Skin Problems': '/images/Skin Problems.png',
      'Hair Loss': '/images/Hair Loss.png',
      'Respiratory Issues': '/images/Respiratory Issues.png',
      "Women's Health": "/images/Women's Health.png",
      'Chronic Diseases': '/images/Chronic Diseases.png',
      'Child Healthcare': '/images/Child Healthcare.png',
      'Digestive Disorders': '/images/Digestive Disorders.png',
      'Mental Health': '/images/Mental Health.png',
      'Joint & Bone': '/images/Joint & Bone.png',
      'Autoimmune Disorders': '/images/Autoimmune Disorders.png',
      "Men's Health": "/images/Men's Health.png",
      'Lifestyle Diseases': '/images/Lifestyle Diseases.png'
    };
    return imageMap[title] || null;
  };

  const imagePath = getImagePath(treatment.title);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className="p-4 sm:p-6 hover:shadow-2xl transition-all duration-500 border-emerald-100 hover:border-emerald-300 bg-white/80 backdrop-blur-sm group cursor-pointer hover:-translate-y-2 relative overflow-hidden">
        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        <div className="relative flex items-start gap-3 sm:gap-4">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg overflow-hidden`}>
            {imagePath ? (
              <img 
                src={imagePath} 
                alt={`${treatment.title} Treatment by Dr. Shoukat Khan - ${treatment.description}`}
                title={`${treatment.title} - Homeopathic Treatment`}
                className="w-full h-full object-cover"
                loading="lazy"
                width="60"
                height="60"
              />
            ) : (
              <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${colors.icon}`} />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors text-base sm:text-lg font-semibold">{treatment.title}</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{treatment.description}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function Treatments() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section id="treatments" className="py-20 sm:py-24 md:py-32 bg-gradient-to-br from-gray-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent text-sm uppercase tracking-wider">
              Our Expertise
            </span>
          </div>
          <h2 className="text-gray-900 mb-4 text-3xl sm:text-4xl md:text-5xl">Treatments & Specialties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Comprehensive homeopathic care for a wide range of acute and chronic conditions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((treatment, index) => (
            <TreatmentCard key={index} treatment={treatment} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Don&apos;t see your condition listed? Contact us for personalized consultation.
          </p>
        </div>
      </div>
    </section>
  );
}
