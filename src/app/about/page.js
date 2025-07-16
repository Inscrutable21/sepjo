'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 bg-neutral-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-playfair mb-4 dark:text-white">Our Story</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Founded in 2024 with a passion for creative storytelling, innovative digital marketing, and impactful advertising solutions.
          </p>
        </header>
        
        <div className="relative h-96 md:h-[500px] mb-16 rounded-xl overflow-hidden">
          <Image 
            src="/bg1.jpg"
            alt="Creative advertising campaigns and digital marketing"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-playfair mb-2">Innovating Since 2024</h2>
            <p className="text-gray-200">
              Transforming brands through compelling social media campaigns, strategic billboard placements, and cutting-edge digital advertising solutions.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-playfair mb-4 dark:text-white">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              At our agency, we believe that great advertising shouldn&apos;t just capture attention—it should create lasting connections. Our mission is to deliver innovative advertising solutions across social media, billboard, and digital platforms that drive real results for our clients.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We&apos;re committed to creative excellence, data-driven strategies, and building brands that resonate with their target audiences. Each campaign is carefully crafted to ensure maximum impact and measurable ROI across all advertising channels.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-playfair mb-4 dark:text-white">Our Approach</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our advertising strategy combines creative brilliance with analytical precision. We develop integrated campaigns that seamlessly blend social media engagement, strategic outdoor advertising, and targeted digital marketing to amplify your brand message.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              By leveraging cutting-edge technology, market insights, and creative expertise, we create advertising experiences that not only capture attention but drive conversions and build lasting brand loyalty across all touchpoints.
            </p>
          </div>
        </div>
        
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-playfair text-center mb-10 dark:text-white">Why Choose Our Agency</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="bg-amber-100 dark:bg-amber-400/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                {/* Billboard/Creative Design Icon */}
                <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3h18a1 1 0 011 1v12a1 1 0 01-1 1h-8v2h2a1 1 0 110 2H9a1 1 0 110-2h2v-2H3a1 1 0 01-1-1V4a1 1 0 011-1zm1 2v10h16V5H4zm2 2h12v2H6V7zm0 4h8v2H6v-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-gray-900 dark:text-white">Creative Excellence</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                Award-winning creative team delivering innovative campaigns that break through the noise and captivate your target audience.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="bg-amber-100 dark:bg-amber-400/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                {/* Analytics/Chart Icon */}
                <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3v18h18v-2H5V3H3zm4 12v2h2v-2H7zm4-4v6h2v-6h-2zm4-4v10h2V7h-2zm4-4v14h2V3h-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-gray-900 dark:text-white">Data-Driven Results</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                Advanced analytics and performance tracking across all platforms to optimize campaigns and maximize your advertising ROI.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="bg-amber-100 dark:bg-amber-400/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                {/* Megaphone/Marketing Icon */}
                <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1l9 4v2l-9-4-9 4v2l9-4v18l-2-1v-6H8v2l4 2v2l-9-4v-2l9 4V1zm0 8.5L5.5 7 12 4.5 18.5 7 12 9.5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-gray-900 dark:text-white">Full-Service Solutions</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                Comprehensive advertising services from social media management to billboard campaigns and digital marketing strategies.
              </p>
            </div>
          </div>
        </section>
        
        <section className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 md:p-12 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-playfair mb-4 dark:text-white">Our Process</h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              How we transform your brand vision into powerful advertising campaigns that deliver measurable results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ProcessStep 
              number="01"
              title="Strategy & Research"
              description="Deep dive into your brand, audience research, competitive analysis, and campaign strategy development."
            />
            <ProcessStep 
              number="02"
              title="Creative Development"
              description="Concept creation, design development, copywriting, and content production across all advertising formats."
            />
            <ProcessStep 
              number="03"
              title="Campaign Launch"
              description="Multi-platform deployment across social media, billboards, and digital channels with precise targeting."
            />
            <ProcessStep 
              number="04"
              title="Optimization & Reporting"
              description="Continuous monitoring, performance optimization, and detailed analytics reporting for maximum ROI."
            />
          </div>
        </section>
        
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-playfair mb-4 dark:text-white">Our Commitment to Innovation</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                In the fast-evolving world of advertising, staying ahead means embracing innovation. We continuously explore emerging platforms, cutting-edge technologies, and creative formats to ensure your brand remains at the forefront of your industry.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                From AI-powered ad optimization to immersive AR experiences and programmatic billboard placements, we leverage the latest advertising technologies to amplify your brand&apos;s reach and impact.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                We partner with leading platform providers, media networks, and technology companies to deliver advertising solutions that not only meet today&apos;s standards but anticipate tomorrow&apos;s opportunities.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden">
              <Image 
                src="/bg2.jpg"
                alt="Innovative advertising technologies and creative campaigns"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>
        
        <section className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-8 md:p-12 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-playfair mb-4 dark:text-white">Meet Our Team</h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              The creative minds and strategic thinkers behind our award-winning advertising campaigns.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember 
              name="Abdul Samad" 
              role="Creative Director & CEO"
              image="/bg1.jpg"
            />
            <TeamMember 
              name="Sarah Johnson" 
              role="Head of Digital Strategy"
              image="/bg1.jpg"
            />
            <TeamMember 
              name="Mike Chen" 
              role="Social Media Director"
              image="/bg1.jpg"
            />
            <TeamMember 
              name="Lisa Rodriguez" 
              role="Billboard & OOH Specialist"
              image="/bg1.jpg"
            />
          </div>
        </section>
        
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-playfair mb-6 dark:text-white">Ready to Amplify Your Brand?</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Transform your brand presence with our comprehensive advertising solutions. From viral social media campaigns to impactful billboard placements and precision digital marketing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/services" 
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors font-medium"
            >
              View Our Services
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3 border-2 border-gray-900 dark:border-gray-200 hover:bg-gray-900 dark:hover:bg-gray-200 hover:text-white dark:hover:text-gray-900 text-gray-900 dark:text-gray-200 rounded-full transition-colors font-medium"
            >
              Start Your Campaign
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function ValueCard({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function ProcessStep({ number, title, description }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-medium mb-2 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

function TeamMember({ name, role, image }) {
  return (
    <div className="text-center">
      <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
        <Image 
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-lg font-medium dark:text-white">{name}</h3>
      <p className="text-gray-600 dark:text-gray-300">{role}</p>
    </div>
  )
}