"use client";
export default function Header() {
  return (
    <header className="relative w-full h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden bg-gray-900 font-sans">
      {/* Video Background */}
      <video
        src="/animation3.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover saturate-75 brightness-90"
      >
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, rgba(17,24,39,0.1) 0%, rgba(17,24,39,0.4) 30%, rgba(17,24,39,0.8) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.7) 100%)
          `
        }}
      ></div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl mx-auto space-y-5 sm:space-y-7">
          {/* Headline with gradient and animation */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] animate-fade-in-up"
            style={{
              fontFamily: "'Poppins', 'Montserrat', 'Inter', sans-serif",
              letterSpacing: '-0.02em',
            }}
          >
            The Smartest Way<br className="hidden sm:block" />
            To Book Advertising
          </h1>
          {/* Subheadline with fade-in */}
          <p
            className="text-gray-200 text-base sm:text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed animate-fade-in"
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.7)'
            }}
          >
            Discover a seamless platform to find, compare, and book the best advertising spaces—anytime, anywhere.
          </p>
          {/* Button with glow on hover */}
          <div className="pt-2 sm:pt-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-bold text-lg shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 relative overflow-hidden group">
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 blur-md bg-yellow-300"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Optional: Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white/70"
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

      {/* Animations (add to your global CSS or Tailwind config) */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes fade-in {
          0% { opacity: 0;}
          100% { opacity: 1;}
        }
        .animate-fade-in {
          animation: fade-in 1.5s 0.5s both;
        }
      `}</style>
    </header>
  );
}