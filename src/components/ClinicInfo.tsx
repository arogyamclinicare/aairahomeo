import { Card } from './ui/card';
import { MapPin } from 'lucide-react';

export function ClinicInfo() {
  return (
    <section id="clinic-info" className="py-20 sm:py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4 text-3xl sm:text-4xl md:text-5xl">Visit Our Clinic</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Conveniently located and open throughout the week for your healthcare needs
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-8">
          {/* Google Map Embed */}
          <div className="h-full min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px]">
            <Card className="h-full overflow-hidden border-emerald-100 p-0">
              <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
              <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.976275113987!2d85.8946194!3d26.1535903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39edb9aca122bb83%3A0x16951bed973f0dfe!2sAaira%20Homeo%20Clinic!5e1!3m2!1sen!2sin!4v1761889465502!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                  title="Aaira Homeo Clinic Location - Pansary auto service, pani tanki Lalbagh, Darbhanga Bihar 846004"
                  aria-label="Google Maps location of Aaira Homeo Clinic in Darbhanga, Bihar"
                className="w-full h-full"
              ></iframe>
                {/* Overlay button to open in Google Maps */}
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                  <a
                    href="https://maps.app.goo.gl/bR3uVu3MDUEQnchY8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg transition-all transform hover:scale-105 font-semibold text-xs sm:text-sm"
                  >
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Open in Google Maps</span>
                    <span className="sm:hidden">Open Maps</span>
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
