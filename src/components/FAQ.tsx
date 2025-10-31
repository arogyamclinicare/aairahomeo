import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqs = [
  {
    question: 'What is Classical Homeopathy?',
    answer: 'Classical homeopathy is a holistic system of medicine that treats the individual as a whole, not just the disease. It follows the principle of "like cures like" and uses highly diluted natural substances to stimulate the body\'s own healing ability. Unlike modern homeopathy which uses combination remedies, classical homeopathy prescribes a single remedy at a time based on your unique constitution and symptoms.'
  },
  {
    question: 'How long does homeopathic treatment take?',
    answer: 'The duration of treatment varies depending on the nature and chronicity of the condition. Acute conditions may show improvement within days to weeks, while chronic conditions that have been present for years may take several months to heal completely. Unlike conventional medicine that suppresses symptoms, homeopathy works to cure the root cause, which requires patience and consistent treatment.'
  },
  {
    question: 'Is homeopathy safe for children and pregnant women?',
    answer: 'Yes, homeopathy is completely safe for all age groups including infants, children, pregnant women, and elderly patients. The remedies are made from natural substances in highly diluted forms, making them gentle with no side effects. For children, homeopathy is particularly effective for building immunity, treating common childhood ailments, and supporting healthy growth and development.'
  },
  {
    question: 'What should I expect during my first consultation?',
    answer: 'Your first consultation will typically last 60-90 minutes. Dr. Mitchell will take a detailed case history including your physical symptoms, emotional state, lifestyle, family medical history, and overall constitution. This comprehensive approach helps in selecting the most appropriate remedy for you. Subsequent follow-up consultations are usually shorter, lasting 20-30 minutes.'
  },
  {
    question: 'Can I take homeopathic medicines with conventional medications?',
    answer: 'Yes, homeopathic medicines can be taken alongside conventional medications. They don\'t interfere with each other. However, it\'s important to inform Dr. Mitchell about all medications you\'re currently taking. In many cases, as homeopathic treatment progresses, patients may be able to reduce their dependency on conventional medicines under proper medical supervision.'
  },
  {
    question: 'Do you treat serious/chronic diseases?',
    answer: 'Yes, homeopathy is highly effective in treating chronic diseases such as asthma, allergies, arthritis, skin conditions, thyroid disorders, PCOS, digestive issues, and many autoimmune conditions. However, for acute medical emergencies or conditions requiring surgery, we work in coordination with conventional medical care to provide the best outcome for our patients.'
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-24 md:py-32 bg-gradient-to-br from-emerald-50 to-teal-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            Common questions about homeopathy and our treatment approach
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white border border-emerald-100 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-gray-900 hover:text-emerald-600 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center bg-white rounded-2xl p-8 shadow-lg border border-emerald-100">
          <h3 className="text-gray-900 mb-3">Have more questions?</h3>
          <p className="text-gray-600 mb-4">
            Feel free to contact us or schedule a consultation to discuss your specific health concerns.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-4">
            <a 
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm sm:text-base"
            >
              Call: +91 98765 43210
            </a>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <a 
              href="mailto:aairahomeobihar@gmail.com"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm sm:text-base break-all"
            >
              Email: aairahomeobihar@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
