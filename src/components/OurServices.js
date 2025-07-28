import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    title: 'Social Media Advertising',
    description: 'Targeted campaigns across Facebook, Instagram, Twitter, LinkedIn, and more social platforms.',
    imageUrl: '/images/services/social-media.jpg',
    href: '/billboards?category=social-media',
    features: ['Facebook Ads', 'Instagram Marketing', 'LinkedIn Campaigns', 'Twitter Promotion']
  },
  {
    title: 'Billboard Advertising',
    description: 'High-impact outdoor advertising with premium billboard locations across major cities.',
    imageUrl: '/images/services/billboard.jpg',
    href: '/billboards?category=billboard',
    features: ['Highway Billboards', 'City Center Displays', 'Transit Advertising', 'Airport Displays']
  },
  {
    title: 'Digital Advertising',
    description: 'Comprehensive online marketing solutions including Google Ads, display ads, and programmatic advertising.',
    imageUrl: '/images/services/digital-ads.jpg',
    href: '/billboards?category=digital-advertising',
    features: ['Google Ads', 'Display Advertising', 'Video Marketing', 'Mobile Advertising']
  }
];

export default function OurServices() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Advertising Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive advertising solutions to boost your brand visibility and reach your target audience effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={service.href}
                  className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Explore Options
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
