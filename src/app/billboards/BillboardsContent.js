'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function BillboardsContent() {
  const searchParams = useSearchParams()
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
    // Set initial filters from URL parameters
    const initialFilters = {
      search: searchParams.get('search') || '',
      cityId: searchParams.get('cityId') || '',
      categoryId: searchParams.get('categoryId') || '',
      subCategoryId: searchParams.get('subCategoryId') || '',
      mediaType: searchParams.get('mediaType') || '',
      illumination: searchParams.get('illumination') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      size: searchParams.get('size') || '',
      isAvailable: searchParams.get('isAvailable') !== 'false'
    }
    
    setFilters(initialFilters)
    fetchData()
  }, [searchParams])

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
      ...(key === 'categoryId' && { subCategoryId: '' })
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
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Filter Toggle Button */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  <span>Filters</span>
                </button>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                </select>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* City Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City
                    </label>
                    <select
                      value={filters.cityId}
                      onChange={(e) => handleFilterChange('cityId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">All Cities</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={filters.categoryId}
                      onChange={(e) => handleFilterChange('categoryId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subcategory Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subcategory
                    </label>
                    <select
                      value={filters.subCategoryId}
                      onChange={(e) => handleFilterChange('subCategoryId', e.target.value)}
                      disabled={!selectedCategory}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                    >
                      <option value="">All Subcategories</option>
                      {selectedCategory?.subCategories.map((subCategory) => (
                        <option key={subCategory.id} value={subCategory.id}>
                          {subCategory.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Clear Filters Button */}
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
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
              Try adjusting your search criteria or filters.
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {billboard.title}
        </h3>
        
        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {billboard.location}
        </div>

        {/* Details */}
        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex justify-between">
            <span>Size:</span>
            <span>{billboard.size}</span>
          </div>
          <div className="flex justify-between">
            <span>Type:</span>
            <span>{billboard.mediaType}</span>
          </div>
          <div className="flex justify-between">
            <span>Illumination:</span>
            <span>{billboard.illumination}</span>
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