'use client'

import Image from 'next/image'
import Link from 'next/link'
import { use } from 'react'

const blogPosts = [
  {
    id: 1,
    title: "The Future of Billboard Advertising: Digital vs Traditional",
    content: `
      <p>Billboard advertising has evolved dramatically over the past decade. While traditional static billboards continue to dominate highways and city centers, digital billboards are rapidly gaining ground with their dynamic content capabilities.</p>
      
      <h2>The Rise of Digital Billboards</h2>
      <p>Digital billboards offer unprecedented flexibility for advertisers. With the ability to change content remotely, schedule different ads throughout the day, and even respond to real-time events, they represent the cutting edge of outdoor advertising.</p>
      
      <h2>Traditional Billboards Still Matter</h2>
      <p>Despite the digital revolution, traditional billboards maintain several advantages: lower costs, proven effectiveness, and the ability to create lasting brand impressions without the distractions of changing content.</p>
      
      <h2>Making the Right Choice</h2>
      <p>The choice between digital and traditional depends on your campaign goals, budget, and target audience. Our team at SEPJO can help you determine the best approach for your specific needs.</p>
    `,
    image: "/images/services/billboard.jpg",
    category: "Billboard Advertising",
    date: "December 15, 2024",
    readTime: "5 min read",
    author: "Marketing Team"
  },
  {
    id: 2,
    title: "Social Media ROI: Measuring Success in Digital Campaigns",
    content: `
      <p>Measuring return on investment (ROI) in social media advertising requires a comprehensive understanding of key performance indicators and conversion tracking.</p>
      
      <h2>Essential Metrics to Track</h2>
      <p>Beyond likes and shares, focus on metrics that directly impact your bottom line: click-through rates, conversion rates, cost per acquisition, and lifetime customer value.</p>
      
      <h2>Setting Up Proper Tracking</h2>
      <p>Implement pixel tracking, UTM parameters, and conversion goals to accurately measure the impact of your social media campaigns on actual business outcomes.</p>
      
      <h2>Optimizing for Better ROI</h2>
      <p>Use A/B testing, audience segmentation, and creative optimization to continuously improve your campaign performance and maximize your advertising spend.</p>
    `,
    image: "/images/services/social-media.jpg",
    category: "Social Media",
    date: "December 12, 2024",
    readTime: "7 min read",
    author: "Digital Strategy Team"
  },
  {
    id: 3,
    title: "Location-Based Advertising: The Power of Strategic Placement",
    content: `
      <p>The success of any advertising campaign heavily depends on location. Whether you&rsquo;re placing a billboard on a busy highway or targeting social media ads to specific geographic areas, location strategy can make or break your campaign.</p>
      
      <h2>Understanding Your Audience</h2>
      <p>Before selecting locations, it&rsquo;s crucial to understand where your target audience spends their time. Are they commuters on major highways? Shoppers in commercial districts? Or digital natives scrolling through social media?</p>
      
      <h2>High-Traffic vs. Targeted Locations</h2>
      <p>While high-traffic areas offer maximum visibility, targeted locations often provide better conversion rates. The key is finding the balance between reach and relevance for your specific campaign goals.</p>
      
      <h2>Digital Location Targeting</h2>
      <p>Modern digital advertising allows for precise location targeting, enabling you to reach customers within specific radius of your business or target competitors&rsquo; locations.</p>
    `,
    image: "/images/services/digital-ads.jpg",
    category: "Digital Advertising",
    date: "December 10, 2024",
    readTime: "6 min read",
    author: "Creative Director"
  },
  {
    id: 4,
    title: "Integrated Marketing: Combining Billboard, Social, and Digital",
    content: `
      <p>Today&rsquo;s most successful advertising campaigns don&rsquo;t rely on a single channel. Instead, they create cohesive experiences across multiple touchpoints, from billboards to social media to digital ads.</p>
      
      <h2>Creating Consistent Messaging</h2>
      <p>Your billboard message should complement your social media content and digital ads. Consistency in branding, messaging, and visual elements helps reinforce your campaign&rsquo;s impact.</p>
      
      <h2>Cross-Channel Attribution</h2>
      <p>Understanding how different channels work together is crucial. A customer might see your billboard, search for your brand online, and then convert through a social media ad.</p>
      
      <h2>Budget Allocation Strategy</h2>
      <p>Effective integrated campaigns require strategic budget allocation across channels based on your audience&rsquo;s behavior and each channel&rsquo;s strengths.</p>
    `,
    image: "/bg1.jpg",
    category: "Strategy",
    date: "December 8, 2024",
    readTime: "8 min read",
    author: "Campaign Manager"
  },
  {
    id: 5,
    title: "Creative Design Trends in Outdoor Advertising 2024",
    content: `
      <p>The world of outdoor advertising design is constantly evolving. In 2024, we&rsquo;re seeing bold new trends that capture attention and drive engagement in our increasingly digital world.</p>
      
      <h2>Minimalist Bold Typography</h2>
      <p>Clean, bold fonts with minimal text are dominating billboard design. The goal is instant readability and maximum impact for viewers with limited attention spans.</p>
      
      <h2>Interactive Elements</h2>
      <p>QR codes, augmented reality features, and social media integration are making static billboards more interactive and measurable.</p>
      
      <h2>Sustainable Materials</h2>
      <p>Eco-friendly materials and energy-efficient lighting are becoming standard as brands prioritize sustainability in their advertising efforts.</p>
    `,
    image: "/images/services/billboard.jpg",
    category: "Design",
    date: "December 5, 2024",
    readTime: "4 min read",
    author: "Creative Team"
  },
  {
    id: 6,
    title: "Data-Driven Advertising: Analytics That Matter",
    content: `
      <p>In today&rsquo;s advertising landscape, data drives decisions. Understanding which metrics matter and how to interpret them can significantly improve your campaign performance.</p>
      
      <h2>Key Performance Indicators</h2>
      <p>Focus on metrics that align with your business goals: brand awareness, lead generation, sales conversion, or customer acquisition cost.</p>
      
      <h2>Attribution Modeling</h2>
      <p>Understanding the customer journey across multiple touchpoints helps you allocate budget more effectively and optimize campaign performance.</p>
      
      <h2>Real-Time Optimization</h2>
      <p>Modern advertising platforms allow for real-time adjustments based on performance data, enabling you to maximize ROI throughout your campaign.</p>
    `,
    image: "/images/services/digital-ads.jpg",
    category: "Analytics",
    date: "December 3, 2024",
    readTime: "6 min read",
    author: "Data Analyst"
  }
]

export default function BlogPost({ params }) {
  const { id } = use(params)
  const post = blogPosts.find(p => p.id === parseInt(id))

  if (!post) {
    return (
      <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The blog post you&rsquo;re looking for doesn&rsquo;t exist.
          </p>
          <Link
            href="/blog"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 mb-6"
            >
              ← Back to Blog
            </Link>
            
            <div className="mb-4">
              <span className="bg-yellow-100 dark:bg-yellow-400/20 text-yellow-800 dark:text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 md:p-12">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Call to Action */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Campaign?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Let our experts help you create an effective advertising strategy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/services"
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-medium transition-colors"
              >
                View Services
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

