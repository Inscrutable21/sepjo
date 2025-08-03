'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    company: "Kumar Electronics",
    location: "Mumbai",
    service: "Social Media Advertising",
    rating: 5,
    text: "SEPJO transformed our social media presence completely! Our Instagram followers increased by 300% and sales doubled within 3 months. Their creative campaigns really connected with our target audience.",
    avatar: "/bg1.jpg"
  },
  {
    id: 2,
    name: "Priya Sharma",
    company: "Sharma Fashion House",
    location: "Delhi",
    service: "Billboard Advertising",
    rating: 5,
    text: "The billboard campaign they designed for us was absolutely stunning! We got prime locations across Delhi and the creative was so eye-catching. Our brand visibility increased tremendously.",
    avatar: "/bg1.jpg"
  },
  {
    id: 3,
    name: "Amit Patel",
    company: "TechSolutions Pvt Ltd",
    location: "Bangalore",
    service: "Digital LED display ads",
    rating: 5,
    text: "Excellent digital marketing strategy! SEPJO helped us reach our target audience through Google Ads and Facebook campaigns. Our lead generation improved by 250% in just 2 months.",
    avatar: "/bg1.jpg"
  },
  {
    id: 4,
    name: "Sneha Gupta",
    company: "Gupta Jewellers",
    location: "Lucknow",
    service: "Social Media Advertising",
    rating: 5,
    text: "Their social media campaigns during festival season were phenomenal! Beautiful creatives and perfect timing helped us achieve record sales. Highly recommend SEPJO for any business.",
    avatar: "/bg1.jpg"
  },
  {
    id: 5,
    name: "Vikram Singh",
    company: "Singh Motors",
    location: "Jaipur",
    service: "Billboard Advertising",
    rating: 5,
    text: "Professional team with creative minds! The billboard designs were modern and impactful. We saw immediate increase in showroom visits after the campaign launch.",
    avatar: "/bg1.jpg"
  },
  {
    id: 6,
    name: "Kavya Reddy",
    company: "Reddy's Restaurant Chain",
    location: "Hyderabad",
    service: "Digital LED display ads",
    rating: 5,
    text: "SEPJO's Digital LED display ads expertise helped us expand to 3 new cities. Their targeted campaigns and analytics-driven approach delivered exceptional ROI. Truly professional service!",
    avatar: "/bg1.jpg"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Discover how SEPJO has helped businesses across India achieve remarkable growth through our advertising solutions
          </p>
        </div>

        {/* Testimonial Container with proper spacing for arrows */}
        <div className="relative max-w-5xl mx-auto px-8 sm:px-12 md:px-16">
          {/* Main Testimonial Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-yellow-100 dark:bg-yellow-900/20 rounded-full -translate-y-10 translate-x-10 sm:-translate-y-16 sm:translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-orange-100 dark:bg-orange-900/20 rounded-full translate-y-8 -translate-x-8 sm:translate-y-12 sm:-translate-x-12"></div>
            
            <div className="relative z-10">
              {/* Quote Icon */}
              <div className="text-yellow-500 mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>

              {/* Testimonial Content */}
              <div className="mb-6 sm:mb-8">
                <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                  &ldquo;{testimonials[currentIndex].text}&rdquo;
                </p>
                
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base truncate">
                      {testimonials[currentIndex].company}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                      {testimonials[currentIndex].location} • {testimonials[currentIndex].service}
                    </p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center mt-3 sm:mt-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows - Positioned outside the card */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-300 z-10"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-300 z-10"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-yellow-500 w-6 sm:w-8' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-yellow-300 w-2 sm:w-3'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Success Stats */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-2">Creative</div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Solutions</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Innovative Campaigns</p>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-2">Expert</div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Team</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Professional Service</p>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-2">Quality</div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Results</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Guaranteed Success</p>
          </div>
        </div>
      </div>
    </section>
  );
}






