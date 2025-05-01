import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../lib/authcontext'; 
import Logout from './logout';
import SearchBar from '../pages/searchbar'; 


export default function Home() {
  const { user, loading } = useAuth();
  const [restaurants, setRestaurants] = useState([]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Local Restaurant Finder</h1>

      {user ? (
        <>
        <h2 className="text-xl font-semibold mb-4">Welcome, {user.name}!</h2>
        <Logout />
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

    <SearchBar onSearchResults={setRestaurants}/>

    <div>
      {restaurants.length === 0 && (
      <p className="text-center text-gray-600 mt-4">
        No results yet. Try searching!
      </p>
    )}
      {restaurants.length > 0 && (
        restaurants.map((restaurant) => (
          <div key={restaurant.placeId}>
            {restaurant.photo && (
            <img
            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${restaurant.photo}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`}
            alt={restaurant.name}
            className="w-full h-48 object-cover rounded"
            />
            )}
            <h3>{restaurant.name}</h3>
            <p>{restaurant.address}</p>
            <p>{restaurant.total_ratings}, {restaurant.ratings}</p>
            <p>{restaurant.isOpen}</p>
          </div>
        ))
      )} 
    </div>

    </div>
  );
}
