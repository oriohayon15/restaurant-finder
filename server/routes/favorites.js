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
        res.status(200).json(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
});

module.exports = router;