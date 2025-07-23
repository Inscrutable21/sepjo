import Image from 'next/image';
import Link from 'next/link';


const services = [
  {
    title: 'Social Media Advertising',
    imageUrl: '/images/services/social-media.jpg', // Replace with your image
    href: '/services/social-media'
  },
  {
    title: 'Billboard Advertising',
    imageUrl: '/images/services/billboard.jpg',   // Replace with your image
    href: '/services/billboard'
  },
  {
    title: 'Digital Advertising',
    imageUrl: '/images/services/digital-ads.jpg', // Replace with your image
    href: '/services/digital'
  }
];

export default function OurServices() {
  return (
    // The background color is changed here to match the section above
    <section className="bg-gray-900 text-white py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Our Services
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-400">
            Discover our comprehensive advertising solutions designed to elevate your brand and drive measurable results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="block group">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-lg">
                {/* Background Image */}
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col">
                  {/* Top Tag */}
                  <div className="self-start">
                    <span className="bg-gray-200/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                      {service.tag}
                    </span>
                  </div>

                  {/* Bottom Text */}
                  <div className="mt-auto">
                    <h3 className="text-xl font-bold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-white font-semibold flex items-center transition-all duration-300 group-hover:text-gray-200">
                      Learn More
                      <svg
                        className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}