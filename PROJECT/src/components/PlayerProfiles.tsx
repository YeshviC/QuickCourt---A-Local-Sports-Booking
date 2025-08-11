import React, { useState } from 'react';
import Header from './shared/Header';
import { UserPlusIcon, ChatBubbleLeftIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline';

const PlayerProfiles = () => {
  const [following, setFollowing] = useState<number[]>([]);

  const players = [
    {
      id: 1,
      name: 'Alex Johnson',
      sport: 'Badminton',
      location: 'Satellite, Ahmedabad',
      rating: 4.8,
      matches: 45,
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      level: 'Advanced',
      bio: 'Passionate badminton player with 5+ years experience. Love playing doubles!'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      sport: 'Tennis',
      location: 'Pali Road, Jodhpur',
      rating: 4.6,
      matches: 32,
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      level: 'Intermediate',
      bio: 'Tennis enthusiast seeking practice partners for weekend sessions.'
    },
    {
      id: 3,
      name: 'Mike Chen',
      sport: 'Football',
      location: 'Residency Road, Jodhpur',
      rating: 4.9,
      matches: 78,
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
      level: 'Professional',
      bio: 'Former college football player, now looking to play recreationally.'
    },
    {
      id: 4,
      name: 'Emma Davis',
      sport: 'Swimming',
      location: 'Circuit House, Jodhpur',
      rating: 4.7,
      matches: 28,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      level: 'Advanced',
      bio: 'Competitive swimmer and coach. Open to training sessions.'
    },
    {
      id: 5,
      name: 'James Wilson',
      sport: 'Cricket',
      location: 'Vaishali, Ahmedabad',
      rating: 4.5,
      matches: 52,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      level: 'Intermediate',
      bio: 'Cricket lover seeking team for weekend matches.'
    },
    {
      id: 6,
      name: 'Lisa Rodriguez',
      sport: 'Table Tennis',
      location: 'Satellite, Ahmedabad',
      rating: 4.4,
      matches: 36,
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
      level: 'Intermediate',
      bio: 'Table tennis player looking for regular practice partners.'
    }
  ];

  const handleFollow = (playerId: number) => {
    setFollowing(prev => 
      prev.includes(playerId) 
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Professional':
        return 'bg-purple-100 text-purple-800';
      case 'Advanced':
        return 'bg-emerald-100 text-emerald-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSportIcon = (sport: string) => {
    const icons: { [key: string]: string } = {
      'Badminton': '🏸',
      'Tennis': '🎾',
      'Football': '⚽',
      'Swimming': '🏊',
      'Cricket': '🏏',
      'Table Tennis': '🏓'
    };
    return icons[sport] || '🏃';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Connect with Sports Community
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and connect with fellow sports enthusiasts in your area. 
            Find practice partners, join teams, and build lasting friendships through sports.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
              <option>All Sports</option>
              <option>Badminton</option>
              <option>Tennis</option>
              <option>Football</option>
              <option>Swimming</option>
              <option>Cricket</option>
              <option>Table Tennis</option>
            </select>
            
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Professional</option>
            </select>
            
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
              <option>All Locations</option>
              <option>Satellite, Ahmedabad</option>
              <option>Pali Road, Jodhpur</option>
              <option>Residency Road, Jodhpur</option>
              <option>Circuit House, Jodhpur</option>
            </select>
          </div>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <div key={player.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
              <div className="p-6">
                {/* Player Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{player.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{getSportIcon(player.sport)}</span>
                      <span>{player.sport}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(player.level)}`}>
                    {player.level}
                  </span>
                </div>

                {/* Player Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{player.rating}</span>
                    </div>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{player.matches}</p>
                    <p className="text-xs text-gray-600">Matches</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-4">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{player.location}</span>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {player.bio}
                </p>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleFollow(player.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition duration-200 ${
                      following.includes(player.id)
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    <UserPlusIcon className="h-4 w-4" />
                    <span>{following.includes(player.id) ? 'Following' : 'Connect'}</span>
                  </button>
                  
                  <button className="flex items-center justify-center p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition duration-200">
                    <ChatBubbleLeftIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition duration-200">
            Load More Players
          </button>
        </div>

        {/* Community Features */}
        <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-2xl p-8 mt-12 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Sports Community</h2>
          <p className="text-lg mb-6 opacity-90">
            Create your profile, showcase your skills, and connect with players who share your passion
          </p>
          <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition duration-200">
            Create Your Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfiles;