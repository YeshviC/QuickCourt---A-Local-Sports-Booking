import React, { useState } from 'react';
import Header from './shared/Header';
import { Link } from 'react-router-dom';
import { MapPinIcon, StarIcon, FunnelIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const CourtListing = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    sport: 'All Sports',
    priceRange: '',
    rating: '',
    venueType: 'Indoor'
  });

  const courts = [
    {
      id: 1,
      name: 'SBR Badminton',
      location: 'Satellite, Jodhpur Cir',
      sport: 'Badminton',
      rating: 4.5,
      reviews: 5,
      price: 200,
      image: 'https://images.pexels.com/photos/976873/pexels-photo-976873.jpeg',
      amenities: ['Badminton', 'Indoor', 'Top Rated', 'Budget']
    },
    {
      id: 2,
      name: 'Elite Sports Complex',
      location: 'Vaishnavdevi Cir',
      sport: 'Football',
      rating: 4.3,
      reviews: 8,
      price: 500,
      image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg',
      amenities: ['Football', 'Outdoor', 'Premium']
    },
    {
      id: 3,
      name: 'Premier Cricket Ground',
      location: 'Vaishnavdevi Cir',
      sport: 'Cricket',
      rating: 4.5,
      reviews: 12,
      price: 800,
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
      amenities: ['Cricket', 'Outdoor', 'Top Rated']
    },
    {
      id: 4,
      name: 'Aqua Sports Center',
      location: 'Vaishnavdevi Cir',
      sport: 'Swimming',
      rating: 4.5,
      reviews: 6,
      price: 300,
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg',
      amenities: ['Swimming', 'Indoor', 'Premium']
    },
    {
      id: 5,
      name: 'Tennis Academy Pro',
      location: 'Vaishnavdevi Cir',
      sport: 'Tennis',
      rating: 4.5,
      reviews: 9,
      price: 400,
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg',
      amenities: ['Tennis', 'Outdoor', 'Top Rated']
    },
    {
      id: 6,
      name: 'Table Tennis Hub',
      location: 'Vaishnavdevi Cir',
      sport: 'Table Tennis',
      rating: 4.5,
      reviews: 4,
      price: 150,
      image: 'https://images.pexels.com/photos/976873/pexels-photo-976873.jpeg',
      amenities: ['Table Tennis', 'Indoor', 'Budget']
    }
  ];

  const CourtCard = ({ court, className = '' }: { court: any; className?: string }) => (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200 ${className}`}>
      <img
        src={court.image}
        alt={court.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{court.name}</h3>
        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
          <MapPinIcon className="h-4 w-4" />
          <span>{court.location}</span>
        </div>
        <div className="flex items-center space-x-1 mb-3">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-medium">{court.rating} ({court.reviews})</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {court.amenities.map((amenity: string, index: number) => (
            <span
              key={index}
              className={`px-2 py-1 rounded text-xs font-medium ${
                amenity === 'Top Rated' ? 'bg-yellow-100 text-yellow-800' :
                amenity === 'Premium' ? 'bg-purple-100 text-purple-800' :
                amenity === 'Budget' ? 'bg-green-100 text-green-800' :
                'bg-blue-100 text-blue-800'
              }`}
            >
              {amenity}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">₹{court.price}/hour</span>
          <Link
            to={`/court/${court.id}`}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition duration-200 text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );

  const FilterSection = ({ className = '' }: { className?: string }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="font-semibold text-gray-900 mb-4">Filter by Sport Type</h3>
      <select 
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-emerald-500"
        value={filters.sport}
        onChange={(e) => setFilters(prev => ({ ...prev, sport: e.target.value }))}
      >
        <option>All Sports</option>
        <option>Badminton</option>
        <option>Football</option>
        <option>Cricket</option>
        <option>Swimming</option>
        <option>Tennis</option>
      </select>

      <h4 className="font-medium text-gray-900 mb-3">Price range (per hour)</h4>
      <div className="space-y-2 mb-4">
        <div className="text-sm text-gray-600">₹3,500 - ₹5,500.00</div>
      </div>

      <h4 className="font-medium text-gray-900 mb-3">Choose Venue Type</h4>
      <div className="space-y-2 mb-4">
        <label className="flex items-center">
          <input type="radio" name="venueType" value="Indoor" defaultChecked className="mr-2" />
          <span className="text-sm">Indoor</span>
        </label>
        <label className="flex items-center">
          <input type="radio" name="venueType" value="Outdoor" className="mr-2" />
          <span className="text-sm">Outdoor</span>
        </label>
      </div>

      <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
      <div className="space-y-2 mb-6">
        {[5, 4, 3, 2, 1].map((rating) => (
          <label key={rating} className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <div className="flex items-center">
              {Array.from({ length: rating }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
              ))}
              {Array.from({ length: 5 - rating }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-gray-300" />
              ))}
              <span className="ml-2 text-sm">& up</span>
            </div>
          </label>
        ))}
      </div>

      <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200">
        Clear Filters
      </button>
    </div>
  );

  const Pagination = () => (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button 
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition duration-200"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>
      {[1, 2, 3, 4, 11].map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-2 rounded-lg transition duration-200 ${
            currentPage === page
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}
      <button 
        onClick={() => setCurrentPage(currentPage + 1)}
        className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition duration-200"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="bg-white p-4 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900">Sports Venues in Ahmedabad</h1>
          <p className="text-sm text-gray-600">Discover and Book Nearby Venues</p>
          <div className="mt-4 flex items-center space-x-3">
            <input
              type="text"
              placeholder="Search for venues"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
            <button className="p-2 bg-emerald-600 text-white rounded-lg">
              <FunnelIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {courts.slice(0, 6).map((court) => (
            <CourtCard key={court.id} court={court} />
          ))}
          <Pagination />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sports Venues in Ahmedabad: Discover and Book Nearby Venues
            </h1>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search by venue name"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 w-64"
              />
              <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition duration-200">
                <span>Search</span>
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <FilterSection className="w-1/4" />

            {/* Courts Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {courts.map((court) => (
                  <CourtCard key={court.id} court={court} />
                ))}
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtListing;