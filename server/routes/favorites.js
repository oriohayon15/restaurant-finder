const express = require('express');
const router = express.Router();
const pool = require('../db')

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

module.exports = router;