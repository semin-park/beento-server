const { Router } = require('express');
const mongoose = require('mongoose');

const router = Router();

const LogEntry = require('../models/LogEntry');

router.get('/', async (req, res, next) => {
    try {
        const entries = await LogEntry.find()
        res.json(entries);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
    } catch (err) {
        console.log(err.name);
        if (err.name === 'ValidationError')
            res.status(422);
        next(err);
    }
});

module.exports = router;
