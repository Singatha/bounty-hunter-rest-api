const express = require('express');
const hunterRouter = express.Router();
const { addHunter, getHunterList } = require('../controllers/hunter')

// Route to add a new bounty hunter
hunterRouter.post('/hunters', (req, res) => {
    addHunter(req, res)
});

// Route to list all bounty hunters
hunterRouter.get('/hunters', (req, res) => {
    getHunterList(res)
});

module.exports = hunterRouter;
