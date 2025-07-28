'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function BillboardsPage() {
  const [billboards, setBillboards] = useState([])
  const [categories, setCategories] = useState([])
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    cityId: '',
    categoryId: '',
    subCategoryId: '',
    mediaType: '',
    illumination: '',
    minPrice: '',
    maxPrice: '',
    size: '',
    isAvailable: true
  })
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [billboardsRes, categoriesRes, citiesRes] = await Promise.all([
        fetch('/api/billboards'),
        fetch('/api/categories'),
        fetch('/api/cities')
      ])

      const [billboardsData, categoriesData, citiesData] = await Promise.all([
        billboardsRes.json(),
        categoriesRes.json(),
        citiesRes.json()
      ])

      setBillboards(billboardsData.billboards || [])
      setCategories(categoriesData.categories || [])
      setCities(citiesData.cities || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      ...(key === 'categoryId' && { subCategoryId: '' }) // Reset subcategory when category changes
    }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      cityId: '',
      categoryId: '',
      subCategoryId: '',
      mediaType: '',
      illumination: '',
      minPrice: '',
      maxPrice: '',
      size: '',
      isAvailable: true
    })
  }

  // Filter and sort billboards
  const filteredBillboards = billboards
    .filter(billboard => {
      const matchesSearch = !filters.search || 
        billboard.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        billboard.location.toLowerCase().includes(filters.search.toLowerCase())
      
      const matchesCity = !filters.cityId || billboard.cityId === filters.cityId
      const matchesCategory = !filters.categoryId || billboard.categoryId === filters.categoryId
      const matchesSubCategory = !filters.subCategoryId || billboard.subCategoryId === filters.subCategoryId
      const matchesMediaType = !filters.mediaType || billboard.mediaType === filters.mediaType
      const matchesIllumination = !filters.illumination || billboard.illumination === filters.illumination
      const matchesSize = !filters.size || billboard.size.toLowerCase().includes(filters.size.toLowerCase())
      const matchesAvailable = billboard.isAvailable === filters.isAvailable
      
      const price = parseFloat(billboard.offerPricing || billboard.pricing)
      const matchesMinPrice = !filters.minPrice || price >= parseFloat(filters.minPrice)
      const matchesMaxPrice = !filters.maxPrice || price <= parseFloat(filters.maxPrice)

      return matchesSearch && matchesCity && matchesCategory && matchesSubCategory && 
             matchesMediaType && matchesIllumination && matchesSize && matchesAvailable &&
             matchesMinPrice && matchesMaxPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.offerPricing || a.pricing) - parseFloat(b.offerPricing || b.pricing)
        case 'price-high':
          return parseFloat(b.offerPricing || b.pricing) - parseFloat(a.offerPricing || a.pricing)
        case 'discount':
          return b.discountPercent - a.discountPercent
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt)
        default: // newest
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

  const selectedCategory = categories.find(cat => cat.id === filters.categoryId)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Billboard Advertising
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover premium billboard locations across India for maximum brand visibility
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search billboards, locations..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex items-center gap-4">
                <select
                  value={filters.cityId}
                  onChange={(e) => handleFilterChange('cityId', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                </select>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Filters ({Object.values(filters).filter(v => v && v !== true).length})
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <select
                    value={filters.categoryId}
                    onChange={(e) => handleFilterChange('categoryId', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>

                  {selectedCategory?.subCategories?.length > 0 && (
                    <select
                      value={filters.subCategoryId}
                      onChange={(e) => handleFilterChange('subCategoryId', e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">All Subcategories</option>
                      {selectedCategory.subCategories.map(sub => (
                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                      ))}
                    </select>
                  )}

                  <select
                    value={filters.mediaType}
                    onChange={(e) => handleFilterChange('mediaType', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">All Media Types</option>
                    <option value="Digital">Digital</option>
                    <option value="Traditional">Traditional</option>
                    <option value="LED">LED</option>
                    <option value="Vinyl">Vinyl</option>
                  </select>

                  <select
                    value={filters.illumination}
                    onChange={(e) => handleFilterChange('illumination', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">All Illumination</option>
                    <option value="Backlit">Backlit</option>
                    <option value="Frontlit">Frontlit</option>
                    <option value="Non-lit">Non-lit</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Min Price (₹)"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />

                  <input
                    type="number"
                    placeholder="Max Price (₹)"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />

                  <input
                    type="text"
                    placeholder="Size (e.g., 20x10)"
                    value={filters.size}
                    onChange={(e) => handleFilterChange('size', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />

                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredBillboards.length} of {billboards.length} billboards
          </p>
        </div>

        {/* Billboards Grid */}
        {filteredBillboards.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.175-5.5-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No billboards found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your filters to see more results.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBillboards.map((billboard) => (
              <BillboardCard key={billboard.id} billboard={billboard} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function BillboardCard({ billboard }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
        {billboard.images && billboard.images.length > 0 ? (
          <Image
            src={billboard.images[0]}
            alt={billboard.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Discount Badge */}
        {billboard.discountPercent > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
            {billboard.discountPercent}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {billboard.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {billboard.city?.name}, {billboard.location}
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {billboard.category?.name}
            {billboard.subCategory && ` / ${billboard.subCategory.name}`}
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {billboard.size} • {billboard.mediaType}
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{billboard.offerPricing}
              </span>
              {billboard.offerPricing !== billboard.pricing && (
                <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                  ₹{billboard.pricing}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">per month</p>
          </div>
          
          <Link
            href={`/billboards/${billboard.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}