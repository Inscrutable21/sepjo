'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const blogPosts = [
  {
    id: 1,
    title: "The Future of billboards Advertising: Digital vs Traditional",
    excerpt: "Explore how digital billboards are revolutionizing outdoor advertising while traditional billboards maintain their timeless appeal.",
    image: "/images/services/billboard.jpg",
    category: "billboards Advertising",
    date: "December 15, 2024",
    readTime: "5 min read",
    author: "Marketing Team"
  },
  {
    id: 2,
    title: "Social Media ROI: Measuring Success in Digital Campaigns",
    excerpt: "Learn the key metrics and strategies to maximize your social media advertising return on investment.",
    image: "/images/services/social-media.jpg",
    category: "Social Media",
    date: "December 12, 2024",
    readTime: "7 min read",
    author: "Digital Strategy Team"
  },
  {
    id: 3,
    title: "Location-Based Advertising: The Power of Strategic Placement",
    excerpt: "Discover how choosing the right location can make or break your advertising campaign's effectiveness.",
    image: "/images/services/digital-ads.jpg",
    category: "Digital LED display ads",
    date: "December 10, 2024",
    readTime: "6 min read",
    author: "Creative Director"
  },
  {
    id: 4,
    title: "Integrated Marketing: Combining Billboard, Social, and Digital",
    excerpt: "How to create cohesive campaigns that leverage multiple advertising channels for maximum impact.",
    image: "/bg1.jpg",
    category: "Strategy",
    date: "December 8, 2024",
    readTime: "8 min read",
    author: "Campaign Manager"
  },
  {
    id: 5,
    title: "Creative Design Trends in Outdoor Advertising 2024",
    excerpt: "Stay ahead with the latest design trends that are capturing attention in billboard and outdoor advertising.",
    image: "/images/services/billboard.jpg",
    category: "Design",
    date: "December 5, 2024",
    readTime: "4 min read",
    author: "Creative Team"
  },
  {
    id: 6,
    title: "Data-Driven Advertising: Analytics That Matter",
    excerpt: "Understanding the metrics that drive successful advertising campaigns across all platforms.",
    image: "/images/services/digital-ads.jpg",
    category: "Analytics",
    date: "December 3, 2024",
    readTime: "6 min read",
    author: "Data Analyst"
  }
]

const categories = ["All", "billboards Advertising", "Social Media", "Digital LED display ads", "Strategy", "Design", "Analytics"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 dark:text-white">
            Advertising Insights
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Expert insights, industry trends, and success stories from the world of billboard, social media, and Digital LED display ads.
          </p>
        </header>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-full">
                  <Image
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-yellow-100 dark:bg-yellow-400/20 text-yellow-800 dark:text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {filteredPosts[0].date}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4 dark:text-white">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>{filteredPosts[0].author}</span>
                      <span>•</span>
                      <span>{filteredPosts[0].readTime}</span>
                    </div>
                    <Link
                      href={`/blog/${filteredPosts[0].id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 dark:text-white line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    By {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 font-medium text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">
            Ready to Launch Your Campaign?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Get expert advice on billboard placement, social media strategy, and Digital LED display ads solutions tailored to your brand.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/services"
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-medium transition-colors"
            >
              View Our Services
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full font-medium transition-colors"
            >
              Get Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}