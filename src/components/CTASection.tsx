import { Button } from './ui/button';
import { Calendar, Phone, MessageCircle } from 'lucide-react';

interface CTASectionProps {
  onBookAppointment: () => void;
}

export function CTASection({ onBookAppointment }: CTASectionProps) {
  const phoneNumber = '917488467727';
  const message = encodeURIComponent('Hello! I would like to book an appointment at Aaira Homeo Clinic.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
      {/* Decorative elements */}

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-white mb-4 text-3xl sm:text-4xl md:text-5xl">
          Ready to Start Your Healing Journey?
        </h2>
        <p className="text-emerald-100 text-base sm:text-lg mb-12 max-w-2xl mx-auto">
          Take the first step towards natural, holistic healing. Book your consultation today 
          and experience the transformative power of classical homeopathy.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
          <Button
            onClick={onBookAppointment}
            size="lg"
            className="bg-white text-emerald-700 hover:bg-emerald-50 px-6 py-5 sm:px-8 sm:py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Book Appointment Online
          </Button>

          <a
            href="tel:+917488467727"
            className="inline-flex items-center gap-2 w-full sm:w-auto"
          >
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald-700 px-6 py-5 sm:px-8 sm:py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Call Now
            </Button>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 w-full sm:w-auto"
          >
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-green-500 hover:text-white hover:border-green-500 px-6 py-5 sm:px-8 sm:py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              WhatsApp
            </Button>
          </a>
        </div>

        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 text-emerald-100 text-sm sm:text-base">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Same Day Appointments</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Online Consultations</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Free Follow-up Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
