const express = require('express');
const router =  express.Router();
const pool = require('../db')

router.post('/', async (req, res) => {
    const { name, email, uid } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, firebase_uid) VALUES ($1, $2, $3) RETURNING *',
            [name, email, uid]);

            res.status(201).json({ message: 'User created successfully', user: result.rows[0] });
    } catch(err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/:uid', async (req, res) => {
    const { uid } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE firebase_uid = $1', [uid]);
    res.json(result.rows[0]);
});


module.exports = router;