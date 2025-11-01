import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';

interface PrivacyPolicyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Privacy Policy Component
 * GDPR-compliant privacy policy dialog
 */
export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription>
            Last updated: {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-semibold text-lg mb-2">1. Introduction</h3>
              <p className="text-gray-700 mb-4">
                Aaira Homeo Clinic (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">2. Information We Collect</h3>
              <div className="text-gray-700 space-y-2">
                <p><strong>Personal Information:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Name</li>
                  <li>Phone number</li>
                  <li>Email address (optional)</li>
                  <li>Age</li>
                  <li>Health concerns/medical information you provide</li>
                  <li>Preferred appointment dates and times</li>
                </ul>
                <p className="mt-4"><strong>Automatically Collected Information:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>Usage data and analytics</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">3. How We Use Your Information</h3>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                <li>To schedule and manage your appointments</li>
                <li>To contact you regarding your appointment requests</li>
                <li>To provide medical consultation services</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">4. Data Storage and Security</h3>
              <p className="text-gray-700 mb-2">
                We use Supabase, a secure cloud database service, to store your information. 
                All data is encrypted in transit and at rest. We implement appropriate technical 
                and organizational measures to protect your personal information.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">5. Your Rights (GDPR)</h3>
              <p className="text-gray-700 mb-2">Under GDPR, you have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="mt-4 text-gray-700">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">6. Data Retention</h3>
              <p className="text-gray-700">
                We retain your personal information only for as long as necessary to fulfill 
                the purposes outlined in this policy, unless a longer retention period is 
                required by law. Medical records may be retained as required by healthcare regulations.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">7. Third-Party Services</h3>
              <p className="text-gray-700 mb-2">
                We use the following third-party services:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                <li><strong>Supabase:</strong> For secure data storage</li>
                <li><strong>WhatsApp:</strong> For communication (if you contact us via WhatsApp)</li>
                <li><strong>Google Maps:</strong> For clinic location display</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">8. Cookies</h3>
              <p className="text-gray-700">
                We use essential cookies for website functionality. We do not use tracking 
                cookies or analytics cookies that collect personal information without your consent.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">9. Children&apos;s Privacy</h3>
              <p className="text-gray-700">
                Our services are intended for individuals of all ages with parental consent for minors. 
                We do not knowingly collect personal information from children under 13 without 
                parental consent.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">10. Contact Us</h3>
              <p className="text-gray-700 mb-2">
                For any questions, concerns, or to exercise your rights, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Aaira Homeo Clinic</p>
                <p>Dr. Shoukat Khan</p>
                <p>Email: [Your Email]</p>
                <p>Phone: +91-7488467727</p>
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">11. Changes to This Policy</h3>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

