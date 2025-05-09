const express = require('express');
const router = express.Router();
const pool = require('../db')
const axios = require('axios');

router.post('/save', async(req, res) => {
    const {user_id, restaurant_id} = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO saved_restaurants (user_id, restaurant_id) VALUES ($1, $2) RETURNING *',
            [user_id, restaurant_id]);

            res.status(201).json({ message: 'Restaurant saved succesfully', saved_restaurants: result.rows[0] });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save restaurant' });
    }
});

router.delete('/remove', async(req, res) => {
    const {user_id, restaurant_id} = req.body;

    try {
        const result = await pool.query(
            'DELETE FROM saved_restaurants WHERE user_id = $1 AND restaurant_id = $2 RETURNING *',
            [user_id, restaurant_id]);

            res.status(200).json({ message: 'Removed from favorites succesfully'});
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to remove from favorites' });
    }
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try{
        const result = await pool.query(
            'SELECT * FROM saved_restaurants WHERE user_id = $1',
            [userId]
        );

        const placeIds = result.rows.map((row) => row.restaurant_id);

            const requests = placeIds.map((placeId) =>
                axios
                  .get('https://maps.googleapis.com/maps/api/place/details/json', {
                    params: {
                      place_id: placeId,
                      key: process.env.GOOGLE_PLACES_API_KEY,
                      fields: 'name,rating,formatted_address,photos,opening_hours,place_id,user_ratings_total',
                    },
                  })
                    .then((res) => {
                    const r = res.data.result;
                    return {
                        placeId: r.place_id,
                        name: r.name,
                        ratings: r.rating,
                        total_ratings: r.user_ratings_total,
                        address: r.formatted_address,
                        isOpen: r.opening_hours?.open_now,
                        photo: r.photos?.[0]?.photo_reference || null,
                    };
                  })
                );

                const fullDetails = await Promise.all(requests);

                res.status(200).json(fullDetails);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
});

module.exports = router;