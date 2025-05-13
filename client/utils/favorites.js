import axios from 'axios';

export const saveToFavorites = async (userId, restaurantId) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/favorites/save`, {
            user_id: userId,
            restaurant_id: restaurantId,
        });

        return { success: true, data: res.data };
    } catch(err) {
        console.error('Failed to save favorite:', err);
        const errorMsg = err.response?.data?.error || err.message || 'Unknown error';
        return { success: false, error: errorMsg };
    }
};

export const removeFavorites = async (userId, restaurantId) => {
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/favorites/remove`, {
            data: {
                user_id: userId,
                restaurant_id: restaurantId,
            },
        });
    
        return { success: true, data: res.data };
    } catch(err) {
        console.error('Failed to remove from favorites:', err);
        const errorMsg = err.response?.data?.error || err.message || 'Unknown error';
        return { success: false, error: errorMsg };
    }
};