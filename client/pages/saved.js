import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/authcontext';
import axios from 'axios';

const SavedRestaurants = () => {
    const [favorites, setFavorites] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5001/api/favorites/${user.id}`)
            .then((res) => {
                setFavorites(res.data)
            })
            .catch((err) => {
                console.error("Failed to fetch favorites:", err);
            });
        }
    }, [user]);

    return(
        <div>
            {favorites === null && (
            <p>Loading...</p>
        )}
            {favorites?.length === 0 && (
            <p className="text-center text-gray-600 mt-4">
            No restaurants have been saved to favorites yet! Try saving! 
        </p>
        )}

        
        </div>
    )
}

export default SavedRestaurants;
