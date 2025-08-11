import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './shared/Header';
import { 
  MapPinIcon, 
  StarIcon, 
  ClockIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon 
} from '@heroicons/react/24/solid';
import { 
  CheckCircleIcon,
  WifiIcon,
  ParkingIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const CourtDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const court = {
    id: 1,
    name: 'SBR Badminton',
    location: 'Satellite, Jodhpur Village',
    sport: 'Badminton',
    rating: 4.5,
    reviews: 6,
    price: 200,
    operatingHours: '7:00AM - 11:00PM',
    address: 'Sat Rasta, Ramji Mandir Rd, Satellite, Jodhpur Village, Ahmedabad, Gujarat',
    images: [
      'https://images.pexels.com/photos/976873/pexels-photo-976873.jpeg',
      'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg',
      'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg'
    ],
    amenities: [
      { name: 'Parking', icon: 'parking', available: true },
      { name: 'Restroom', icon: 'restroom', available: true },
      { name: 'Refreshment', icon: 'refreshment', available: true },
      { name: 'CCTV Surveillance', icon: 'cctv', available: true },
      { name: 'Nearby Air Conditioned', icon: 'ac', available: true },
      { name: 'Wifi', icon: 'wifi', available: true },
      { name: 'Library', icon: 'library', available: false }
    ],
    aboutVenue: [
      'Tournament Training Arena',
      'We have top 5 players for 1v1 extra per person',
      'Equipment available on rent'
    ],
    reviews: [
      {
        id: 1,
        user: 'Mitchell Admin',
        rating: 5,
        date: '16 June 2024, 5:34 PM',
        comment: 'Very fast, well maintained'
      },
      {
        id: 2,
        user: 'Mitchell Admin',
        rating: 5,
        date: '16 June 2024, 5:34 PM',
        comment: 'Very fast, well maintained'
      },
      {
        id: 3,
        user: 'Mitchell Admin',
        rating: 4,
        date: '16 June 2024, 5:34 PM',
        comment: 'Very fast, well maintained'
      }
    ]
  };

  const timeSlots = [
    { time: '09:00 AM', available: true, price: 500 },
    { time: '10:00 AM', available: true, price: 500 },
    { time: '11:00 AM', available: false, price: 500 },
    { time: '12:00 PM', available: true, price: 600 },
    { time: '01:00 PM', available: true, price: 600 },
    { time: '02:00 PM', available: true, price: 600 },
    { time: '03:00 PM', available: false, price: 600 },
    { time: '04:00 PM', available: true, price: 700 },
    { time: '05:00 PM', available: true, price: 700 },
    { time: '06:00 PM', available: false, price: 700 },
    { time: '07:00 PM', available: true, price: 800 },
    { time: '08:00 PM', available: true, price: 800 }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{court.name}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPinIcon className="h-5 w-5" />
                    <span>{court.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="font-medium">{court.rating} ({court.reviews})</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <Link
                  to={`/booking/${id}`}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition duration-200 mb-2"
                >
                  Book This Venue
                </Link>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <ClockIcon className="h-4 w-4" />
                  <span>Operating Hours: {court.operatingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="relative">
            <div className="aspect-video bg-gray-200">
              <img
                src={court.images[selectedImageIndex]}
                alt="Court"
                className="w-full h-full object-cover"
              />
            </div>
            
            {court.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition duration-200"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setSelectedImageIndex(Math.min(court.images.length - 1, selectedImageIndex + 1))}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition duration-200"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {court.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sports Available */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sports Available</h3>
            <div className="flex space-x-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl">🏸</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Badminton</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'reviews', 'availability'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition duration-200 ${
                    activeTab === tab
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Amenities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {court.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircleIcon 
                          className={`h-5 w-5 ${amenity.available ? 'text-green-500' : 'text-gray-300'}`} 
                        />
                        <span className={amenity.available ? 'text-gray-700' : 'text-gray-400'}>
                          {amenity.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
                  <div className="flex items-start space-x-2">
                    <MapPinIcon className="h-5 w-5 text-red-500 mt-0.5" />
                    <p className="text-gray-600">{court.address}</p>
                  </div>
                  
                  <h4 className="text-md font-semibold text-gray-900 mt-6 mb-2">Location Map</h4>
                  <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Map placeholder</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Player Reviews & Ratings
                </h3>
                <div className="space-y-6">
                  {court.reviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {review.user.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{review.user}</h4>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="mt-6 text-emerald-600 hover:text-emerald-700 font-medium">
                  Load more reviews
                </button>
              </div>
            )}

            {activeTab === 'availability' && (
              <div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Badminton</h3>
                  <p className="text-sm text-gray-600">
                    Pricing is subjected to change and is controlled by venue!
                  </p>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Badminton Standard Synthetic</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">INR 500.0 / hour</span>
                        <div className="text-gray-600">
                          <div>Monday - Sunday: 09:00 AM - 07:00 AM</div>
                          <div>Wednesday: 04:00 PM - 10:00 PM</div>
                          <div>Saturday - Sunday: 09:00 AM - 10:00 PM</div>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">INR 500.0 / hour</span>
                        <div className="text-gray-600">
                          <div>Tuesday: 09:00 AM - 10:00 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Time Slots</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border text-sm font-medium transition duration-200 ${
                        slot.available
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <div>{slot.time}</div>
                      <div className="text-xs">₹{slot.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
          <Link
            to={`/booking/${id}`}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold text-center block hover:bg-emerald-700 transition duration-200"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourtDetails;