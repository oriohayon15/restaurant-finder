const express = require('express');
const router = require('express').Router();
const axios = require("axios");
require("dotenv").config();

router.get('/search', async (req, res) => {
    const location = req.query.location;
    const category = req.query.category;

    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
            params: {
                query: `${category} restaurant in ${location} `,
                key: process.env.GOOGLE_PLACES_API_KEY
            }
        })
        const filtered = response.data.results.filter(place => place.types.includes("restaurant"));
        const simplified = filtered.map(place => ({
            name: place.name,
            address: place.formatted_address,
            ratings: place.rating,
            total_ratings: place.user_ratings_total, 
            isOpen: place.opening_hours?.open_now,
            photo: place.photos?.[0]?.photo_reference,
            placeId: place.place_id
        })); 
        res.json(simplified);
    }
    catch (error) {
        console.error('Google Places API error:', error.message);
        res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
})

module.exports = router;
