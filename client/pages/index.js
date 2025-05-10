import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../lib/authcontext'; 
import Logout from './logout';
import SearchBar from '../pages/searchbar';
import { saveToFavorites } from '../utils/favorites'; 
import Image from 'next/image';

export default function Home() {
  const { user, loading } = useAuth();
  const [restaurants, setRestaurants] = useState([]);

  if (loading) return <p className='text-center'>Loading...</p>;

  return (
    <div className="p-4 ">
      <div className="flex justify-center items-center my-4">
      <Image 
        src="/logo.gif"
        alt="LocalEats Logo"
        width={600}
        height={108}
        priority
      />
      </div>

      {user ? (
        <>
        <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold mb-4">Hi, {user.name}!</h1>
        < Logout />
        </div>
        <Link href="/saved">
          <button className="bg-[#ffccc1] hover:bg-[#fde9e5] text-black font-bold py-2 px-4 rounded-full cursor-pointer">View Saved Restaurants</button>
        </Link>
        </>
      ) : (
        <>

      <Link href="/signup" className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer" >
      Signup
      </Link>
      <br></br>
      <br></br>
      <Link href="/login" className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer" >
      Log In
      </Link>
      </>
      )}
      <p className="text-center text-xl italic font-bold font-italic">Where are you and what are you in the mood for today?</p>
    <SearchBar onSearchResults={setRestaurants}/>

    <div>
      {restaurants.length === 0 && (
      <p className="text-center text-gray-600 mt-4">
        No results yet. Try searching!
      </p>
    )}
    <div className="grid grid-cols-1 gap-6 justify-items-center mt-6">
      {restaurants.length > 0 && (
        restaurants.map((restaurant) => (
          <div
            className="restaurant-card relative bg-white rounded-2xl overflow-hidden w-[575px] h-auto min-h-[360px] flex flex-col shadow-2xl border border-gray-300 transition-all duration-300 hover:border-gray-500 hover:ring-8 hover:ring-blue-200 hover:shadow-2xl hover:shadow-blue-300"
            key={restaurant.placeId}>
              <a
            href={`https://www.google.com/maps/place/?q=place_id:${restaurant.placeId}`}
            target="_blank"
            rel="noopener noreferrer"
            
            >
            {restaurant.photo && (
            <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${restaurant.photo}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`}
            alt={restaurant.name}
            className="w-full h-48 object-cover rounded"
            />
            )}
            <h3 className='font-bold p-1.5'>{restaurant.name}</h3>
            <p className='p-1.5'>Address: {restaurant.address}</p>
            <p className='p-1.5'>Total Reviews/Ratings: {restaurant.total_ratings}, ⭐️{restaurant.ratings}/5</p>
            <p className={ restaurant.isOpen ? 'p-1.5 text-green-600' :  'p-1.5 text-red-600'}>
            {restaurant.isOpen ? 'Open Now' : 'Closed'}</p>
            </a>

          {user && (
            <div className="flex justify-end mt-auto px-4 pb-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                saveToFavorites(user.id, restaurant.placeId).then((res) => {
                  if (res.success) {
                    console.log("Saved to favorites!"); //change to actual success message 
                  } else {
                    console.error("Error saving:", res.error); 
                  }
                });
              }}
              className=" bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded hover:bg-blue-800 transition cursor-pointer">
                Save to Favorites
            </button>
            </div>
          )}
          </div>
        ))
      )} 
      </div>
    </div>
    <style jsx>{`
      .restaurant-card {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      .restaurant-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.25), 0 10px 10px -5px rgba(59, 130, 246, 0.2);
        }
    `}</style>
    </div>
  );
}
