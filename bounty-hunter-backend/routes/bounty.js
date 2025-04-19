const express = require('express');
const bountyRouter = express.Router();
const { addBounty, getBountyList, updateBounty, hireBounty } = require('../controllers/bounty')

// Route to add a new bounty
bountyRouter.post('/bounties', (req, res) => {
  addBounty(req, res)
});

// Route to list all bounties
bountyRouter.get('/bounties', (req, res) => {
  getBountyList(req, res)
});

// Route to choose a bounty
bountyRouter.put('/bounties/:bountyId/choose', (req, res) => {
  updateBounty(req, res)
});

// Route to hire a bounty hunter for a bounty
bountyRouter.post('/bounties/:bountyId/hire/:hunterId', (req, res) => {
  hireBounty(req, res)
});
  
module.exports = bountyRouter;
