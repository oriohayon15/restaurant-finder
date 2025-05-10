import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/authcontext';
import axios from 'axios';
import { removeFavorites } from '../utils/favorites';

const SavedRestaurants = () => {
  const [favorites, setFavorites] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5001/api/favorites/${user.id}`)
        .then((res) => {
          setFavorites(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch favorites:", err);
        });
    }
  }, [user]);

  return (
    <div>
      {favorites === null && (
        <p>Loading...</p>
      )}

      {favorites?.length === 0 && (
        <p className="text-center text-gray-600 mt-4">
          No restaurants have been saved to favorites yet! Try saving!
        </p>
      )}

      {favorites?.length > 0 && (
        <div className="grid grid-cols-1 gap-6 justify-items-center mt-6">
          {favorites.map((restaurant) => (
            <div
              key={restaurant.placeId}
              className="restaurant-card relative bg-white rounded-2xl overflow-hidden w-[575px] h-auto min-h-[360px] flex flex-col shadow-2xl border border-gray-300 transition-all duration-300 hover:border-gray-500 hover:ring-8 hover:ring-blue-200 hover:shadow-2xl hover:shadow-blue-300"
            >
              <a
                href={`https://www.google.com/maps/place/?q=place_id:${restaurant.placeId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {restaurant.photo && (
                  <img
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${restaurant.photo}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover rounded"
                  />
                )}
                <h3 className="font-bold p-1.5">{restaurant.name}</h3>
                <p className="p-1.5">Address: {restaurant.address}</p>
                <p className="p-1.5">
                  Total Reviews/Ratings: {restaurant.total_ratings}, ⭐️{restaurant.ratings}/5
                </p>
                <p className={restaurant.isOpen ? 'p-1.5 text-green-600' : 'p-1.5 text-red-600'}>
                  {restaurant.isOpen ? 'Open Now' : 'Closed'}
                </p>
              </a>

              {user && (
                <div className="flex justify-end mt-auto px-4 pb-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      
                      removeFavorites(user.id, restaurant.placeId).then((res) => {
                        if (res.success) {
                          setFavorites(prev =>
                            prev.filter(r => r.placeId !== restaurant.placeId)
                          );
                        } else {
                          console.error("Error removing:", res.error);
                        }
                      });
                    }}
                    className="bg-red-600 text-white text-sm font-bold py-2 px-4 rounded hover:bg-red-800 transition cursor-pointer"
                  >
                    Remove from Favorites
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRestaurants;
