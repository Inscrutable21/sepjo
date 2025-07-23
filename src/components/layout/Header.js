"use client";
import { useEffect, useState } from 'react';

export default function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="relative w-full bg-gray-900 font-sans">
      {/* Responsive Aspect Ratio Container */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/6]">
        {/* Video Background */}
        {mounted && (
          <video
            src="/animation3.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              filter: 'contrast(1.1) brightness(0.95) saturate(1.2)',
            }}
          >
            Your browser does not support the video tag.
          </video>
        )}

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)
            `
          }}
        />

        {/* Content Layer */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-2 sm:px-4">
          <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6">
            {/* Animated Headline with Gradient */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              <span className="block overflow-hidden">
                <span className="block animate-slide-up bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent bg-300% animate-gradient">
                  The Smartest Way
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block animate-slide-up animation-delay-200 text-white">
                  To Book Advertising
                </span>
              </span>
            </h1>
            
            {/* Animated Subheadline */}
            <div className="overflow-hidden">
              <p className="text-gray-200 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-light max-w-xl mx-auto leading-relaxed animate-fade-slide-up animation-delay-400">
                Discover a seamless platform to find, compare, and book the best advertising spaces—anytime, anywhere.
              </p>
            </div>
            
            {/* Animated Button */}
            <div className="pt-2 sm:pt-4 animate-fade-slide-up animation-delay-600">
              <button className="group relative bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base md:text-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300/50 overflow-hidden">
                {/* Button shimmer effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <span className="relative">Get Started</span>
              </button>
            </div>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 animate-fade-in animation-delay-1000">
          <div className="animate-float">
            <svg
              className="w-6 h-6 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slide-up {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fade-slide-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-fade-slide-up {
          animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out both;
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }

        .bg-300\% {
          background-size: 300% 300%;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </header>
  );
}