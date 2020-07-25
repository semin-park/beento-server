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

router.post('/add', async (req, res, next) => {
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

router.get('/:id', async (req, res, next) => {
    try {
        const entry = await LogEntry.findById(req.params.id)
        if (entry === null) {
            throw new Error(`(ID) ${req.params.id} does not exist.`)
        }
        res.json(entry);
    } catch (err) {
        console.log(err.name);
        res.status(404);
        next(err);
    }
});

router.post('/update/:id', async (req, res, next) => {
    try {
        const updatedEntry = await LogEntry.findByIdAndUpdate(req.params.id, req.body, {
            new: true, useFindAndModify: false
        });
        res.json(updatedEntry);
    } catch (err) {
        console.log(err.name);
        res.status(400);
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await LogEntry.findByIdAndDelete(req.params.id)
        res.json('Deleted Successfully');
    } catch (err) {
        console.log(err.name);
        res.status(400);
        next(err);
    }
});

module.exports = router;
