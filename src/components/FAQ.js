'use client';

import { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: "What advertising services does SEPJO offer?",
    answer: "SEPJO specializes in three core advertising services: Social Media Advertising for targeted online campaigns, billboards Advertising for high-impact outdoor visibility, and Digital LED display ads for comprehensive online marketing solutions."
  },
  {
    id: 2,
    question: "How quickly can SEPJO launch my advertising campaign?",
    answer: "Social media advertising campaigns can go live within 3-5 business days. billboards Advertising requires 1-2 weeks for location booking and creative production. Digital LED display ads campaigns typically launch within 5-7 days after strategy approval."
  },
  {
    id: 3,
    question: "What makes SEPJO different from other advertising agencies?",
    answer: "SEPJO combines creative excellence with data-driven strategies across all three advertising channels. We offer integrated campaigns that seamlessly blend social media, billboard, and Digital LED display ads for maximum brand impact and ROI."
  },
  {
    id: 4,
    question: "Do you provide campaign analytics and reporting?",
    answer: "Yes, we provide comprehensive analytics and detailed reporting for all campaigns. You'll receive regular performance updates, ROI analysis, and actionable insights to optimize your advertising investment."
  },
  {
    id: 5,
    question: "What is the minimum budget required for advertising campaigns?",
    answer: "Our campaign budgets are flexible and tailored to your business needs. We work with businesses of all sizes, from startups to enterprises, creating effective campaigns within your budget constraints."
  },
  {
    id: 6,
    question: "Can SEPJO handle campaigns across multiple cities in India?",
    answer: "Absolutely! We have successfully executed campaigns across major Indian cities including Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, and many more. Our network ensures consistent quality nationwide."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Find answers to common questions about our advertising services, processes, and more
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-expanded={openItems.has(faq.id)}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                        openItems.has(faq.id) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems.has(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Our team is here to help you understand how our advertising solutions can transform your business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-full transition-colors duration-200"
              >
                Contact Us
              </a>
              <a
                href="tel:+919935570511"
                className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-full transition-colors duration-200"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
