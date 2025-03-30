const express = require('express');
const router = require('express').Router();
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

module.exports = router;