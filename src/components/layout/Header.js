import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 py-16 md:py-24">
        {/* Left Column (Text Content) */}
        <div className="w-full md:w-1/2 lg:w-3/5 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            {/* --- HEADING UPDATED --- */}
            <span className="block text-3xl md:text-4xl lg:text-5xl font-light italic mb-2 tracking-wide">
              The Smartest Way
            </span>
            <span className="font-black tracking-tight">
              To Book Outdoor<br />
              Advertising
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
            Unlock India&apos;s best OOH locations. Search, compare, and book your next campaign in minutes.
          </p>
          
          <Link href="/contact" passHref>
            <button className="bg-yellow-400 text-black font-semibold py-3 px-10 rounded-lg text-lg hover:bg-yellow-500 transition-colors">
              Enquire now
            </button>
          </Link>
        </div>

        {/* --- RIGHT COLUMN - VIDEO WITH ENHANCED EDGE BLENDING --- */}
        <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center items-center">
          <div className="w-11/12 relative overflow-hidden"> 
            <video
              src="/animation2.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto scale-108
                [-webkit-mask-image:radial-gradient(ellipse_at_center,black_25%,rgba(0,0,0,0.9)_50%,rgba(0,0,0,0.4)_75%,rgba(0,0,0,0.1)_90%,transparent_100%)]
                [mask-image:radial-gradient(ellipse_at_center,black_25%,rgba(0,0,0,0.9)_50%,rgba(0,0,0,0.4)_75%,rgba(0,0,0,0.1)_90%,transparent_100%)]
                [filter:drop-shadow(0_15px_15px_rgba(0,0,0,0.15))]
                [box-shadow:inset_0_0_70px_40px_white,inset_0_0_120px_70px_rgba(255,255,255,0.7)]
                dark:[box-shadow:inset_0_0_70px_40px_rgb(17_24_39),inset_0_0_120px_70px_rgba(17,24,39,0.7)]
              "
            >
              Your browser does not support the video tag.
            </video>
            
            {/* Enhanced overlay for better blending */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse at center, 
                    transparent 20%, 
                    rgba(255,255,255,0.1) 45%,
                    rgba(255,255,255,0.4) 70%,
                    rgba(255,255,255,0.8) 88%,
                    white 100%
                  )
                `
              }}
            ></div>

            {/* Dark mode overlay */}
            <div 
              className="absolute inset-0 pointer-events-none dark:block hidden"
              style={{
                background: `
                  radial-gradient(ellipse at center, 
                    transparent 20%, 
                    rgba(17,24,39,0.1) 45%,
                    rgba(17,24,39,0.4) 70%,
                    rgba(17,24,39,0.8) 88%,
                    rgb(17,24,39) 100%
                  )
                `
              }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
}