import React from 'react';
import { Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onBookAppointment: () => void;
}

export function Footer({ onBookAppointment }: FooterProps) {
  // onBookAppointment prop kept for interface compatibility but not used
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/images/logo final.png"
                alt="Aairah Homeo Clinic"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted partner in holistic healing through classical homeopathy. 
              Experience natural, safe, and effective treatment for you and your family.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">
                  About Doctor
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-emerald-400 transition-colors">
                  Treatments
                </a>
              </li>
              <li>
                <a href="#clinic-info" className="hover:text-emerald-400 transition-colors">
                  Clinic Info
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-emerald-400" />
                <a href="mailto:aairahomeobihar@gmail.com" className="hover:text-emerald-400 transition-colors">
                  aairahomeobihar@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-emerald-400" />
                <span>
                  Pansary auto service, pani tanki Lalbagh,<br />
                  Darbhanga Bihar 846004
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Aaira Homeo Clinic. All rights reserved.</p>
          <p className="mt-2">
            Built by <a href="https://www.digitositsolutionpvtltd.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">Digitos IT Solutions</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
