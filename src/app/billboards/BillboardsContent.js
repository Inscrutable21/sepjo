'use client'
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function BillboardsContent() {
  const searchParams = useSearchParams()
  const [billboards, setBillboards] = useState([])
  const [categories, setCategories] = useState([])
  const [cities, setCities] = useState([])
  const [locations, setLocations] = useState([])
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

  const selectedCategory = categories.find(cat => cat.id === filters.categoryId)
  const selectedSubCategory = selectedCategory?.subCategories?.find(sub => sub.id === filters.subCategoryId)

  const fetchLocations = useCallback(async (cityId) => {
    try {
      const response = await fetch(`/api/billboards/locations?cityId=${cityId}`)
      const data = await response.json()
      setLocations(data.locations || [])
    } catch (error) {
      console.error('Error fetching locations:', error)
      setLocations([])
    }
  }, [])

  useEffect(() => {
    const fetchData = async (categoryParam, cityParam, locationParam) => {
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

        // If there's a city parameter, fetch locations
        if (cityParam) {
          await fetchLocations(cityParam)
        }

        // If there's a category parameter, find and set the matching category
        if (categoryParam && categoriesData.categories) {
          const matchingCategory = categoriesData.categories.find(cat => 
            cat.id === categoryParam ||
            cat.name.toLowerCase().replace(/\s+/g, '-') === categoryParam ||
            cat.name.toLowerCase() === categoryParam.replace(/-/g, ' ')
          )
          
          if (matchingCategory) {
            setFilters(prev => ({
              ...prev,
              categoryId: matchingCategory.id
            }))
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    // Set initial filters from URL parameters
    const categoryParam = searchParams.get('categoryId')
    const cityParam = searchParams.get('cityId')
    const locationParam = searchParams.get('locationId')
    
    const initialFilters = {
      search: searchParams.get('search') || '',
      cityId: cityParam || '',
      locationId: locationParam || '',
      categoryId: categoryParam || '',
      subCategoryId: searchParams.get('subCategoryId') || '',
      mediaType: searchParams.get('mediaType') || '',
      illumination: searchParams.get('illumination') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      size: searchParams.get('size') || '',
      isAvailable: searchParams.get('isAvailable') !== 'false'
    }
    
    setFilters(initialFilters)
    fetchData(categoryParam, cityParam, locationParam)
  }, [searchParams, fetchLocations])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      ...(key === 'categoryId' && { subCategoryId: '' }),
      ...(key === 'cityId' && { locationId: '' }) // Reset location when city changes
    }))

    // Fetch locations when city changes
    if (key === 'cityId' && value) {
      fetchLocations(value)
    } else if (key === 'cityId' && !value) {
      setLocations([]) // Clear locations when no city selected
    }
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
        billboard.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        billboard.city?.name.toLowerCase().includes(filters.search.toLowerCase())
      
      const matchesCity = !filters.cityId || billboard.cityId === filters.cityId
      const matchesCategory = !filters.categoryId || billboard.categoryId === filters.categoryId
      const matchesSubCategory = !filters.subCategoryId || billboard.subCategoryId === filters.subCategoryId
      
      // Fix location matching - compare with actual location names
      let matchesLocation = true
      if (filters.locationId) {
        const selectedLocation = locations.find(loc => loc.id === filters.locationId)
        if (selectedLocation) {
          // Case-insensitive exact match for location
          matchesLocation = billboard.location.toLowerCase().trim() === selectedLocation.name.toLowerCase().trim()
        } else {
          matchesLocation = false
        }
      }
      
      const matchesMediaType = !filters.mediaType || billboard.mediaType === filters.mediaType
      const matchesIllumination = !filters.illumination || billboard.illumination === filters.illumination
      const matchesSize = !filters.size || billboard.size.toLowerCase().includes(filters.size.toLowerCase())
      const matchesAvailable = billboard.isAvailable === filters.isAvailable
      
      const price = parseFloat(billboard.offerPricing || billboard.pricing)
      const matchesMinPrice = !filters.minPrice || price >= parseFloat(filters.minPrice)
      const matchesMaxPrice = !filters.maxPrice || price <= parseFloat(filters.maxPrice)

      return matchesSearch && matchesCity && matchesCategory && matchesSubCategory && 
             matchesLocation && matchesMediaType && matchesIllumination && matchesSize && 
             matchesAvailable && matchesMinPrice && matchesMaxPrice
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Available Billboards
          </h1>
          
          {/* Category Breadcrumb */}
          {selectedCategory && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
              <Link href="/billboards" className="hover:text-blue-600 dark:hover:text-blue-400">
                All Categories
              </Link>
              <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 dark:text-white font-medium">
                {selectedCategory.name}
              </span>
              {filters.subCategoryId && selectedSubCategory && (
                <>
                  <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {selectedSubCategory.name}
                  </span>
                </>
              )}
            </div>
          )}

          {/* Subcategory Selection */}
          {selectedCategory && selectedCategory.subCategories && selectedCategory.subCategories.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Choose Subcategory
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFilterChange('subCategoryId', '')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    !filters.subCategoryId
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  All {selectedCategory.name}
                </button>
                {selectedCategory.subCategories.map((subCategory) => (
                  <button
                    key={subCategory.id}
                    onClick={() => handleFilterChange('subCategoryId', subCategory.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filters.subCategoryId === subCategory.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {subCategory.name}
                    <span className="ml-2 text-xs opacity-75">
                      ({filteredBillboards.filter(b => b.subCategoryId === subCategory.id).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search billboards..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filter Toggle and Sort */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
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

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <select
                    value={filters.locationId}
                    onChange={(e) => handleFilterChange('locationId', e.target.value)}
                    disabled={!filters.cityId}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Filter - Only show if no category is pre-selected */}
                {!selectedCategory && (
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
                )}

                {/* Media Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Media Type
                  </label>
                  <select
                    value={filters.mediaType}
                    onChange={(e) => handleFilterChange('mediaType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">All Types</option>
                    <option value="Static">Static</option>
                    <option value="Digital">Digital</option>
                    <option value="LED">LED</option>
                    <option value="Neon">Neon</option>
                  </select>
                </div>

                {/* Illumination Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Illumination
                  </label>
                  <select
                    value={filters.illumination}
                    onChange={(e) => handleFilterChange('illumination', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">All</option>
                    <option value="Illuminated">Illuminated</option>
                    <option value="Non-Illuminated">Non-Illuminated</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Min Price
                  </label>
                  <input
                    type="number"
                    placeholder="Min price"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Max Price
                  </label>
                  <input
                    type="number"
                    placeholder="Max price"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Size Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Size
                  </label>
                  <select
                    value={filters.size}
                    onChange={(e) => handleFilterChange('size', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">All Sizes</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="Extra Large">Extra Large</option>
                  </select>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Availability
                  </label>
                  <select
                    value={filters.isAvailable.toString()}
                    onChange={(e) => handleFilterChange('isAvailable', e.target.value === 'true')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="true">Available Only</option>
                    <option value="false">All Billboards</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredBillboards.length} of {billboards.length} billboards
            {selectedCategory && (
              <span className="ml-1">
                in <span className="font-medium text-gray-900 dark:text-white">{selectedCategory.name}</span>
                {filters.subCategoryId && selectedSubCategory && (
                  <span> → <span className="font-medium text-blue-600 dark:text-blue-400">{selectedSubCategory.name}</span></span>
                )}
              </span>
            )}
          </p>
        </div>

        {/* Billboard Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredBillboards.length === 0 ? (
          <div className="text-center py-12">
            {selectedCategory?.comingSoon ? (
              <>
                <svg className="mx-auto h-12 w-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Coming Soon!</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  We are working hard to bring you amazing {selectedCategory.name.toLowerCase()} options. Stay tuned for exciting updates!
                </p>
              </>
            ) : (
              <>
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306m8 0V7a2 2 0 012 2v6.414l-1.293 1.293a1 1 0 01-.707.293H8a1 1 0 01-.707-.293L6 15.414V9a2 2 0 012-2V6.306z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No billboards found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Try adjusting your search criteria or filters.
                </p>
              </>
            )}
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
  // Define category images mapping (same as OurServices)
  const categoryImages = {
    'social-media': '/images/services/social-media.jpg',
    'unipole': '/images/services/billboard.jpg',
    'digital-advertising': '/images/services/digital-ads.jpg'
  }

  // Get category image based on category name or ID
  const getCategoryImage = () => {
    const categoryName = billboard.category?.name?.toLowerCase().replace(/\s+/g, '-')
    if (categoryName?.includes('social')) return categoryImages['social-media']
    if (categoryName?.includes('unipole') || categoryName?.includes('billboard')) return categoryImages['unipole']
    if (categoryName?.includes('digital')) return categoryImages['digital-advertising']
    return null
  }

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
        ) : getCategoryImage() ? (
          <Image
            src={getCategoryImage()}
            alt={billboard.category?.name}
            fill
            className="object-cover opacity-50"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
            <p className="text-sm text-gray-600 dark:text-gray-400">per day</p>
          </div>
          
          <Link
            href={`/billboards/${billboard.id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}







